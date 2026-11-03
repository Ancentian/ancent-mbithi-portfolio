import { NextResponse } from 'next/server';
import { composeMessage, limits, type QuoteRequest } from '@/lib/quote';

// Forwards quote and consultation requests to the owner's WhatsApp through CallMeBot.
// Configure CALLMEBOT_PHONE and CALLMEBOT_APIKEY (see .env.example); without them the
// route answers 503 and the form falls back to email.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export async function POST(req: Request) {
  const phone = process.env.CALLMEBOT_PHONE;
  const apikey = process.env.CALLMEBOT_APIKEY;
  if (!phone || !apikey) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (clean(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const request: QuoteRequest = {
    type: body.type === 'Consultation' ? 'Consultation' : 'Quote',
    name: clean(body.name, limits.name),
    email: clean(body.email, limits.email),
    phone: clean(body.phone, limits.phone),
    service: clean(body.service, limits.service),
    budget: clean(body.budget, limits.budget),
    timeline: clean(body.timeline, limits.timeline),
    message: clean(body.message, limits.message),
  };

  if (!request.name || !EMAIL_RE.test(request.email) || !request.service || !request.message) {
    return NextResponse.json({ error: 'invalid_fields' }, { status: 400 });
  }

  const url = new URL('https://api.callmebot.com/whatsapp.php');
  url.searchParams.set('phone', phone);
  url.searchParams.set('text', composeMessage(request));
  url.searchParams.set('apikey', apikey);

  try {
    const res = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(10_000) });
    if (!res.ok) throw new Error(`CallMeBot responded ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[quote] WhatsApp delivery failed', err);
    return NextResponse.json({ error: 'delivery_failed' }, { status: 502 });
  }
}

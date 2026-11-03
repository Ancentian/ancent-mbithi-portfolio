'use client';

import { CircleCheck, Loader2, Send } from 'lucide-react';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { profile, quote } from '@/data/site';
import { composeMessage, fromFormData, limits, type RequestType } from '@/lib/quote';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const field =
  'mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-[15px] text-ink placeholder:text-muted/70 transition-colors hover:border-ink/25 focus:border-orange focus:outline-none focus-visible:outline-none focus:ring-3 focus:ring-orange/15';
const label = 'block text-[13px] font-semibold text-ink';

function WhatsAppGlyph({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden className={className}>
      <path d="M16.04 3C8.86 3 3.03 8.82 3.03 16c0 2.29.6 4.53 1.74 6.5L3 29l6.68-1.75A12.95 12.95 0 0 0 16.04 29C23.2 29 29 23.18 29 16S23.2 3 16.04 3Zm5.83 15.7c-.32-.16-1.89-.93-2.18-1.04-.3-.1-.5-.16-.72.16-.21.32-.82 1.04-1 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.49.14-.65.15-.14.32-.37.48-.56.16-.19.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66 0 1.57 1.14 3.09 1.3 3.3.16.21 2.25 3.43 5.44 4.81.76.33 1.35.52 1.81.67.76.24 1.46.21 2.01.13.61-.09 1.89-.77 2.15-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

export function QuoteForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [type, setType] = useState<RequestType>('Quote');
  const [status, setStatus] = useState<Status>('idle');

  // "/#consultation" links preselect the consultation tab.
  useEffect(() => {
    const sync = () => {
      if (window.location.hash === '#consultation') setType('Consultation');
      if (window.location.hash === '#quote') setType('Quote');
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  // After an await the browser no longer treats this as a click, so popups get blocked;
  // `sameTab` navigates instead, which is always allowed.
  const openWhatsApp = (form: HTMLFormElement, sameTab = false) => {
    const text = encodeURIComponent(composeMessage(fromFormData(type, new FormData(form))));
    const url = `https://wa.me/${profile.whatsapp}?text=${text}`;
    if (sameTab) window.location.assign(url);
    else window.open(url, '_blank', 'noopener');
  };

  const onWhatsApp = () => {
    const form = formRef.current;
    if (form?.reportValidity()) openWhatsApp(form);
  };

  // Delivers to Ancent's WhatsApp through /api/quote; if that is not set up yet,
  // fall back to opening WhatsApp on the visitor's device.
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus('sending');
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fromFormData(type, data), website: data.get('website') }),
      });
      if (res.status === 503) {
        setStatus('idle');
        openWhatsApp(form, true);
        return;
      }
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center px-6 py-16 text-center" role="status">
        <CircleCheck aria-hidden className="size-12 text-orange" />
        <p className="mt-4 text-xl font-bold text-ink">Request received</p>
        <p className="mt-2 max-w-sm text-[15px] text-muted">
          Thanks. Your request has gone straight to my WhatsApp, and I&apos;ll reply by email or phone shortly.
        </p>
        <button type="button" onClick={() => setStatus('idle')} className="mt-6 text-sm font-semibold text-orange-ink hover:underline">
          Send another request
        </button>
      </div>
    );
  }

  const isQuote = type === 'Quote';

  return (
    <form ref={formRef} onSubmit={onSubmit} className="p-6 sm:p-8" aria-describedby="quote-note">
      <div role="radiogroup" aria-label="Request type" className="grid grid-cols-2 gap-1 rounded-lg bg-cream p-1">
        {(['Quote', 'Consultation'] as const).map((t) => (
          <button
            key={t}
            type="button"
            role="radio"
            aria-checked={type === t}
            onClick={() => setType(t)}
            className={`rounded-md py-2 text-sm font-semibold transition-colors ${
              type === t ? 'bg-white text-ink shadow-[0_1px_3px_rgba(7,27,82,0.12)]' : 'text-muted hover:text-ink'
            }`}
          >
            {t === 'Quote' ? 'Request a quote' : 'Book a consultation'}
          </button>
        ))}
      </div>

      {/* Honeypot for bots; hidden from people and assistive tech */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className={label}>
          Full name
          <input name="name" required maxLength={limits.name} autoComplete="name" className={field} placeholder="Jane Wanjiku" />
        </label>
        <label className={label}>
          Email
          <input
            name="email"
            type="email"
            required
            maxLength={limits.email}
            autoComplete="email"
            className={field}
            placeholder="jane@company.co.ke"
          />
        </label>
        <label className={label}>
          Phone / WhatsApp <span className="font-normal text-muted">(optional)</span>
          <input name="phone" type="tel" maxLength={limits.phone} autoComplete="tel" className={field} placeholder="+254 7XX XXX XXX" />
        </label>
        <label className={label}>
          Service
          <select name="service" required defaultValue="" className={field}>
            <option value="" disabled>
              Choose a service
            </option>
            {quote.services.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        {isQuote && (
          <label className={label}>
            Budget
            <select name="budget" defaultValue={quote.budgets[0]} className={field}>
              {quote.budgets.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </label>
        )}
        <label className={`${label} ${isQuote ? '' : 'sm:col-span-2'}`}>
          {isQuote ? 'Timeline' : 'Preferred time to talk'}
          {isQuote ? (
            <select name="timeline" defaultValue={quote.timelines[0]} className={field}>
              {quote.timelines.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          ) : (
            <input name="timeline" maxLength={limits.timeline} className={field} placeholder="e.g. Weekday afternoons, or a specific date" />
          )}
        </label>
        <label className={`${label} sm:col-span-2`}>
          {isQuote ? 'Project details' : 'What would you like to discuss?'}
          <textarea
            name="message"
            required
            rows={4}
            maxLength={limits.message}
            className={`${field} resize-y`}
            placeholder={
              isQuote
                ? 'What are you building, who will use it, and what systems does it need to connect to?'
                : 'A short summary of your situation and the questions you have.'
            }
          />
        </label>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="group inline-flex h-11 items-center gap-2 rounded-lg bg-orange px-5 text-sm font-semibold text-white transition-colors hover:bg-orange-light disabled:opacity-70"
        >
          {status === 'sending' ? (
            <Loader2 aria-hidden className="size-4 animate-spin" />
          ) : (
            <Send aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          )}
          {status === 'sending' ? 'Sending…' : 'Send request'}
        </button>
        <button
          type="button"
          onClick={onWhatsApp}
          className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#25d366]/60 px-5 text-sm font-semibold text-[#128c4a] transition-colors hover:bg-[#25d366]/10"
        >
          <WhatsAppGlyph className="size-4" />
          Chat on WhatsApp
        </button>
      </div>

      <p id="quote-note" className="mt-4 text-xs text-muted" aria-live="polite">
        {status === 'error'
          ? 'That did not go through. Please use "Chat on WhatsApp" instead, or email me directly.'
          : `Requests go straight to my WhatsApp. ${
              isQuote ? 'Free, no-obligation estimate.' : 'A free 30-minute call.'
            } Your details are only used to reply to you.`}
      </p>
    </form>
  );
}

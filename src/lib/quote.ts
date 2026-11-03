// Shared by the quote form (client) and the /api/quote route (server).

export type RequestType = 'Quote' | 'Consultation';

export type QuoteRequest = {
  type: RequestType;
  name: string;
  email: string;
  phone?: string;
  service: string;
  budget?: string;
  timeline?: string;
  message: string;
};

export const limits = { name: 100, email: 150, phone: 30, service: 80, budget: 60, timeline: 120, message: 3000 };

export function fromFormData(type: RequestType, data: FormData): QuoteRequest {
  const get = (k: string) => String(data.get(k) ?? '').trim();
  return {
    type,
    name: get('name'),
    email: get('email'),
    phone: get('phone'),
    service: get('service'),
    budget: get('budget'),
    timeline: get('timeline'),
    message: get('message'),
  };
}

// The text that lands in WhatsApp (or email); plain lines so it reads well on a phone.
export function composeMessage(r: QuoteRequest) {
  const lines = [
    `*New ${r.type.toLowerCase()} request* (portfolio site)`,
    '',
    `Name: ${r.name}`,
    `Email: ${r.email}`,
    r.phone ? `Phone: ${r.phone}` : '',
    `Service: ${r.service}`,
    r.type === 'Quote' && r.budget ? `Budget: ${r.budget}` : '',
    r.timeline ? `${r.type === 'Quote' ? 'Timeline' : 'Preferred time'}: ${r.timeline}` : '',
    '',
    r.message,
  ];
  return lines.filter((l, i) => l !== '' || lines[i - 1] !== '').join('\n');
}

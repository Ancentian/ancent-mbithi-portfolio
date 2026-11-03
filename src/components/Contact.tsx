import { Clock, Mail, MapPin } from 'lucide-react';
import { contact, profile, quote } from '@/data/site';
import { QuoteForm } from './QuoteForm';
import { GithubIcon, LinkedinIcon } from './ui/BrandIcons';
import { Reveal } from './ui/Reveal';

const channels = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: <Mail aria-hidden className="size-4" /> },
  { label: 'LinkedIn', value: 'ancent-mbithi', href: profile.linkedin, icon: <LinkedinIcon />, external: true },
  { label: 'GitHub', value: 'Ancentian', href: profile.github, icon: <GithubIcon />, external: true },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative overflow-hidden bg-navy-dark text-white">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_100%_100%,rgba(91,72,168,0.4),transparent_70%),linear-gradient(180deg,#0b245c_0%,#081d4d_100%)]"
      />
      <div className="container-page relative grid gap-12 py-24 lg:grid-cols-12 lg:gap-14 lg:py-28">
        <Reveal className="lg:col-span-5">
          <p className="text-[11px] font-bold tracking-[0.2em] text-orange-light uppercase">{quote.eyebrow}</p>
          <h2 id="contact-heading" className="mt-3 text-4xl leading-[1.05] font-extrabold tracking-[-0.035em] sm:text-5xl">
            {contact.heading}
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/75 sm:text-[17px]">{contact.body}</p>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/60">{quote.heading}</p>

          <ul className="mt-9 space-y-2.5">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.external ? { target: '_blank', rel: 'noopener' } : {})}
                  className="group flex items-center gap-3.5 rounded-xl border border-white/10 px-4 py-3 transition-colors duration-200 hover:border-white/25 hover:bg-white/5"
                >
                  <span className="grid size-9 place-items-center rounded-lg bg-white/8 text-white/80 transition-colors duration-200 group-hover:bg-orange group-hover:text-white">
                    {c.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-white/50">{c.label}</span>
                    <span className="block truncate text-[15px] font-semibold">{c.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-white/60">
            <li className="flex items-center gap-2">
              <MapPin aria-hidden className="size-4 text-orange-light" /> {profile.location} · works remotely
            </li>
            <li className="flex items-center gap-2">
              <Clock aria-hidden className="size-4 text-orange-light" /> East Africa Time (UTC+3)
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div id="quote" className="relative scroll-mt-28 overflow-hidden rounded-2xl bg-white text-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
            <span id="consultation" aria-hidden className="absolute -top-28" />
            <QuoteForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

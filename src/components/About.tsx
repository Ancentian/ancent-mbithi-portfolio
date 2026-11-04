import Image from 'next/image';
import { BadgeCheck, MessageSquareText, PhoneCall } from 'lucide-react';
import { about, profile } from '@/data/site';
import { Button } from './ui/Button';
import { Reveal } from './ui/Reveal';

export function About() {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
      <Reveal className="lg:col-span-5">
        <div className="group relative mx-auto max-w-105">
          {/* Offset frame behind the portrait */}
          <div
            aria-hidden
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-orange/40 transition-transform duration-300 ease-out-soft group-hover:translate-x-4 group-hover:translate-y-4"
          />
          <div className="relative aspect-4/5 overflow-hidden rounded-2xl border border-line/70 bg-white">
            <Image
              src={profile.photo}
              alt={`${profile.name}, ${profile.role} based in Nairobi`}
              fill
              loading="eager"
              sizes="(min-width: 1024px) 420px, (min-width: 640px) 60vw, 90vw"
              className="object-cover object-[50%_85%] transition-transform duration-500 ease-out-soft group-hover:scale-[1.03]"
            />
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-navy-dark/70 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-white">
              <div>
                <p className="text-lg font-bold tracking-tight">{profile.name}</p>
                <p className="text-[13px] text-white/80">{profile.role}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-ink">
                <BadgeCheck aria-hidden className="size-3.5 text-orange" />
                AWS Certified
              </span>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.08} className="lg:col-span-7">
        <p className="eyebrow">{about.eyebrow}</p>
        <h2 id="about-heading" className="mt-3 text-3xl leading-[1.1] text-ink sm:text-[2.5rem]">
          {about.heading}
        </h2>
        {about.paragraphs.map((p) => (
          <p key={p.slice(0, 24)} className="mt-5 text-base leading-relaxed text-muted">
            {p}
          </p>
        ))}

        <dl className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line/70 bg-line/70 sm:grid-cols-2">
          {about.facts.map((f) => (
            <div key={f.label} className="bg-white px-5 py-4 transition-colors duration-200 hover:bg-cream">
              <dt className="text-xs font-medium text-muted">{f.label}</dt>
              <dd className="mt-0.5 text-[15px] font-semibold text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/#quote" arrow icon={<MessageSquareText aria-hidden className="size-4" />}>
            Request a quote
          </Button>
          <Button href="/#consultation" variant="outline-dark" icon={<PhoneCall aria-hidden className="size-4" />}>
            Book a consultation
          </Button>
        </div>
      </Reveal>
    </div>
  );
}

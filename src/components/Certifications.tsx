import { certifications, education } from '@/data/site';
import { Reveal } from './ui/Reveal';
import { SectionHeader } from './ui/SectionHeader';

export function Certifications() {
  const Edu = education.icon;
  return (
    <section aria-labelledby="certs-heading" className="pb-24 lg:pb-32">
      <div className="container-page">
        <div className="border-t border-line pt-20 lg:pt-24">
          <SectionHeader id="certs-heading" eyebrow="Credentials" heading="Certified, and still learning." />

          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            <Reveal as="li" className="flex items-center gap-4 rounded-xl border border-ink/10 bg-navy p-5 text-white transition-[transform,box-shadow] duration-200 ease-out-soft hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-18px_rgba(7,27,82,0.6)]">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white/10 text-orange-light">
                <Edu aria-hidden strokeWidth={1.75} className="size-5" />
              </span>
              <span>
                <span className="block text-[15px] font-semibold">{education.degree}</span>
                <span className="block text-[13px] text-white/65">
                  {education.school} · {education.detail}
                </span>
              </span>
            </Reveal>
            {certifications.map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal
                  as="li"
                  key={c.name}
                  delay={((i + 1) % 3) * 0.05}
                  className="group flex items-center gap-4 rounded-xl border border-line/70 bg-white p-5 transition-[transform,border-color,box-shadow] duration-200 ease-out-soft hover:-translate-y-0.5 hover:border-orange/40 hover:shadow-[0_14px_30px_-22px_rgba(7,27,82,0.45)]"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-orange/10 text-orange transition-colors duration-200 group-hover:bg-orange group-hover:text-white">
                    <Icon aria-hidden strokeWidth={1.75} className="size-5" />
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold text-ink">{c.name}</span>
                    <span className="block text-[13px] text-muted">{c.issuer}</span>
                  </span>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

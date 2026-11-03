import { Check } from 'lucide-react';
import { experience } from '@/data/site';
import { Reveal } from './ui/Reveal';

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="py-24 lg:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">Experience</p>
            <h2 id="experience-heading" className="mt-3 text-3xl leading-[1.1] text-ink sm:text-[2.5rem]">
              Where I&apos;ve done the work.
            </h2>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted">
              Five-plus years across product teams, NGOs and institutions, measured by what changed after I got there.
            </p>
          </div>
        </Reveal>

        <ol className="relative lg:col-span-8">
          <span aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-line" />
          {experience.map((role, i) => (
            <Reveal as="li" key={role.title} delay={i * 0.05} className="group relative pb-10 pl-10 last:pb-0">
              <span
                aria-hidden
                className={`absolute top-1.5 left-0 size-[15px] rounded-full border-2 transition-[transform,border-color] duration-200 group-hover:scale-125 ${
                  role.current
                    ? 'border-orange bg-orange shadow-[0_0_0_4px_rgba(255,100,30,0.15)]'
                    : 'border-line bg-cream group-hover:border-orange'
                }`}
              />
              <div className="-mx-4 -my-3 rounded-xl px-4 py-3 transition-colors duration-200 group-hover:bg-white">
              <p className="text-xs font-semibold tracking-wide text-muted uppercase">
                {role.period}
                {role.current && <span className="ml-2 text-orange-ink normal-case">· Current</span>}
              </p>
              <h3 className="mt-2 text-xl leading-snug text-ink transition-colors duration-200 group-hover:text-orange-ink">{role.title}</h3>
              <p className="mt-0.5 text-[15px] font-medium text-ink/70">{role.company}</p>
              <ul className="mt-4 space-y-2">
                {role.outcomes.map((o) => (
                  <li key={o} className="flex gap-2.5 text-[15px] leading-relaxed text-muted">
                    <Check aria-hidden strokeWidth={2.25} className="mt-1 size-4 shrink-0 text-orange" />
                    {o}
                  </li>
                ))}
              </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

import { capabilities, expertise } from '@/data/site';
import { About } from './About';
import { Reveal } from './ui/Reveal';
import { SectionHeader } from './ui/SectionHeader';

export function Expertise() {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-24 lg:py-32">
      <div className="container-page">
        <About />

        <div id="skills" className="mt-24 scroll-mt-28 lg:mt-32">
          <SectionHeader eyebrow={expertise.eyebrow} heading={expertise.heading} aside={expertise.body} />

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {capabilities.map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal
                  as="li"
                  key={c.title}
                  delay={(i % 4) * 0.06}
                  className="group rounded-[14px] border border-line/70 bg-white p-5 transition-[transform,border-color,box-shadow] duration-200 ease-out-soft hover:-translate-y-1 hover:border-orange/40 hover:shadow-[0_18px_36px_-24px_rgba(7,27,82,0.45)] sm:p-6 lg:p-7"
                >
                  <span className="grid size-10 place-items-center rounded-lg bg-orange/10 text-orange transition-colors duration-200 group-hover:bg-orange group-hover:text-white">
                    <Icon aria-hidden strokeWidth={1.75} className="size-5" />
                  </span>
                  <h3 className="mt-4 text-[17px] text-ink sm:mt-6">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

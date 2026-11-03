import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

type SectionHeaderProps = {
  eyebrow: string;
  heading: string;
  aside?: ReactNode;
  id?: string;
};

export function SectionHeader({ eyebrow, heading, aside, id }: SectionHeaderProps) {
  return (
    <Reveal className="mb-10 grid gap-5 md:mb-12 lg:grid-cols-12 lg:items-end lg:gap-10">
      <div className="lg:col-span-7">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id} className="mt-3 text-3xl leading-[1.1] text-ink sm:text-[2.5rem]">
          {heading}
        </h2>
      </div>
      {aside && <p className="max-w-md text-[15px] leading-relaxed text-muted lg:col-span-5 lg:justify-self-end">{aside}</p>}
    </Reveal>
  );
}

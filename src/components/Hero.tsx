'use client';

import { m } from 'framer-motion';
import { CircleCheck, Download } from 'lucide-react';
import { hero, profile } from '@/data/site';
import { Button } from './ui/Button';
import { HeroIllustration } from './HeroIllustration';

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-navy-dark text-white"
    >
      {/* Navy base with a restrained blue-to-violet wash toward the top right */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_85%_0%,rgba(91,72,168,0.45),transparent_70%),radial-gradient(ellipse_60%_70%_at_10%_100%,rgba(30,64,160,0.35),transparent_70%),linear-gradient(180deg,#0b245c_0%,#081d4d_100%)]"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-white/10" />

      <div className="container-page relative grid items-center gap-12 pt-30 pb-20 sm:pt-34 lg:grid-cols-12 lg:gap-8 lg:pt-38 lg:pb-28">
        <div className="lg:col-span-6">
          <m.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center rounded-md border border-orange/60 px-2.5 py-1 text-xs font-semibold text-orange-light"
          >
            {hero.badge}
          </m.p>

          <m.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease }}
            className="mt-6 text-[2.5rem] leading-[1.05] font-extrabold tracking-[-0.035em] sm:text-[3.25rem] lg:text-[3.6rem]"
          >
            {hero.headline} <span className="text-orange">{hero.highlight}</span>
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease }}
            className="mt-6 max-w-[34rem] text-base leading-relaxed text-white/75 sm:text-[17px]"
          >
            {hero.body}
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Button href="#projects" arrow>
              View my work
            </Button>
            <Button
              href={profile.cv}
              variant="outline-light"
              target="_blank"
              rel="noopener"
              icon={<Download aria-hidden className="size-4" />}
            >
              Download CV
            </Button>
          </m.div>

          <m.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.36 }}
            className="mt-9 flex flex-wrap gap-x-6 gap-y-2"
          >
            {hero.checks.map((c) => (
              <li key={c} className="flex items-center gap-2 text-[13px] font-semibold text-white/85">
                <CircleCheck aria-hidden className="size-4 text-orange" />
                {c}
              </li>
            ))}
          </m.ul>
        </div>

        <m.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="mx-auto w-full max-w-[440px] opacity-90 md:max-w-[500px] lg:col-span-6 lg:max-w-none"
        >
          <HeroIllustration />
        </m.div>
      </div>
    </section>
  );
}

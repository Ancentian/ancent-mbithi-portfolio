'use client';

import Image from 'next/image';
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, LockKeyhole } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { liveSites } from '@/data/site';
import { Reveal } from './ui/Reveal';
import { TagList } from './ui/Tag';

const AUTOPLAY_MS = 5000;

// A one-row, scroll-snap carousel: native swipe on touch, arrows/dots and autoplay elsewhere.
export function LiveSites() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [pages, setPages] = useState(liveSites.length);
  const [paused, setPaused] = useState(false);

  const cards = () => Array.from(trackRef.current?.children ?? []) as HTMLElement[];

  // Recomputes how many start positions exist and which one is showing.
  const measure = useCallback(() => {
    const track = trackRef.current;
    const items = cards();
    if (!track || items.length === 0) return;
    const origin = items[0].offsetLeft;
    const step = items.length > 1 ? items[1].offsetLeft - origin : items[0].offsetWidth;
    const visible = Math.max(1, Math.round(track.clientWidth / step));
    const total = Math.max(1, items.length - visible + 1);
    setPages(total);
    setActive(Math.min(total - 1, Math.round(track.scrollLeft / step)));
  }, []);

  const goTo = useCallback(
    (i: number) => {
      const track = trackRef.current;
      const items = cards();
      if (!track || items.length === 0) return;
      const target = ((i % pages) + pages) % pages;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      track.scrollTo({ left: items[target].offsetLeft - items[0].offsetLeft, behavior: reduce ? 'auto' : 'smooth' });
    },
    [pages]
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    track.addEventListener('scroll', measure, { passive: true });
    return () => {
      ro.disconnect();
      track.removeEventListener('scroll', measure);
    };
  }, [measure]);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (paused || reduce || pages < 2) return;
    const id = window.setInterval(() => goTo(active + 1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, pages, active, goTo]);

  const arrow =
    'grid size-11 place-items-center rounded-full border border-line bg-white text-ink transition-colors hover:border-orange hover:bg-orange hover:text-white';

  return (
    <div id="websites" className="mt-16 scroll-mt-28 lg:mt-20">
      <Reveal className="mb-4 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Live websites &amp; systems</p>
          <h3 className="mt-2 text-2xl leading-tight text-ink sm:text-[1.75rem]">Running in production today.</h3>
        </div>
        {pages > 1 && (
          <div className="flex gap-2">
            <button type="button" onClick={() => goTo(active - 1)} aria-label="Previous project" className={arrow}>
              <ChevronLeft aria-hidden className="size-5" />
            </button>
            <button type="button" onClick={() => goTo(active + 1)} aria-label="Next project" className={arrow}>
              <ChevronRight aria-hidden className="size-5" />
            </button>
          </div>
        )}
      </Reveal>

      <Reveal>
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Live websites and systems"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          {/* Vertical padding leaves room for the hover lift and shadow inside the scroll area */}
          <ul
            ref={trackRef}
            className="-mx-3 flex snap-x snap-mandatory scroll-px-3 gap-5 overflow-x-auto scroll-smooth px-3 py-6 [scrollbar-width:none] motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
          >
            {liveSites.map((site) => (
              <li
                key={site.url}
                aria-roledescription="slide"
                className="group relative flex w-[85%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-line/70 bg-white shadow-[0_1px_2px_rgba(7,27,82,0.04)] transition-[transform,border-color,box-shadow] duration-300 ease-out-soft hover:-translate-y-1.5 hover:border-orange/40 hover:shadow-[0_28px_50px_-24px_rgba(7,27,82,0.45),0_10px_20px_-12px_rgba(255,100,30,0.25)] sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
              >
                <div className="border-b border-line/70 bg-cream px-4 pt-3">
                  <div className="flex items-center gap-1.5 pb-2.5" aria-hidden>
                    <span className="size-2 rounded-full bg-ink/15" />
                    <span className="size-2 rounded-full bg-ink/15" />
                    <span className="size-2 rounded-full bg-ink/15" />
                    <span className="ml-2 truncate rounded bg-white px-2 py-0.5 font-mono text-[10px] text-muted">
                      {site.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    </span>
                  </div>
                  <div className="relative aspect-16/10 overflow-hidden rounded-t-lg">
                    <Image
                      src={site.image}
                      alt={site.portal ? `Sign-in screen of ${site.title}` : `Home page of the ${site.title} website`}
                      fill
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 85vw"
                      className="object-cover object-top transition-transform duration-700 ease-out-soft group-hover:scale-[1.05]"
                    />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="flex flex-wrap items-center gap-2 text-xs font-semibold text-muted">
                    {site.client}
                    {site.portal && (
                      <span className="inline-flex items-center gap-1 rounded border border-line px-1.5 py-0.5 text-[10px] text-ink/70">
                        <LockKeyhole aria-hidden className="size-3" />
                        Login portal
                      </span>
                    )}
                  </p>
                  <h4 className="mt-1 flex items-start justify-between gap-3 text-lg font-bold tracking-tight text-ink">
                    <a href={site.url} target="_blank" rel="noopener" className="after:absolute after:inset-0">
                      {site.title}
                    </a>
                    <ArrowUpRight
                      aria-hidden
                      className="mt-1 size-4 shrink-0 text-muted transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-orange"
                    />
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{site.summary}</p>
                  <ul className="mt-4 flex-1 space-y-1.5">
                    {site.highlights.map((h) => (
                      <li key={h} className="flex gap-2 text-sm text-ink/80">
                        <Check aria-hidden strokeWidth={2.25} className="mt-0.5 size-4 shrink-0 text-orange" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <TagList items={site.tags} />
                    <span className="shrink-0 text-sm font-semibold text-orange-ink">
                      {site.portal ? 'Open portal' : 'Visit site'}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {pages > 1 && (
        <div className="mt-2 flex justify-center gap-2">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show project ${i + 1}`}
              aria-current={i === active}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? 'w-7 bg-orange' : 'w-2 bg-ink/15 hover:bg-ink/30'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

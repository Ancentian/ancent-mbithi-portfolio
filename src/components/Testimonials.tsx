'use client';

import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { testimonials } from '@/data/site';
import { Reveal } from './ui/Reveal';

// Drafts are visible while developing so the slider can be previewed, never in production.
const items = testimonials.filter((t) => !t.draft || process.env.NODE_ENV !== 'production');

const AUTOPLAY_MS = 6000;

function usePerView() {
  const [perView, setPerView] = useState(1);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setPerView(mq.matches ? 2 : 1);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return perView;
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function Testimonials() {
  const perView = usePerView();
  const pages = Math.max(1, items.length - perView + 1);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  // Clamp on read: switching from 1 to 2 cards per view can leave `index` past the last page.
  const current = Math.min(index, pages - 1);
  const go = useCallback((next: number) => setIndex(((next % pages) + pages) % pages), [pages]);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (paused || reduce || pages < 2) return;
    const id = window.setInterval(() => setIndex((i) => (Math.min(i, pages - 1) + 1) % pages), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, pages]);

  if (items.length === 0) return null;

  return (
    <section aria-labelledby="testimonials-heading" className="border-t border-line-soft bg-white py-24 lg:py-28">
      <div className="container-page">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Testimonials</p>
            <h2 id="testimonials-heading" className="mt-3 text-3xl leading-[1.1] text-ink sm:text-[2.5rem]">
              What people say about working with me.
            </h2>
          </div>
          {pages > 1 && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(current - 1)}
                aria-label="Previous testimonial"
                className="grid size-11 place-items-center rounded-full border border-line text-ink transition-colors hover:border-orange hover:bg-orange hover:text-white"
              >
                <ChevronLeft aria-hidden className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => go(current + 1)}
                aria-label="Next testimonial"
                className="grid size-11 place-items-center rounded-full border border-line text-ink transition-colors hover:border-orange hover:bg-orange hover:text-white"
              >
                <ChevronRight aria-hidden className="size-5" />
              </button>
            </div>
          )}
        </Reveal>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Testimonials"
          className="overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
            setPaused(true);
          }}
          onTouchEnd={(e) => {
            const start = touchX.current;
            touchX.current = null;
            setPaused(false);
            if (start === null) return;
            const dx = e.changedTouches[0].clientX - start;
            if (Math.abs(dx) > 40) go(current + (dx < 0 ? 1 : -1));
          }}
        >
          <ul
            className="-mx-2.5 flex transition-transform duration-700 ease-out-soft motion-reduce:transition-none"
            style={{ transform: `translateX(-${(current * 100) / perView}%)` }}
          >
            {items.map((t, i) => {
              const visible = i >= current && i < current + perView;
              return (
                <li
                  key={`${t.name}-${i}`}
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${items.length}`}
                  aria-hidden={!visible}
                  className="shrink-0 px-2.5"
                  style={{ width: `${100 / perView}%` }}
                >
                  <figure
                    className={`group flex h-full flex-col rounded-2xl border bg-cream p-7 transition-[border-color,box-shadow] duration-300 hover:border-orange/40 hover:shadow-[0_20px_40px_-30px_rgba(7,27,82,0.5)] sm:p-9 ${
                      t.draft ? 'border-dashed border-orange/50' : 'border-line/70'
                    }`}
                  >
                    <Quote aria-hidden className="size-8 text-orange transition-transform duration-300 group-hover:-rotate-6" />
                    <blockquote className="mt-5 flex-1 text-lg leading-relaxed font-medium text-ink sm:text-xl">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-8 flex items-center gap-3.5">
                      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-navy text-sm font-bold text-white">
                        {initials(t.name)}
                      </span>
                      <span>
                        <span className="block text-[15px] font-bold text-ink">{t.name}</span>
                        <span className="block text-[13px] text-muted">
                          {t.role}, {t.company}
                        </span>
                      </span>
                      {t.draft && (
                        <span className="ml-auto rounded bg-orange/10 px-2 py-0.5 text-[10px] font-bold tracking-wide text-orange-ink uppercase">
                          Draft · dev only
                        </span>
                      )}
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>
        </div>

        {pages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === current}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'w-7 bg-orange' : 'w-2 bg-ink/15 hover:bg-ink/30'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

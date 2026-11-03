import Image from 'next/image';
import { ArrowUpRight, Check } from 'lucide-react';
import { liveSites } from '@/data/site';
import { Reveal } from './ui/Reveal';
import { TagList } from './ui/Tag';

export function LiveSites() {
  return (
    <div id="websites" className="mt-16 scroll-mt-28 lg:mt-20">
      <Reveal className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Live websites</p>
          <h3 className="mt-2 text-2xl leading-tight text-ink sm:text-[1.75rem]">Sites running in production today.</h3>
        </div>
      </Reveal>

      <ul className="grid gap-5 md:grid-cols-2">
        {liveSites.map((site, i) => (
          <Reveal
            as="li"
            key={site.url}
            delay={i * 0.08}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-line/70 bg-white transition-[transform,border-color,box-shadow] duration-300 ease-out-soft hover:-translate-y-1 hover:border-orange/40 hover:shadow-[0_24px_48px_-30px_rgba(7,27,82,0.5)]"
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
                  alt={`Home page of the ${site.title} website`}
                  fill
                  sizes="(min-width: 768px) 560px, 92vw"
                  className="object-cover object-top transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
                />
              </div>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <p className="text-xs font-semibold text-muted">{site.client}</p>
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
                <span className="shrink-0 text-sm font-semibold text-orange-ink">Visit site</span>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

import { stats } from '@/data/site';

export function StatsStrip() {
  return (
    <section aria-label="Key results" className="border-b border-line-soft bg-white">
      <dl className="container-page grid grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className={`group flex items-start justify-between gap-4 py-6 sm:py-7 ${
                i % 2 === 1 ? 'pl-5 sm:pl-8' : 'pr-5 sm:pr-8'
              } ${i < 2 ? 'border-b border-line-soft lg:border-b-0' : ''} ${
                i % 2 === 0 ? 'border-r border-line-soft' : ''
              } lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0`}
            >
              <div className="flex flex-col">
                <dt className="order-2 mt-1 text-[13px] leading-snug font-medium text-ink/80">{s.label}</dt>
                <dd className="order-1 text-2xl font-extrabold tracking-[-0.03em] text-ink transition-colors duration-200 group-hover:text-orange-ink sm:text-[1.7rem]">
                  {s.value}
                </dd>
                <dd className="order-3 mt-0.5 text-xs text-muted">{s.note}</dd>
              </div>
              <Icon aria-hidden strokeWidth={1.75} className="mt-1 hidden size-5 shrink-0 text-orange transition-transform duration-300 ease-out-soft group-hover:-translate-y-0.5 group-hover:scale-110 sm:block" />
            </div>
          );
        })}
      </dl>
    </section>
  );
}

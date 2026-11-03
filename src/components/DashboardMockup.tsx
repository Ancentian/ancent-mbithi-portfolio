import { Bell, LayoutDashboard, Milk, Settings, Users, Wallet } from 'lucide-react';

// Illustrative, static preview of the cooperative dashboard. Figures are sample data.
const kpis = [
  { label: 'Litres today', value: '4,820', delta: '+6.2%' },
  { label: 'Farmers paid', value: '312', delta: 'this cycle' },
  { label: 'M-Pesa payouts', value: 'KES 1.24M', delta: 'reconciled' },
];

const week = [62, 70, 58, 76, 81, 73, 88];
const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const txns = [
  { name: 'Farmer #0418', phone: '2547•••412', amount: 'KES 8,450', status: 'Paid' },
  { name: 'Farmer #0233', phone: '2547•••907', amount: 'KES 5,120', status: 'Paid' },
  { name: 'Farmer #0591', phone: '2541•••036', amount: 'KES 3,980', status: 'Queued' },
];

export function DashboardMockup() {
  return (
    <figure className="relative">
      <div
        role="img"
        aria-label="Illustrative mockup of the cooperative dashboard showing daily litres, farmer payouts and recent M-Pesa transactions"
        className="overflow-hidden rounded-xl border border-white/10 bg-[#0d1b3f] shadow-[0_30px_60px_-30px_rgba(8,29,77,0.8)]"
      >
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5" aria-hidden>
          <span className="size-2 rounded-full bg-white/20" />
          <span className="size-2 rounded-full bg-white/20" />
          <span className="size-2 rounded-full bg-white/20" />
          <span className="ml-3 rounded bg-white/6 px-2 py-0.5 font-mono text-[10px] text-white/45">
            society-a / dashboard
          </span>
        </div>

        <div className="flex" aria-hidden>
          <div className="hidden flex-col items-center gap-4 border-r border-white/10 px-3 py-4 text-white/35 sm:flex">
            <span className="grid size-7 place-items-center rounded-md bg-orange text-white">
              <LayoutDashboard className="size-3.5" />
            </span>
            <Milk className="size-4" />
            <Users className="size-4" />
            <Wallet className="size-4" />
            <Settings className="size-4" />
          </div>

          <div className="min-w-0 flex-1 p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] font-semibold text-white">Collections overview</p>
                <p className="text-[10px] text-white/40">Tenant: Society A · Morning shift</p>
              </div>
              <Bell className="size-4 text-white/40" />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {kpis.map((k) => (
                <div key={k.label} className="rounded-lg border border-white/10 bg-white/3 p-2.5">
                  <p className="text-[9.5px] text-white/45">{k.label}</p>
                  <p className="mt-1 text-[13px] font-bold tracking-tight text-white sm:text-sm">{k.value}</p>
                  <p className="text-[9.5px] text-orange-light">{k.delta}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-lg border border-white/10 bg-white/3 p-3">
              <p className="text-[10px] text-white/45">Weekly collection (litres, thousands)</p>
              <div className="mt-3 flex h-20 items-end gap-2">
                {week.map((h, i) => (
                  <div key={i} className="flex h-full flex-1 flex-col items-center gap-1">
                    <div className="flex w-full flex-1 items-end">
                      <div
                        className={`w-full rounded-sm ${i === week.length - 1 ? 'bg-orange' : 'bg-white/15'}`}
                        style={{ height: `${h}%` }}
                      />
                    </div>
                    <span className="text-[9px] text-white/35">{days[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 rounded-lg border border-white/10 bg-white/3">
              <p className="px-3 pt-2.5 text-[10px] text-white/45">Recent M-Pesa payouts</p>
              <ul className="mt-1">
                {txns.map((t) => (
                  <li
                    key={t.name}
                    className="flex items-center justify-between border-t border-white/6 px-3 py-2 first:border-t-0"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-[11px] font-medium text-white/85">{t.name}</span>
                      <span className="block font-mono text-[9.5px] text-white/35">{t.phone}</span>
                    </span>
                    <span className="flex items-center gap-2.5">
                      <span className="text-[11px] font-semibold text-white/85">{t.amount}</span>
                      <span
                        className={`rounded px-1.5 py-0.5 text-[9px] font-semibold ${
                          t.status === 'Paid' ? 'bg-emerald-400/15 text-emerald-300' : 'bg-amber-300/15 text-amber-200'
                        }`}
                      >
                        {t.status}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-[11px] text-white/45">Illustrative preview · sample data</figcaption>
    </figure>
  );
}

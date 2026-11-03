import type { LucideIcon } from 'lucide-react';
import {
  Atom,
  Box,
  Braces,
  Cloud,
  Database,
  Hexagon,
  ReceiptText,
  Smartphone,
  TabletSmartphone,
  Triangle,
  Waypoints,
} from 'lucide-react';

// Coordinates are in a 600 x 500 space. Nodes are placed by hand in mirrored pairs
// so that no two labels collide at the top and bottom of the ring.
type Tech = { label: string; detail: string; icon: LucideIcon; x: number; y: number };

const W = 600;
const H = 500;
const hub = { x: 300, y: 250 };
const rx = 225;
const ry = 190;

const stack: Tech[] = [
  { label: 'AWS', detail: 'ec2 · rds', icon: Cloud, x: 190, y: 62 },
  { label: 'Next.js', detail: 'app router · ssr', icon: Triangle, x: 410, y: 62 },
  { label: 'Flutter', detail: 'mobile', icon: TabletSmartphone, x: 92, y: 152 },
  { label: 'React', detail: 'web client', icon: Atom, x: 508, y: 152 },
  { label: '.NET Core', detail: 'c# · grpc', icon: Braces, x: 75, y: 250 },
  { label: 'Laravel', detail: 'php api', icon: Box, x: 525, y: 250 },
  { label: 'KRA eTIMS', detail: 'oscu · vscu', icon: ReceiptText, x: 92, y: 348 },
  { label: 'Node.js', detail: 'services', icon: Hexagon, x: 508, y: 348 },
  { label: 'M-Pesa', detail: 'daraja', icon: Smartphone, x: 190, y: 438 },
  { label: 'PostgreSQL', detail: 'mysql · pg', icon: Database, x: 410, y: 438 },
];

const nodes = stack.map((t, i) => ({ ...t, delay: (i * 0.7) % 4 }));

function curve(bx: number, by: number) {
  const mx = (hub.x + bx) / 2;
  return `M${hub.x},${hub.y} C${mx},${hub.y} ${mx},${by} ${bx},${by}`;
}

export function HeroIllustration() {
  return (
    <div
      role="img"
      aria-label={`Diagram of a distributed system: a central REST API connected to ${stack.map((t) => t.label).join(', ')}`}
      className="relative mx-auto aspect-6/5 w-full max-w-[600px] select-none"
    >
      <div className="absolute inset-[22%] rounded-full bg-orange/15 blur-3xl" aria-hidden />
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" aria-hidden>
        <defs>
          <pattern id="iso" width="40" height="23" patternUnits="userSpaceOnUse">
            <path d="M0 11.5 L20 0 L40 11.5 L20 23 Z" fill="none" stroke="white" strokeOpacity="0.045" />
          </pattern>
          <radialGradient id="fade" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="fade-mask">
            <rect width={W} height={H} fill="url(#fade)" />
          </mask>
        </defs>
        <rect width={W} height={H} fill="url(#iso)" mask="url(#fade-mask)" />

        <ellipse cx={hub.x} cy={hub.y} rx={rx} ry={ry} fill="none" stroke="white" strokeOpacity="0.07" strokeDasharray="2 6" />
        <ellipse cx={hub.x} cy={hub.y} rx={rx * 0.55} ry={ry * 0.55} fill="none" stroke="white" strokeOpacity="0.05" />

        {nodes.map((n, i) => {
          const d = curve(n.x, n.y);
          return (
            <g key={n.label}>
              <path d={d} fill="none" stroke="white" strokeOpacity="0.07" strokeWidth="1.25" />
              <path
                d={d}
                fill="none"
                stroke="#ff7a45"
                strokeOpacity="0.5"
                strokeWidth="1.25"
                strokeLinecap="round"
                className="flow-line"
                style={{ animationDelay: `${i * -0.37}s` }}
              />
            </g>
          );
        })}
      </svg>

      <div
        className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${(hub.x / W) * 100}%`, top: `${(hub.y / H) * 100}%` }}
      >
        <div className="rounded-2xl border border-white/15 bg-navy-dark/85 p-1.5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] transition-colors duration-300 hover:border-orange/50">
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/4 px-3 py-2.5 sm:px-4 sm:py-3">
            <span className="grid size-8 place-items-center rounded-lg bg-orange text-white sm:size-9">
              <Waypoints className="size-4 sm:size-4.5" />
            </span>
            <span className="leading-tight whitespace-nowrap">
              <span className="block text-sm font-bold text-white">REST API</span>
              <span className="hidden font-mono text-[10px] text-white/45 sm:block">auth · queues · webhooks</span>
            </span>
          </div>
        </div>
      </div>

      {nodes.map((n) => {
        const Icon = n.icon;
        return (
          <div
            key={n.label}
            className="absolute -translate-x-1/2 -translate-y-1/2 hover:z-20"
            style={{ left: `${(n.x / W) * 100}%`, top: `${(n.y / H) * 100}%` }}
          >
            <div className="node-float" style={{ animationDelay: `${n.delay}s` }}>
              <div className="group flex items-center gap-1.5 rounded-xl border border-white/10 bg-navy-dark/85 py-1.5 pr-2.5 pl-1.5 transition-[border-color,background-color,transform] duration-200 hover:scale-105 hover:border-orange/60 hover:bg-navy sm:gap-2 sm:pr-3">
                <span className="grid size-6 place-items-center rounded-md bg-white/6 text-orange-light transition-colors duration-200 group-hover:bg-orange group-hover:text-white sm:size-7">
                  <Icon className="size-3 sm:size-3.5" />
                </span>
                <span className="leading-tight whitespace-nowrap">
                  <span className="block text-[11px] font-semibold text-white/85 sm:text-xs">{n.label}</span>
                  <span className="hidden font-mono text-[9.5px] text-white/40 md:block">{n.detail}</span>
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

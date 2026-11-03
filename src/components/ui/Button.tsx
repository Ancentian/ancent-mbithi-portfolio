import { ArrowRight } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'primary' | 'outline-light' | 'outline-dark';

const variants: Record<Variant, string> = {
  primary: 'bg-orange text-white hover:bg-orange-light',
  'outline-light': 'border border-white/30 text-white hover:border-white/60 hover:bg-white/5',
  'outline-dark': 'border border-line bg-white text-ink hover:border-ink/30',
};

type ButtonProps = ComponentProps<'a'> & {
  variant?: Variant;
  icon?: ReactNode;
  arrow?: boolean;
};

// Anchor styled as a button; the optional arrow nudges right on hover.
export function Button({ variant = 'primary', icon, arrow = false, className = '', children, ...rest }: ButtonProps) {
  return (
    <a
      className={`group inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition-colors duration-200 ${variants[variant]} ${className}`}
      {...rest}
    >
      {icon}
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-200 ease-out-soft group-hover:translate-x-1"
        />
      )}
    </a>
  );
}

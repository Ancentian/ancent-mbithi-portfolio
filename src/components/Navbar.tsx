'use client';

import { ChevronDown, Menu, MessageSquareText, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { nav, type NavItem } from '@/data/site';

const sectionIds = nav.flatMap((n) => (n.section ? [n.section] : []));

// Tracks which home-page section is in view; empty string means the top of the page.
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState('');
  useEffect(() => {
    if (!enabled) return;
    const onScroll = () => {
      const probe = window.innerHeight * 0.35;
      let current = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= probe) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [enabled]);
  return active;
}

function Logo() {
  return (
    <Link href="/" aria-label="Ancent Mbithi, home" className="flex flex-col items-start leading-none">
      <span className="text-[21px] font-extrabold tracking-[0.06em] sm:text-[23px]">
        <span className="text-ink">ANCENT</span> <span className="text-orange">MBITHI</span>
      </span>
      <span className="mt-1 flex w-full items-center gap-1.5 text-[7.5px] font-semibold tracking-[0.42em] text-ink/70 uppercase">
        <span aria-hidden className="h-px flex-1 bg-ink/40" />
        Full Stack Developer
        <span aria-hidden className="h-px flex-1 bg-ink/40" />
      </span>
    </Link>
  );
}

const linkBase =
  'relative inline-flex h-full items-center gap-1 px-1 text-[15px] font-semibold transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:origin-center after:transition-transform after:duration-200';

function DesktopItem({ item, isActive }: { item: NavItem; isActive: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', close);
    };
  }, [open]);

  const state = isActive
    ? 'text-orange-ink after:scale-x-100 after:bg-orange'
    : 'text-ink/75 hover:text-ink after:scale-x-0 after:bg-ink hover:after:scale-x-100';

  if (!item.children) {
    return (
      <li className="h-full px-3">
        <Link href={item.href} aria-current={isActive ? 'true' : undefined} className={`${linkBase} ${state}`}>
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li ref={ref} className="relative h-full px-3" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={`${linkBase} ${state}`}
      >
        {item.label}
        <ChevronDown aria-hidden className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 pt-2">
          <ul className="w-64 rounded-xl border border-line/80 bg-white p-1.5 shadow-[0_18px_40px_-18px_rgba(7,27,82,0.35)]">
            <li>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-semibold text-ink hover:bg-cream"
              >
                Selected work
              </Link>
            </li>
            {item.children.map((c) => (
              <li key={c.label}>
                {c.external ? (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener"
                    className="block rounded-lg px-3 py-2 text-sm text-muted hover:bg-cream hover:text-ink"
                  >
                    {c.label}
                  </a>
                ) : (
                  <Link
                    href={c.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-muted hover:bg-cream hover:text-ink"
                  >
                    {c.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === '/';
  const section = useActiveSection(onHome);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (item: NavItem) => {
    if (!onHome) return item.section === 'projects' && pathname.startsWith('/work');
    return item.section ? item.section === section : section === '';
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-t-4 border-navy-dark bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_8px_24px_-16px_rgba(7,27,82,0.35)]' : ''
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-5 sm:px-8">
        <Logo />

        <ul className="hidden h-full items-stretch lg:flex">
          {nav.map((item) => (
            <DesktopItem key={item.label} item={item} isActive={isActive(item)} />
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/#quote"
            className="hidden h-10 items-center gap-2 rounded-lg border border-line bg-white px-4 text-[15px] font-semibold text-ink shadow-[0_1px_2px_rgba(7,27,82,0.06)] transition-colors hover:border-ink/30 sm:inline-flex"
          >
            <MessageSquareText aria-hidden className="size-4 text-ink/60" />
            Get a Quote
          </Link>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-lg text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="max-h-[calc(100vh-76px)] overflow-y-auto border-t border-line/70 bg-white lg:hidden">
          <ul className="container-page flex flex-col py-2">
            {nav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block border-l-2 py-3 pl-3 text-[15px] font-semibold ${
                    isActive(item) ? 'border-orange text-orange-ink' : 'border-transparent text-ink/80'
                  }`}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="mb-2 ml-3 border-l border-line/70">
                    {item.children.map((c) =>
                      c.external ? (
                        <li key={c.label}>
                          <a href={c.href} target="_blank" rel="noopener" className="block py-2 pl-4 text-sm text-muted">
                            {c.label}
                          </a>
                        </li>
                      ) : (
                        <li key={c.label}>
                          <Link href={c.href} onClick={() => setOpen(false)} className="block py-2 pl-4 text-sm text-muted">
                            {c.label}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                )}
              </li>
            ))}
            <li className="pt-2 pb-2">
              <Link
                href="/#quote"
                onClick={() => setOpen(false)}
                className="flex h-11 items-center justify-center gap-2 rounded-lg bg-orange text-sm font-semibold text-white"
              >
                <MessageSquareText aria-hidden className="size-4" />
                Get a Quote
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

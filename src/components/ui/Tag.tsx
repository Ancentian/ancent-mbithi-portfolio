export function TagList({ items, tone = 'light' }: { items: string[]; tone?: 'light' | 'dark' }) {
  const style =
    tone === 'dark'
      ? 'border-white/15 text-white/75 hover:border-white/35 hover:text-white'
      : 'border-line bg-cream text-ink/80 hover:border-orange/40 hover:text-ink';
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
      {items.map((item) => (
        <li key={item} className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors duration-150 ${style}`}>
          {item}
        </li>
      ))}
    </ul>
  );
}

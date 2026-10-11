/** Slow, infinite text band. Duplicated content makes the loop seamless; paused for reduced motion via global CSS. */
export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-10 whitespace-nowrap font-serif text-[clamp(1.6rem,1.2rem+2vw,3rem)] italic">
          {t}
          <span aria-hidden className="h-2 w-2 rotate-45 bg-current opacity-60" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className={className}>
      <div className="flex w-max animate-[dl-marquee_38s_linear_infinite] hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

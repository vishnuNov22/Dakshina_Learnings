import Image from "next/image";
import clsx from "clsx";

export function Logo({ className, size = 44, withWordmark = true }: { className?: string; size?: number; withWordmark?: boolean }) {
  return (
    <span className={clsx("flex items-center gap-3", className)}>
      <span
        className="relative shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-white/20"
        style={{ width: size, height: size }}
      >
        <Image src="/images/logo-256.png" alt="" width={size * 2} height={size * 2} className="h-full w-full object-contain" priority />
      </span>
      {withWordmark ? (
        <span className="flex min-w-0 flex-col leading-none">
          <span className="font-serif text-[1.35rem] tracking-tight">Dakshina</span>
          <span className="eyebrow mt-1 text-[0.58rem] text-gold">Learnings · Civil Services</span>
        </span>
      ) : null}
    </span>
  );
}

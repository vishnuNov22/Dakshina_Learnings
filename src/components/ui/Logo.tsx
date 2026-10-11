import Image from "next/image";
import clsx from "clsx";

export function Logo({ className, size = 44, withWordmark = true, tone = "dark" }: { className?: string; size?: number; withWordmark?: boolean; tone?: "dark" | "light" }) {
  return (
    <span className={clsx("flex items-center gap-3", className)}>
      <span className="relative shrink-0 overflow-hidden rounded-full bg-white shadow-[0_4px_14px_-6px_rgba(90,34,150,0.5)] ring-1 ring-line" style={{ width: size, height: size }}>
        <Image src="/images/logo-256.png" alt="" width={size * 2} height={size * 2} className="h-full w-full object-contain" priority />
      </span>
      {withWordmark ? (
        <span className="flex min-w-0 flex-col leading-none">
          <span className={clsx("font-sans text-[1.15rem] font-bold tracking-[0.08em]", tone === "dark" ? "text-brand-deep" : "text-white")}>DAKSHINA</span>
          <span className={clsx("mt-1 text-[0.58rem] font-semibold tracking-[0.32em]", tone === "dark" ? "text-ink-soft" : "text-white/75")}>LEARNINGS</span>
        </span>
      ) : null}
    </span>
  );
}

import Link from "next/link";
import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";

type Variant = "gold" | "ghost" | "ink" | "line";

const base =
  "tap group relative inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-[0.95rem] font-semibold tracking-[0.01em] transition-[background-color,color,box-shadow,transform] duration-300 ease-[var(--ease-cinema)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  gold: "bg-gold text-navy hover:bg-gold-soft shadow-[0_10px_30px_-12px_rgba(183,154,98,0.65)]",
  ghost: "text-ivory ring-1 ring-ivory/30 hover:ring-ivory/70 hover:bg-ivory/5 backdrop-blur-sm",
  ink: "bg-navy text-ivory hover:bg-blue",
  line: "text-ink ring-1 ring-ink/25 hover:ring-ink/60 hover:bg-ink/[0.04]",
};

export function buttonClass(variant: Variant = "gold", className?: string) {
  return clsx(base, variants[variant], className);
}

type LinkButtonProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  className?: string;
  icon?: ReactNode;
  external?: boolean;
};

export function LinkButton({ variant = "gold", className, icon, children, external, ...rest }: LinkButtonProps) {
  const extra = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Link className={buttonClass(variant, className)} {...extra} {...rest}>
      <span>{children}</span>
      {icon ? <span className="transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span> : null}
    </Link>
  );
}

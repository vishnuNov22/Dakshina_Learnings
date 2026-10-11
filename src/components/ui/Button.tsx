import Link from "next/link";
import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";

type Variant = "brand" | "white" | "outline" | "outline-light";

const base =
  "tap group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 py-4 text-[0.95rem] font-semibold tracking-[0.01em] transition-[background-color,color,box-shadow,transform] duration-500 ease-[var(--ease-cinema)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  brand: "bg-brand text-white shadow-[0_14px_34px_-14px_rgba(108,54,174,0.75)] hover:bg-brand-deep hover:shadow-[0_18px_40px_-14px_rgba(90,34,150,0.85)]",
  white: "bg-white text-brand-deep shadow-[0_14px_34px_-16px_rgba(29,11,54,0.6)] hover:bg-lilac",
  outline: "text-brand-deep ring-1 ring-brand/30 hover:ring-brand hover:bg-mist",
  "outline-light": "text-white ring-1 ring-white/40 hover:ring-white hover:bg-white/10 backdrop-blur-sm",
};

export function buttonClass(variant: Variant = "brand", className?: string) {
  return clsx(base, variants[variant], className);
}

type LinkButtonProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  className?: string;
  icon?: ReactNode;
  external?: boolean;
};

export function LinkButton({ variant = "brand", className, icon, children, external, ...rest }: LinkButtonProps) {
  const extra = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Link className={buttonClass(variant, className)} {...extra} {...rest}>
      <span>{children}</span>
      {icon ? <span className="transition-transform duration-500 group-hover:translate-x-1">{icon}</span> : null}
    </Link>
  );
}

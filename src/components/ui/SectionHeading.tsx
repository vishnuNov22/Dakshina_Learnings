import clsx from "clsx";
import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  tone = "dark",
  as: Tag = "h2",
  className,
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2" | "h3";
  className?: string;
  id?: string;
}) {
  return (
    <div className={clsx("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className={clsx("eyebrow mb-5 flex items-center gap-3", align === "center" && "justify-center", tone === "dark" ? "text-gold" : "text-red")}>
          <span aria-hidden className="h-px w-8 bg-current opacity-60" />
          {eyebrow}
        </p>
      ) : null}
      <Tag id={id} className="text-step-4">
        {title}
      </Tag>
      {lede ? (
        <p className={clsx("mt-6 text-step-1", tone === "dark" ? "text-ivory/70" : "text-ink/70")}>{lede}</p>
      ) : null}
    </div>
  );
}

import clsx from "clsx";
import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  tone = "light",
  as: Tag = "h2",
  className,
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2" | "h3";
  className?: string;
  id?: string;
}) {
  return (
    <div className={clsx("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className={clsx("eyebrow mb-6 flex items-center gap-3", align === "center" && "justify-center", tone === "light" ? "text-brand" : "text-white/80")}>
          <span aria-hidden className="h-px w-10 bg-current" />
          {eyebrow}
        </p>
      ) : null}
      <Tag id={id} className={clsx("text-step-4", tone === "light" ? "text-ink" : "text-white")}>
        {title}
      </Tag>
      {lede ? <p className={clsx("mt-7 text-step-1", tone === "light" ? "text-ink-soft" : "text-white/75")}>{lede}</p> : null}
    </div>
  );
}

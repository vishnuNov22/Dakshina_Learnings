"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Menu, X, Phone, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { primaryNav } from "@/lib/site";
import { buttonClass } from "@/components/ui/Button";

export function SiteHeader({ phoneHref, phoneLabel }: { phoneHref: string | null; phoneLabel: string | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 400 && y > lastY.current + 4);
      if (y < lastY.current - 4) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const first = menuRef.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && menuRef.current) {
        const els = Array.from(menuRef.current.querySelectorAll<HTMLElement>("a,button"));
        const firstEl = els[0];
        const lastEl = els[els.length - 1];
        if (!firstEl || !lastEl) return;
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-navy">
        Skip to content
      </a>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow] duration-500 ease-[var(--ease-cinema)]",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
          scrolled || open || pathname.startsWith("/current-affairs") ? "bg-navy/85 shadow-[0_1px_0_rgba(245,240,230,0.08)] backdrop-blur-xl" : "bg-transparent",
        )}
      >
        <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-4">
          <Link href="/" aria-label="Dakshina Learnings — home" className="min-w-0 rounded-full">
            <Logo size={40} />
          </Link>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={clsx(
                        "relative rounded-full px-3.5 py-2 text-[0.9rem] transition-colors",
                        active ? "text-gold" : "text-ivory/75 hover:text-ivory",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {phoneHref ? (
              <a href={phoneHref} className="tap hidden items-center gap-2 rounded-full px-3 py-2 text-sm text-ivory/80 hover:text-ivory lg:inline-flex">
                <Phone size={15} aria-hidden /> {phoneLabel}
              </a>
            ) : null}
            <Link href="/admissions" className={buttonClass("gold", "hidden !px-5 !py-2.5 text-sm sm:inline-flex")}>
              Enquire <ArrowUpRight size={16} aria-hidden />
            </Link>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="tap grid h-11 w-11 place-items-center rounded-full ring-1 ring-ivory/25 xl:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
        className="fixed inset-0 z-40 overflow-y-auto bg-navy pt-[var(--header-h)] xl:hidden"
      >
        <nav aria-label="Mobile" className="container-x flex min-h-full flex-col pb-10 pt-6">
          <ul className="flex flex-col">
            {[{ label: "Home", href: "/" }, ...primaryNav, { label: "Faculty", href: "/faculty" }, { label: "Resources", href: "/resources" }, { label: "Contact", href: "/contact" }].map(
              (item, i) => (
                <li key={item.href} className="border-b border-ivory/10">
                  <Link
                    href={item.href}
                    className="flex items-baseline justify-between gap-4 py-4 font-serif text-[clamp(1.6rem,7vw,2.4rem)] leading-tight"
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    {item.label}
                    <span className="font-mono text-xs text-gold/80">{String(i + 1).padStart(2, "0")}</span>
                  </Link>
                </li>
              ),
            )}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/admissions" className={buttonClass("gold", "w-full sm:w-auto")}>
              Begin your enquiry
            </Link>
            {phoneHref ? (
              <a href={phoneHref} className={buttonClass("ghost", "w-full sm:w-auto")}>
                <Phone size={16} aria-hidden /> Call the academy
              </a>
            ) : null}
          </div>
        </nav>
      </div>
    </>
  );
}

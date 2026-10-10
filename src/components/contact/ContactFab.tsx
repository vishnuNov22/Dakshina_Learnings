"use client";
import type React from "react";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Instagram, MessageCircle, Phone, X } from "lucide-react";
import { programmes } from "@/data/programmes";
import { DEFAULT_WA_MESSAGE, instagram, programmeMessage, telLink, whatsappLink } from "@/lib/contact";

const WaIcon = ({ size = 26 }: { size?: number }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden fill="currentColor">
    <path d="M16.02 3C8.84 3 3 8.83 3 16c0 2.3.6 4.53 1.75 6.5L3 29l6.68-1.74A12.95 12.95 0 0 0 16.02 29C23.2 29 29 23.17 29 16S23.2 3 16.02 3Zm0 23.8c-2 0-3.95-.54-5.66-1.55l-.4-.24-3.97 1.03 1.06-3.86-.26-.4A10.76 10.76 0 0 1 5.2 16c0-5.96 4.86-10.8 10.82-10.8 5.96 0 10.8 4.84 10.8 10.8 0 5.96-4.84 10.8-10.8 10.8Zm5.93-8.09c-.33-.16-1.93-.95-2.23-1.06-.3-.11-.52-.16-.73.16-.22.33-.84 1.06-1.03 1.27-.19.22-.38.24-.7.08-.33-.16-1.38-.51-2.62-1.62-.97-.86-1.62-1.93-1.81-2.25-.19-.33-.02-.5.14-.66.15-.15.33-.38.49-.57.16-.19.22-.33.33-.54.11-.22.05-.41-.03-.57-.08-.16-.73-1.76-1-2.41-.26-.63-.53-.55-.73-.56h-.62c-.22 0-.57.08-.87.41-.3.33-1.14 1.11-1.14 2.71s1.17 3.15 1.33 3.36c.16.22 2.3 3.5 5.56 4.91.78.34 1.39.54 1.86.69.78.25 1.49.21 2.05.13.63-.09 1.93-.79 2.2-1.55.27-.76.27-1.41.19-1.55-.08-.14-.3-.22-.62-.38Z" />
  </svg>
);

/**
 * Floating contact dock. Tap the main button to reveal WhatsApp, Call and Instagram.
 * The WhatsApp message adapts to the programme page the visitor is on.
 */
export function ContactFab({ whatsapp, phone }: { whatsapp: string | null; phone: string | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const slug = pathname.startsWith("/programmes/") ? pathname.split("/")[2] : pathname === "/prelims-hacker" ? "prelims-hacker" : null;
  const prog = slug ? programmes.find((p) => p.slug === slug) : undefined;
  const wa = whatsappLink(whatsapp, prog ? programmeMessage(prog.title) : DEFAULT_WA_MESSAGE);
  const tel = telLink(phone);

  const actions = [
    wa && { href: wa, label: "WhatsApp", icon: <MessageCircle size={20} aria-hidden />, cls: "bg-[#25D366] text-white", external: true },
    tel && { href: tel, label: "Call now", icon: <Phone size={19} aria-hidden />, cls: "bg-gold text-navy", external: false },
    { href: instagram.profile, label: "Instagram", icon: <Instagram size={20} aria-hidden />, cls: "bg-[linear-gradient(45deg,#f9a03f,#e1306c_45%,#833ab4)] text-white", external: true },
  ].filter(Boolean) as { href: string; label: string; icon: React.ReactNode; cls: string; external: boolean }[];

  return (
    <div ref={ref} className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex flex-col items-end gap-3 sm:right-6">
      <ul id="contact-dock" aria-label="Contact the academy" className={clsx("flex flex-col items-end gap-3", !open && "pointer-events-none")}>
        {actions.map((a, i) => (
          <li
            key={a.label}
            className="transition-all duration-300 ease-[var(--ease-cinema)]"
            style={{ opacity: open ? 1 : 0, transform: open ? "none" : `translateY(${(actions.length - i) * 10}px) scale(0.9)`, transitionDelay: open ? `${(actions.length - i) * 40}ms` : "0ms" }}
          >
            <a
              href={a.href}
              tabIndex={open ? 0 : -1}
              {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="tap flex items-center gap-3 rounded-full bg-navy/90 py-1.5 pl-4 pr-1.5 text-sm font-semibold text-ivory shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] ring-1 ring-ivory/10 backdrop-blur"
            >
              {a.label}
              <span className={clsx("grid h-10 w-10 place-items-center rounded-full", a.cls)}>{a.icon}</span>
            </a>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="contact-dock"
        aria-label={open ? "Close contact options" : "Contact the academy: WhatsApp, call or Instagram"}
        className={clsx(
          "relative grid h-14 w-14 place-items-center rounded-full text-white shadow-[0_12px_30px_-8px_rgba(0,0,0,0.6)] transition-[transform,background-color] duration-300 hover:scale-105",
          open ? "bg-navy ring-1 ring-ivory/20" : wa ? "bg-[#25D366]" : "bg-gold text-navy",
        )}
      >
        {open ? <X size={22} /> : wa ? <WaIcon /> : <Phone size={22} />}
        {!open ? <span aria-hidden className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/30 [animation-duration:2.6s]" /> : null}
      </button>
    </div>
  );
}

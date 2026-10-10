import type React from "react";
import { Instagram, MessageCircle, Phone, Send } from "lucide-react";
import clsx from "clsx";
import { contact, formatPhoneDisplay, instagram, telLink, whatsappLink, DEFAULT_WA_MESSAGE } from "@/lib/contact";

type Tone = "dark" | "light";

/**
 * WhatsApp · Call · Instagram action cards. Channels without a verified
 * number are not rendered (Instagram is always available).
 */
export function ContactActions({ tone = "dark", message = DEFAULT_WA_MESSAGE, className }: { tone?: Tone; message?: string; className?: string }) {
  const wa = whatsappLink(contact.whatsapp, message);
  const tel = telLink(contact.phone);
  const card = clsx(
    "tap group flex min-w-0 items-center gap-4 rounded-2xl p-5 ring-1 transition-[background-color,box-shadow] duration-300",
    tone === "dark" ? "bg-ivory/[0.04] ring-ivory/12 hover:bg-ivory/[0.08] hover:ring-gold/60" : "bg-white/60 ring-ink/12 hover:bg-white hover:ring-ink/30",
  );
  const sub = tone === "dark" ? "text-ivory/60" : "text-ink/60";
  const items = [
    wa && {
      href: wa,
      external: true,
      icon: <MessageCircle size={22} aria-hidden />,
      iconBg: "bg-[#25D366] text-white",
      title: "WhatsApp us",
      text: "Chat with the academy team",
    },
    tel && contact.phone && {
      href: tel,
      external: false,
      icon: <Phone size={20} aria-hidden />,
      iconBg: "bg-gold text-navy",
      title: "Call the academy",
      text: formatPhoneDisplay(contact.phone),
    },
    {
      href: instagram.profile,
      external: true,
      icon: <Instagram size={20} aria-hidden />,
      iconBg: "bg-[linear-gradient(45deg,#f9a03f,#e1306c_45%,#833ab4)] text-white",
      title: "Follow on Instagram",
      text: `@${instagram.handle}`,
    },
    {
      href: instagram.dm,
      external: true,
      icon: <Send size={19} aria-hidden />,
      iconBg: tone === "dark" ? "bg-ivory text-navy" : "bg-navy text-ivory",
      title: "Message on Instagram",
      text: "Send us a direct message",
    },
  ].filter(Boolean) as { href: string; external: boolean; icon: React.ReactNode; iconBg: string; title: string; text: string }[];

  return (
    <ul className={clsx("grid gap-3 sm:grid-cols-2", className)}>
      {items.map((it) => (
        <li key={it.title} className="min-w-0">
          <a href={it.href} {...(it.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={card}>
            <span className={clsx("grid h-12 w-12 shrink-0 place-items-center rounded-full", it.iconBg)}>{it.icon}</span>
            <span className="min-w-0">
              <span className="block font-semibold">{it.title}</span>
              <span className={clsx("block truncate text-sm", sub)}>{it.text}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

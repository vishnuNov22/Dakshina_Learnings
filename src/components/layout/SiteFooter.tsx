import Link from "next/link";
import { Instagram, Mail, MapPin, Phone, Youtube, Facebook, AtSign, MessageCircle } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { footerNav, site } from "@/lib/site";
import { contact, formatPhoneDisplay, instagram, telLink, whatsappLink } from "@/lib/contact";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const tel = telLink(contact.phone);
  const wa = whatsappLink(contact.whatsapp);
  const iconCls = "tap grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-brand-deep";
  return (
    <footer className="relative overflow-hidden bg-brand-dark text-white">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(132,72,192,0.45),transparent)]" />
      <div className="container-x relative pb-10 pt-24">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_2fr]">
          <div className="min-w-0">
            <Logo size={56} tone="light" />
            <p className="mt-8 max-w-sm font-serif text-step-3">{site.tagline}.</p>
            <ul className="mt-8 space-y-3 text-sm">
              {tel && contact.phone ? (
                <li>
                  <a className="tap inline-flex items-center gap-3 text-white/80 hover:text-white" href={tel}>
                    <Phone size={16} aria-hidden /> {formatPhoneDisplay(contact.phone)}
                  </a>
                </li>
              ) : null}
              {wa ? (
                <li>
                  <a className="tap inline-flex items-center gap-3 text-white/80 hover:text-white" href={wa} target="_blank" rel="noopener noreferrer">
                    <MessageCircle size={16} aria-hidden /> WhatsApp the academy
                  </a>
                </li>
              ) : null}
              {contact.email ? (
                <li>
                  <a className="tap inline-flex items-center gap-3 text-white/80 hover:text-white" href={`mailto:${contact.email}`}>
                    <Mail size={16} aria-hidden /> {contact.email}
                  </a>
                </li>
              ) : null}
              <li className="flex items-start gap-3 text-white/70">
                <MapPin size={16} aria-hidden className="mt-1 shrink-0" />
                <span>{contact.addressLine ?? `${site.city}, ${site.region}`}</span>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {footerNav.map((col) => (
              <nav key={col.title} aria-label={col.title} className="min-w-0">
                <p className="eyebrow text-white/60">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.items.map((it) => (
                    <li key={it.href}>
                      <Link href={it.href} className="text-[0.95rem] text-white/80 transition-colors hover:text-white">
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-2" aria-label="Social media">
            <li>
              <a href={instagram.profile} target="_blank" rel="noopener noreferrer" aria-label="Instagram @dakshinalearnings" className={iconCls}>
                <Instagram size={18} />
              </a>
            </li>
            <li>
              <a href={site.threads.url} target="_blank" rel="noopener noreferrer" aria-label="Threads @dakshinalearnings" className={iconCls}>
                <AtSign size={18} />
              </a>
            </li>
            {contact.youtube ? (
              <li>
                <a href={contact.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={iconCls}>
                  <Youtube size={18} />
                </a>
              </li>
            ) : null}
            {contact.facebook ? (
              <li>
                <a href={contact.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={iconCls}>
                  <Facebook size={18} />
                </a>
              </li>
            ) : null}
          </ul>
          <p className="max-w-xl text-xs leading-relaxed text-white/50 sm:text-right">
            © {year} {site.legalName}. Photography: Unsplash &amp; Pexels contributors. Book covers via Open Library, © their publishers. No institute can guarantee selection.
          </p>
        </div>
      </div>
      <p aria-hidden className="pointer-events-none absolute -bottom-[0.2em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-serif text-[clamp(5rem,22vw,22rem)] leading-none text-white/[0.04]">
        Dakshina
      </p>
    </footer>
  );
}

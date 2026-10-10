import Link from "next/link";
import { Instagram, Mail, MapPin, Phone, Youtube, Facebook, AtSign } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { footerNav, site } from "@/lib/site";
import { contact, formatPhoneDisplay, telLink } from "@/lib/contact";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const tel = telLink(contact.phone);
  return (
    <footer className="grain relative overflow-hidden bg-charcoal text-ivory">
      <div className="container-x relative z-[2] pb-10 pt-20">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_2fr]">
          <div className="min-w-0">
            <Logo size={52} />
            <p className="mt-6 max-w-sm font-serif text-step-2 text-ivory/90">{site.tagline}.</p>
            <p className="mt-4 max-w-sm text-sm text-ivory/60">
              UPSC Civil Services preparation in {site.city}, {site.region} — activity-based learning, current affairs, test series and mentoring.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              {tel && contact.phone ? (
                <li>
                  <a className="tap inline-flex items-center gap-3 text-ivory/80 hover:text-gold" href={tel}>
                    <Phone size={16} aria-hidden /> {formatPhoneDisplay(contact.phone)}
                  </a>
                </li>
              ) : null}
              {contact.email ? (
                <li>
                  <a className="tap inline-flex items-center gap-3 text-ivory/80 hover:text-gold" href={`mailto:${contact.email}`}>
                    <Mail size={16} aria-hidden /> {contact.email}
                  </a>
                </li>
              ) : null}
              <li className="flex items-start gap-3 text-ivory/70">
                <MapPin size={16} aria-hidden className="mt-1 shrink-0" />
                <span>{contact.addressLine ?? `${site.city}, ${site.region}`}</span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {footerNav.map((col) => (
              <nav key={col.title} aria-label={col.title} className="min-w-0">
                <p className="eyebrow text-gold">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.items.map((it) => (
                    <li key={it.href}>
                      <Link href={it.href} className="text-[0.95rem] text-ivory/70 transition-colors hover:text-ivory">
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-ivory/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-2" aria-label="Social media">
            <li>
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram @dakshinalearnings" className="tap grid h-11 w-11 place-items-center rounded-full ring-1 ring-ivory/20 hover:bg-ivory/5 hover:ring-gold">
                <Instagram size={18} />
              </a>
            </li>
            <li>
              <a href={site.threads.url} target="_blank" rel="noopener noreferrer" aria-label="Threads @dakshinalearnings" className="tap grid h-11 w-11 place-items-center rounded-full ring-1 ring-ivory/20 hover:bg-ivory/5 hover:ring-gold">
                <AtSign size={18} />
              </a>
            </li>
            {contact.youtube ? (
              <li>
                <a href={contact.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="tap grid h-11 w-11 place-items-center rounded-full ring-1 ring-ivory/20 hover:bg-ivory/5 hover:ring-gold">
                  <Youtube size={18} />
                </a>
              </li>
            ) : null}
            {contact.facebook ? (
              <li>
                <a href={contact.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="tap grid h-11 w-11 place-items-center rounded-full ring-1 ring-ivory/20 hover:bg-ivory/5 hover:ring-gold">
                  <Facebook size={18} />
                </a>
              </li>
            ) : null}
          </ul>
          <p className="text-xs leading-relaxed text-ivory/45">
            © {year} {site.legalName}. Book titles are referenced for study guidance and belong to their publishers. No institute can guarantee selection.
          </p>
        </div>
      </div>
      <p aria-hidden className="pointer-events-none absolute -bottom-[0.18em] left-1/2 z-[1] -translate-x-1/2 select-none whitespace-nowrap font-serif text-[clamp(5rem,22vw,22rem)] leading-none text-ivory/[0.035]">
        Dakshina
      </p>
    </footer>
  );
}

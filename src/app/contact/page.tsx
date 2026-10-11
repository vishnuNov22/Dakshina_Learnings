import { MapPin, Mail } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { photos } from "@/data/media";
import { ContactActions } from "@/components/contact/ContactActions";
import { contact } from "@/lib/contact";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us",
  description: "Contact Dakshina Learnings Civil Service Academy, Thiruvananthapuram — WhatsApp, phone and Instagram.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        photo={photos.indiaGateDusk}
        eyebrow="Contact"
        title={<>Let&rsquo;s <span className="accent">talk.</span></>}
        lede="WhatsApp is the quickest way to reach the academy. You can also call or message on Instagram."
        crumbs={[{ label: "Contact", href: "/contact" }]}
      />
      <section className="section-y bg-mist">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <ContactActions />
          <div className="min-w-0 space-y-6 rounded-2xl p-6 ring-1 ring-line sm:p-8">
            <div className="flex gap-4">
              <MapPin className="mt-1 shrink-0 text-brand" size={20} aria-hidden />
              <div>
                <p className="font-semibold">Visit</p>
                <p className="text-ink-soft">{contact.addressLine ?? `${site.city}, ${site.region}`}</p>
                {contact.mapsUrl ? (
                  <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm text-brand underline underline-offset-4">
                    Open in Google Maps
                  </a>
                ) : null}
              </div>
            </div>
            {contact.email ? (
              <div className="flex gap-4">
                <Mail className="mt-1 shrink-0 text-brand" size={20} aria-hidden />
                <div>
                  <p className="font-semibold">Email</p>
                  <a href={`mailto:${contact.email}`} className="text-ink-soft hover:text-ink">{contact.email}</a>
                </div>
              </div>
            ) : null}
            <p className="border-t border-line pt-6 text-sm text-ink-soft">
              Website: <a href="https://dakshinalearnings.com" className="underline">dakshinalearnings.com</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

import { Clock, Lamp, BookOpen, Users } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ArtImage } from "@/components/ui/ArtImage";
import { PendingNote } from "@/components/ui/PendingNote";
import { ContactActions } from "@/components/contact/ContactActions";
import { media } from "@/data/media";
import { contact } from "@/lib/contact";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Library & Reading Room",
  description: "A quiet reading room for UPSC aspirants at Dakshina Learnings, Thiruvananthapuram. Enquire about access and membership.",
  path: "/library",
});

export default function LibraryPage() {
  const rows: [string, string | null][] = [
    ["Location", contact.addressLine ?? `${site.city}, ${site.region}`],
    ["Opening hours", "Reported 24/7 — confirm with the academy"],
    ["Access", null],
    ["Membership", null],
  ];
  return (
    <>
      <PageHeader
        eyebrow="Library & reading room"
        title={<>A quiet room for <em className="text-gold-soft">long preparation.</em></>}
        lede="Focused study tables, reference shelves and a calm atmosphere — the academy reports round-the-clock access for aspirants."
        crumbs={[{ label: "Library", href: "/library" }]}
      />
      <section className="bg-charcoal">
        <ArtImage media={media.readingRoom} sizes="100vw" priority className="aspect-[3/4] w-full sm:aspect-[16/9] lg:aspect-[21/9]" />
      </section>
      <section className="paper section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <h2 className="text-step-4 text-ink">What you&rsquo;ll find</h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2">
              {[
                [<Clock key="c" size={20} />, "Long hours", "Study on your own schedule — reported 24/7 access."],
                [<Lamp key="l" size={20} />, "Study tables & lighting", "Individual desk space designed for long sessions."],
                [<BookOpen key="b" size={20} />, "Reference shelves", "Standard books and periodicals for quick reference."],
                [<Users key="w" size={20} />, "A focused community", "Study alongside aspirants with the same goal."],
              ].map(([icon, t, d]) => (
                <li key={String(t)} className="rounded-2xl bg-white/60 p-6 ring-1 ring-ink/10">
                  <span className="text-red">{icon}</span>
                  <p className="mt-3 font-serif text-step-2 text-ink">{t}</p>
                  <p className="mt-1 text-ink/70">{d}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-ink/55">The image above is an illustration. Facilities listed should be confirmed with the academy.</p>
          </div>
          <aside className="min-w-0 rounded-2xl bg-navy p-6 text-ivory sm:p-8">
            <h2 className="text-step-3">Enquire About Library Access</h2>
            <dl className="mt-6 divide-y divide-ivory/10">
              {rows.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-3">
                  <dt className="text-sm text-ivory/60">{k}</dt>
                  <dd className="text-right text-sm font-semibold">{v ?? <span className="font-normal text-ivory/50">Shared on enquiry</span>}</dd>
                </div>
              ))}
            </dl>
            <PendingNote tone="dark" className="mt-5">Timings & fees confirmed on enquiry</PendingNote>
            <ContactActions className="mt-8 !grid-cols-1" message="Hello Dakshina Learnings, I would like to know about reading room / library access — timings and membership." />
          </aside>
        </div>
      </section>
    </>
  );
}

import { Clock, Lamp, BookOpen, Users } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Photo } from "@/components/ui/Photo";
import { PendingNote } from "@/components/ui/PendingNote";
import { ContactActions } from "@/components/contact/ContactActions";
import { photos } from "@/data/media";
import { contact } from "@/lib/contact";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Library & Reading Room",
  description: "A quiet reading room for UPSC aspirants at Dakshina Learnings, Thiruvananthapuram. Enquire about access and membership.",
  path: "/library",
});

const features = [
  { icon: <Clock size={20} aria-hidden />, t: "Long hours", d: "Study on your own schedule, with reported 24/7 access." },
  { icon: <Lamp size={20} aria-hidden />, t: "Study tables & lighting", d: "Individual desk space designed for long sessions." },
  { icon: <BookOpen size={20} aria-hidden />, t: "Reference shelves", d: "Standard books and periodicals for quick reference." },
  { icon: <Users size={20} aria-hidden />, t: "A focused community", d: "Study alongside aspirants with the same goal." },
];

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
        title={<>A quiet room for <span className="accent">long preparation.</span></>}
        lede="Focused study tables, reference shelves and a calm atmosphere. The academy reports round-the-clock access for aspirants."
        crumbs={[{ label: "Library", href: "/library" }]}
      />
      <div className="container-x">
        <Photo photo={photos.grandLibrary} priority sizes="100vw" parallax={6} className="aspect-[4/5] w-full sm:aspect-[16/9] lg:aspect-[21/9]" />
        <p className="mt-3 text-xs text-ink-soft">Representative photograph.</p>
      </div>
      <section className="section-y bg-white">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <h2 className="text-step-4 text-ink">
              What you&rsquo;ll <span className="accent">find</span>
            </h2>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2">
              {features.map((f) => (
                <li key={f.t} className="rounded-[24px] bg-mist p-7">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-brand">{f.icon}</span>
                  <p className="mt-5 font-serif text-step-2 text-ink">{f.t}</p>
                  <p className="mt-1 text-ink-soft">{f.d}</p>
                </li>
              ))}
            </ul>
            <Photo photo={photos.libraryShelves} sizes="(min-width: 1024px) 50vw, 100vw" parallax={6} className="mt-10 aspect-[16/9] w-full" />
          </div>
          <aside className="min-w-0 self-start rounded-[28px] bg-brand-dark p-7 text-white sm:p-9 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
            <h2 className="text-step-3">Enquire About Library Access</h2>
            <dl className="mt-6 divide-y divide-white/15">
              {rows.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-3.5">
                  <dt className="text-sm text-white/65">{k}</dt>
                  <dd className="text-right text-sm font-semibold">{v ?? <span className="font-normal text-white/60">Shared on enquiry</span>}</dd>
                </div>
              ))}
            </dl>
            <PendingNote tone="dark" className="mt-5">Timings & fees confirmed on enquiry</PendingNote>
            <ContactActions tone="dark" className="mt-8 !grid-cols-1" message="Hello Dakshina Learnings, I would like to know about reading room / library access — timings and membership." />
          </aside>
        </div>
      </section>
    </>
  );
}

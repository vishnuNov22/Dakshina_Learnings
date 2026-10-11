import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { photos } from "@/data/media";
import { EnquiryCta } from "@/components/home/Sections";
import { resources } from "@/data/resources";
import { books } from "@/data/books";
import { upscFacts } from "@/data/faq";
import { Accordion } from "@/components/ui/Accordion";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Resources & Study Materials",
  description: "Official UPSC links, previous-year papers, syllabus sources and commonly used reading for Civil Services preparation.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        photo={photos.libraryShelves}
        eyebrow="Resources"
        title={<>Read the sources <span className="accent">that matter.</span></>}
        lede="Official links, previous-year papers and commonly used books. Always check the latest UPSC notification for the current syllabus and rules."
        crumbs={[{ label: "Resources", href: "/resources" }]}
      />
      <section className="section-y bg-mist">
        <div className="container-x">
          <h2 className="text-step-3">Official & public sources</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((r) => (
              <li key={r.href} className="min-w-0">
                <a href={r.href} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col rounded-2xl p-6 ring-1 ring-line transition-colors hover:bg-white hover:ring-brand">
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-brand">{r.kind}</span>
                  <span className="mt-3 font-serif text-step-2">{r.title}</span>
                  <span className="mt-2 text-sm text-ink-soft">{r.description}</span>
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm text-ink-soft group-hover:text-brand">
                    Open <ArrowUpRight size={15} aria-hidden />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="bg-white section-y">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div className="min-w-0">
            <h2 className="text-step-3 text-ink">Commonly used books</h2>
            <p className="mt-3 text-sm text-ink-soft">Illustrative references, not an official reading list. Ask the academy for its recommendations.</p>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {books.map((b) => (
                <li key={b.id} className="flex items-baseline justify-between gap-4 py-4">
                  <span className="min-w-0">
                    <span className="block font-serif text-step-1 text-ink">{b.title}</span>
                    <span className="text-sm text-ink-soft">{b.author}</span>
                  </span>
                  <span className="shrink-0 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-brand">{b.subject}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0">
            <h2 className="text-step-3 text-ink">Know the examination</h2>
            <div className="mt-6">
              <Accordion items={upscFacts} />
            </div>
          </div>
        </div>
      </section>
      <EnquiryCta />
    </>
  );
}

import { ArrowRight } from "lucide-react";
import { programmeHref, type Programme } from "@/data/programmes";
import { PageHeader } from "@/components/layout/PageHeader";
import { Accordion } from "@/components/ui/Accordion";
import { LinkButton } from "@/components/ui/Button";
import { PendingNote } from "@/components/ui/PendingNote";
import { JsonLd } from "@/components/ui/JsonLd";
import { ContactActions } from "@/components/contact/ContactActions";
import { breadcrumbJsonLd } from "@/lib/seo";
import { programmeMessage } from "@/lib/contact";
import type { ReactNode } from "react";

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="min-w-0 border-t border-ink/15 py-10">
      <h2 className="text-step-3 text-ink">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((i) => (
        <li key={i} className="flex gap-3 text-ink/80">
          <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-red" />
          {i}
        </li>
      ))}
    </ul>
  );
}

export function ProgrammeDetail({ p, children }: { p: Programme; children?: ReactNode }) {
  const facts: [string, string | null][] = [
    ["Duration", p.duration],
    ["Mode", p.mode],
    ["Next batch", p.batch],
    ["Fees", p.fees],
  ];
  return (
    <>
      <PageHeader
        eyebrow={p.kicker}
        title={p.title}
        lede={p.summary}
        crumbs={[
          { label: "Programmes", href: "/programmes" },
          { label: p.shortTitle, href: programmeHref(p.slug) },
        ]}
      >
        <LinkButton href={`/admissions?programme=${encodeURIComponent(p.slug)}`} icon={<ArrowRight size={17} aria-hidden />}>
          Enquire about this programme
        </LinkButton>
      </PageHeader>

      <div className="paper">
        <div className="container-x grid gap-12 pb-[var(--section-y)] pt-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
          <div className="min-w-0">
            {children}
            <Block title="Who it's for">
              <Bullets items={p.audience} />
            </Block>
            <Block title="Learning objectives">
              <Bullets items={p.objectives} />
            </Block>
            <Block title="Curriculum">
              <div className="grid gap-5 md:grid-cols-2">
                {p.curriculum.map((c) => (
                  <div key={c.title} className="rounded-2xl bg-white/60 p-6 ring-1 ring-ink/10">
                    <h3 className="font-serif text-step-2 text-ink">{c.title}</h3>
                    <ul className="mt-3 space-y-1.5 text-ink/75">
                      {c.points.map((pt) => (
                        <li key={pt}>— {pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Block>
            <Block title="Teaching approach">
              <Bullets items={p.approach} />
            </Block>
            {p.faqs.length ? (
              <Block title="Questions">
                <Accordion items={p.faqs} />
              </Block>
            ) : null}
          </div>

          <aside className="min-w-0 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
            <div className="rounded-2xl bg-navy p-6 text-ivory sm:p-8">
              <p className="eyebrow text-gold">At a glance</p>
              <dl className="mt-6 divide-y divide-ivory/10">
                {facts.map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-4 py-3.5">
                    <dt className="text-sm text-ivory/60">{k}</dt>
                    <dd className="text-right font-semibold">{v ?? <span className="text-sm font-normal text-ivory/50">Shared on enquiry</span>}</dd>
                  </div>
                ))}
              </dl>
              {!p.confirmed ? <PendingNote tone="dark" className="mt-5">Details being confirmed by the academy</PendingNote> : null}
              <div className="mt-8">
                <ContactActions message={programmeMessage(p.title)} className="!grid-cols-1" />
              </div>
            </div>
          </aside>
        </div>
      </div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Programmes", path: "/programmes" },
          { name: p.shortTitle, path: programmeHref(p.slug) },
        ])}
      />
    </>
  );
}

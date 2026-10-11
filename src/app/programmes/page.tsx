import { PageHeader } from "@/components/layout/PageHeader";
import { photos } from "@/data/media";
import { ProgrammeCard } from "@/components/programmes/ProgrammeCard";
import { EnquiryCta } from "@/components/home/Sections";
import { Reveal } from "@/components/ui/Reveal";
import { programmes } from "@/data/programmes";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "UPSC Programmes",
  description: "UPSC Civil Services programmes at Dakshina Learnings, Thiruvananthapuram — comprehensive preparation, Prelims Hacker, current affairs, answer writing, tests and mentorship.",
  path: "/programmes",
});

export default function ProgrammesPage() {
  return (
    <>
      <PageHeader
        photo={photos.lectureHall}
        eyebrow="UPSC programmes"
        title={<>Structured paths to the <span className="accent">Civil Services.</span></>}
        lede="Each programme is designed around a stage of preparation. Batch dates, duration and fees are shared directly by the academy."
        crumbs={[{ label: "Programmes", href: "/programmes" }]}
      />
      <section className="section-y bg-mist">
        <ul className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {programmes.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 3) * 0.06} className="min-w-0">
              <ProgrammeCard p={p} index={i} />
            </Reveal>
          ))}
        </ul>
      </section>
      <EnquiryCta />
    </>
  );
}

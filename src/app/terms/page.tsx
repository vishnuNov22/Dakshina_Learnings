import { PageHeader } from "@/components/layout/PageHeader";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Terms & Conditions", description: `Terms of use for the ${site.name} website.`, path: "/terms" });

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms & Conditions" crumbs={[{ label: "Terms", href: "/terms" }]} />
      <section className="paper section-y">
        <div className="container-x max-w-3xl space-y-6 text-ink/80 [&_h2]:mt-10 [&_h2]:text-step-2 [&_h2]:text-ink">
          <p className="text-sm text-ink/50">Template — to be reviewed and approved by the academy before publication.</p>
          <h2>Information on this website</h2>
          <p>Programme descriptions are for general information. Batch dates, duration, fees and schedules are confirmed directly by the academy and may change.</p>
          <h2>No guarantee of selection</h2>
          <p>Selection in the UPSC Civil Services Examination depends on many factors. {site.name} does not guarantee selection or any particular result.</p>
          <h2>Third-party content</h2>
          <p>Book titles and publications are referenced for study guidance and remain the property of their publishers. Cover images on this site are original illustrations. Links to external websites are provided for convenience.</p>
          <h2>Illustrations</h2>
          <p>Identity cards, rooms and scenes shown in animations are symbolic illustrations, not official documents or photographs of the premises.</p>
          <h2>Intellectual property</h2>
          <p>The design, text and original artwork of this website belong to {site.legalName}.</p>
        </div>
      </section>
    </>
  );
}

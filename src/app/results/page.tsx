import { PageHeader } from "@/components/layout/PageHeader";
import { ExperiencesSection, EnquiryCta } from "@/components/home/Sections";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Results & Student Experiences",
  description: "Verified student experiences from Dakshina Learnings, Thiruvananthapuram.",
  path: "/results",
});

export default function ResultsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Results & experiences"
        title={<>Progress, <em className="text-gold-soft">told honestly.</em></>}
        lede="We share only results and experiences that are verified and published with each student's consent. No institute can guarantee selection."
        crumbs={[{ label: "Results", href: "/results" }]}
      />
      <ExperiencesSection />
      <EnquiryCta />
    </>
  );
}

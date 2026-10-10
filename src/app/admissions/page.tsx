import { PageHeader } from "@/components/layout/PageHeader";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { ContactActions } from "@/components/contact/ContactActions";
import { contact, telLink } from "@/lib/contact";
import { programmeOptionBySlug } from "@/data/programmes";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Admissions & Enquiry",
  description: "Enquire about UPSC programmes, batches and the reading room at Dakshina Learnings, Thiruvananthapuram — via WhatsApp, phone or Instagram.",
  path: "/admissions",
});

export default async function AdmissionsPage({ searchParams }: { searchParams: Promise<{ programme?: string }> }) {
  const { programme } = await searchParams;
  const defaultProgramme = programme ? programmeOptionBySlug[programme] : undefined;
  return (
    <>
      <PageHeader
        eyebrow="Admissions"
        title={<>Begin your <em className="text-gold-soft">preparation.</em></>}
        lede="Tell us a little about yourself. Your enquiry goes straight to the academy on WhatsApp, and the team will get back to you with batch details."
        crumbs={[{ label: "Admissions", href: "/admissions" }]}
      />
      <section className="paper section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
          <div className="min-w-0 rounded-3xl bg-[#fbf8f1] p-5 shadow-[0_30px_60px_-40px_rgba(29,26,22,0.5)] ring-1 ring-ink/10 sm:p-8 lg:p-10">
            <h2 className="text-step-3 text-ink">Admission enquiry</h2>
            <p className="mb-8 mt-2 text-ink/60">Takes about a minute.</p>
            <EnquiryForm whatsapp={contact.whatsapp} phoneHref={telLink(contact.phone)} defaultProgramme={defaultProgramme} />
          </div>
          <aside className="min-w-0">
            <h2 className="text-step-3 text-ink">Prefer to talk?</h2>
            <p className="mb-6 mt-2 text-ink/65">Reach the academy directly.</p>
            <ContactActions tone="light" className="!grid-cols-1" />
          </aside>
        </div>
      </section>
    </>
  );
}

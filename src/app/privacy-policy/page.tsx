import { PageHeader } from "@/components/layout/PageHeader";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Privacy Policy", description: `How ${site.name} handles your information.`, path: "/privacy-policy" });

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" crumbs={[{ label: "Privacy Policy", href: "/privacy-policy" }]} />
      <section className="paper section-y">
        <div className="container-x max-w-3xl space-y-6 text-ink/80 [&_h2]:mt-10 [&_h2]:text-step-2 [&_h2]:text-ink">
          <p className="text-sm text-ink/50">Template — to be reviewed and approved by the academy before publication.</p>
          <h2>What this website collects</h2>
          <p>This website does not store personal information on its own servers. The enquiry form prepares a message in your browser; it is sent to the academy only when you tap Send in WhatsApp.</p>
          <h2>WhatsApp, phone and Instagram</h2>
          <p>When you contact {site.name} through WhatsApp, a phone call or Instagram, those services process your information under their own privacy policies. The academy uses the details you share only to respond to your enquiry and to provide information about its programmes.</p>
          <h2>Cookies and analytics</h2>
          <p>The website does not use advertising cookies. If analytics are added in future, this policy will be updated.</p>
          <h2>Your choices</h2>
          <p>You can ask the academy to delete your enquiry messages or stop contacting you at any time using the same channel you used to reach them.</p>
          <h2>Contact</h2>
          <p>For privacy questions, contact {site.legalName}, {site.city}, {site.region}.</p>
        </div>
      </section>
    </>
  );
}

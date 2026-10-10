import { PageHeader } from "@/components/layout/PageHeader";
import { MentorshipSection, EnquiryCta } from "@/components/home/Sections";
import { faculty } from "@/data/faculty";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Faculty & Mentorship",
  description: "Faculty and mentoring at Dakshina Learnings — guidance, planning and feedback for UPSC aspirants.",
  path: "/faculty",
});

export default function FacultyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Faculty & mentorship"
        title={<>The people behind <em className="text-gold-soft">your preparation.</em></>}
        lede="Teaching and mentoring at Dakshina focus on clarity of concepts, honest feedback and a sustainable plan."
        crumbs={[{ label: "Faculty", href: "/faculty" }]}
      />
      {faculty.length ? (
        <section className="section-y bg-navy-2">
          <ul className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {faculty.map((f) => (
              <li key={f.name} className="rounded-2xl bg-ivory/[0.04] p-7 ring-1 ring-ivory/10">
                <h2 className="text-step-2">{f.name}</h2>
                <p className="text-sm text-gold">{f.role}</p>
                <p className="mt-3 text-sm text-ivory/60">{f.subjects.join(" · ")}</p>
                <p className="mt-4 text-ivory/75">{f.bio}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section className="section-y bg-navy-2">
          <div className="container-x max-w-3xl">
            <p className="text-step-1 text-ivory/70">
              Faculty profiles will be published here once confirmed by the academy. To speak with a mentor about your preparation, reach out on WhatsApp, by phone or on Instagram.
            </p>
          </div>
        </section>
      )}
      <MentorshipSection />
      <EnquiryCta />
    </>
  );
}

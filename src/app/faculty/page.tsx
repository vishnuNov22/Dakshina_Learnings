import { PageHeader } from "@/components/layout/PageHeader";
import { photos } from "@/data/media";
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
        photoClassName="aspect-[1024/500] w-full"
        photo={photos.team}
        eyebrow="Faculty & mentorship"
        title={<>The people behind <span className="accent">your preparation.</span></>}
        lede="Teaching and mentoring at Dakshina focus on clarity of concepts, honest feedback and a sustainable plan."
        crumbs={[{ label: "Faculty", href: "/faculty" }]}
      />
      {faculty.length ? (
        <section className="section-y bg-mist">
          <ul className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {faculty.map((f) => (
              <li key={f.name} className="rounded-2xl bg-white p-7 ring-1 ring-line">
                <h2 className="text-step-2">{f.name}</h2>
                <p className="text-sm text-brand">{f.role}</p>
                <p className="mt-3 text-sm text-ink-soft">{f.subjects.join(" · ")}</p>
                <p className="mt-4 text-ink-soft">{f.bio}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section className="section-y bg-mist">
          <div className="container-x max-w-3xl">
            <p className="text-step-1 text-ink-soft">
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

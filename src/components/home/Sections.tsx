import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, BookOpen, Clock, Compass, Instagram, Lamp, Lightbulb, Newspaper, Users } from "lucide-react";
import { programmes } from "@/data/programmes";
import { resources } from "@/data/resources";
import { homeFaqs } from "@/data/faq";
import { faculty, testimonials } from "@/data/faculty";
import { photos } from "@/data/media";
import { Photo } from "@/components/ui/Photo";
import { Accordion } from "@/components/ui/Accordion";
import { LinkButton, buttonClass } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Marquee } from "@/components/ui/Marquee";
import { ProgrammeCard } from "@/components/programmes/ProgrammeCard";
import { ContactActions } from "@/components/contact/ContactActions";
import { instagram } from "@/lib/contact";

export function SubjectBand() {
  return (
    <Marquee
      className="overflow-hidden bg-brand py-6 text-white"
      items={["Polity", "Modern History", "Geography", "Economy", "Environment", "Art & Culture", "Ethics", "Current Affairs", "Answer Writing"]}
    />
  );
}

export function AcademyIntro() {
  const values = [
    { icon: <Lightbulb size={20} aria-hidden />, t: "Activity-based learning", d: "Classes built on doing: decoding, discussing, writing." },
    { icon: <Newspaper size={20} aria-hidden />, t: "Current affairs, analysed", d: "A Daily News Desk that links headlines to the syllabus." },
    { icon: <Compass size={20} aria-hidden />, t: "Strategic preparation", d: "Programmes like Prelims Hacker focus effort where it counts." },
    { icon: <Users size={20} aria-hidden />, t: "Expert mentoring", d: "Guidance that keeps your preparation honest and on schedule." },
  ];
  return (
    <section id="journey" aria-labelledby="intro-title" className="section-y overflow-hidden bg-white">
      <div className="container-x grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-24">
        <div className="relative order-2 min-w-0 lg:order-1">
          <Photo photo={photos.studentsBooks} sizes="(min-width: 1024px) 40vw, 90vw" parallax={6} className="aspect-[4/5] w-[82%]" />
          <Photo
            photo={photos.readingStudent}
            sizes="(min-width: 1024px) 22vw, 50vw"
            parallax={10}
            className="absolute -bottom-10 right-0 aspect-square w-[48%] shadow-[0_40px_80px_-30px_rgba(29,11,54,0.5)] ring-8 ring-white"
          />
          <div className="absolute left-[64%] top-10 hidden rounded-2xl bg-brand px-5 py-4 text-white shadow-[0_20px_50px_-20px_rgba(90,34,150,0.8)] sm:block">
            <p className="font-serif text-3xl italic leading-none">UPSC</p>
            <p className="mt-1 text-[0.65rem] font-semibold tracking-[0.2em] text-white/80">CIVIL SERVICES</p>
          </div>
        </div>
        <div className="order-1 min-w-0 lg:order-2">
          <SectionHeading
            id="intro-title"
            eyebrow="Dakshina Learnings · Thiruvananthapuram"
            title={
              <>
                Building tomorrow&rsquo;s <span className="accent">civil servants.</span>
              </>
            }
          />
          <p className="mt-8 font-serif text-step-2 text-ink">
            The Civil Services Examination doesn&rsquo;t reward the aspirant who reads the most. It rewards the one who thinks most clearly.
          </p>
          <p className="mt-6 max-w-xl text-ink-soft">
            Dakshina Learnings is a civil services academy in Thiruvananthapuram, Kerala, preparing aspirants for the UPSC Civil Services Examination through activity-based learning, current-affairs analysis, test series and mentoring.
          </p>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal as="li" key={v.t} delay={i * 0.06} className="min-w-0">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-mist text-brand">{v.icon}</span>
                <h3 className="mt-4 font-sans text-base font-bold text-ink">{v.t}</h3>
                <p className="mt-1 text-sm text-ink-soft">{v.d}</p>
              </Reveal>
            ))}
          </ul>
          <LinkButton href="/about" variant="outline" className="mt-10" icon={<ArrowRight size={17} aria-hidden />}>
            About the academy
          </LinkButton>
        </div>
      </div>
    </section>
  );
}

export function FeaturedProgrammes() {
  return (
    <section aria-labelledby="programmes-title" className="section-y bg-mist">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="programmes-title" eyebrow="Programmes" title={<>Choose your <span className="accent">path in.</span></>} />
          <LinkButton href="/programmes" variant="outline" icon={<ArrowRight size={17} aria-hidden />} className="self-start md:self-auto">
            All programmes
          </LinkButton>
        </div>
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {programmes.slice(0, 3).map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 0.08} className="min-w-0">
              <ProgrammeCard p={p} index={i} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ReadingRoomSection() {
  const features = [
    { icon: <Clock size={18} aria-hidden />, t: "Reported 24/7 access" },
    { icon: <Lamp size={18} aria-hidden />, t: "Quiet, well-lit study tables" },
    { icon: <BookOpen size={18} aria-hidden />, t: "Reference shelves" },
  ];
  return (
    <section aria-labelledby="reading-title" className="section-y overflow-hidden bg-white">
      <div className="container-x">
        <Photo photo={photos.grandLibrary} sizes="100vw" parallax={8} className="aspect-[4/5] w-full sm:aspect-[16/9] lg:aspect-[21/9]" overlay="bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent" />
        <div className="relative z-10 mx-auto -mt-24 grid max-w-6xl gap-10 rounded-[28px] bg-white p-7 shadow-[0_40px_80px_-50px_rgba(29,11,54,0.5)] ring-1 ring-line sm:-mt-32 sm:p-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <p className="eyebrow mb-5 flex items-center gap-3 text-brand">
              <span aria-hidden className="h-px w-10 bg-current" />
              Library & reading room
            </p>
            <h2 id="reading-title" className="text-step-4 text-ink">
              A room that keeps <span className="accent">your hours.</span>
            </h2>
            <p className="mt-6 max-w-lg text-step-1 text-ink-soft">
              Serious preparation needs a serious place. The academy reports a reading room open around the clock for focused study.
            </p>
          </div>
          <div className="min-w-0 self-end">
            <ul className="space-y-4">
              {features.map((f) => (
                <li key={f.t} className="flex items-center gap-4 border-b border-line pb-4 text-ink">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-mist text-brand">{f.icon}</span>
                  {f.t}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-ink-soft">Representative photograph. Confirm timings, access and membership with the academy.</p>
            <LinkButton href="/library" className="mt-8" icon={<ArrowRight size={17} aria-hidden />}>
              Enquire About Library Access
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export function MentorshipSection() {
  return (
    <section aria-labelledby="mentor-title" className="section-y bg-white">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
        <div className="min-w-0">
          <SectionHeading
            id="mentor-title"
            eyebrow="Faculty & mentorship"
            title={<>Guidance, <span className="accent">not just lectures.</span></>}
            lede="Mentoring helps you plan realistically, review honestly and adjust early: the habits that carry an aspirant through a long preparation."
          />
          <ol className="mt-10 divide-y divide-line border-y border-line">
            {[
              ["Plan", "Weekly targets matched to your stage and attempt year."],
              ["Practise", "Tests and answer writing with feedback you can act on."],
              ["Review", "Regular check-ins to diagnose weak areas early."],
              ["Adjust", "Strategy changes based on evidence, not anxiety."],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-6 py-5">
                <span className="font-serif text-xl italic text-brand">0{i + 1}</span>
                <div>
                  <p className="font-semibold text-ink">{t}</p>
                  <p className="text-ink-soft">{d}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link href="/faculty" className="mt-8 inline-flex items-center gap-2 font-semibold text-brand underline-offset-4 hover:underline">
            {faculty.length ? "Meet the faculty" : "How mentoring works"} <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
        <div className="relative min-w-0">
          <Photo photo={photos.lectureHall} sizes="(min-width: 1024px) 45vw, 100vw" parallax={6} className="aspect-[4/5] w-full lg:aspect-[5/6]" />
          <Photo photo={photos.focusedStudent} sizes="(min-width: 1024px) 20vw, 45vw" parallax={12} className="absolute -left-6 -bottom-10 hidden aspect-[4/3] w-[46%] ring-8 ring-white sm:block" />
        </div>
      </div>
    </section>
  );
}

export function ExperiencesSection() {
  return (
    <section aria-labelledby="exp-title" className="section-y bg-mist">
      <div className="container-x">
        <SectionHeading id="exp-title" eyebrow="Student experiences" title={<>In their <span className="accent">own words.</span></>} />
        {testimonials.length ? (
          <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <li key={t.name} className="rounded-[28px] bg-white p-8 ring-1 ring-line">
                <blockquote className="font-serif text-step-2 text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
                <p className="mt-6 font-semibold text-ink">{t.name}</p>
                <p className="text-sm text-ink-soft">{t.context}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-12 grid gap-6 rounded-[28px] bg-white p-8 ring-1 ring-line md:grid-cols-[1fr_auto] md:items-center sm:p-10">
            <p className="max-w-2xl text-step-1 text-ink-soft">
              We publish only verified experiences, shared with consent by Dakshina students. Follow the academy on Instagram for updates from classrooms and students.
            </p>
            <a href={instagram.profile} target="_blank" rel="noopener noreferrer" className={buttonClass("brand")}>
              <Instagram size={17} aria-hidden /> @{instagram.handle}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

export function ResourcesSection() {
  return (
    <section aria-labelledby="res-title" className="section-y bg-white">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="res-title" eyebrow="Resources" title={<>Start with the <span className="accent">primary sources.</span></>} />
          <LinkButton href="/resources" variant="outline" icon={<ArrowRight size={17} aria-hidden />} className="self-start md:self-auto">
            All resources
          </LinkButton>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {resources.slice(0, 4).map((r) => (
            <li key={r.href} className="min-w-0">
              <a href={r.href} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col rounded-[24px] bg-mist p-7 transition-[background-color,transform] duration-500 hover:-translate-y-1 hover:bg-brand">
                <span className="eyebrow text-brand group-hover:text-white/80">{r.kind}</span>
                <span className="mt-4 font-serif text-step-2 text-ink group-hover:text-white">{r.title}</span>
                <span className="mt-2 text-sm text-ink-soft group-hover:text-white/85">{r.description}</span>
                <ArrowUpRight size={20} aria-hidden className="mt-auto pt-5 text-brand group-hover:text-white" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section aria-labelledby="faq-title" className="section-y bg-white">
      <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)]">
        <SectionHeading id="faq-title" eyebrow="Questions" title={<>Frequently <span className="accent">asked.</span></>} />
        <Accordion items={homeFaqs} />
      </div>
    </section>
  );
}

export function EnquiryCta() {
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-brand text-white">
      <Image src={photos.libraryShelves.src} alt="" fill sizes="100vw" className="-z-20 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(90,34,150,0.96),rgba(108,54,174,0.9)_50%,rgba(132,72,192,0.82))]" />
      <div className="container-x section-y grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center">
        <div className="min-w-0">
          <h2 id="cta-title" className="text-step-5">
            Your question <span className="italic text-[#d9c4f3]">starts here.</span>
          </h2>
          <p className="mt-7 max-w-lg text-step-1 text-white/85">Talk to the academy about programmes, batches and the reading room on WhatsApp, by phone or on Instagram.</p>
          <LinkButton href="/admissions" variant="white" className="mt-10" icon={<ArrowRight size={17} aria-hidden />}>
            Begin your enquiry
          </LinkButton>
        </div>
        <ContactActions tone="dark" />
      </div>
    </section>
  );
}

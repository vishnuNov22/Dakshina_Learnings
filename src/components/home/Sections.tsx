import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Clock, Compass, Instagram, Lamp, Lightbulb, Newspaper, Users } from "lucide-react";
import { programmes } from "@/data/programmes";
import { resources } from "@/data/resources";
import { homeFaqs } from "@/data/faq";
import { faculty, testimonials } from "@/data/faculty";
import { media } from "@/data/media";
import { ArtImage } from "@/components/ui/ArtImage";
import { Accordion } from "@/components/ui/Accordion";
import { LinkButton, buttonClass } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProgrammeCard } from "@/components/programmes/ProgrammeCard";
import { ContactActions } from "@/components/contact/ContactActions";
import { instagram } from "@/lib/contact";

export function AcademyIntro() {
  const values = [
    { icon: <Lightbulb size={20} aria-hidden />, t: "Activity-based learning", d: "Classes built on doing — decoding, discussing, writing." },
    { icon: <Newspaper size={20} aria-hidden />, t: "Current affairs, analysed", d: "A Daily News Desk that links headlines to the syllabus." },
    { icon: <Compass size={20} aria-hidden />, t: "Strategic preparation", d: "Programmes like Prelims Hacker focus effort where it counts." },
    { icon: <Users size={20} aria-hidden />, t: "Expert mentoring", d: "Guidance that keeps preparation honest and on schedule." },
  ];
  return (
    <section id="journey" aria-labelledby="intro-title" className="section-y bg-navy">
      <div className="container-x grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-20">
        <div className="min-w-0">
          <SectionHeading
            id="intro-title"
            eyebrow="Dakshina Learnings · Thiruvananthapuram"
            title={
              <>
                Building tomorrow&rsquo;s <em className="text-gold-soft">civil servants.</em>
              </>
            }
          />
          <p className="mt-8 font-serif text-step-2 text-ivory/85">
            The Civil Services Examination doesn&rsquo;t reward the aspirant who reads the most. It rewards the one who thinks most clearly.
          </p>
          <p className="mt-6 max-w-xl text-ivory/70">
            Dakshina Learnings is a civil services academy in Thiruvananthapuram, Kerala, preparing aspirants for the UPSC Civil Services Examination through activity-based learning, current-affairs analysis, test series and mentoring.
          </p>
          <LinkButton href="/about" variant="ghost" className="mt-10" icon={<ArrowRight size={17} aria-hidden />}>
            About the academy
          </LinkButton>
        </div>
        <ul className="grid min-w-0 gap-4 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal as="li" key={v.t} delay={i * 0.08} className="min-w-0 rounded-2xl bg-ivory/[0.035] p-6 ring-1 ring-ivory/10">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-gold/15 text-gold">{v.icon}</span>
              <h3 className="mt-5 text-step-2">{v.t}</h3>
              <p className="mt-2 text-[0.95rem] text-ivory/65">{v.d}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function FeaturedProgrammes() {
  return (
    <section aria-labelledby="programmes-title" className="section-y bg-navy-2">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="programmes-title" eyebrow="Programmes" title={<>Choose your <em className="text-gold-soft">path in.</em></>} />
          <LinkButton href="/programmes" variant="ghost" icon={<ArrowRight size={17} aria-hidden />} className="self-start md:self-auto">
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
    <section aria-labelledby="reading-title" className="relative overflow-hidden bg-charcoal">
      <div className="grid lg:grid-cols-2">
        <ArtImage media={media.readingRoom} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-auto lg:min-h-[640px]" />
        <div className="section-y min-w-0 px-[var(--gutter)] lg:px-16">
          <p className="eyebrow mb-5 flex items-center gap-3 text-gold">
            <span aria-hidden className="h-px w-8 bg-current opacity-60" />
            Library & reading room
          </p>
          <h2 id="reading-title" className="text-step-4">
            A room that keeps <em className="text-gold-soft">your hours.</em>
          </h2>
          <p className="mt-6 max-w-lg text-step-1 text-ivory/70">
            Serious preparation needs a serious place. The academy reports a reading room open around the clock for focused, distraction-free study.
          </p>
          <ul className="mt-8 space-y-3">
            {features.map((f) => (
              <li key={f.t} className="flex items-center gap-3 text-ivory/80">
                <span className="text-gold">{f.icon}</span>
                {f.t}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-ivory/45">Confirm timings, access and membership with the academy.</p>
          <LinkButton href="/library" className="mt-8" icon={<ArrowRight size={17} aria-hidden />}>
            Enquire About Library Access
          </LinkButton>
        </div>
      </div>
    </section>
  );
}

export function MentorshipSection() {
  return (
    <section aria-labelledby="mentor-title" className="paper section-y">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-20">
        <SectionHeading
          id="mentor-title"
          tone="light"
          eyebrow="Faculty & mentorship"
          title={<>Guidance, <em className="text-blue">not just lectures.</em></>}
          lede="Mentoring helps you plan realistically, review honestly and adjust early — the habits that carry an aspirant through a long preparation."
        />
        <div className="min-w-0">
          <ol className="divide-y divide-ink/15 border-y border-ink/15">
            {[
              ["Plan", "Weekly targets matched to your stage and attempt year."],
              ["Practise", "Tests and answer-writing with feedback you can act on."],
              ["Review", "Regular check-ins to diagnose weak areas early."],
              ["Adjust", "Strategy changes based on evidence, not anxiety."],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-6 py-5">
                <span className="font-mono text-xs text-red">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="font-serif text-step-2 text-ink">{t}</p>
                  <p className="text-ink/70">{d}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link href="/faculty" className="mt-8 inline-flex items-center gap-2 font-semibold text-ink underline-offset-4 hover:underline">
            {faculty.length ? "Meet the faculty" : "How mentoring works"} <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ExperiencesSection() {
  return (
    <section aria-labelledby="exp-title" className="section-y bg-navy">
      <div className="container-x">
        <SectionHeading id="exp-title" eyebrow="Student experiences" title={<>In their <em className="text-gold-soft">own words.</em></>} />
        {testimonials.length ? (
          <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <li key={t.name} className="rounded-2xl bg-ivory/[0.04] p-7 ring-1 ring-ivory/10">
                <blockquote className="font-serif text-step-2">&ldquo;{t.quote}&rdquo;</blockquote>
                <p className="mt-6 font-semibold">{t.name}</p>
                <p className="text-sm text-ivory/55">{t.context}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-12 grid gap-6 rounded-2xl p-8 ring-1 ring-ivory/10 md:grid-cols-[1fr_auto] md:items-center">
            <p className="max-w-2xl text-step-1 text-ivory/70">
              We publish only verified experiences shared with consent by Dakshina students. Follow the academy on Instagram for updates from classrooms and students.
            </p>
            <a href={instagram.profile} target="_blank" rel="noopener noreferrer" className={buttonClass("ghost")}>
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
    <section aria-labelledby="res-title" className="section-y bg-navy-2">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="res-title" eyebrow="Resources" title={<>Start with the <em className="text-gold-soft">primary sources.</em></>} />
          <LinkButton href="/resources" variant="ghost" icon={<ArrowRight size={17} aria-hidden />} className="self-start md:self-auto">
            All resources
          </LinkButton>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {resources.slice(0, 4).map((r) => (
            <li key={r.href} className="min-w-0">
              <a href={r.href} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col rounded-2xl p-6 ring-1 ring-ivory/10 transition-colors hover:bg-ivory/[0.05] hover:ring-gold/50">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-gold">{r.kind}</span>
                <span className="mt-3 font-serif text-step-2">{r.title}</span>
                <span className="mt-2 text-sm text-ivory/60">{r.description}</span>
                <ArrowUpRight size={18} aria-hidden className="mt-auto pt-4 text-ivory/40 transition-colors group-hover:text-gold" />
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
    <section aria-labelledby="faq-title" className="paper section-y">
      <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)]">
        <SectionHeading id="faq-title" tone="light" eyebrow="Questions" title={<>Frequently <em className="text-blue">asked.</em></>} />
        <Accordion items={homeFaqs} />
      </div>
    </section>
  );
}

export function EnquiryCta() {
  return (
    <section aria-labelledby="cta-title" className="grain section-y relative overflow-hidden bg-blue">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 z-0 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(183,154,98,0.35),transparent)]" />
      <div className="container-x relative z-[2] grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center">
        <div className="min-w-0">
          <h2 id="cta-title" className="text-step-5">
            Your question <em className="text-gold-soft">starts here.</em>
          </h2>
          <p className="mt-6 max-w-lg text-step-1 text-ivory/80">Talk to the academy about programmes, batches and the reading room — on WhatsApp, by phone or on Instagram.</p>
          <LinkButton href="/admissions" className="mt-10" icon={<ArrowRight size={17} aria-hidden />}>
            Begin your enquiry
          </LinkButton>
        </div>
        <ContactActions />
      </div>
    </section>
  );
}

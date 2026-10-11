import { journey } from "@/data/journey";
import { photos } from "@/data/media";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Photo } from "@/components/ui/Photo";

export function JourneyTimeline() {
  return (
    <section aria-labelledby="journey-steps-title" className="section-y relative overflow-hidden bg-mist">
      <div className="container-x grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-24">
        <div className="min-w-0 lg:sticky lg:top-[calc(var(--header-h)+3rem)] lg:self-start">
          <SectionHeading
            id="journey-steps-title"
            eyebrow="The preparation journey"
            title={
              <>
                Five stages. <span className="accent">One direction.</span>
              </>
            }
            lede="The Civil Services Examination is a long road. Knowing its shape is the first act of strategy."
          />
          <Photo photo={photos.indiaGate} sizes="(min-width: 1024px) 40vw, 100vw" parallax={6} className="mt-12 hidden aspect-[4/5] w-full max-w-md lg:block" />
        </div>
        <ol className="relative min-w-0">
          <span aria-hidden className="absolute bottom-6 left-[19px] top-6 w-px bg-gradient-to-b from-brand via-brand/40 to-transparent" />
          {journey.map((j, i) => (
            <Reveal as="li" key={j.stage} delay={i * 0.06} className="relative pb-14 pl-16 last:pb-0">
              <span aria-hidden className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full bg-white font-serif text-lg italic text-brand shadow-[0_8px_20px_-10px_rgba(90,34,150,0.6)] ring-1 ring-line">
                {i + 1}
              </span>
              <p className="eyebrow text-brand">{j.caption}</p>
              <h3 className="mt-3 text-step-3 text-ink">{j.title}</h3>
              <p className="mt-3 max-w-lg text-ink-soft">{j.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

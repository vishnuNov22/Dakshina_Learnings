import { journey } from "@/data/journey";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function JourneyTimeline() {
  return (
    <section aria-labelledby="journey-steps-title" className="section-y relative bg-navy">
      <div className="container-x">
        <SectionHeading
          id="journey-steps-title"
          eyebrow="The preparation journey"
          title={
            <>
              Five stages. <em className="text-gold-soft">One direction.</em>
            </>
          }
          lede="The Civil Services Examination is a long road. Knowing its shape is the first act of strategy."
        />
        <ol className="relative mt-16 grid gap-0 lg:grid-cols-5">
          <span aria-hidden className="absolute bottom-0 left-[11px] top-0 w-px bg-gradient-to-b from-gold/70 via-gold/30 to-transparent lg:left-0 lg:right-0 lg:top-[11px] lg:h-px lg:w-auto lg:bg-gradient-to-r" />
          {journey.map((j, i) => (
            <Reveal as="li" key={j.stage} delay={i * 0.08} className="relative min-w-0 pb-10 pl-10 lg:pb-0 lg:pl-0 lg:pr-6 lg:pt-12">
              <span aria-hidden className="absolute left-0 top-1 grid h-6 w-6 place-items-center rounded-full bg-navy ring-1 ring-gold lg:top-0">
                <span className="h-2 w-2 rounded-full bg-gold" />
              </span>
              <p className="font-mono text-xs text-gold">{j.stage}</p>
              <h3 className="mt-2 text-step-2">{j.title}</h3>
              <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ivory/50">{j.caption}</p>
              <p className="mt-3 text-[0.95rem] text-ivory/70">{j.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

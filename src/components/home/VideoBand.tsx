"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { heroVideo, photos } from "@/data/media";

/** Full-bleed real footage of focused study, graded in brand purple. Photo shows until/unless the video loads. */
export function VideoBand() {
  const [allow, setAllow] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    setAllow(!reduce && !conn?.saveData);
  }, []);
  return (
    <section aria-label="Inside preparation" className="relative isolate overflow-hidden bg-brand-dark text-white">
      <Image src={photos.heroPoster.src} alt="" fill sizes="100vw" className="-z-20 object-cover" style={{ objectPosition: photos.heroPoster.focus }} />
      {allow ? (
        <video
          className="absolute inset-0 -z-20 h-full w-full object-cover transition-opacity duration-[1.6s]"
          style={{ opacity: ready ? 1 : 0 }}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          onCanPlay={() => setReady(true)}
        >
          <source src={heroVideo.mobile} type="video/mp4" media="(max-width: 767px)" />
          <source src={heroVideo.desktop} type="video/mp4" />
        </video>
      ) : null}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(46,17,85,0.94)_0%,rgba(90,34,150,0.72)_50%,rgba(108,54,174,0.3)_100%)]" />
      <div className="container-x py-[calc(var(--section-y)*1.15)]">
        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-6 text-white/80">Mains answer writing</p>
          <p className="font-serif text-[clamp(2.1rem,1.3rem+3.4vw,4.8rem)] font-medium leading-[1.04] tracking-[-0.02em]">
            Clarity on paper begins with <span className="font-normal italic text-[#d9c4f3]">clarity in thought.</span>
          </p>
          <LinkButton href="/programmes/mains-answer-writing" variant="white" className="mt-10" icon={<ArrowRight size={17} aria-hidden />}>
            Answer-writing programme
          </LinkButton>
        </Reveal>
      </div>
    </section>
  );
}

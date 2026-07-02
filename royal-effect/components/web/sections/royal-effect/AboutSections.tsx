"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { GlitchText } from "@/components/web/utils/GlitchText";
import { SquigglyText } from "@/components/ui/squiggly-text";

export function AboutSections() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const elements = rootRef.current.querySelectorAll("[data-animate]");

    gsap.fromTo(
      elements,
      { y: 28, opacity: 0,  }, // initial state with a small delay
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.6, // each element waits 0.6s after the previous one starts
        ease: "power3.out",
        delay: 0.9, // small pause before the sequence begins on page load
      }
    );
  }, []);

  return (
    <section ref={rootRef} className="relative bg-background overflow-hidden ">
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-between w-full max-w-7xl mx-auto px-6 lg:px-10 opacity-20">
        <div className="w-px h-full bg-border" />
        <div className="w-px h-full bg-border" />
        <div className="w-px h-full bg-border hidden md:block" />
        <div className="w-px h-full bg-border hidden lg:block" />
      </div>

      <section className="relative border-b border-border py-24 lg:py-36 min-h-dvh flex flex-col justify-center">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="max-w-5xl flex flex-col items-start text-left">
            <GlitchText className="text-sm block text-[11px] font-bold font-ibm-plex-sans tracking-widest uppercase text-muted-foreground mb-6">
              About Royal Effect
            </GlitchText>

            <h1
              data-animate
              className="font-vermin-vibes text-[clamp(3rem,11vw,11rem)] leading-[0.92] uppercase text-foreground max-w-[11ch]"
            >
              Logo Is Not A{" "}
              <SquigglyText scale={[3, 5]} className="text-green inline-block">
                Brand {""}
              </SquigglyText>
            </h1>

            <p
              data-animate
              className="mt-24 max-w-3xl text-lg sm:text-xl leading-relaxed text-muted-foreground font-medium"
            >
              Most studios sell you a logo. We build the thing that makes the
              logo work — positioning, system, and a story people actually
              remember.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}

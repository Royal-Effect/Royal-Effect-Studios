"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { GlitchText } from "@/components/web/utils/GlitchText";
import { SquigglyText } from "@/components/ui/squiggly-text";

export function ContactHeroSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const elements = rootRef.current.querySelectorAll("[data-animate]");

    gsap.fromTo(
      elements,
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.6,
        ease: "power3.out",
        delay: 0.9,
      }
    );
  }, []);

  return (
    <section ref={rootRef} className="relative bg-background overflow-hidden border-b border-border">
      {/* Background Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-between w-full max-w-7xl mx-auto px-6 lg:px-10 opacity-20">
        <div className="w-px h-full bg-border" />
        <div className="w-px h-full bg-border" />
        <div className="w-px h-full bg-border hidden md:block" />
        <div className="w-px h-full bg-border hidden lg:block" />
      </div>

      <div className="relative py-24 lg:py-36 min-h-[50dvh] flex flex-col justify-center">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="max-w-4xl flex flex-col items-start text-left">
            <GlitchText className="text-sm block text-[11px] font-bold font-ibm-plex-sans tracking-widest uppercase text-muted-foreground mb-6">
              Get in Touch
            </GlitchText>

            <h1
              data-animate
              className="font-vermin-vibes text-[clamp(4rem,11vw,10rem)] leading-[0.92] uppercase text-foreground max-w-7xl"
            >
              Let's Build Your
              <SquigglyText scale={[3, 5]} className="text-green inline-block">
                Legacy
              </SquigglyText>
            </h1>

            <p
              data-animate
              className="mt-8 max-w-2xl text-lg sm:text-xl leading-relaxed text-muted-foreground font-medium"
            >
              Ready to create a brand that commands attention and leaves a lasting impact? We're here to make it happen. Reach out and let's start shaping your Royal Effect.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

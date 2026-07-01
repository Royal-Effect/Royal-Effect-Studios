"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlitchText } from "@/components/web/GlitchText";
import { SquigglyText } from "@/components/ui/squiggly-text";

gsap.registerPlugin(ScrollTrigger);

export function StudioEthos() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    // Simple scroll-based fade up for paragraphs
    const paragraphs = textRef.current.querySelectorAll("p");
    
    paragraphs.forEach((p, i) => {
      gsap.fromTo(
        p,
        { opacity: 0.2, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: p,
            start: "top 90%",
            end: "top 60%",
            scrub: 1,
          },
        }
      );
    });

  }, []);

  return (
    <section ref={containerRef} className="relative py-32 lg:py-48 bg-background border-b border-border overflow-hidden">
      
      {/* Background massive watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] dark:opacity-[0.015] z-0 overflow-hidden">
        <h2 className="font-vermin-vibes text-[30vw] leading-none text-foreground whitespace-nowrap">
          ETHOS
        </h2>
      </div>

      <div className="w-full max-w-[80rem] mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left Column: Heading */}
          <div className="lg:col-span-5">
            <h2 className="font-vermin-vibes text-[clamp(3rem,8vw,6rem)] leading-[0.85] uppercase text-foreground mb-6">
              The <span className="text-muted-foreground">Standard</span>
            </h2>
            <div className="w-12 h-[2px] bg-green mb-8" />
            <GlitchText className="text-sm font-bold tracking-[0.2em] uppercase text-foreground inline-block">
              // Zero Compromise
            </GlitchText>
          </div>

          {/* Right Column: Ethos Text */}
          <div ref={textRef} className="lg:col-span-7 flex flex-col gap-8 text-xl sm:text-2xl lg:text-3xl font-medium leading-snug text-muted-foreground">
            <p className="text-foreground">
              Most design agencies sell you a senior partner in the pitch meeting, but hand your actual brand off to a junior designer the next day.
            </p>
            <p>
              We don't do hand-offs. We don't do <SquigglyText scale={[2, 4]} className="text-foreground inline-block">middle management</SquigglyText>. We don't do fluff.
            </p>
            <p>
              When you hire <SquigglyText scale={[2, 4]} className="text-green inline-block">Royal Effect</SquigglyText>, you get the person who actually cares about the pixels, the strategy, and the final <SquigglyText scale={[2, 4]} className="text-foreground inline-block">outcome</SquigglyText>. We build brands that cut through the noise, dominate their category, and mean <SquigglyText scale={[3, 5]} className="text-foreground inline-block">business</SquigglyText>.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

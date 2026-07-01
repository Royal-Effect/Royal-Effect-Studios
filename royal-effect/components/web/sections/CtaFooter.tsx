"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlitchText } from "@/components/web/GlitchText";
import { SquigglyText } from "@/components/ui/squiggly-text";

gsap.registerPlugin(ScrollTrigger);

export function CtaFooter() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll(".cta-anim"),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="relative py-40 min-h-[80vh] flex flex-col items-center justify-center bg-background text-foreground overflow-hidden border-t border-border">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-green/20 rounded-full blur-[150px] pointer-events-none opacity-40 mix-blend-screen" />

      <div className="w-full max-w-[80rem] mx-auto px-6 lg:px-10 relative z-10 flex flex-col items-center text-center">
        
        <span className="cta-anim text-xs font-bold tracking-[0.3em] uppercase text-green mb-8 block">
          Initiate Sequence
        </span>

        <h2 className="cta-anim font-vermin-vibes text-[clamp(4rem,15vw,15rem)] leading-[0.8] uppercase mb-12">
          Let's <br />
          <span className="text-muted-foreground relative inline-block">
            
            <SquigglyText
              stepDuration={50}
              scale={[4, 8]}
              className="text-green"
            >
              Talk
            </SquigglyText>{" "}
          </span>
        </h2>

        <p className="cta-anim text-muted-foreground text-lg sm:text-xl max-w-[40ch] mx-auto mb-16 font-medium">
          Ready to build a brand that commands attention and crushes the competition? 
        </p>

        <div className="cta-anim flex flex-col sm:flex-row items-center gap-8">
          <Link
            href="/contact"
            className="px-10 py-5  text-muted-foreground text-sm font-bold tracking-[0.1em] uppercase hover:bg-green hover:text-white transition-colors duration-300"
          >
            Contact Us  
          </Link>
          
          <Link
            href="mailto:hello@royaleffect.com"
            className="group relative px-2 py-4 text-sm font-bold tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            hello@royaleffect.com
            <span className="absolute bottom-2 left-2 right-2 h-[1px] bg-muted-foreground group-hover:bg-green transition-all duration-300 ease-out" />
          </Link>
        </div>

      </div>
    </section>
  );
}

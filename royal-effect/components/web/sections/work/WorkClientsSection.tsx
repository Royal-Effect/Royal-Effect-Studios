"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SquigglyText } from "@/components/ui/squiggly-text";

const clients = [
  "Bloom of a Thousand Flowers",
  "Adeluola",
  "The Artisan Co.",
  "Nexus Digital",
  "Aura Beauty",
  "Vanguard Media",
  "Elevate Partners",
  "Quantum Labs",
];

export function WorkClientsSection() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current || !trackRef.current) return;

    // Create a smooth, infinite horizontal scroll
    const totalWidth = trackRef.current.scrollWidth / 2; // Since we duplicate the content

    const tween = gsap.to(trackRef.current, {
      x: -totalWidth,
      ease: "none",
      duration: 30, // Adjust speed
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section className="py-32 bg-background border-b border-border overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="font-vermin-vibes text-[clamp(3rem,6vw,5rem)] leading-none uppercase text-foreground">
            Trusted <br className="hidden md:block" />
            <span className="text-muted-foreground">Partners</span>
          </h2>
          <p className="text-sm font-bold tracking-widest uppercase text-muted-foreground sm:max-w-full md:max-w-xs md:text-right">
            Collaborating with{" "}
            <SquigglyText scale={[2, 3]} className="text-green inline-block">
              industry leaders
            </SquigglyText>{" "}
            to push boundaries.
          </p>
        </div>
      </div>

      <div ref={marqueeRef} className="w-full overflow-hidden flex whitespace-nowrap border-y border-border py-8 lg:py-12 bg-foreground/5 relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 lg:w-64 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 lg:w-64 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <div ref={trackRef} className="flex items-center gap-16 lg:gap-32 px-8 will-change-transform">
          {[...clients, ...clients].map((client, index) => (
            <div key={index} className="flex items-center gap-16 lg:gap-32">
              <span className="font-vermin-vibes text-4xl lg:text-7xl text-foreground uppercase tracking-widest opacity-80 hover:opacity-100 hover:text-green transition-all duration-300 cursor-default">
                {client}
              </span>
              <span className="text-green text-3xl opacity-50">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

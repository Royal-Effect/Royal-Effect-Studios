"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlitchText } from "@/components/web/GlitchText";
import { SquigglyText } from "@/components/ui/squiggly-text";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: "01",
    title: "Brand Identity",
    description: "Comprehensive visual systems including logos, typography, color palettes, and brand guidelines built to dominate your industry."
  },
  {
    id: "02",
    title: "Web Design",
    description: "High-performance, Neo-Brutalist digital experiences that convert visitors into absolute fanatics."
  },
  {
    id: "03",
    title: "Strategy",
    description: "Data-driven positioning, naming, and competitive analysis to ensure your brand doesn't just look good, but actually means business."
  },
  {
    id: "04",
    title: "Art Direction",
    description: "Custom photography, 3D assets, and motion graphics that elevate your brand's perceived value out of the stratosphere."
  }
];

export function WhatWeOffer() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll(".service-row"),
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 lg:py-48 bg-background border-b border-border overflow-hidden">
      <div className="w-full max-w-[80rem] mx-auto px-6 lg:px-10 relative z-10">
        
        {/* Header */}
        <div className="mb-20">
          <GlitchText className="text-sm font-bold tracking-[0.2em] uppercase text-green mb-6 inline-block">
            // Core Competencies
          </GlitchText>
          <h2 className="font-vermin-vibes text-[clamp(3rem,8vw,6rem)] leading-[0.85] uppercase text-foreground">
            What We <SquigglyText scale={[2, 3]} className="text-muted-foreground inline-block">Offer</SquigglyText>
          </h2>
        </div>

        {/* Services List */}
        <div className="flex flex-col border-t border-border">
          {SERVICES.map((service, idx) => (
            <div 
              key={service.id}
              className="service-row group relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-10 md:py-16 border-b border-border transition-colors duration-300 hover:bg-foreground/5 cursor-crosshair"
              onMouseEnter={() => setActiveIdx(idx)}
              onMouseLeave={() => setActiveIdx(null)}
            >
              {/* ID Number */}
              <div className="md:col-span-2 flex items-start">
                <span className={`font-vermin-vibes text-4xl sm:text-5xl transition-colors duration-300 ${activeIdx === idx ? 'text-green' : 'text-muted-foreground'}`}>
                  {service.id}
                </span>
              </div>
              
              {/* Title & Desc */}
              <div className="md:col-span-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <h3 className="font-vermin-vibes text-4xl sm:text-5xl lg:text-7xl uppercase text-foreground group-hover:translate-x-4 transition-transform duration-500 ease-out">
                  {service.title}
                </h3>
                <p className="text-lg text-muted-foreground max-w-sm font-medium leading-relaxed group-hover:text-foreground transition-colors duration-300">
                  {service.description}
                </p>
              </div>

              {/* Minimal structural plus icon on the right (desktop only) */}
              <div className="hidden absolute right-6 top-1/2 -translate-y-1/2 md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-90">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green">
                   <path d="M12 5v14M5 12h14"/>
                 </svg>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

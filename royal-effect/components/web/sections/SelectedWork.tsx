"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SquigglyText } from "@/components/ui/squiggly-text";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    client: "Apex Industries",
    category: "Brand Identity",
    color: "bg-surface-2",
  },
  {
    id: 2,
    client: "Neon Forge",
    category: "Web Design & Strategy",
    color: "bg-surface",
  },
  {
    id: 3,
    client: "Vanguard Edge",
    category: "Logo Design",
    color: "bg-surface-2",
  },
];

export function SelectedWork() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(".work-card");

    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 bg-background border-b border-border">
      <div className="w-full max-w-[80rem] mx-auto px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <h2 className="font-vermin-vibes text-[clamp(2.5rem,6vw,5rem)] leading-none uppercase text-foreground">
            Selected <br />
            <span className="text-muted-foreground">Work</span>
          </h2>
          <p className="text-sm font-bold tracking-[0.1em] uppercase text-muted-foreground max-w-xs md:text-right">
            We partner with <SquigglyText scale={[2, 3]} className="text-green inline-block">visionary founders</SquigglyText> to build category-defining brands.
          </p>
        </div>

        {/* Project Grid */}
        <div className="flex flex-col gap-12 lg:gap-24">
          {PROJECTS.map((project, idx) => (
            <Link
              key={project.id}
              href="/work"
              className="work-card group block relative w-full"
            >
              {/* Image Placeholder */}
              <div className={`relative w-full aspect-[4/3] lg:aspect-[16/9] ${project.color} overflow-hidden border border-border`}>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                
                {/* Simulated Image Content */}
                <div className="absolute inset-0 flex items-center justify-center p-10">
                   <h3 className="font-vermin-vibes text-4xl sm:text-6xl lg:text-8xl text-border opacity-20 uppercase tracking-widest group-hover:scale-105 group-hover:opacity-10 transition-all duration-700 ease-out">
                     {project.client}
                   </h3>
                </div>
              </div>

              {/* Meta */}
              <div className="mt-6 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground uppercase tracking-wider mb-2">
                    {project.client}
                  </h3>
                  <p className="text-sm text-muted-foreground font-semibold uppercase tracking-[0.1em]">
                    {project.category}
                  </p>
                </div>
                
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:border-foreground group-hover:text-background transition-colors duration-300">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

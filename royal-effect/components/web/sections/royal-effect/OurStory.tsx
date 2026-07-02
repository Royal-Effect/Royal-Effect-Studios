"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlitchText } from "../../utils/GlitchText";
import { ourStoryTimelineData } from "@/libs/constants/ourStoryTimelineData";
import type { OurStoryTimelineInterface } from "@/libs/interfaces/ourStoryTimeline";

gsap.registerPlugin(ScrollTrigger);

interface TimelineCardProps {
  step: OurStoryTimelineInterface;
  index: number;
  cardRef: (el: HTMLDivElement | null) => void;
}

const TimelineCard = React.memo(function TimelineCard({
  step,
  index,
  cardRef,
}: TimelineCardProps) {
  const Icon = step.icon;

  return (
    <div
      ref={cardRef}
      data-timeline-card
      className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-0"
    >
      <div
        className={`flex ${
          step.side === "left"
            ? "lg:justify-end lg:pr-10"
            : "lg:order-3 lg:pl-10"
        }`}
      >
        <div className="w-full max-w-3xl bg-foreground/5 p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-green inline-flex items-center gap-2">
                <Icon className="h-4 w-4" aria-hidden="true" />
                {step.year}
              </span>
              <h3 className="mt-4 font-vermin-vibes text-[clamp(1.8rem,3vw,3.1rem)] leading-[0.95] uppercase text-foreground">
                {step.title}
              </h3>
            </div>
            <span className="text-4xl font-vermin-vibes text-muted-foreground/40 " aria-hidden="true">
              0{index + 1}
            </span>
          </div>

          <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
            {step.text}
          </p>
        </div>
      </div>

      {/* connector column — decorative, no dot */}
      <div className="relative hidden lg:flex items-center justify-center" aria-hidden="true" />

      <div
        className={`${
          step.side === "right" ? "lg:justify-end lg:pr-10" : "lg:pl-10"
        }`}
      />
    </div>
  );
});

const OurStory = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;

    // trim stale refs if the dataset ever shrinks
    cardsRef.current = cardsRef.current.slice(0, ourStoryTimelineData.length);

    const mm = gsap.matchMedia();

    mm.add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        noPreference: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { reduceMotion } = context.conditions as { reduceMotion: boolean };

        const ctx = gsap.context(() => {
          const headerElements = section.querySelectorAll("[data-gsap]");

          if (reduceMotion) {
            // just make everything visible, skip motion entirely
            gsap.set(headerElements, { opacity: 1, y: 0 });
            gsap.set(cardsRef.current.filter(Boolean), { opacity: 1, y: 0 });
            return;
          }

          gsap.fromTo(
            headerElements,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
              },
            }
          );

          cardsRef.current.forEach((card, index) => {
            if (!card) return;

            gsap.fromTo(
              card,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 1.4,
                delay: index * 0.15,
                ease: "power4.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 80%",
                  end: "bottom 20%",
                  toggleActions: "play reverse play reverse",
                },
              }
            );
          });
        }, sectionRef);

        return () => ctx.revert();
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-background border-b border-border overflow-hidden mb-6"
    >
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <h2
            data-gsap
            className="font-vermin-vibes text-[clamp(3rem,6vw,5rem)] leading-none uppercase text-foreground"
          >
            Our <br className="hidden md:block" />
            <span className="text-muted-foreground">Story</span>
          </h2>
          <p
            data-gsap
            className="text-sm font-bold tracking-widest uppercase text-muted-foreground max-w-full md:text-right"
          >
            We build from the inside out, so the identity, strategy, and
            delivery all stay aligned.
          </p>
        </div>

        <div className="relative mt-20 lg:mt-24 pt-2 lg:pt-10">
          <div
            className="absolute left-4 top-0 hidden lg:block bottom-0 w-px bg-border lg:left-1/2 lg:-translate-x-1/2"
            aria-hidden="true"
          />
          <ol className="relative flex flex-col gap-8 lg:gap-10 list-none">
            {ourStoryTimelineData.map((step, index) => (
              <li key={step.year}>
                <TimelineCard
                  step={step}
                  index={index}
                  cardRef={(el) => {
                    cardsRef.current[index] = el;
                  }}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
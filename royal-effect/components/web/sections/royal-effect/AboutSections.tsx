"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlitchText } from "@/components/web/utils/GlitchText";
import { SquigglyText } from "@/components/ui/squiggly-text";

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  {
    id: "01",
    title: "Our Story",
    description:
      "Royal Effect Studios started with a simple rule: the person who shapes the strategy should also shape the final design. That keeps the work focused, fast, and accountable.",
  },
  {
    id: "02",
    title: "Our Mission",
    description:
      "We build brand identities that feel premium, communicate clearly, and create a stronger position in the market from day one.",
  },
  {
    id: "03",
    title: "Our Vision",
    description:
      "To be the studio founders trust when they want a sharp identity, a clean digital presence, and a brand that actually holds attention.",
  },
];

const PROCESS = [
  {
    title: "Strategy First",
    text: "We begin with positioning, audience insight, and the practical goals behind the brand.",
  },
  {
    title: "Design With Intent",
    text: "Every system, type choice, and layout decision supports the message, not just the aesthetic.",
  },
  {
    title: "Built to Scale",
    text: "The identity is designed to work across launch assets, social systems, web, and future growth.",
  },
  {
    title: "Hands-On Delivery",
    text: "The same person guides the work through to completion, so the result stays consistent.",
  },
];

const SERVICES = [
  "Brand identity systems",
  "Logo design and refinement",
  "Web direction and layout systems",
  "Creative strategy and art direction",
];

export function AboutSections() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    gsap.fromTo(
      rootRef.current.querySelectorAll("[data-animate]"),
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  return (
    <section ref={rootRef} className="relative bg-background overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
        <div className="absolute left-0 top-0 h-full w-px bg-border" />
        <div className="absolute right-0 top-0 h-full w-px bg-border" />
      </div>

      <section className="relative border-b border-border py-24 lg:py-36">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="max-w-5xl">
            <GlitchText className="text-sm font-bold tracking-[0.2em] uppercase text-green mb-6 inline-block">
              // About Royal Effect
            </GlitchText>

            <h1 data-animate className="font-vermin-vibes text-[clamp(3rem,9vw,7rem)] leading-[0.92] uppercase text-foreground max-w-[11ch]">
              Built Around <SquigglyText scale={[3, 5]} className="text-green inline-block">Intent</SquigglyText>
            </h1>

            <p data-animate className="mt-8 max-w-3xl text-lg sm:text-xl leading-relaxed text-muted-foreground font-medium">
              Royal Effect Studios is a brand identity studio focused on the
              structure behind the look. We shape the story, define the
              position, and design the system that carries the brand forward.
            </p>

            <div data-animate className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                "Strategy-led identity work",
                "Hands-on creative direction",
                "Built for modern launch needs",
              ].map((item) => (
                <div
                  key={item}
                  className="border border-border bg-foreground/5 px-5 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-foreground"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-b border-border py-20 lg:py-28">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 relative z-10 grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <GlitchText className="text-sm font-bold tracking-[0.2em] uppercase text-orange mb-5 inline-block">
              // Our Story
            </GlitchText>
            <h2 className="font-vermin-vibes text-[clamp(2.4rem,6vw,4.8rem)] leading-[0.9] uppercase text-foreground">
              A studio with a <span className="text-muted-foreground">clear point of view</span>
            </h2>
          </div>

          <div className="lg:col-span-8 grid gap-6 sm:grid-cols-2">
            <div data-animate className="border border-border bg-background p-6 sm:p-8">
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                The work began with a frustration that many brands feel: too
                many hands in the process, too little ownership in the final
                outcome. Royal Effect was built to remove that disconnect.
              </p>
            </div>
            <div data-animate className="border border-border bg-background p-6 sm:p-8">
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                That means fewer handoffs, sharper decisions, and a brand system
                that stays coherent from the first conversation to launch day.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-b border-border py-20 lg:py-28">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid gap-6 lg:grid-cols-3">
            {VALUES.map((item) => (
              <article
                key={item.id}
                data-animate
                className="group border border-border bg-foreground/5 p-7 sm:p-8 transition-colors duration-300 hover:bg-foreground/10"
              >
                <div className="flex items-start justify-between gap-4 mb-10">
                  <span className="font-vermin-vibes text-4xl text-green">{item.id}</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Core
                  </span>
                </div>
                <h3 className="font-vermin-vibes text-3xl sm:text-4xl uppercase text-foreground mb-4">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-b border-border py-20 lg:py-28">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 relative z-10 grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <GlitchText className="text-sm font-bold tracking-[0.2em] uppercase text-green mb-5 inline-block">
              // What We Do
            </GlitchText>
            <h2 className="font-vermin-vibes text-[clamp(2.4rem,6vw,4.8rem)] leading-[0.9] uppercase text-foreground">
              The work behind the <span className="text-muted-foreground">brand</span>
            </h2>
          </div>

          <div className="lg:col-span-8 grid gap-4 sm:grid-cols-2">
            {SERVICES.map((service, index) => (
              <div
                key={service}
                data-animate
                className="border border-border bg-background p-6 sm:p-7 flex items-center justify-between gap-4"
              >
                <span className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  0{index + 1}
                </span>
                <span className="text-base sm:text-lg font-semibold uppercase tracking-[0.08em] text-foreground text-right">
                  {service}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 lg:py-28">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4">
              <GlitchText className="text-sm font-bold tracking-[0.2em] uppercase text-orange mb-5 inline-block">
                // Our Process
              </GlitchText>
              <h2 className="font-vermin-vibes text-[clamp(2.4rem,6vw,4.8rem)] leading-[0.9] uppercase text-foreground">
                How the work <span className="text-muted-foreground">moves</span>
              </h2>
            </div>

            <div className="lg:col-span-8 grid gap-4 sm:grid-cols-2">
              {PROCESS.map((step, index) => (
                <div
                  key={step.title}
                  data-animate
                  className="border border-border bg-foreground/5 p-6 sm:p-8"
                >
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span className="font-vermin-vibes text-3xl text-muted-foreground">
                      0{index + 1}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-green">
                      Step
                    </span>
                  </div>
                  <h3 className="font-vermin-vibes text-3xl uppercase text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
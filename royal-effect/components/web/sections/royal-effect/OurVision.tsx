"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { GlitchText } from "@/components/web/utils/GlitchText";
import { SquigglyText } from "@/components/ui/squiggly-text";
import { ourVisionCoreValuesData } from "@/libs/constants/ourVisionCoreValuesData";

gsap.registerPlugin(ScrollTrigger);

export function OurVision() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const animatedElements = containerRef.current?.querySelectorAll(
        "[data-vision-animate]"
      );

      if (!animatedElements) return;

      gsap.fromTo(
        animatedElements,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-32 lg:py-48 bg-background border-b border-border overflow-hidden"
    >
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] dark:opacity-[0.05] z-0 overflow-hidden"
        aria-hidden="true"
      >
        <h2 className="font-vermin-vibes text-[40vw] leading-none text-foreground whitespace-nowrap">
          VISION
        </h2>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Header row — title and sub spread apart */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <h2
            data-vision-animate
            className="font-vermin-vibes text-[clamp(3rem,8vw,6rem)] leading-[0.85] uppercase text-foreground max-w-2xl"
          >
            Brand <span className="text-muted-foreground">first</span>{" "}
            <SquigglyText scale={[2, 4]} className="text-green inline-block">
              Category
            </SquigglyText>
            later
          </h2>

          <div className="lg:max-w-sm lg:text-right">
            <p
              data-vision-animate
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed"
            >
              Our vision is to give every Royal Effect brand a{" "}
              <SquigglyText scale={[2, 4]} className="text-green inline-block">
                clear spine.{""}
              </SquigglyText>
              {""} A point of view, a disciplined system, and a visual language
              that stays sharp as the business grows.
            </p>
          </div>
        </div>

        {/* Core value cards — flexed full width below */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:items-start">
          {ourVisionCoreValuesData.map((value, index) => {
            const Icon = value.icon;

            return (
              <motion.article
                key={value.id}
                initial={{ opacity: 0, y: 40 + index * 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.75,
                  ease: "easeOut",
                  delay: index * 0.08,
                }}
                className={`flex-1 w-full border border-border bg-foreground/5 p-6 sm:p-8 flex flex-col gap-6 ${
                  index === 1 ? "lg:mt-12" : index === 2 ? "lg:mt-24" : index === 3 ? "lg:mt-36" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-green">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Core Value {value.id}
                  </span>
                </div>

                <div>
                  <h3 className="font-vermin-vibes text-3xl sm:text-4xl uppercase text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                    {value.description}
                  </p>
                </div>

                <div className="flex items-center justify-end text-green mt-auto">
                  <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

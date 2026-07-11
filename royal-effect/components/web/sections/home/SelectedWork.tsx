"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SquigglyText } from "@/components/ui/squiggly-text";
import { SelectedWorkInterface } from "@/libs/interfaces/selectedWork";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { urlFor } from "@/sanity/lib/image";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function SelectedWork({ projects }: { projects: SelectedWorkInterface[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".work-card");
      cards.forEach((card: any) => {
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
    }, containerRef);

    return () => ctx.revert();
  }, [projects]);

  return (
    <section
      ref={containerRef}
      className="relative py-32 bg-background border-b border-border"
    >
      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <h2 className="font-vermin-vibes text-[clamp(3rem,6vw,5rem)] leading-none uppercase text-foreground">
            Selected <br className="hidden md:block" />
            <span className="text-muted-foreground">Work</span>
          </h2>
          <p className="text-sm font-bold tracking-widest uppercase text-muted-foreground sm:max-w-full md:max-w-xs md:text-right">
            We partner with{" "}
            <SquigglyText scale={[2, 3]} className="text-green inline-block">
              visionary founders
            </SquigglyText>{" "}
            to build category-defining brands.
          </p>
        </div>

        {/* Project Grid - Vertical Stack */}
        <div className="flex flex-col gap-16 lg:gap-32">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/work/${project.slug}`}
              className="work-card group block relative w-full"
            >
              {project.displayImage ? (
                <div className="bg-transparent overflow-hidden group/card relative w-full md:w-full h-auto md:h-auto aspect-[4/3] lg:aspect-video border border-border rounded-none">
                  <div className="relative h-full w-full">
                    <div className="group-hover/card:block hidden absolute inset-0 w-full h-full bg-black/40 z-10 transition duration-500"></div>
                    <div className="h-full w-full relative bg-gray-50 dark:bg-black">
                      <img
                        alt={project.title}
                        className="h-full w-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
                        width={1200}
                        height={1200}
                        src={urlFor(project.displayImage.image).width(1200).url()}
                      />
                    </div>
                    <div className="text-white absolute bottom-4 left-4 z-40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500">
                      <p className="font-bold text-xl uppercase tracking-widest bg-background/80 text-foreground px-4 py-2 border border-border backdrop-blur-sm">
                        View Case Study
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={`relative w-full aspect-video lg:aspect-[16/9] ${project.color} overflow-hidden border border-border`}
                >
                  <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <div className="absolute inset-0 flex items-center justify-center p-10">
                    <h3 className="font-vermin-vibes text-4xl sm:text-6xl lg:text-8xl text-border opacity-20 uppercase tracking-widest group-hover:scale-105 group-hover:opacity-10 transition-all duration-700 ease-out">
                      {project.title}
                    </h3>
                  </div>
                </div>
              )}
              {/* Meta */}
              <div className="mt-6 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground capitalize tracking-wider mb-2">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[11px] text-foreground font-bold uppercase tracking-[0.2em]">
                      {project.client}
                    </p>
                    <span className="text-muted-foreground opacity-50">•</span>
                    <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-[0.2em]">
                      {project.category?.title ?? ""}
                    </p>
                  </div>
                </div>

                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:border-foreground group-hover:text-background transition-colors duration-300 flex-shrink-0">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}

          {/* View All Button at the very end of the vertical stack */}
          <div className="w-full flex items-center justify-center pt-8">
            <Link
              href="/work"
              className="group inline-flex items-center gap-3 px-10 py-5 text-[10px] font-bold uppercase tracking-[0.2em] border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
            >
              View All Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

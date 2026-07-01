"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { GlitchText } from "@/components/web/GlitchText";
import { SquigglyText } from "@/components/ui/squiggly-text";

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();

    // Quiet stagger reveal — no bounce, no flash, nothing that competes with the work
    tl.fromTo(
      containerRef.current.querySelectorAll(".hero-anim"),
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.15 }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-background border-b border-border"
    >
      {/* Structural Grid Lines (Neo-brutalism characteristic) */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-between w-full max-w-[80rem] mx-auto px-6 lg:px-10 opacity-20">
        <div className="w-[1px] h-full bg-border" />
        <div className="w-[1px] h-full bg-border" />
        <div className="w-[1px] h-full bg-border hidden md:block" />
        <div className="w-[1px] h-full bg-border hidden lg:block" />
      </div>
      <div className="w-full max-w-[80rem] mx-auto px-6 lg:px-10 relative z-10">
        {/* Asymmetric column — left-aligned, not centered, generous right whitespace */}
        <div className="max-w-[80rem] flex flex-col items-start text-left">
          {/* Eyebrow — plain label, no pill/badge/backdrop-blur */}
          <span className="hero-anim block text-[11px] font-bold font-ibm-plex-sans tracking-[0.25em] uppercase text-muted-foreground mb-6">
            Brand Identity &amp; Logo Design Studio
          </span>

          {/* Headline — the single glitch accent lives here, nowhere else on the section */}
          <h1 className="hero-anim font-vermin-vibes text-[clamp(3.5rem,11vw,11rem)] leading-[0.85] uppercase text-foreground mb-8 leading-[.80]">
            Brands, Built
                       With{" "}
            <SquigglyText
              stepDuration={60}
              scale={[6, 9]}
              className="text-[var(--green)]"
            >
              Intent
            </SquigglyText>{" "}
          </h1>

          {/* Sub-headline — quiet, narrow measure, states the differentiator plainly */}
          <p className="hero-anim text-muted-foreground text-base font-body sm:text-lg max-w-[50ch] mb-12 leading-relaxed font-medium ">
            Designed by the person actually doing the work — start to
            finish, no hand-offs.
          </p>

          {/* CTAs — Brutalist primary block, raw underlined link for secondary */}
          <div className="hero-anim flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-4">
            <Link
              href="https://wa.me/YOUR_NUMBER_HERE"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-2 py-4 text-sm font-bold tracking-[0.1em] uppercase text-foreground transition-colors duration-300 flex items-center gap-2"
            >
              Start a Project
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
              {/* Animated underline */}
              <span className="absolute bottom-3 left-2 right-2 h-[1px] bg-foreground group-hover:bg-green group-hover:right-[-10px] transition-all duration-300 ease-out" />
            </Link>
            <Link
              href="/work"
              className="group relative px-2 py-4 text-sm font-bold tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-2"
            >
              View Selected Work
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
              {/* Animated underline */}
              <span className="absolute bottom-3 left-2 right-2 h-[1px] bg-muted-foreground group-hover:bg-green group-hover:right-[-10px] transition-all duration-300 ease-out" />
            </Link>
          </div>
        </div>
      </div>

      {/* Minimal scroll cue — no glitch here, the headline already carries the accent
      <div className="absolute bottom-8 left-6 lg:left-10 flex items-center gap-3 hero-anim">
        <div className="w-[1px] h-10 bg-gradient-to-b from-muted-foreground to-transparent opacity-60" />
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground">
          Scroll
        </span>
      </div> */}
    </section>
  );
}
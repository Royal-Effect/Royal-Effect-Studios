"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SquigglyText } from "@/components/ui/squiggly-text";
import { CtaFooterProps, CtaFooterLink } from "@/libs/interfaces/ctaFooter";

gsap.registerPlugin(ScrollTrigger);



const DEFAULT_PRIMARY: CtaFooterLink = {
  label: "Contact Us",
  href: "/contact",
};

const DEFAULT_SECONDARY: CtaFooterLink = {
  label: "royaleffect22@gmail.com",
  href: "mailto:royaleffect22@gmail.com",
};

export function CtaFooter({
  headingLead,
  headingHighlight,
  description,
  primaryLink = DEFAULT_PRIMARY,
  secondaryLink = DEFAULT_SECONDARY,
  className = "",
}: CtaFooterProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const mm = gsap.matchMedia();

    mm.add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        noPreference: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { reduceMotion } = context.conditions as {
          reduceMotion: boolean;
        };
        const animEls = container.querySelectorAll(".cta-anim");

        const ctx = gsap.context(() => {
          if (reduceMotion) {
            gsap.set(animEls, { opacity: 1, y: 0 });
            return;
          }

          gsap.fromTo(
            animEls,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              stagger: 0.15,
              ease: "power4.out",
              scrollTrigger: {
                trigger: container,
                start: "top 75%",
              },
            }
          );
        }, container);

        return () => ctx.revert();
      }
    );

    return () => mm.revert();
  }, []);

  const secondaryIsMailOrTel =
    secondaryLink.href.startsWith("mailto:") ||
    secondaryLink.href.startsWith("tel:");

  return (
    <section
      ref={containerRef}
      className={`relative py-40 min-h-[80vh] flex flex-col items-center justify-center bg-background text-foreground overflow-hidden border-t border-border ${className}`}
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-green/20 rounded-full blur-[150px] pointer-events-none opacity-40 mix-blend-screen"
      />

      <div className="w-full max-w-[80rem] mx-auto px-6 lg:px-10 relative z-10 flex flex-col items-center text-center">
        <h2 className="cta-anim font-vermin-vibes text-[clamp(4rem,15vw,15rem)] leading-[0.8] uppercase mb-12">
          {headingLead} <br />
          <span className="text-muted-foreground relative inline-block">
            <SquigglyText
              stepDuration={50}
              scale={[4, 8]}
              className="text-green"
            >
              {headingHighlight}
            </SquigglyText>
          </span>
        </h2>

        {description && (
          <p className="cta-anim text-muted-foreground text-lg sm:text-xl max-w-[40ch] mt-8 mx-auto mb-16 font-medium">
            {description}
          </p>
        )}

        <div className="cta-anim flex flex-col sm:flex-row items-center gap-8">
          {primaryLink && (
            <Link
              href={primaryLink.href}
              target={primaryLink.external ? "_blank" : undefined}
              rel={primaryLink.external ? "noopener noreferrer" : undefined}
              className="px-10 py-5 text-muted-foreground text-sm font-bold tracking-[0.1em] uppercase hover:bg-green hover:text-white transition-colors duration-300"
            >
              {primaryLink.label}
            </Link>
          )}

          {secondaryLink && (
            <Link
              href={secondaryLink.href}
              target={secondaryLink.external ? "_blank" : undefined}
              rel={secondaryLink.external ? "noopener noreferrer" : undefined}
              className="group relative px-2 py-4 text-sm font-bold tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {secondaryLink.label}
              {secondaryIsMailOrTel && (
                <span className="absolute bottom-2 left-2 right-2 h-[1px] bg-muted-foreground group-hover:bg-green transition-all duration-300 ease-out" />
              )}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

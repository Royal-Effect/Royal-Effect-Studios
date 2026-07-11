"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NavLinks } from "@/libs/constants/navLinksData";

gsap.registerPlugin(ScrollTrigger);

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;
    const el = footerRef.current;

    // Fade up animations for Layer 1 links
    gsap.fromTo(
      el.querySelectorAll("[data-fade-up]"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      }
    );

    // Parallax effect for Layer 2 large text wrapper
    // This creates a mathematically perfect "pinned reveal" effect:
    // The text moves down at the exact same rate the page scrolls up, keeping it perfectly stationary relative to the screen,
    // while Layer 1 scrolls up and uncovers it.
    if (layer2Ref.current && layer2Ref.current.parentElement) {
      const parent = layer2Ref.current.parentElement;
      gsap.fromTo(
        layer2Ref.current,
        { y: () => -parent.offsetHeight },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: parent,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    }
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative flex flex-col w-full overflow-hidden bg-transparent"
    >
      {/* ══════════════════════════════════════════════════════
          LAYER 1: Main Content & Navigation
      ══════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full bg-[var(--background)] pt-16 pb-16 px-6 lg:px-10 border-t border-[var(--border)]">
        <div className="w-full max-w-[80rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Brand Info */}
          <div data-fade-up className="flex flex-col gap-4 lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <span
                className="text-2xl uppercase text-[var(--foreground)] font-vermin-vibes"
              >
                Royal Effect
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-[32ch] leading-relaxed mt-2">
              Brand identity &amp; logo design studio. We build brands that mean business, crafting experiences that resonate and captivate.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-2">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (formerly Twitter)"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border)] text-muted-foreground hover:text-[var(--background)] hover:bg-[var(--foreground)] hover:border-[var(--foreground)] transition-all duration-300"
              >
                <XIcon />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border)] text-muted-foreground hover:text-[var(--background)] hover:bg-[var(--foreground)] hover:border-[var(--foreground)] transition-all duration-300"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Primary Navigation */}
          <div data-fade-up className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--muted-2)] mb-4">
              Navigate
            </p>
            <ul className="flex flex-col gap-2.5">
              {NavLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground hover:text-[var(--green)] transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore / Secondary Navigation */}
          <div data-fade-up className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--muted-2)] mb-4">
              Explore
            </p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  href="/work"
                  className="text-sm text-muted-foreground hover:text-[var(--green)] transition-colors duration-200"
                >
                  The Works
                </Link>
              </li>
              <li>
                <Link
                  href="/blog?filter=featured"
                  className="text-sm text-muted-foreground hover:text-[var(--green)] transition-colors duration-200"
                >
                  Featured Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/blog?filter=selected"
                  className="text-sm text-muted-foreground hover:text-[var(--green)] transition-colors duration-200"
                >
                  Selected Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div data-fade-up className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--muted-2)] mb-4">
              Newsletter
            </p>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed max-w-[32ch]">
              Subscribe to our newsletter to get the latest design news, inspiration, and studio updates.
            </p>
            <form 
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-transparent border border-[var(--border)] rounded-md px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-muted-foreground focus:outline-none focus:border-[var(--green)] transition-colors duration-200"
                required
              />
              <button 
                type="submit" 
                className="whitespace-nowrap bg-[var(--foreground)] text-[var(--background)] px-5 py-2.5 rounded-md text-sm font-medium hover:bg-[var(--green)] hover:text-white transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          LAYER 2: Parallax Brand Reveal
      ══════════════════════════════════════════════════════ */}
      <div className="relative z-0 w-full h-[30vh] md:h-[50vh] overflow-hidden bg-[var(--background)] pointer-events-none">
        {/* Subtle gradient overlay to blend seamlessly with Layer 1 if needed */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-[var(--background)] z-10 pointer-events-none opacity-20"></div>
        
        <div ref={layer2Ref} className="relative mt-4 z-0 w-full h-full pointer-events-auto">
          <span
            className="absolute left-1/2 bottom-4 md:bottom-8 -translate-x-1/2 text-[clamp(10rem,38vw,50rem)] leading-[0.75] uppercase whitespace-nowrap font-vermin-vibes text-[var(--foreground)] opacity-95 select-none tracking-tight"
          >
            Royal Effect
          </span>
        </div>
      </div>
    </footer>
  );
}

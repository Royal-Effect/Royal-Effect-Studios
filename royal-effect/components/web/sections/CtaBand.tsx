"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CtaBand() {
  const bandRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!bandRef.current) return;
    gsap.fromTo(
      bandRef.current.querySelectorAll("[data-cta-fade]"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: bandRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      ref={bandRef}
      id="cta"
      className="
        relative py-[clamp(5rem,12vh,9rem)] px-6 lg:px-10
        bg-[var(--background)]
        overflow-hidden
      "
    >
      {/* Green ambient glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          flex items-center justify-center
        "
      >
        <div className="w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full bg-[var(--green)]/6 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-[900px] mx-auto text-center">

        <p
          data-cta-fade
          className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--orange)] mb-5"
        >
          Ready?
        </p>

        <h2
          data-cta-fade
          className="text-[clamp(2.2rem,5.5vw,5rem)] leading-none uppercase text-[var(--foreground)] mb-6"
          style={{ fontFamily: "var(--font-vermin-vibes)" }}
        >
          Ready to Build
          <br />
          <span style={{ color: "var(--green)" }}>Your Brand?</span>
        </h2>

        <p
          data-cta-fade
          className="text-[var(--muted)] text-base leading-relaxed max-w-[48ch] mx-auto mb-10"
        >
          Let's talk about your project. Whether you need a full brand identity,
          a single logo, or a concept — we're ready.
        </p>

        <div data-cta-fade className="flex flex-wrap items-center justify-center gap-4">
          {/* WhatsApp — primary green */}
          <a
            href="https://wa.me/234XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            id="cta-band-whatsapp"
            className="
              inline-flex items-center gap-2.5
              px-7 py-4 rounded
              bg-[var(--green)] text-white font-semibold text-sm
              hover:bg-[var(--green-dark)]
              transition-all duration-200
              hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-[var(--green)]/30
            "
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Message Us on WhatsApp
          </a>

          {/* Contact form — orange outline */}
          <Link
            href="/contact"
            id="cta-band-contact"
            className="
              inline-flex items-center gap-2
              px-7 py-4 rounded
              border-2 border-[var(--orange)]
              text-[var(--orange)] font-semibold text-sm
              hover:bg-[var(--orange)] hover:text-white
              transition-all duration-200
              group
            "
          >
            Start a Project
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { SquigglyText } from "@/components/ui/squiggly-text";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Royal Effect Studios - Blog (Under Construction)",
};

export default function BlogPage() {
  return (
    <section className="relative min-h-[calc(100svh-4rem)] flex flex-col items-center justify-center bg-[var(--background)] px-6 overflow-hidden">
      {/* Watermark */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          flex flex-col items-center justify-center
          gap-0 select-none
          z-0
        "
      >
        <span
          className="font-vermin-vibes uppercase leading-none text-[var(--foreground)]"
          style={{
            fontFamily: "var(--font-vermin-vibes)",
            fontSize: "clamp(4rem, 18vw, 22rem)",
            opacity: 0.04,
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
          }}
        >
          ROYAL EFFECT
        </span>
      </div>

      {/* Foreground content - SLANTED */}
      <div className="relative z-10 flex flex-col items-center text-center -skew-y-6 md:-skew-y-3 transform-gpu transition-transform">
        <p
          className="font-vermin-vibes leading-none text-[var(--green)] mb-4 select-none"
          style={{
            fontFamily: "var(--font-vermin-vibes)",
            fontSize: "clamp(5rem, 15vw, 12rem)",
          }}
          aria-hidden="true"
        >
          <SquigglyText
            stepDuration={60}
            scale={[6, 9]}
            className="text-[var(--green)]"
          >
            BLOG
          </SquigglyText>
        </p>

        <h1
          className="font-vermin-vibes uppercase text-[var(--foreground)] mb-6"
          style={{
            fontFamily: "var(--font-vermin-vibes)",
            fontSize: "clamp(1.5rem, 4vw, 3rem)",
            lineHeight: 1,
          }}
        >
          Under Construction
        </h1>

        <p className="text-muted-foreground text-sm sm:text-base max-w-[42ch] leading-relaxed mb-10">
          We are currently crafting our thoughts. In the meantime, feel free to explore our selected case studies or get in touch.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="
              inline-flex items-center gap-2
              px-6 py-3 rounded text-sm font-semibold
              bg-[var(--green)] text-white
              hover:bg-[var(--green-dark)]
              transition-all duration-200
              hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[var(--green)]/25
            "
          >
            ← Back to Home
          </Link>

          <Link
            href="/work"
            className="
              inline-flex items-center gap-2
              px-6 py-3 rounded text-sm font-semibold
              border border-[var(--border)]
              text-[var(--foreground)]
              hover:border-[var(--green)] hover:text-[var(--green)]
              transition-all duration-200
            "
          >
            View Our Work
          </Link>
        </div>
      </div>
    </section>
  );
}

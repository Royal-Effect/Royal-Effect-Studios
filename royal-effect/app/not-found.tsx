/**
 * app/not-found.tsx
 *
 * WHY NAVBAR IS IMPORTED DIRECTLY:
 * Next.js resolves not-found.tsx at the root app/ level — it only receives
 * the root layout, never the (marketing)/layout.tsx that contains <Navbar>.
 * We import <Navbar> here explicitly so navigation persists on 404.
 */

import Link from "next/link";
import { Navbar } from "@/components/web/layouts/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main className="relative min-h-[100svh] flex flex-col items-center justify-center bg-[var(--background)] px-6 pt-16 overflow-hidden">
        {/* ── Watermark: ROYAL EFFECT in Vermin Vibes behind everything ── */}
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
          {/* ROYAL */}
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

        {/* ── Foreground content ── */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* 404 number */}
          <p
            className="font-vermin-vibes leading-none text-[var(--green)] mb-4 select-none"
            style={{
              fontFamily: "var(--font-vermin-vibes)",
              fontSize: "clamp(6rem, 18vw, 14rem)",
            }}
            aria-hidden="true"
          >
            404
          </p>

          <h1
            className="font-vermin-vibes uppercase text-[var(--foreground)] mb-4"
            style={{
              fontFamily: "var(--font-vermin-vibes)",
              fontSize: "clamp(1.5rem, 4vw, 3rem)",
              lineHeight: 1,
            }}
          >
            Page Not Found
          </h1>

          <p className="text-[var(--muted)] text-sm max-w-[42ch] leading-relaxed mb-10">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Head back home and we&apos;ll get you sorted.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/"
              id="404-home"
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
              id="404-work"
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
      </main>
    </>
  );
}

"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import { useGlitchAnimation } from "@/libs/hooks/useGlitchAnimation";

interface GlitchTextProps {
  /** Arbitrary content — use this OR label, not both */
  children?: ReactNode;
  /**
   * When provided → renders a Next.js <Link> (nav usage).
   * When omitted  → renders a <span> (display / decorative usage).
   */
  href?: string;
  /** Fallback text label — kept for backward-compat with nav link pattern */
  label?: string;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  "aria-hidden"?: boolean | "true" | "false";
}

/**
 * GlitchText
 *
 * Generic GSAP glitch-hover wrapper.
 *
 * Two modes:
 *   1. Link mode  — pass `href` → renders a Next.js <Link>
 *      <GlitchText href="/work" label="Work" className="..." />
 *
 *   2. Span mode  — no `href`  → renders a <span>
 *      <GlitchText className="..." aria-hidden="true">404</GlitchText>
 *
 * On mouseenter: green ↔ orange x-shift flicker, settles on brand green.
 * On mouseleave: reverts to var(--muted).
 */
export function GlitchText({
  children,
  href,
  label,
  id,
  className,
  style,
  onClick,
  "aria-hidden": ariaHidden,
}: GlitchTextProps) {
  const glitch = useGlitchAnimation();
  const content = children ?? label;

  /* ── Link mode ─────────────────────────────────────── */
  if (href) {
    return (
      <Link
        ref={glitch.ref}
        href={href}
        id={id}
        /* bg-transparent + outline-none strips browser-default anchor hover flash */
        className={`bg-transparent outline-none ${className ?? ""}`}
        style={style}
        onClick={onClick}
        onMouseEnter={glitch.onMouseEnter}
        onMouseLeave={glitch.onMouseLeave}
        aria-hidden={ariaHidden}
      >
        {content}
      </Link>
    );
  }

  /* ── Span mode (decorative / display text) ─────────── */
  return (
    <span
      ref={glitch.ref}
      id={id}
      className={`inline-block ${className ?? ""}`}
      style={style}
      onMouseEnter={glitch.onMouseEnter}
      onMouseLeave={glitch.onMouseLeave}
      aria-hidden={ariaHidden}
    >
      {content}
    </span>
  );
}

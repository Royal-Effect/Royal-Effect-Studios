"use client";

import { useRef } from "react";
import { gsap } from "gsap";

/**
 * useGlitchAnimation
 *
 * Generic GSAP glitch hover hook. Returns a ref + event handlers
 * that can be spread onto any HTML/SVG element.
 *
 * Usage:
 *   const glitch = useGlitchAnimation();
 *   <button ref={glitch.ref} onMouseEnter={glitch.onMouseEnter} onMouseLeave={glitch.onMouseLeave}>
 *     Label
 *   </button>
 *
 * On mouseenter → rapid x-shift flicker between brand green and orange,
 *                 settles on green.
 * On mouseleave → reverts to var(--muted) colour smoothly.
 */
export function useGlitchAnimation() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref       = useRef<any>(null);
  const glitching = useRef(false);
  const tlRef     = useRef<gsap.core.Timeline | null>(null);

  const onMouseEnter = () => {
    const el = ref.current;
    if (!el || glitching.current) return;
    glitching.current = true;

    tlRef.current?.kill();

    tlRef.current = gsap.timeline({
      onComplete: () => { glitching.current = false; },
    })
      /* ── glitch frames: green ↔ orange ── */
      .to(el, { color: "var(--green)",  x: -4, duration: 0.03, ease: "none" })
      .to(el, { color: "var(--orange)", x:  4, duration: 0.03, ease: "none" })
      .to(el, { color: "var(--green)",  x: -3, duration: 0.03, ease: "none" })
      .to(el, { color: "var(--orange)", x:  2, duration: 0.03, ease: "none" })
      .to(el, { color: "var(--green)",  x: -1, duration: 0.03, ease: "none" })
      /* ── settle on brand green ── */
      .to(el, { color: "var(--green)", x: 0, duration: 0.22, ease: "power3.out" });
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    glitching.current = false;
    tlRef.current?.kill();

    tlRef.current = gsap.timeline();
    tlRef.current.to(el, {
      color:    "var(--foreground)",
      x:        0,
      duration: 0.28,
      ease:     "power2.out",
    });
  };

  return { ref, onMouseEnter, onMouseLeave } as const;
}

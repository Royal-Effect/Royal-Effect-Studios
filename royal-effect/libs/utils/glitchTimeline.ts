import { gsap } from "gsap";

export interface GlitchLayers {
  root: HTMLElement;
  layerA: HTMLElement;
  layerB: HTMLElement;
}

export type GlitchIntensity = "sm" | "md" | "lg";

export interface GlitchOptions {
  intensity?: GlitchIntensity;
  duration?: number;
  slices?: number;
}

const INTENSITY_MAP: Record<GlitchIntensity, { offset: number; skew: number }> =
  {
    sm: { offset: 2, skew: 2 },
    md: { offset: 5, skew: 4 },
    lg: { offset: 10, skew: 8 },
  };

/**
 * Builds a GSAP timeline that glitches whatever DOM is passed in.
 * Pure: takes refs in, returns a timeline. Has no opinion on what
 * triggered it (hover, scroll, manual) — that's the caller's job.
 */
export function createGlitchTimeline(
  { root, layerA, layerB }: GlitchLayers,
  options: GlitchOptions = {}
): gsap.core.Timeline {
  const { intensity = "md", duration = 0.5, slices = 6 } = options;
  const { offset, skew } = INTENSITY_MAP[intensity];

  const tl = gsap.timeline({ paused: true });
  const step = duration / slices;

  for (let i = 0; i < slices; i++) {
    const top = gsap.utils.random(0, 85);
    const height = gsap.utils.random(4, 16);
    const x = gsap.utils.random(offset * 0.4, offset);

    tl.set(
      [layerA, layerB],
      { clipPath: `inset(${top}% 0 ${100 - top - height}% 0)` },
      i * step
    )
      .set(layerA, { x, skewX: gsap.utils.random(-skew, skew) }, "<")
      .set(layerB, { x: -x, skewX: gsap.utils.random(-skew, skew) }, "<")
      .set(root, { x: gsap.utils.random(-1, 1) }, "<");
  }

  tl.set([layerA, layerB], {
    clipPath: "inset(0 0 100% 0)",
    x: 0,
    skewX: 0,
  });
  tl.set(root, { x: 0 });

  return tl;
}

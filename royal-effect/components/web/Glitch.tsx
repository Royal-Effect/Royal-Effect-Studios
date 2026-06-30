"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import {
  createGlitchTimeline,
  type GlitchIntensity,
} from "@/libs/utils/glitchTimeline";

export type GlitchTrigger = "hover" | "scroll" | "both" | "manual";

export interface GlitchHandle {
  trigger: () => void;
}

interface GlitchProps {
  children: ReactNode;
  trigger?: GlitchTrigger;
  intensity?: GlitchIntensity;
  duration?: number;
  /** [layerA color, layerB color] — defaults to a red/cyan chromatic split */
  colors?: [string, string];
  /** Only fire once for scroll trigger (default: replays every time it re-enters) */
  once?: boolean;
  /** How much of the element must be visible before a scroll trigger fires */
  scrollThreshold?: number;
  className?: string;
  style?: CSSProperties;
}

export const Glitch = forwardRef<GlitchHandle, GlitchProps>(function Glitch(
  {
    children,
    trigger = "hover",
    intensity = "md",
    duration = 0.5,
    colors = ["#ff003c", "#00fff9"],
    once = false,
    scrollThreshold = 0.4,
    className = "",
    style,
  },
  ref
) {
  const rootRef = useRef<HTMLDivElement>(null);
  const layerARef = useRef<HTMLDivElement>(null);
  const layerBRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasPlayedRef = useRef(false);

  const play = useCallback(() => {
    if (!rootRef.current || !layerARef.current || !layerBRef.current) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    timelineRef.current?.kill();
    timelineRef.current = createGlitchTimeline(
      {
        root: rootRef.current,
        layerA: layerARef.current,
        layerB: layerBRef.current,
      },
      { intensity, duration }
    );
    timelineRef.current.play(0);
  }, [intensity, duration]);

  useImperativeHandle(ref, () => ({ trigger: play }), [play]);

  useEffect(() => {
    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (trigger !== "scroll" && trigger !== "both") return;
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (once && hasPlayedRef.current) continue;
          hasPlayedRef.current = true;
          play();
        }
      },
      { threshold: scrollThreshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [trigger, once, scrollThreshold, play]);

  const handleMouseEnter = () => {
    if (trigger === "hover" || trigger === "both") play();
  };

  return (
    <div
      ref={rootRef}
      onMouseEnter={handleMouseEnter}
      className={`relative inline-block ${className}`}
      style={style}
    >
      <div className="relative z-[1]">{children}</div>

      <div
        ref={layerARef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          clipPath: "inset(0 0 100% 0)",
          filter: `drop-shadow(2px 0 ${colors[0]})`,
          mixBlendMode: "screen",
        }}
      >
        {children}
      </div>

      <div
        ref={layerBRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          clipPath: "inset(0 0 100% 0)",
          filter: `drop-shadow(-2px 0 ${colors[1]})`,
          mixBlendMode: "screen",
        }}
      >
        {children}
      </div>
    </div>
  );
});

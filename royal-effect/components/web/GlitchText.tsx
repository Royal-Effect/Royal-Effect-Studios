"use client";

import Link from "next/link";
import { NavLinksInterface } from "@/libs/interfaces/nav";
import { useGlitchAnimation } from "@/libs/hooks/useGlitchAnimation";

interface GlitchTextProps extends NavLinksInterface {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

/**
 * GlitchText
 *
 * A Link wrapper that wires the useGlitchAnimation hook onto any nav item.
 * Exists as a component (rather than calling the hook inline in .map())
 * because React's Rules of Hooks forbid calling hooks inside array iterators.
 *
 * Usage:
 *   <GlitchText href="/work" label="Work" className="font-vermin-vibes ..." />
 */
export function GlitchText({
  href,
  label,
  id,
  className,
  style,
  onClick,
}: GlitchTextProps) {
  const glitch = useGlitchAnimation();

  return (
    <Link
      ref={glitch.ref}
      href={href}
      id={id}
      /* bg-transparent + outline-none strips browser-default anchor
         hover highlight that causes the gray surface flash */
      className={`bg-transparent outline-none ${className ?? ""}`}
      style={style}
      onClick={onClick}
      onMouseEnter={glitch.onMouseEnter}
      onMouseLeave={glitch.onMouseLeave}
    >
      {label}
    </Link>
  );
}

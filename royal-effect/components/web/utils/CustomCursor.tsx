// Custom cursor component with orange branding
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname(); // Re‑trigger effect on route change

  useEffect(() => {
    if (!cursorRef.current) return;

    // Skip on touch‑devices (coarse pointer)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Hide the native cursor globally
    document.body.style.cursor = "none";

    // Ensure no other element shows a cursor
    const style = document.createElement("style");
    style.innerHTML = `
      * { cursor: none !important; }
    `;
    document.head.appendChild(style);

    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.15, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.15, ease: "power3" });

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);

      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("input") ||
        target.closest(".cursor-crosshair") ||
        target.closest("[role='button']");

      if (isInteractive) {
        gsap.to(cursorRef.current, {
          scale: 3.5,
          backgroundColor: "transparent",
          border: "1px solid var(--green)",
          opacity: 1,
          duration: 0.2,
          overwrite: "auto",
        });
      } else {
        gsap.to(cursorRef.current, {
          scale: 1,
          backgroundColor: "var(--green)",
          border: "0px solid transparent",
          opacity: 1,
          duration: 0.2,
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.head.removeChild(style);
      document.body.style.cursor = "auto";
    };
  }, [pathname]);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-3 h-3 rounded-full bg-orange pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block mix-blend-difference"
      style={{ willChange: "transform" }}
    />
  );
}

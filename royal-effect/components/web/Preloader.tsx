"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [countLoad, setCountLoad] = useState(100);

  const timeoutRef = useRef<NodeJS.Timeout | boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const lastRevealedIndex = useRef(-1);

  // ---- Countdown logic ----
  useEffect(() => {
    if (timeoutRef.current) return;
    timeoutRef.current = true;

    const timer = setInterval(() => {
      setCountLoad((prevCount) => {
        if (prevCount <= 0) {
          clearInterval(timer);
          setIsComplete(true);
          return 0;
        }
        return prevCount - 1;
      });
    }, 24);

    return () => clearInterval(timer);
  }, []);

  // ---- Reveal R then E in sequence, each with a quick glitch flicker ----
  useEffect(() => {
    if (!svgRef.current) return;
    const letters = svgRef.current.querySelectorAll("path"); // [R, E]
    const totalLetters = letters.length; // 2
    const progress = (100 - countLoad) / 100; // 0 → 1

    const targetIndex = Math.floor(progress * totalLetters);

    if (targetIndex > lastRevealedIndex.current) {
      const toReveal = Array.from(letters).slice(
        lastRevealedIndex.current + 1,
        targetIndex
      );

      toReveal.forEach((el) => {
        // quick glitch flicker, then settle into place
        const tl = gsap.timeline();
        tl.to(el, { opacity: 1, duration: 0.03 })
          .to(el, { opacity: 0.2, x: -3, duration: 0.03 })
          .to(el, { opacity: 1, x: 3, duration: 0.03 })
          .to(el, { opacity: 0.5, x: -2, duration: 0.03 })
          .to(el, {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.25,
            ease: "power2.out",
          });
      });

      lastRevealedIndex.current = targetIndex - 1;
    }
  }, [countLoad]);

  // ---- Exit animation ----
  useEffect(() => {
    if (!isComplete || !containerRef.current) return;

    const exitTl = gsap.timeline({
      onComplete: () => setIsLoading(false),
    });

    exitTl
      .to(containerRef.current.querySelectorAll("[data-fade]"), {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
        stagger: 0.05,
      })
      .to(
        containerRef.current,
        {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.9,
          ease: "power4.inOut",
        },
        "-=0.1"
      );
  }, [isComplete]);

  if (!isLoading) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a]"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      {/* RE monogram — R and E repositioned to sit tight together */}
      <svg
        ref={svgRef}
        data-fade
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 56 36"
        className="w-[28vw] max-w-[140px] h-auto"
      >
        {/* R — hidden from the very first paint via inline style, not JS */}
        <path
          fill="#fff"
          style={{ opacity: 0, transform: "translateY(8px)" }}
          d="M5.99,23.97l8.99-8.99H5.99v17.98H0V8.99h23.97v5.99l-8.99,8.99,11.98,11.98v8.99L5.99,23.97Z"
        />
        {/* E — same: hidden in the initial HTML itself */}
        <path
          fill="#fff"
          style={{ opacity: 0, transform: "translateY(8px)" }}
          d="M32.00,14.98v-5.99h23.97v5.99h-23.97ZM32.00,23.97v-5.99h23.97v5.99h-23.97ZM32.00,32.96v-5.99h23.97v5.99h-23.97Z"
        />
      </svg>

      {/* Counter */}
      {/* <div
        data-fade
        className="mt-8 font-mono text-sm tabular-nums tracking-[0.3em] text-white/60"
      >
        {String(countLoad).padStart(3, "0")}
      </div> */}

      {/* Progress line */}
      {/* <div data-fade className="mt-4 h-[1px] w-32 bg-white/15 overflow-hidden">
        <div
          className="h-full bg-white/80 transition-[width] duration-75 ease-linear"
          style={{ width: `${100 - countLoad}%` }}
        />
      </div> */}
    </div>
  );
};
"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/libs/utils/utils";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

export function WhatsAppCTA() {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.body,
        start: "top -400px",
        once: true,
        onEnter: () => {
          gsap.to(textContainerRef.current, {
            width: 0,
            opacity: 0,
            duration: 0.8,
            ease: "power4.inOut",
          });
          
          gsap.to(containerRef.current, {
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
            width: 56, // equivalent to w-14
            height: 56, // equivalent to h-14
            gap: 0,
            duration: 0.8,
            ease: "power4.inOut",
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <a
      ref={containerRef}
      href="https://wa.me/2349066048991"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-8 right-8 z-50 flex items-center justify-center border border-border bg-background text-foreground rounded-none shadow-xl hover:bg-[var(--green)] hover:text-white hover:border-[var(--green)] transition-all duration-300 overflow-hidden",
        "px-6 py-4 gap-3 w-auto h-auto"
      )}
    >
      <WhatsAppIcon className="w-6 h-6 shrink-0" />
      <div 
        ref={textContainerRef}
        className="flex items-center overflow-hidden whitespace-nowrap"
      >
        <span className="font-bold uppercase tracking-widest text-[10px] sm:text-xs pl-1">
          Chat with us on WhatsApp
        </span>
      </div>
    </a>
  );
}

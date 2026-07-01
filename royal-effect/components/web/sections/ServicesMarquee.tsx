"use client";

import React from "react";

const SERVICES = [
  "Brand Identity",
  "Logo Design",
  "Art Direction",
  "Web Design",
  "UI/UX",
  "Strategy",
];

export function ServicesMarquee() {
  return (
    <div className="relative w-full overflow-hidden bg-foreground text-background py-6 sm:py-8 border-y border-border">
      {/* 
        The marquee container uses flex and stretches beyond the viewport.
        We use an inline CSS animation in Tailwind (assuming tailwind has animate-marquee, 
        or we add custom keyframes, but for absolute robust fallback we can just use inline styles 
        or write the keyframes in globals.css. We'll use a standard technique here.)
      */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
      `}} />
      
      <div className="animate-marquee flex items-center">
        {/* We double the list to make it infinitely loop */}
        {[...SERVICES, ...SERVICES, ...SERVICES, ...SERVICES].map((service, idx) => (
          <React.Fragment key={idx}>
            <span className="font-vermin-vibes text-4xl sm:text-6xl lg:text-7xl uppercase whitespace-nowrap px-8 select-none">
              {service}
            </span>
            <span className="text-green text-3xl sm:text-5xl font-bold select-none" aria-hidden="true">
              *
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

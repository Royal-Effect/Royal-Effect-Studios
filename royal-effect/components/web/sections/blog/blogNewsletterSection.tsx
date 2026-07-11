"use client";

import { GlitchText } from "@/components/web/utils/GlitchText";

export function BlogNewsletterSection() {
  return (
    <section className="bg-background border-t border-border py-24 lg:py-32">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">
          {/* Left — Text */}
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-6">
              Stay in the Loop
            </p>
            <h2 className="font-vermin-vibes text-4xl md:text-5xl lg:text-6xl text-foreground uppercase tracking-widest leading-tight mb-4">
              <GlitchText className="font-vermin-vibes text-4xl md:text-5xl lg:text-6xl text-foreground uppercase tracking-widest">
                Never Miss a Story
              </GlitchText>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Get notified when we publish new articles. No spam, just stories worth reading.
            </p>
          </div>

          {/* Right — Form */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="YOUR EMAIL"
              className="w-full sm:w-72 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
            />
            <button
              type="button"
              className="px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] border border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-all duration-300 whitespace-nowrap"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

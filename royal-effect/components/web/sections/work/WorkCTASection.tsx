import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SquigglyText } from "@/components/ui/squiggly-text";

export function WorkCTASection() {
  return (
    <section className="relative py-32 lg:py-48 bg-foreground text-background overflow-hidden flex flex-col items-center justify-center text-center px-6">
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-5 pointer-events-none mix-blend-overlay" />
      
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center gap-12">
        <h2 className="font-vermin-vibes text-[clamp(4rem,10vw,12rem)] leading-[0.8] uppercase">
          Have A <br />
          <span className="text-green">Vision?</span>
        </h2>
        
        <p className="text-sm md:text-base font-bold tracking-widest uppercase opacity-70 max-w-md mx-auto">
          We turn bold ideas into category-defining digital experiences. Let&apos;s build something{" "}
          <SquigglyText scale={[2, 3]} className="text-background inline-block">
            extraordinary.
          </SquigglyText>
        </p>

        <Link
          href="/contact"
          className="group relative inline-flex items-center gap-4 bg-background text-foreground px-12 py-6 font-bold uppercase tracking-[0.2em] overflow-hidden mt-8"
        >
          <div className="absolute inset-0 bg-green translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          <span className="relative z-10 group-hover:text-background transition-colors duration-300">
            Start A Project
          </span>
          <ArrowRight className="relative z-10 w-5 h-5 -rotate-45 group-hover:rotate-0 group-hover:text-background transition-all duration-300" />
        </Link>
      </div>
    </section>
  );
}

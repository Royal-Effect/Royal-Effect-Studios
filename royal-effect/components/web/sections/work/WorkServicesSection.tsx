import { SquigglyText } from "@/components/ui/squiggly-text";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    number: "01",
    title: "Brand Identity",
    description: "We craft distinctive, bold identities that command attention and stand the test of time.",
  },
  {
    number: "02",
    title: "Logo Design",
    description: "High-performance, brutalist, and modern logos engineered for impact and scale.",
  },
  {
    number: "03",
    title: "UI/UX Design",
    description: "User interfaces that break the mold while remaining intuitive and radically simple.",
  },
  {
    number: "04",
    title: "Brand Strategy",
    description: "Data-driven positioning to elevate your brand above the noise and connect with your audience.",
  },
];

export function WorkServicesSection() {
  return (
    <section className="relative py-32 bg-background border-b border-border overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <h2 className="font-vermin-vibes text-[clamp(3rem,6vw,5rem)] leading-none uppercase text-foreground">
            Our <br className="hidden md:block" />
            <span className="text-muted-foreground">Capabilities</span>
          </h2>
          <p className="text-sm font-bold tracking-widest uppercase text-muted-foreground sm:max-w-full md:max-w-xs md:text-right">
            We deliver{" "}
            <SquigglyText scale={[2, 3]} className="text-green inline-block">
              uncompromising quality
            </SquigglyText>{" "}
            across every touchpoint of your brand.
          </p>
        </div>

        <div className="flex flex-col border-t border-border">
          {services.map((service, index) => (
            <div
              key={index}
              className="group flex flex-col lg:flex-row lg:items-center justify-between gap-6 py-12 border-b border-border hover:bg-foreground/5 transition-colors duration-500 cursor-pointer px-4 lg:px-10 -mx-4 lg:-mx-10"
            >
              <div className="flex items-start gap-8 lg:w-1/2">
                <span className="font-vermin-vibes text-2xl lg:text-4xl text-muted-foreground opacity-50 group-hover:text-foreground group-hover:opacity-100 transition-all duration-300">
                  {service.number}
                </span>
                <h3 className="text-3xl lg:text-5xl font-bold uppercase tracking-widest group-hover:translate-x-4 transition-transform duration-500">
                  {service.title}
                </h3>
              </div>
              <div className="lg:w-1/3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <p className="text-sm font-bold tracking-wider text-muted-foreground uppercase leading-relaxed max-w-sm">
                  {service.description}
                </p>
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:border-foreground group-hover:text-background transition-colors duration-300 flex-shrink-0">
                  <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

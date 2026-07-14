"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlitchText } from "@/components/web/utils/GlitchText";
import { SquigglyText } from "@/components/ui/squiggly-text";

gsap.registerPlugin(ScrollTrigger);

interface FAQ {
  _id?: string;
  question: string;
  answer: string;
}

interface FaqSectionProps {
  faqs: FAQ[];
}

export function FaqSection({ faqs }: FaqSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll(".faq-item"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  // Generate JSON-LD schema for FAQ
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section
      ref={containerRef}
      className="relative py-32 lg:py-48 bg-background border-b border-border overflow-hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="w-full max-w-[80rem] mx-auto px-6 lg:px-10 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        {/* Left Column: Heading */}
        <div className="lg:col-span-5">
          <GlitchText className="text-sm font-bold tracking-[0.2em] uppercase text-green mb-6 inline-block">
       
          </GlitchText>
          <h2 className="font-vermin-vibes text-[clamp(3rem,6vw,5rem)] leading-[0.85] uppercase text-foreground mb-8">
            Frequently <br />
            Asked{" "}
            <SquigglyText
              scale={[2, 3]}
              className="text-muted-foreground inline-block"
            >
              Questions
            </SquigglyText>
          </h2>
          <p className="text-lg text-muted-foreground max-w-sm font-medium leading-relaxed">
            Everything you need to know about working with Royal Effect Studios.
            No secrets, just transparent answers.
          </p>
        </div>

        {/* Right Column: Accordion */}
        <div className="lg:col-span-7 flex flex-col border-t border-border">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={faq._id ?? idx} className="faq-item border-b border-border">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between py-8 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green group"
                >
                  <h3
                    className={`text-xl sm:text-2xl font-bold uppercase tracking-wide transition-colors duration-300 ${
                      isOpen
                        ? "text-green"
                        : "text-foreground group-hover:text-muted-foreground"
                    }`}
                  >
                    {faq.question}
                  </h3>
                  <div
                    className={`flex-shrink-0 ml-4 w-8 h-8 flex items-center justify-center border transition-all duration-300 ${
                      isOpen
                        ? "border-green text-green rotate-45"
                        : "border-border text-foreground group-hover:border-muted-foreground"
                    }`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                </button>

                <div
                  className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]"
                  style={{
                    maxHeight: isOpen ? "300px" : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p className="text-lg text-muted-foreground font-medium leading-relaxed pb-8 max-w-2xl">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

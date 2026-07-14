"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NavLinks } from "@/libs/constants/navLinksData";

gsap.registerPlugin(ScrollTrigger);

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  // Force GSAP ScrollTrigger to recalculate positions whenever the route changes.
  // This fixes the issue where the parallax layer 2 is blank/laggy because it was using the old page's height.
  useEffect(() => {
    const t = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    if (!footerRef.current) return;
    const el = footerRef.current;

    // Fade up animations for Layer 1 links
    gsap.fromTo(
      el.querySelectorAll("[data-fade-up]"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      }
    );

    // Parallax effect for Layer 2 large text wrapper
    // This creates a mathematically perfect "pinned reveal" effect:
    // The text moves down at the exact same rate the page scrolls up, keeping it perfectly stationary relative to the screen,
    // while Layer 1 scrolls up and uncovers it.
    if (layer2Ref.current && layer2Ref.current.parentElement) {
      const parent = layer2Ref.current.parentElement;
      gsap.fromTo(
        layer2Ref.current,
        { y: () => -parent.offsetHeight },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: parent,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    }
  }, []);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Royal Effect Studios",
    "image": "https://royal-effect-studios.vercel.app/images/Logo.svg",
    "url": "https://royal-effect-studios.vercel.app",
    "telephone": "+2349066048991",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lagos",
      "addressCountry": "NG"
    },
    "sameAs": [
      "https://www.instagram.com/royaleffect_/"
    ]
  };

  return (
    <footer
      ref={footerRef}
      className="relative flex flex-col w-full overflow-hidden bg-transparent"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {/* ══════════════════════════════════════════════════════
          LAYER 1: Main Content & Navigation
      ══════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full bg-[var(--background)] pt-16 pb-16 px-6 lg:px-10 border-t border-[var(--border)]">
        <div className="w-full max-w-[80rem] mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-10">
          
          {/* Brand Info */}
          <div data-fade-up className="flex flex-col gap-4 md:col-span-2 lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <span
                className="text-2xl uppercase text-[var(--foreground)] font-vermin-vibes"
              >
                Royal Effect
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-[32ch] leading-relaxed mt-2">
              Brand identity &amp; logo design studio. We build brands that mean business, crafting experiences that resonate and captivate.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://wa.me/+2349066048991"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border)] text-muted-foreground hover:text-[var(--background)] hover:bg-[var(--foreground)] hover:border-[var(--foreground)] transition-all duration-300"
              >
                <WhatsAppIcon />
              </a>
              <a
                href="https://www.instagram.com/royaleffect_/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border)] text-muted-foreground hover:text-[var(--background)] hover:bg-[var(--foreground)] hover:border-[var(--foreground)] transition-all duration-300"
              >
                <InstagramIcon />
              </a>
            </div>
            {/* Address */}
            <div className="flex items-start gap-2.5 mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0 mt-0.5 text-muted-foreground opacity-60">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Royal Effect Studios<br />
                Creative District<br />
                Lagos, Nigeria
              </p>
            </div>
          </div>

          {/* Primary Navigation */}
          <div data-fade-up className="md:col-span-1 lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--muted-2)] mb-4">
              Navigate
            </p>
            <ul className="flex flex-col gap-2.5">
              {NavLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground hover:text-[var(--green)] transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore / Secondary Navigation */}
          <div data-fade-up className="md:col-span-1 lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--muted-2)] mb-4">
              Explore
            </p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  href="/work"
                  className="text-sm text-muted-foreground hover:text-[var(--green)] transition-colors duration-200"
                >
                  The Works
                </Link>
              </li>
              <li>
                <Link
                  href="/blog?filter=featured"
                  className="text-sm text-muted-foreground hover:text-[var(--green)] transition-colors duration-200"
                >
                  Featured Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/blog?filter=selected"
                  className="text-sm text-muted-foreground hover:text-[var(--green)] transition-colors duration-200"
                >
                  Selected Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div data-fade-up className="md:col-span-4 lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--muted-2)] mb-4">
              Newsletter
            </p>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed max-w-[32ch]">
              Subscribe to our newsletter to get the latest design news, inspiration, and studio updates.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={async (e) => {
                e.preventDefault();
                if (!newsletterEmail) return;
                setNewsletterStatus("submitting");
                try {
                  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
                  if (!accessKey) throw new Error("Missing Access Key");

                  const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Accept: "application/json",
                    },
                    body: JSON.stringify({
                      access_key: accessKey,
                      email: newsletterEmail,
                      subject: "New Newsletter Subscriber (Footer)!",
                      message: `${newsletterEmail} has subscribed to the Royal Effect Newsletter from the Footer!`,
                      from_name: "Royal Effect Website",
                    }),
                  });

                  const result = await response.json();
                  if (result.success) {
                    setNewsletterStatus("success");
                    setNewsletterEmail("");
                  } else {
                    setNewsletterStatus("error");
                  }
                } catch {
                  setNewsletterStatus("error");
                }
              }}
            >
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Email address"
                disabled={newsletterStatus === "submitting" || newsletterStatus === "success"}
                className="w-full bg-transparent border border-[var(--border)] rounded-md px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-muted-foreground focus:outline-none focus:border-[var(--green)] transition-colors duration-200 disabled:opacity-50"
                required
              />
              <button
                type="submit"
                disabled={newsletterStatus === "submitting" || newsletterStatus === "success"}
                className="whitespace-nowrap bg-[var(--foreground)] text-[var(--background)] px-5 py-2.5 rounded-md text-sm font-medium hover:bg-[var(--green)] hover:text-white transition-colors duration-200 disabled:opacity-50"
              >
                {newsletterStatus === "submitting" ? "Wait..." : newsletterStatus === "success" ? "Subscribed!" : "Subscribe"}
              </button>
            </form>
            {newsletterStatus === "error" && (
              <p className="text-destructive text-xs mt-2">Failed to subscribe. Please try again.</p>
            )}
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          BOTTOM BAR: Copyright + Privacy
      ══════════════════════════════════════════════════════ */}
      <div className="border-t border-[var(--border)] px-6 lg:px-10 py-4">
        <div className="w-full max-w-[90rem] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.15em]">
            © {new Date().getFullYear()} Royal Effect Studios. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/faq"
              className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] hover:text-foreground transition-colors duration-200"
            >
              FAQ
            </Link>
            <Link
              href="/privacy"
              className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] hover:text-foreground transition-colors duration-200"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          LAYER 2: Parallax Brand Reveal
      ══════════════════════════════════════════════════════ */}
      <div className="relative z-0 w-full h-[25vh] sm:h-[35vh] md:h-[45vh] lg:h-[50vh] overflow-hidden bg-[var(--background)] pointer-events-none">
        {/* Subtle gradient overlay to blend seamlessly with Layer 1 if needed */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-[var(--background)] z-10 pointer-events-none opacity-20"></div>
        
        <div ref={layer2Ref} className="relative z-0 w-full h-full pointer-events-auto">
          <span
            className="absolute left-1/2 bottom-4 md:bottom-8 -translate-x-1/2 text-[14vw] sm:text-[15vw] md:text-[20vw] lg:text-[25vw] leading-[0.75] uppercase whitespace-nowrap font-vermin-vibes text-[var(--foreground)] opacity-95 select-none tracking-tight text-center"
          >
            Royal Effect
          </span>
        </div>
      </div>
    </footer>
  );
}

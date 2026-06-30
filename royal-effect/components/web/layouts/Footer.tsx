"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NavLinks } from "@/libs/constants/navLinksData";

gsap.registerPlugin(ScrollTrigger);

/* Social icon components — kept here since they are purely visual */
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
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// const SOCIAL_LINKS = [
//   { label: "Instagram", href: CONTACT.instagram, Icon: InstagramIcon },
//   { label: "WhatsApp", href: WHATSAPP.href, Icon: WhatsAppIcon },
// ] as const;

/* ══════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════ */
export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;
    const el = footerRef.current;

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
  }, []);

  return (
    <footer
      ref={footerRef}
      className="
        border-t border-[var(--border)]
        bg-[var(--background)]
        pt-16 pb-8 px-6 lg:px-10
      "
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div data-fade-up className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <span
                className="
                w-10 h-10 rounded-full bg-[var(--green)]
                flex items-center justify-center
                group-hover:bg-[var(--green-dark)] transition-colors duration-200
              "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 56 36"
                  className="w-5 h-auto"
                >
                  <path
                    fill="#fff"
                    d="M5.99,23.97l8.99-8.99H5.99v17.98H0V8.99h23.97v5.99l-8.99,8.99,11.98,11.98v8.99L5.99,23.97Z"
                  />
                  <path
                    fill="#fff"
                    d="M32.00,14.98v-5.99h23.97v5.99h-23.97ZM32.00,23.97v-5.99h23.97v5.99h-23.97ZM32.00,32.96v-5.99h23.97v5.99h-23.97Z"
                  />
                </svg>
              </span>
              <span
                className="text-lg uppercase text-[var(--foreground)]"
                style={{ fontFamily: "var(--font-vermin-vibes)" }}
              >
                Royal Effect
              </span>
            </Link>
            <p className="text-sm text-[var(--muted)] max-w-[26ch] leading-relaxed">
              Brand identity &amp; logo design studio. We build brands that mean
              business.
            </p>
            {/* Socials */}
            {/* <div className="flex items-center gap-3 mt-1">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="
                    w-8 h-8 flex items-center justify-center
                    rounded border border-[var(--border)]
                    text-[var(--muted)] hover:text-[var(--green)]
                    hover:border-[var(--green)]
                    transition-all duration-200
                  "
                >
                  <Icon />
                </a>
              ))}
            </div> */}
          </div>

          {/* Navigation */}
          <div data-fade-up>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--muted-2)] mb-4">
              Navigate
            </p>
            <ul className="flex flex-col gap-2.5">
              {NavLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="
                      text-sm text-[var(--muted)] hover:text-[var(--green)]
                      transition-colors duration-200
                    "
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

       
        </div>

        {/* Divider + copyright */}
        <div
          data-fade-up
          className="
            border-t border-[var(--border)] pt-6
            flex flex-col sm:flex-row items-start sm:items-center justify-between
            gap-2
          "
        >
          {/* <p className="text-xs text-[var(--muted-2)]">
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <p className="text-xs text-[var(--muted-2)]">{COMPANY.tagline}</p> */}
        </div>
      </div>
    </footer>
  );
}

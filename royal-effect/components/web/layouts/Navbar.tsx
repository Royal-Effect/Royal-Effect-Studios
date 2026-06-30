"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/web/ThemeToggle";
import { NavLinks } from "@/libs/constants/navLinksData";
import Image from "next/image";
import { GlitchText } from "@/components/web/GlitchText";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  /* Scroll detection */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* Close menu on Escape key */
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  /* Close menu if viewport is resized up to desktop width (lg breakpoint) */
  useEffect(() => {
    if (!menuOpen) return;
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [menuOpen]);

  /* Close on route change (link click) */
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        ref={navRef}
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${
            scrolled
              ? "bg-[var(--background)]/95 backdrop-blur-md border-b border-[var(--border)] shadow-sm"
              : "bg-transparent"
          }
        `}
      >
        <div className="w-screen mx-auto px-6 py-10 lg:px-10 h-16 flex items-center justify-between gap-6">
          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-3 flex-shrink-0 group"
            aria-label="Royal Effect Studios — Home"
            id="nav-logo"
          >
            <Image
              src="/images/logo.svg"
              alt="Royal Effect Studios"
              width={40}
              height={40}
            />
          </Link>

          {/* ── Desktop Nav Links ── */}
          <nav
            className="hidden lg:flex items-center gap-8"
            aria-label="Main navigation"
          >
            {NavLinks.map(({ label, href }) => (
            <GlitchText
                key={href}
                href={href}
                label={label}
                id={`nl-${label.toLowerCase()}`}
                className="
                  font-vermin-vibes
                  relative text-sm text-[var(--muted)]
                  uppercase tracking-wide
                  after:absolute after:bottom-[-3px] after:left-0 after:right-0
                  after:h-[2px] after:bg-[var(--green)]
                  after:scale-x-0 after:origin-left
                  after:transition-transform after:duration-200
                  hover:after:scale-x-100
                "
            />
            ))}
          </nav>

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Theme toggle — desktop only; shown in sidebar on mobile */}
            <div className="hidden lg:flex">
              <ThemeToggle />
            </div>

            {/* CTA — desktop */}
            <Link
              href="/contact"
              id="nav-cta"
              className="
                hidden lg:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold
                bg-[var(--green)] text-white
                rounded hover:bg-[var(--green-dark)]
                transition-all duration-200
                hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[var(--green)]/25
              "
            >
              Start a Project
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            {/* Hamburger — mobile */}
            <button
              id="hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="lg:hidden flex flex-col justify-center gap-1.25 w-9 h-9 focus-visible:outline-none"
            >
              <span
                className={`block w-5 h-0.5 bg-foreground transition-all duration-200 origin-center ${
                  menuOpen ? "translate-y-1.75 rotate-45" : ""
                }`}
            />
              <span
                className={`block w-5 h-0.5 bg-foreground transition-all duration-200 ${
                  menuOpen ? "opacity-0 scale-x-0" : ""
                }`}
            />
              <span
                className={`block w-5 h-0.5 bg-foreground transition-all duration-200 origin-center ${
                  menuOpen ? "-translate-y-1.75 -rotate-45" : ""
                }`}
            />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Full-Screen Menu ── */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={`
          fixed inset-0 z-40 flex flex-col
          bg-background
          transition-all duration-300 ease-[cubic-bezier(0.77,0,0.175,1)]
          ${
            menuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
      >
        {/* Top bar spacer */}
        <div className="h-16 flex-shrink-0" />

        {/* Links */}
        <nav className="flex flex-col justify-center flex-1 px-8 gap-2">
          {NavLinks.map(({ label, href }, i) => (
            <GlitchText
              key={href}
              href={href}
              label={label}
              onClick={closeMenu}
              className={`
                font-vermin-vibes
                text-[clamp(1.5rem,9vw,4.5rem)] leading-none uppercase
                text-[var(--muted)]
                border-b border-[var(--border)] py-4
                block
                transition-transform duration-200
                ${
                  menuOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                }
              `}
              style={{
                transitionDelay: menuOpen ? `${i * 60 + 80}ms` : "0ms",
              }}
            />
          ))}

          {/* Mobile CTA */}
          <Link
            href="/contact"
            onClick={closeMenu}
            className={`
              mt-8 inline-flex items-center justify-center gap-2
              px-6 py-4 text-base font-semibold
              bg-[var(--green)] text-white rounded
              hover:bg-[var(--green-dark)] transition-all duration-200
              ${
                menuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }
            `}
            style={{ transitionDelay: menuOpen ? "320ms" : "0ms" }}
          >
            Start a Project →
          </Link>
        </nav>

        {/* Theme toggle row — mobile sidebar only */}
        <div
          className={`
            px-8 py-4 flex items-center justify-between gap-3
            border-t border-[var(--border)]
            transition-all duration-300
            ${menuOpen ? "opacity-100" : "opacity-0"}
          `}
          style={{ transitionDelay: menuOpen ? "340ms" : "0ms" }}
        >
          <span className="text-xs font-medium text-[var(--muted)] uppercase tracking-widest">
            Appearance
          </span>
          <ThemeToggle />
        </div>

        {/* Bottom meta */}
        <div
          className={`
            px-8 py-8 text-xs text-[var(--muted)] border-t border-[var(--border)]
            transition-all duration-300
            ${menuOpen ? "opacity-100" : "opacity-0"}
          `}
          style={{ transitionDelay: menuOpen ? "360ms" : "0ms" }}
        >
          © {new Date().getFullYear()} Royal Effect Studios. All rights
          reserved.
        </div>
      </div>
    </>
  );
}

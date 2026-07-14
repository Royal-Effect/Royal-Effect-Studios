"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CONSENT_KEY = "re_cookie_consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      // Small delay so it doesn't flash during preloader
      const t = setTimeout(() => setVisible(true), 2500);
      return () => clearTimeout(t);
    }

    // Re-apply consent to GA on every load
    if (stored === "granted") grantConsent();
    else denyConsent();
  }, []);

  const grantConsent = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }
  };

  const denyConsent = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }
  };

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "granted");
    grantConsent();
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, "denied");
    denyConsent();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[9999] border-t border-[var(--border)] bg-[var(--background)] px-6 py-5 md:px-10"
      style={{
        animation: "slideUpBanner 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      }}
    >
      <style>{`
        @keyframes slideUpBanner {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>

      <div className="w-full max-w-[80rem] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Text */}
        <div className="flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1">
            Cookie Notice
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
              We use cookies to understand how visitors interact with our site. This helps us improve your experience. Read our{" "}
              <Link href="/privacy" className="text-foreground underline underline-offset-4 hover:text-foreground/80 transition-colors">
                Privacy Policy
              </Link>
              .
            </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={handleDecline}
            className="h-10 px-5 text-xs font-bold uppercase tracking-[0.15em] border border-[var(--border)] text-muted-foreground hover:text-foreground hover:border-foreground transition-colors duration-200"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="h-10 px-5 text-xs font-bold uppercase tracking-[0.15em] bg-foreground text-background hover:bg-[var(--green)] hover:text-white transition-colors duration-300"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

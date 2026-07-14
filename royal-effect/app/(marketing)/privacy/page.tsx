import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Royal Effect Studios",
  description:
    "Privacy Policy for Royal Effect Studios. Learn how we collect, use, and protect your information.",
};

const LAST_UPDATED = "July 14, 2025";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border py-20 lg:py-28">
        <div className="w-full max-w-4xl mx-auto px-6 lg:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-6">
            Legal
          </p>
          <h1 className="font-vermin-vibes text-5xl md:text-6xl lg:text-7xl uppercase text-foreground tracking-widest leading-none mb-6">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="w-full max-w-4xl mx-auto px-6 lg:px-10 prose prose-invert max-w-none">
          <div className="space-y-12 text-muted-foreground leading-relaxed">

            {/* 1 */}
            <div>
              <h2 className="text-xl font-bold uppercase tracking-widest text-foreground mb-4">
                1. Who We Are
              </h2>
              <p>
                Royal Effect Studios is a brand identity and logo design studio
                based in Lagos, Nigeria. This Privacy Policy explains how we
                collect, use, and protect information when you visit{" "}
                <span className="text-foreground font-medium">
                  royal-effect-studios.vercel.app
                </span>{" "}
                (the "Site").
              </p>
            </div>

            {/* 2 */}
            <div>
              <h2 className="text-xl font-bold uppercase tracking-widest text-foreground mb-4">
                2. Information We Collect
              </h2>
              <p className="mb-4">We collect information in two ways:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>
                  <span className="text-foreground font-medium">
                    Information you provide:
                  </span>{" "}
                  When you submit our contact form or subscribe to our
                  newsletter, we collect your name, email address, and message.
                </li>
                <li>
                  <span className="text-foreground font-medium">
                    Analytics data:
                  </span>{" "}
                  If you consent to analytics cookies, we collect anonymised
                  data about how you use the Site via Google Analytics 4. This
                  includes pages visited, time on site, and device type. No
                  personally identifiable information is collected through
                  analytics.
                </li>
              </ul>
            </div>

            {/* 3 */}
            <div>
              <h2 className="text-xl font-bold uppercase tracking-widest text-foreground mb-4">
                3. Cookies & Tracking
              </h2>
              <p className="mb-4">
                We use Google Analytics 4 to understand how visitors interact
                with our Site. We operate under{" "}
                <span className="text-foreground font-medium">
                  Google Consent Mode v2
                </span>
                . This means:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>
                  By default, all analytics storage is <strong className="text-foreground">denied</strong>.
                </li>
                <li>
                  Analytics cookies are only set after you explicitly click{" "}
                  <strong className="text-foreground">Accept</strong> on our
                  cookie banner.
                </li>
                <li>
                  If you decline, no analytics cookies are stored and no
                  tracking occurs.
                </li>
                <li>
                  You can change your preference at any time by clearing your
                  browser's local storage for this site.
                </li>
              </ul>
              <p className="mt-4">
                We do not use advertising cookies, ad personalisation, or
                sell your data to third parties.
              </p>
            </div>

            {/* 4 */}
            <div>
              <h2 className="text-xl font-bold uppercase tracking-widest text-foreground mb-4">
                4. How We Use Your Information
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>To respond to enquiries submitted via the contact form</li>
                <li>To send newsletter updates to subscribers</li>
                <li>
                  To improve the Site based on anonymised usage analytics
                  (with your consent only)
                </li>
              </ul>
              <p className="mt-4">
                We do not sell, rent, or share your personal information with
                third parties for marketing purposes.
              </p>
            </div>

            {/* 5 */}
            <div>
              <h2 className="text-xl font-bold uppercase tracking-widest text-foreground mb-4">
                5. Third-Party Services
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>
                  <span className="text-foreground font-medium">
                    Web3Forms:
                  </span>{" "}
                  Processes contact form and newsletter submissions. See their{" "}
                  <a
                    href="https://web3forms.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground underline underline-offset-4"
                  >
                    Privacy Policy
                  </a>
                  .
                </li>
                <li>
                  <span className="text-foreground font-medium">
                    Google Analytics 4:
                  </span>{" "}
                  Anonymised site analytics (consent-gated). See{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground underline underline-offset-4"
                  >
                    Google's Privacy Policy
                  </a>
                  .
                </li>
                <li>
                  <span className="text-foreground font-medium">Sanity:</span>{" "}
                  Headless CMS for managing content. No user data is stored in
                  Sanity.
                </li>
              </ul>
            </div>

            {/* 6 */}
            <div>
              <h2 className="text-xl font-bold uppercase tracking-widest text-foreground mb-4">
                6. Your Rights
              </h2>
              <p className="mb-4">
                Depending on your location, you may have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Access the personal data we hold about you</li>
                <li>Request correction or deletion of your data</li>
                <li>Withdraw consent for analytics at any time</li>
                <li>Lodge a complaint with your local data protection authority</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, contact us at the details
                below.
              </p>
            </div>

            {/* 7 */}
            <div>
              <h2 className="text-xl font-bold uppercase tracking-widest text-foreground mb-4">
                7. Data Retention
              </h2>
              <p>
                Contact form submissions are retained only as long as necessary
                to respond to your enquiry. Newsletter subscriber emails are
                kept until you unsubscribe. Anonymised analytics data is
                retained per Google Analytics' default retention settings (up
                to 14 months).
              </p>
            </div>

            {/* 8 */}
            <div>
              <h2 className="text-xl font-bold uppercase tracking-widest text-foreground mb-4">
                8. Contact
              </h2>
              <p>
                If you have any questions about this Privacy Policy or how we
                handle your data, please contact us:
              </p>
              <div className="mt-4 space-y-1">
                <p>
                  <span className="text-foreground font-medium">Studio:</span>{" "}
                  Royal Effect Studios
                </p>
                <p>
                  <span className="text-foreground font-medium">Location:</span>{" "}
                  Lagos, Nigeria
                </p>
                <p>
                  <span className="text-foreground font-medium">WhatsApp:</span>{" "}
                  <a
                    href="https://wa.me/+2349066048991"
                    className="text-foreground underline underline-offset-4"
                  >
                    +234 906 604 8991
                  </a>
                </p>
                <p>
                  <span className="text-foreground font-medium">Instagram:</span>{" "}
                  <a
                    href="https://www.instagram.com/royaleffect_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground underline underline-offset-4"
                  >
                    @royaleffect_
                  </a>
                </p>
              </div>
            </div>

            {/* 9 */}
            <div>
              <h2 className="text-xl font-bold uppercase tracking-widest text-foreground mb-4">
                9. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Any
                changes will be posted on this page with an updated date. We
                recommend checking this page periodically.
              </p>
            </div>

            {/* Back link */}
            <div className="pt-8 border-t border-border">
              <Link
                href="/"
                className="text-sm font-bold uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                ← Back to Home
              </Link>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

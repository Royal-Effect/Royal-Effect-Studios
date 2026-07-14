import type { Metadata } from "next";
import { IBM_Plex_Sans, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/web/utils/theme-provider";
import { Preloader } from "@/components/web/utils/Preloader";
import { SmoothScrollProvider } from "@/libs/utils/SmoothScrollProvider";
import { CustomCursor } from "@/components/web/utils/CustomCursor";
import { cn } from "@/libs/utils/utils";
import { GoogleAnalytics } from "@next/third-parties/google";
import { CookieBanner } from "@/components/web/utils/CookieBanner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const verminVibes = localFont({
  src: "../public/font/VerminVibes.woff",
  variable: "--font-vermin-vibes",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  title: {
    default: "Royal Effect Studios",
    template: "%s | Royal Effect Studios",
  },
  description: "Premium brand identity and logo design studio based in Lagos, Nigeria. We build brands that mean business.",
  icons: {
    icon: [
      { url: "/images/Logo.svg", type: "image/svg+xml" },
    ],
    apple: "/images/Logo.svg",
    shortcut: "/images/Logo.svg",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        verminVibes.variable,
        ibmPlexSans.variable,
        "font-sans",
        inter.variable
      )}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <title>Royal Effect Studios</title>
        <link rel="icon" href="/images/Logo.svg" sizes="any" />
        {/* GA Consent Mode v2 — all denied by default until user accepts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                wait_for_update: 500
              });
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Preloader />
          <CustomCursor />
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
        <CookieBanner />
        <GoogleAnalytics gaId="G-NE7C5Q1HHH" />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { IBM_Plex_Sans, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/web/theme-provider";
import { Preloader } from "@/components/web/Preloader";
import { SmoothScrollProvider } from "@/libs/utils/SmoothScrollProvider";
import { CustomCursor } from "@/components/web/CustomCursor";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

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
  title: "Royal Effect Studios",
  description: "Brand identity & logo design studio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", verminVibes.variable, ibmPlexSans.variable, "font-sans", inter.variable)}
      suppressHydrationWarning
    >
      <head>
        <title>Royal Effect Studios</title>
        <link rel="icon" href="/images/Logo.svg" sizes="any" />
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
      </body>
    </html>
  );
}

import React from "react";
import { Metadata } from "next";
import { AboutSections } from "@/components/web/sections/royal-effect/AboutSections";
import { ServicesMarquee } from "@/components/web/sections/shared/ServicesMarquee";
import { CtaBand } from "@/components/web/sections/shared/CtaBand";
import OurStory from "@/components/web/sections/royal-effect/OurStory";
import { OurMission } from "@/components/web/sections/royal-effect/OurMission";
import { OurVision } from "@/components/web/sections/royal-effect/OurVision";
import CtaAbout from "@/components/web/sections/royal-effect/CtaRoyalEffect";


export const metadata: Metadata = {
  title: "Royal Effect Studios – About",
  description:
    "Learn how Royal Effect Studios approaches brand identity, strategy, vision, and the work behind the studio.",
  openGraph: {
    title: "Royal Effect Studios",
    description:
      "Premium brand-identity studio delivering modern, strategic design.",
    images: "/images/og-royaleffect.jpg",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Royal Effect Studios",
    description: "Explore the studio story, mission, vision, and process.",
    images: "/images/og-royaleffect.jpg",
  },
};

export default function RoyalEffectPage() {
  return (
    <>
      <AboutSections />
      <OurStory />
      <ServicesMarquee />
      <OurMission />
      <OurVision />
      <CtaAbout />
     
    </>
  );
}

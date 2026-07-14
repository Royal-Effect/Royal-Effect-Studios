import { Metadata } from "next";
import { HeroSection } from "@/components/web/sections/home/HeroSection";
import { SelectedWork } from "@/components/web/sections/home/SelectedWork";
import { ServicesMarquee } from "@/components/web/sections/shared/ServicesMarquee";
import { StudioEthos } from "@/components/web/sections/home/StudioEthos";
import { WhatWeOffer } from "@/components/web/sections/shared/WhatWeOffer";
import { FaqSection } from "@/components/web/sections/home/FaqSection";
import CtaHero from "@/components/web/sections/home/CtaHero";
import { BlogFeaturedPost } from "@/components/web/sections/blog/blogFeaturedPost";

import { client } from "@/sanity/lib/client";
import { featuredWorksQuery, blogPostsQuery, faqsQuery } from "@/sanity/lib/queries";
import { SelectedWorkInterface } from "@/libs/interfaces/selectedWork";
import { BlogInterface } from "@/libs/interfaces/blog";

export const revalidate = 60;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://royal-effect-studios.vercel.app"),
  title: "Royal Effect Studios — Brand Identity & Logo Design",
  description:
    "Royal Effect is a premium brand identity and logo design studio. We build brands that mean business — strategic, modern, and built to make first impressions last.",
  openGraph: {
    title: "Royal Effect Studios",
    description: "Brand identity & logo design studio.",
    type: "website",
  },
};

export default async function HomePage() {
  // Fetch featured works (max 5)
  const worksToDisplay = await client.fetch<SelectedWorkInterface[]>(featuredWorksQuery);

  // Fetch latest blog post for featured section
  const blogs = await client.fetch<BlogInterface[]>(blogPostsQuery);
  const featuredPost = blogs.length > 0 ? blogs[0] : null;

  // Fetch FAQs from Sanity
  const faqs = await client.fetch<{ _id: string; question: string; answer: string }[]>(faqsQuery);

  return (
    <main>
      <HeroSection />
      <SelectedWork projects={worksToDisplay} />
      <ServicesMarquee />
      <StudioEthos />
      <WhatWeOffer />
      <FaqSection faqs={faqs} />
      {featuredPost && <BlogFeaturedPost post={featuredPost} />}
      <CtaHero />
    </main>
  );
}

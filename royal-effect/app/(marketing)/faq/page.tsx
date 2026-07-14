import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { faqsQuery } from "@/sanity/lib/queries";
import { FAQS } from "@/libs/constants/faq";
import { FaqSection } from "@/components/web/sections/home/FaqSection";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about working with Royal Effect Studios — pricing, timelines, process, and more.",
};

export default async function FaqPage() {
  const sanityFaqs = await client.fetch<
    { _id: string; question: string; answer: string }[]
  >(faqsQuery);

  const faqs = sanityFaqs.length > 0 ? sanityFaqs : FAQS;

  return (
    <main className="min-h-screen bg-background">
      <FaqSection faqs={faqs} />
    </main>
  );
}

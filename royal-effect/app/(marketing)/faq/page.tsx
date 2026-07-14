import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { faqsQuery } from "@/sanity/lib/queries";
import { FAQS } from "@/libs/constants/faq";
import Link from "next/link";
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
    <main className="min-h-screen bg-background pb-16">
      <FaqSection faqs={faqs} />
      
      {/* Back link */}
      <div className="w-full max-w-3xl mx-auto px-6 lg:px-10 mt-8">
        <div className="pt-8 border-t border-border">
          <Link
            href="/"
            className="text-sm font-bold uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

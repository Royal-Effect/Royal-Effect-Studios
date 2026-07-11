import { Metadata } from "next";
import { ContactHeroSection } from "@/components/web/sections/contact/ContactHeroSection";
import { ContactForm } from "@/components/web/sections/contact/ContactForm";
import { ContactInfo } from "@/components/web/sections/contact/ContactInfo";

export const metadata: Metadata = {
  title: "Contact | Royal Effect Studios",
  description: "Get in touch with Royal Effect Studios. Let's build a brand that means business.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <ContactHeroSection />
      
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column - Form */}
          <section className="order-2 lg:order-1">
            <ContactForm />
          </section>

          {/* Right Column - Map & Info */}
          <section className="order-1 lg:order-2 h-full lg:sticky lg:top-32">
            <ContactInfo />
          </section>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import { GlitchText } from "@/components/web/utils/GlitchText";

export function BlogNewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("submitting");

    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
      if (!accessKey) throw new Error("Missing Access Key");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          email: email,
          subject: "New Newsletter Subscriber (Blog)!",
          message: `${email} has subscribed to the Royal Effect Newsletter from the Blog!`,
          from_name: "Royal Effect Website",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setEmail("");
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section className="bg-background border-t border-border py-24 lg:py-32">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">
          {/* Left — Text */}
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-6">
              Stay in the Loop
            </p>
            <h2 className="font-vermin-vibes text-4xl md:text-5xl lg:text-6xl text-foreground uppercase tracking-widest leading-tight mb-4">
              <GlitchText className="font-vermin-vibes text-4xl md:text-5xl lg:text-6xl text-foreground uppercase tracking-widest">
                Never Miss a Story
              </GlitchText>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Get notified when we publish new articles. No spam, just stories worth reading.
            </p>
          </div>

          {/* Right — Form */}
          <div className="w-full lg:w-auto">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="YOUR EMAIL"
                disabled={status === "submitting" || status === "success"}
                className="w-full sm:w-72 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === "submitting" || status === "success"}
                className="px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] border border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-all duration-300 whitespace-nowrap disabled:opacity-50"
              >
                {status === "submitting" ? "WAIT..." : status === "success" ? "SUBSCRIBED" : "SUBSCRIBE"}
              </button>
            </form>
            {status === "error" && (
              <p className="text-destructive text-xs mt-2 uppercase tracking-widest">Failed. Please try again.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

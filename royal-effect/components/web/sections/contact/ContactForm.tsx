"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitStatus("success");
      reset(); 
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-xl">
      {submitStatus === "success" && (
        <div className="mb-8 p-4 border border-[var(--green)] bg-[var(--green)]/10 text-[var(--green)] text-sm font-medium rounded-md">
          Thank you! Your message has been sent successfully. We'll be in touch soon.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-8 p-4 border border-destructive bg-destructive/10 text-destructive text-sm font-medium rounded-md">
          Oops! Something went wrong. Please try again later or email us directly.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">Name</label>
          <Input 
            id="name" 
            placeholder="John Doe" 
            {...register("name")}
            className="h-12 border-[var(--border)] focus-visible:border-[var(--green)] focus-visible:ring-[var(--green)] bg-transparent rounded-none"
          />
          {errors.name && <p className="text-destructive text-xs font-medium">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">Email</label>
          <Input 
            id="email" 
            type="email" 
            placeholder="hello@example.com" 
            {...register("email")}
            className="h-12 border-[var(--border)] focus-visible:border-[var(--green)] focus-visible:ring-[var(--green)] bg-transparent rounded-none"
          />
          {errors.email && <p className="text-destructive text-xs font-medium">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">Subject</label>
          <Input 
            id="subject" 
            placeholder="Project Inquiry" 
            {...register("subject")}
            className="h-12 border-[var(--border)] focus-visible:border-[var(--green)] focus-visible:ring-[var(--green)] bg-transparent rounded-none"
          />
          {errors.subject && <p className="text-destructive text-xs font-medium">{errors.subject.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">Message</label>
          <Textarea 
            id="message" 
            placeholder="Tell us about your project..." 
            rows={5}
            {...register("message")}
            className="border-[var(--border)] focus-visible:border-[var(--green)] focus-visible:ring-[var(--green)] bg-transparent rounded-none resize-none"
          />
          {errors.message && <p className="text-destructive text-xs font-medium">{errors.message.message}</p>}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full h-14 bg-foreground text-background font-bold text-xs tracking-[0.15em] uppercase hover:bg-[var(--green)] hover:text-white transition-colors duration-300 disabled:opacity-50 flex items-center justify-center gap-2 rounded-none mt-4"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}

"use client";

import Image from "next/image";
import { MapPin, Mail, Phone, ExternalLink } from "lucide-react";

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5 shrink-0 text-foreground opacity-50"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export function ContactInfo() {
  return (
    <div className="w-full lg:max-w-xl md:mx-auto lg:mx-0 flex flex-col h-full">
      <div className="flex-1 w-full min-h-[400px] lg:min-h-[500px] bg-muted relative border border-border overflow-hidden rounded-none z-0 group">
        <Image
          src="/images/contact-location.png"
          alt="Royal Effect Studios Location"
          fill
          className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
          priority
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/30 pointer-events-none" />

        {/* Location Marker Pin */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative flex flex-col items-center">
            <span className="absolute -inset-3 rounded-full bg-[var(--green)]/30 animate-ping" />
            <div className="relative z-10 p-3 bg-background/90 backdrop-blur-md border border-[var(--green)] rounded-full shadow-2xl flex items-center justify-center text-[var(--green)]">
              <MapPin className="w-6 h-6 fill-[var(--green)]/20 text-[var(--green)]" />
            </div>
            <div className="mt-3 px-3 py-1 bg-background/90 backdrop-blur-md border border-border rounded-full shadow-lg">
              <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">
                Royal Effect Studios
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 p-6 sm:p-0 bg-surface/30 sm:bg-transparent border border-border sm:border-0">
        <div>
          <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Instagram
          </h3>
          <div className="flex items-center gap-4 text-foreground">
            <InstagramIcon />
            <a 
              href="https://www.instagram.com/royaleffect_/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm font-medium hover:text-[var(--green)] transition-colors uppercase tracking-widest text-muted-foreground flex items-center gap-2 group"
            >
              @royaleffect_
              <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Contact
            </h3>
            <div className="flex items-center gap-4 text-foreground mb-4">
              <Mail className="w-5 h-5 shrink-0 text-foreground opacity-50" />
              <a href="mailto:royaleffect22@gmail.com" className="text-sm font-medium hover:text-[var(--green)] transition-colors uppercase tracking-widest text-muted-foreground">
                royaleffect22@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-4 text-foreground">
              <Phone className="w-5 h-5 shrink-0 text-foreground opacity-50" />
              <a href="tel:+2349066048991" className="text-sm font-medium hover:text-[var(--green)] transition-colors uppercase tracking-widest text-muted-foreground">
                +234 906 604 8991
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


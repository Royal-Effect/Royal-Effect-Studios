"use client";

import { MapPin, Mail, Phone } from "lucide-react";
import { Map, Marker } from "pigeon-maps";

export function ContactInfo() {
  return (
    <div className="w-full lg:max-w-xl md:mx-auto lg:mx-0 flex flex-col h-full">
      <div className="flex-1 w-full min-h-[400px] lg:min-h-[500px] bg-muted relative border border-border overflow-hidden rounded-none z-0">
        <Map defaultCenter={[6.5599557, 3.3512399]} defaultZoom={14}>
          <Marker width={45} anchor={[6.5599557, 3.3512399]} color="var(--green)" />
        </Map>
      </div>
      
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 p-6 sm:p-0 bg-surface/30 sm:bg-transparent border border-border sm:border-0">
        <div>
          <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Studio Location
          </h3>
          <div className="flex items-start gap-4 text-foreground">
            <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-foreground opacity-50" />
            <p className="text-sm leading-relaxed font-medium uppercase tracking-widest text-muted-foreground">
              Royal Effect Studios<br />
              Creative District<br />
              Lagos, Nigeria
            </p>
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

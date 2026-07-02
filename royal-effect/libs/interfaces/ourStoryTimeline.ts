import type { LucideIcon } from "lucide-react";

interface OurStoryTimelineInterface {
  year: string;
  title: string;
  text: string;
  icon: LucideIcon;
  side: "left" | "right";
}

export type { OurStoryTimelineInterface };
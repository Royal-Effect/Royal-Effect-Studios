import { Compass, LayoutPanelLeft, Layers3, PenTool, Rocket } from "lucide-react";
import { OurStoryTimelineInterface } from "@/libs/interfaces/ourStoryTimeline";

export const ourStoryTimelineData: OurStoryTimelineInterface[] = [
  {
    year: "Year One",
    title: "Freelance, Lagos",
    text:
      "Started taking on brand identity work between other jobs, noticing the same pattern every time: too many hands, too little ownership, and the original idea diluted by launch day.",
    icon: PenTool,
    side: "left",
  },
  {
    year: "Year Two",
    title: "The Rule Forms",
    text:
      "One person carries the vision from strategy to final file. No relay race between a strategist, a designer, and a dev who never spoke to each other.",
    icon: Compass,
    side: "right",
  },
  {
    year: "Year Three",
    title: "Royal Effect",
    text:
      "What began as freelance work for a handful of Lagos founders becomes a studio: same principle, more capacity, still hands-on with every brand that comes through the door.",
    icon: Layers3,
    side: "left",
  },
  {
    year: "Year Four",
    title: "Systems Sharpen",
    text:
      "The studio expands its process without losing its edge. Strategy, visual language, and digital execution begin to move as one system instead of separate deliverables.",
    icon: LayoutPanelLeft,
    side: "right",
  },
  {
    year: "Year Five",
    title: "Where We Are Now",
    text:
      "Royal Effect now works like a precision studio built for founders who want clarity, restraint, and a brand that can carry itself with confidence from launch to growth.",
    icon: Rocket,
    side: "left",
  },
];
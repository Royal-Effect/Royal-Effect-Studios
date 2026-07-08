import { SelectedWorkInterface } from "@/libs/interfaces/selectedWork";

/**
 * Static placeholder data — will be replaced by Sanity GROQ queries.
 * Brand colors now use the Sanity color picker format.
 * Gallery uses Sanity image references (placeholder paths for now).
 */
export const selectedWorkData: SelectedWorkInterface[] = [
  {
    id: 1,
    slug: "apex-industries",
    title: "Apex Core Identity",
    client: "Apex Industries",
    category: { _id: "cat-brand-identity", title: "Brand Identity" },
    color: "bg-surface-2",
    summary:
      "A sharper identity system for a leadership team that needed to look as disciplined as the work they ship.",
    year: "2025",
    services: ["Strategy", "Identity System", "Art Direction"],
    challenge:
      "The brand felt too generic for a company selling precision and trust at scale.",
    outcome:
      "A tighter visual language that gives the company more authority in pitches, decks, and the web.",
    brandIdentity: "Calm authority with a refined industrial edge.",
    brandDesign:
      "Soft mineral tones, matte surfaces, and an editorial grid that keeps the system composed.",
    searchTerms: ["apex", "brand identity", "industrial", "strategy", "pastel green"],
    brandColors: [
      { color: { hex: "#DCEDE0" }, foreground: "#17311C" },
      { color: { hex: "#F1DDCF" }, foreground: "#4B2E22" },
      { color: { hex: "#E7E1D8" }, foreground: "#2E2724" },
      { color: { hex: "#385244" }, foreground: "#F8F3EA" },
    ],
    gallery: [
      {
        image: "/images/work-apex.svg" as unknown as import("@sanity/image-url/lib/types/types").SanityImageSource,
        label: "Identity Board",
        alt: "Pastel identity board for Apex Industries",
        caption: "Primary brand sheet with the logo, palette, and type balance.",
      },
      {
        image: "/images/work-apex.svg" as unknown as import("@sanity/image-url/lib/types/types").SanityImageSource,
        label: "System Detail",
        alt: "Close-up brand system mockup for Apex Industries",
        caption: "A closer crop for logo, spacing, and signature applications.",
      },
    ],
  },
  {
    id: 2,
    slug: "neon-forge",
    title: "Neon Forge Platform Design",
    client: "Neon Forge",
    category: { _id: "cat-web-design", title: "Web Design & Strategy" },
    color: "bg-surface",
    summary:
      "A clearer digital presence built to turn a technical product story into something people could understand fast.",
    year: "2025",
    services: ["Web Strategy", "UX Direction", "Design System"],
    challenge:
      "The old experience buried the product value under too much noise and too many moving parts.",
    outcome:
      "A focused web structure that makes the offer easier to scan, compare, and trust.",
    brandIdentity: "Technical clarity wrapped in a warmer, more inviting digital tone.",
    brandDesign:
      "Bright pastel accents, a lighter grid, and flexible components that scale across product pages.",
    searchTerms: ["neon forge", "ux", "web design", "product story", "pastel palette"],
    brandColors: [
      { color: { hex: "#F7D8C6" }, foreground: "#4A2E22" },
      { color: { hex: "#F7EDC4" }, foreground: "#4C4220" },
      { color: { hex: "#D7E7F2" }, foreground: "#20354A" },
      { color: { hex: "#41524A" }, foreground: "#F5F1E8" },
    ],
    gallery: [
      {
        image: "/images/work-neon.svg" as unknown as import("@sanity/image-url/lib/types/types").SanityImageSource,
        label: "Product Story",
        alt: "Digital product layout for Neon Forge",
        caption: "A warm product landing layout built for fast scanning.",
      },
      {
        image: "/images/work-neon.svg" as unknown as import("@sanity/image-url/lib/types/types").SanityImageSource,
        label: "Interface Slice",
        alt: "UI composition for Neon Forge",
        caption: "A supporting crop showing the modular design system.",
      },
    ],
  },
  {
    id: 3,
    slug: "vanguard-edge",
    title: "Vanguard Logo Mark",
    client: "Vanguard Edge",
    category: { _id: "cat-logo-design", title: "Logo Design" },
    color: "bg-surface-2",
    summary:
      "A logo direction that carries more weight, more contrast, and less decoration than the previous mark.",
    year: "2024",
    services: ["Logo Design", "Brand Marks", "Usage Rules"],
    challenge:
      "The existing mark was forgettable and did not scale well across digital and print touchpoints.",
    outcome:
      "A compact identity mark that works harder in small spaces and still feels premium at scale.",
    brandIdentity: "Sharper geometry with a quieter, premium presence.",
    brandDesign:
      "Balanced contrast, muted pastels, and a tighter symbol system for flexible rollout.",
    searchTerms: ["vanguard edge", "logo design", "brand marks", "identity system", "pastels"],
    brandColors: [
      { color: { hex: "#F4E8E1" }, foreground: "#4A3028" },
      { color: { hex: "#EBC8B4" }, foreground: "#4D2F24" },
      { color: { hex: "#D8D4CD" }, foreground: "#2D2724" },
      { color: { hex: "#3A475A" }, foreground: "#F7F3EC" },
    ],
    gallery: [
      {
        image: "/images/work-vanguard.svg" as unknown as import("@sanity/image-url/lib/types/types").SanityImageSource,
        label: "Logo Reveal",
        alt: "Logo reveal presentation for Vanguard Edge",
        caption: "A clean reveal frame designed for decks and social posts.",
      },
      {
        image: "/images/work-vanguard.svg" as unknown as import("@sanity/image-url/lib/types/types").SanityImageSource,
        label: "Mark Application",
        alt: "Brand mark application for Vanguard Edge",
        caption: "A second frame that shows the symbol in a real-world layout.",
      },
    ],
  },
];
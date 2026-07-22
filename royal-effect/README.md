# Royal Effect Studios (Next.js & Sanity Portfolio Site)

Royal Effect Studios is the brand identity studio's flagship portfolio site — a fast, animation-forward marketing site built with **Next.js**, **Sanity** for content management, and **GSAP + Lenis** for cinematic scroll-driven motion. It's designed to showcase brand identity and logo design work for ambitious founders while loading fast and staying easy to update.

## 🚀 Key Features Built & Achieved

### 1. Cinematic Motion System (GSAP + Lenis)

- **Branded Preloader**: Built a custom GSAP preloader animating the studio's SVG monogram on every fresh page load, setting the tone before the site is even revealed.
- **Buttery Smooth Scroll**: Integrated `Lenis` via a dedicated smooth scroll provider, replacing native scroll with a physics-based, inertia-driven experience across the whole site.
- **Scroll-Triggered Storytelling**: Built dedicated `ScrollTrigger`-powered sections — `OurStory`, `OurMission`, `OurVision`, and `CtaFooter` — that animate into view as the user scrolls, turning the page into a guided narrative rather than a static scroll.
- **Custom Glitch Utility**: Authored a reusable glitch effect (`glitchTimeline.ts` + `Glitch.tsx`) for distinctive, on-brand text and image reveals used throughout the site.

### 2. Headless Content Management (Sanity v3)

- **Structured Content**: Integrated **Sanity v3** to manage Projects, Blog posts, and Site Settings, so studio work can be added or updated without touching code.
- **CORS-Locked Studio Access**: Configured CORS origin whitelisting on the `production` dataset to keep the Sanity Studio secure while remaining fully accessible from the live site.
- **Content-Driven Pages**: Project and blog pages pull directly from Sanity at build/request time, keeping the portfolio always up to date.

### 3. Polished, Accessible Navigation

- **Responsive Navbar**: Built a corrected navbar with a dedicated mobile menu, `Escape` key handling to close it, and body scroll lock to prevent background scrolling while the menu is open.
- **Component Interop Layer**: Added a `@/lib/utils.ts` shim alongside the existing `@/libs/` folder so Aceternity UI and shadcn/ui components can be dropped in without path conflicts.

### 4. Reliable Contact Pipeline (Web3Forms)

- **Zero-Backend Contact Form**: Wired up `Web3Forms` for the contact form, posting submissions directly to their API from the client — no custom backend endpoint required.
- **Environment-Based Config**: The Web3Forms access key is managed through a `NEXT_PUBLIC_` environment variable for clean separation between environments.
- **Spam Protection**: Leveraged Web3Forms' built-in spam filtering (honeypot + optional reCAPTCHA) to keep submissions clean without extra backend work.

### 5. Production-Grade Deployment (Vercel + Hostinger)

- **Custom Domain**: Deployed on **Vercel** with a custom domain connected through **Hostinger** DNS.
- **Hardened Build Pipeline**: Diagnosed and resolved a persistent 404 on production by tracking down missing dependencies, a misconfigured proxy redirect, an incorrect framework preset, and Vercel Authentication that was blocking unauthenticated visitors from reaching the live site.

### 6. Modern Frontend Foundation

- Built on **Next.js 16** (App Router) with **TypeScript** and **Tailwind CSS v4** for a fully typed, utility-first styling workflow.
- Component architecture designed for reuse across future studio pages and case studies.

## 🔐 Environment Variables

To run this project locally, create a `.env.local` file at the root of the project and populate it with the following variables:

```env
# Sanity project configuration
NEXT_PUBLIC_SANITY_PROJECT_ID="x41zqck8"
NEXT_PUBLIC_SANITY_DATASET="production"

# Web3Forms access key for the contact form
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY="your-web3forms-access-key"
```

## 📖 Documentation & Guides

### Sanity CMS Integration

We use **Sanity v3** as a headless CMS to manage all dynamic content on the site.

**Installation & Usage Process:**

1. **Setup**: Sanity Studio is embedded in the project, configured against project ID `x41zqck8` on the `production` dataset.
2. **Schemas**: Content types are defined for Projects, Blog posts, and Site Settings, giving the studio full control over what appears on the live site.
3. **CORS**: The `production` dataset's allowed origins are whitelisted to include both the local dev URL and the live domain, so content fetches work in every environment.
4. **Fetching**: Pages query Sanity directly using GROQ, rendering fresh content without redeploying the app.

### GSAP + Lenis Motion System

Motion is core to the Royal Effect Studios brand experience, so scroll and animation behavior are tightly controlled.

**Installation & Usage Process:**

1. **Smooth Scroll**: A `Lenis` provider wraps the app, intercepting native scroll and replacing it with smooth, inertia-based scrolling.
2. **Scroll-Triggered Sections**: Components like `OurStory`, `OurMission`, `OurVision`, and `CtaFooter` register `GSAP ScrollTrigger` instances tied to their position in the viewport.
3. **Preloader**: On initial load, a `GSAP` timeline animates the SVG monogram before revealing the page content.
4. **Glitch Effect**: `glitchTimeline.ts` exposes a reusable GSAP timeline consumed by the `Glitch.tsx` component wherever a glitch reveal is needed.

### Web3Forms Contact Form

The contact form sends messages directly from the client with no custom backend required.

**Installation & Usage Process:**

1. **Setup**: An access key is generated from Web3Forms and stored in `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`.
2. **Sending**: On submit, form data (including the access key) is `POST`ed directly to Web3Forms' API endpoint (`https://api.web3forms.com/submit`) as JSON.
3. **No Domain Verification**: Web3Forms handles delivery to the studio's inbox, so no custom domain or DNS verification is needed to start receiving submissions.

## 🛠️ Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000/) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses `next/font` to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
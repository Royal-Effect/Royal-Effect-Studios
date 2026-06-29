# Royal Effect — Portfolio Website Build Plan

**Next.js 16 · TypeScript · Tailwind v4 · Sanity v3 · Resend · Vercel**
_Prepared June 2026 · Confidential_

---

## Overview

We're building a high-performance, visually premium portfolio website for **Royal Effect** — a brand identity and logo design studio. The site's single north star is **lead generation**: every layout decision, animation, and copy block exists to convert a visitor into a WhatsApp message or inquiry form submission.

The client gets full content ownership via Sanity v3 — he can add projects, write blog posts, and publish updates without touching code.

**5 launch projects:** Sun Sculpt · BlackFlash · Gearbox Inc. · Symmetry · Digital WebACE

---

## Tech Stack

| Layer         | Tool                                                              |
| ------------- | ----------------------------------------------------------------- |
| Framework     | Next.js 16 (App Router)                                           |
| Language      | TypeScript                                                        |
| Styling       | Tailwind CSS v4                                                   |
| Animations    | GSAP + Lenis (smooth scroll) + Framer Motion (micro-interactions) |
| Lottie        | lottie-react (icon animations / loaders)                          |
| UI Components | shadcn/ui + Lucide icons                                          |
| CMS           | Sanity v3 (embedded Studio)                                       |
| Image CDN     | Sanity CDN (built-in)                                             |
| Email         | Resend                                                            |
| Forms         | React Hook Form + Zod                                             |
| Hosting       | Vercel                                                            |
| Domain        | Hostinger DNS → Vercel                                            |

---

## Build Order & What We're Doing at Each Phase

---

### Phase 0 — Pre-Build Setup

> **Goal:** Everything that must exist before a single line of code is written.

- [ ] Confirm all client assets received — logo SVG/PNG, brand hex codes, fonts, favicon
- [ ] Confirm Sanity project created and developer invited as editor
- [ ] Confirm Vercel + GitHub accounts connected
- [ ] Confirm Resend API key received
- [ ] Confirm domain name and Hostinger DNS access
- [ ] Confirm WhatsApp number, business email, Instagram handle
- [ ] Confirm mockup images for all 5 launch projects uploaded to Google Drive
- [ ] Confirm or write: hero headline, subline, about bio, services copy
- [ ] Confirm budget range options for inquiry form dropdown

> ⛔ Do not start Phase 1 until brand assets and Sanity access are confirmed.

---

### Phase 1 — Project Scaffold & Config

> **Goal:** Clean, working Next.js 16 project with all packages installed and configs wired up.

**What we're doing:**

- Scaffold Next.js 16 with TypeScript, Tailwind v4, App Router, ESLint
- Install all packages:
  ```bash
  pnpm add lenis gsap framer-motion lottie-react lucide-react next-sanity sanity \
  @sanity/client @sanity/image-url @portabletext/react resend react-hook-form \
  zod @hookform/resolvers slugify date-fns yet-another-react-lightbox clsx tailwind-merge
  ```
- Init shadcn/ui: `pnpm dlx shadcn@latest init`
- Set up folder structure:
  ```
  /app
  /components
    /ui          ← shadcn components
    /sections    ← page sections (Hero, Work, etc.)
    /layout      ← Navbar, Footer
  /lib           ← sanity client, utils, zod schemas
  /sanity        ← schema definitions
  /public        ← static assets (logo, favicon)
  /styles        ← global CSS
  ```
- Configure Tailwind v4 with brand tokens (colors, fonts, spacing)
- Set up GSAP + Lenis sync in a `SmoothScrollProvider` component
- Set up path aliases in `tsconfig.json` (`@/components`, `@/lib`, etc.)
- Configure `.env.local` with Sanity project ID, dataset, Resend API key
- Push to GitHub, connect to Vercel for auto-deploy

---

### Phase 2 — Sanity CMS Setup

> **Goal:** Client can log in and manage all content independently before the frontend is built.

**What we're doing:**

- Define Sanity schemas for 3 content types:

  **Project** (case study)

  - `title`, `slug`, `category` (Brand Identity / Logo Design / Concept)
  - `coverImage`, `gallery[]` (image array)
  - `overview` (plain text), `body` (Portable Text rich text)
  - `featured` (boolean — controls homepage appearance)
  - `status` (draft / published)

  **Blog Post**

  - `title`, `slug`, `coverImage`
  - `body` (Portable Text)
  - `publishedAt`, `author`

  **Site Settings** (singleton)

  - `logo`, `tagline`
  - `whatsappNumber`, `email`, `instagramHandle`
  - `seoTitle`, `seoDescription`

- Embed Sanity Studio at `/studio` route (Next.js App Router integration)
- Set up `@sanity/image-url` builder for CDN-optimized image URLs
- Write Sanity client helper in `/lib/sanity.ts`
- Write GROQ queries for: all projects, featured projects, single project by slug, all posts, single post by slug
- Test studio locally — confirm client can add a project end to end

---

### Phase 3 — Layout & Global Components

> **Goal:** Persistent UI that wraps every page — Navbar, Footer, smooth scroll, floating WhatsApp button.

**What we're doing:**

**Navbar**

- Logo left, nav links right (Work · About · Blog · Contact)
- Transparent on scroll top, solid background on scroll down (GSAP ScrollTrigger)
- Mobile: hamburger → full-screen slide-down menu with Framer Motion
- Active link state

**Footer**

- Logo, nav links, Instagram icon, email address
- Copyright line
- Subtle entrance animation on scroll into view

**Floating WhatsApp Button**

- Always visible, bottom-right corner
- Lottie or pulse animation to draw attention
- Links directly to WhatsApp chat with pre-filled message

**Smooth Scroll**

- Lenis initialized in `SmoothScrollProvider`, wrapped around layout
- GSAP ticker synced to Lenis for ScrollTrigger compatibility

**Global SEO**

- `generateMetadata` base config in root layout
- Open Graph tags, favicon, site title template

---

### Phase 4 — Homepage

> **Goal:** The homepage is the primary sales page. Every section moves the visitor toward an inquiry.

**Sections to build in order:**

**4.1 Hero**

- Bold headline (e.g. _"We Build Brands That Mean Business"_)
- 1–2 line subtext
- Primary CTA: WhatsApp button + secondary CTA: View Work
- Background: dark, minimal — brand aesthetic
- GSAP text reveal on load (SplitText or manual char stagger)
- Subtle background motion element (GSAP or CSS)

**4.2 Selected Work**

- 3–4 featured projects pulled from Sanity (`featured: true`)
- Large card grid layout — cover image dominant
- Hover reveal: project name + category overlays on hover (Framer Motion)
- Link to `/work/[slug]`
- "View All Work" link at bottom

**4.3 Services**

- 3 service cards: Brand Identity · Logo Design · Concept Projects
- 1–2 line description per service
- Clean icon or Lottie animation per card
- Scroll-triggered stagger entrance (GSAP)

**4.4 Process** _(optional — include if client provides steps)_

- 3–4 numbered steps of how Royal Effect works
- Horizontal scroll or vertical stagger layout

**4.5 Blog Preview**

- Latest 2–3 blog posts from Sanity
- Card layout: cover image, title, date, read more link
- Only shown once blog has at least 1 published post

**4.6 About Snippet**

- One strong sentence about Royal Effect
- Small headshot or brand photo (optional)
- Link to full `/about` page

**4.7 CTA Band**

- Full-width section: _"Ready to build your brand?"_
- Two buttons: WhatsApp · Start a Project (→ /contact)
- High contrast — this must stop the scroll

**4.8 Footer**

- Rendered from global Footer component (Phase 3)

---

### Phase 5 — Work / Portfolio Pages

> **Goal:** Showcase the 5 launch projects in a way that builds trust and demonstrates craft.

**5.1 `/work` — Portfolio Grid**

- All projects from Sanity, sorted by recency
- Filter tabs: All · Brand Identity · Logo Design · Concept
- Masonry or uniform grid layout — image-first
- Hover state: project title + category overlay
- GSAP scroll-triggered entrance per card (stagger)
- Each card links to `/work/[slug]`

**5.2 `/work/[slug]` — Case Study Page**

- Generated statically via `generateStaticParams` from Sanity slugs
- Full case study layout per project:
  - Hero — full-width cover image + project title + category badge
  - Overview — client brief, challenge, objectives (plain text)
  - Logo Development — concept notes, rationale
  - Mockup Gallery — high-res images via `yet-another-react-lightbox` (click to expand)
  - Final Identity — closing summary of what was delivered
- Sanity Portable Text renders the `body` rich text field
- Next/Previous project navigation at bottom
- CTA strip at bottom → WhatsApp / Contact

---

### Phase 6 — About Page

> **Goal:** Build trust, communicate brand personality, humanize Royal Effect.

**What we're doing:**

- Brand story — who Royal Effect is, what they stand for
- Process overview (if client provides steps — 3 to 4 steps)
- Values or brand personality statement (Modern · Strategic · Professional)
- Optional: headshot or studio photo
- CTA at bottom → start a project

---

### Phase 7 — Contact Page

> **Goal:** Remove every possible barrier between a lead and Royal Effect.

**What we're doing:**

- Inquiry form with React Hook Form + Zod validation:
  - Name (required)
  - Email (required)
  - Business / Brand Name (required)
  - Project Type (dropdown: Brand Identity / Logo Design / Concept / Other)
  - Budget Range (dropdown — ranges confirmed with client)
  - Project Description (textarea, required)
  - Timeline (text or dropdown)
- Form submission → Resend API route → email to Royal Effect's business inbox
- Success state: confirmation message on screen after submit
- WhatsApp CTA below form: _"Prefer to chat? Message us directly"_
- Optional: Calendly embed for discovery call booking

---

### Phase 8 — Blog

> **Goal:** Content channel that supports SEO and demonstrates expertise. Client-managed via Sanity.

**What we're doing:**

**8.1 `/blog` — Blog Index**

- All published posts from Sanity, sorted by date descending
- Card grid: cover image, title, date, excerpt
- Clean typography — readable, magazine-like

**8.2 `/blog/[slug]` — Blog Post**

- Generated statically via `generateStaticParams`
- Full post layout: cover image, title, date, author, body
- Portable Text renderer for rich text body (`@portabletext/react`)
- Reading time estimate (calculated from body word count)
- Related posts or CTA at bottom

---

### Phase 9 — SEO, Performance & Polish

> **Goal:** Hit 90+ PageSpeed on mobile and desktop. Look complete and production-ready.

**What we're doing:**

- `generateMetadata` on every page — unique title, description, Open Graph image
- Structured data (JSON-LD): LocalBusiness schema on homepage, CreativeWork schema on case studies
- All images via Next.js `<Image>` component with `priority` on above-fold images
- Lazy loading on gallery images
- Font optimization — `next/font` for any Google Fonts used
- Review and trim unused Tailwind classes
- GSAP ScrollTrigger cleanup on unmount (prevent memory leaks)
- Check all internal links, 404 handling, loading states
- Accessibility pass: alt text on all images, keyboard nav on form, focus states

---

### Phase 10 — Deployment & DNS

> **Goal:** Site is live on the client's domain, auto-deploys on every push to main.

**What we're doing:**

- Push final build to GitHub main branch
- Vercel auto-deploys from GitHub (already connected in Phase 1)
- Configure environment variables in Vercel dashboard (Sanity, Resend)
- Log into Hostinger DNS → add Vercel's A record and CNAME
- Wait for DNS propagation (up to 48hrs, usually under 2hrs)
- Confirm HTTPS is active on Vercel
- Run final Lighthouse audit on live URL
- Hand off Sanity Studio login to client with a quick walkthrough

---

### Phase 11 — Handoff & Documentation

> **Goal:** Client can manage the site independently. No dependency on developer for content.

**What we're doing:**

- Write a short Sanity usage guide:
  - How to add a new project
  - How to write a blog post
  - How to update site settings (WhatsApp number, social links)
- Document `.env` variables (for future developer reference)
- Final codebase cleanup — remove unused components, comment key sections
- Share GitHub repo link with client
- Confirm Resend email delivery is working (test form submission)

---

## Page Summary

| Page           | Route          | Data Source                              |
| -------------- | -------------- | ---------------------------------------- |
| Homepage       | `/`            | Sanity (featured projects, latest posts) |
| Portfolio Grid | `/work`        | Sanity (all projects)                    |
| Case Study     | `/work/[slug]` | Sanity (single project)                  |
| Blog Index     | `/blog`        | Sanity (all posts)                       |
| Blog Post      | `/blog/[slug]` | Sanity (single post)                     |
| About          | `/about`       | Static (client copy)                     |
| Contact        | `/contact`     | Static + Resend API                      |
| Sanity Studio  | `/studio`      | Embedded Sanity                          |

---

## Animation Principles

- Motion should feel like a **designer built it, not a developer showing off**
- GSAP handles scroll-driven animations (reveals, parallax, nav behaviour)
- Lenis handles smooth scroll — synced to GSAP ticker
- Framer Motion handles component-level interactions (hover, menu, transitions)
- Lottie for small icon animations (WhatsApp button pulse, loaders)
- No flashy transitions — subtle, purposeful, premium

---

_Royal Effect · Portfolio Website Build Plan · June 2026 · Confidential_

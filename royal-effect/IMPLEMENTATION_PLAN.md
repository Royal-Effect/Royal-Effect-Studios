# Sanity CMS Integration Plan for Royal Effect Studios (v4)

The goal is to migrate the static 'Work/Case Studies' portfolio to a dynamic, high-performance Sanity CMS integration. This will power the `/work/[slug]` pages and the Home Page, adding advanced features like AI summarization, document uploads, and robust SEO, while remaining **100% client-friendly**.

## 1. Client Management & The "Settings Page"
This architecture is designed so you or your clients can manage the entire website without touching a single line of code.
- **The Dashboard**: The client will simply go to a hidden URL (e.g., `royaleffect.com/studio`).
- **Ease of Use**: They will log in and see a highly customized, visually appealing dashboard to add new case studies or tweak the site.

### The "Global Settings" (Owner Only)
We will create a special "Singleton" document in Sanity called **Global Settings**. This acts as an admin-only settings panel where the site owner can instantly toggle global UI features on or off.
- **`enableSquigglyText` (Toggle)**: Turn off the squiggly text animations site-wide if you temporarily prefer a standard, rigid look.
- **`enablePreloader` (Toggle)**: Quickly disable the initial loading animation screen.
- **`enableAISummaries` (Toggle)**: Turn off the AI feature temporarily if needed.
- Because we fetch this globally in Next.js, flipping a switch in Sanity instantly updates the UI everywhere.

## 2. Defining the Schema (The Content Model)
We will define a highly detailed `project` schema to capture all facets of your brand systems:
- **`title` & `slug`**: Project name and URL routing.
- **`category` & `year`**: Brand classification and date.
- **`summary`**: A short intro summary.
- **`challenge`, `story`, & `outcome`**: Rich Text fields for the brand's narrative.
- **`services`**: Array of services provided.
- **`brandSystem`**: Detailed explanation of the brand system.
- **`websiteUrl`**: Official link to the brand's live page.
- **`brandColors`**: Array of objects (name, hex, contrastText).
- **`mainImage` & `gallery`**: Hero image and additional brand assets.
- **`brandDocuments`**: Upload downloadable PDFs, official brand guidelines, or presentation decks.
- **`typography`**: Document font families, weights, and usage rules.

## 3. AI Support, Summarization & Costs (NGN)
We will add an "AI Summarize" feature to the Case Study pages, creating a bite-sized summary for the reader.

### How to set it up for the client:
1. **The API Key**: The client will create a free account at `platform.openai.com` and generate a secret API Key. They provide this to us once, and we securely lock it in the server environment variables.
2. **Prepaid Credits (Cost in Naira)**: OpenAI uses a prepaid "top-up" system. We recommend the client loads an initial **$5 to $10 USD**.
   - In Naira, this is roughly **₦7,500 to ₦15,000 NGN** (depending on current bank rates).
3. **Optimization & Burn Rate**: Because we will use the highly optimized `gpt-4o-mini` model, generating a single summary costs fractions of a cent (less than ₦1). That initial ₦7,500 deposit will easily cover thousands of summaries and could last the client for a year or more. It is incredibly cheap.

## 4. Media & Asset Requirements (Bringing the Platform to Life)
To make the UI feel premium, dynamic, and visually stunning, the client needs to provide the following high-quality assets. We will build the Sanity schema to ingest all of these easily:

### Video Assets (High Impact)
- **Hero Background Loops**: Short (5-10 second), seamless looping videos (MP4 or WebM format) with **no audio**. These are used for dynamic backgrounds on the home page or top of case studies. 
- **Micro-Animations (Optional)**: Lottie files or high-res GIFs for hovering over cards, loading screens, or transitioning between pages.

### Image Assets (High Resolution)
- **Brand Marks & Logos**: SVGs (preferred) or high-res transparent PNGs of the client's logos.
- **Real-World Photography (Mockups)**: Photos of the brand out in the wild. We need pictures of the logo on billboards, packaging, business cards, or laptops. This grounds the work in reality.
- **Typography/Color Sheets**: Visual graphics showing the fonts and color palettes in a beautifully arranged grid.
- **Behind the Scenes / Team Photos**: For the "About" or "Our Story" sections, high-quality, authentic lifestyle photos of the team working in the studio build immense trust with prospective clients.

## 5. SEO & User-Friendliness
- **Dynamic Meta Tags**: Using Next.js `generateMetadata` to automatically pull the Sanity data for perfectly optimized Open Graph and Twitter cards.
- **JSON-LD Structured Data**: Injected Schema.org JSON-LD data to boost Google search visibility.
- **Accessibility (a11y)**: All images pulled from Sanity will strictly enforce `alt` text.

## 6. High-Performance Data Fetching & Caching Strategy
- **Static Speed**: We will fetch data using Next.js `force-cache`. The pages will be built statically and load instantly for users.
- **Instant Updates (Webhooks)**: When the client clicks "Publish" in Sanity, a webhook silently updates the Next.js cache in the background. Zero technical knowledge or rebuilds required from the client.

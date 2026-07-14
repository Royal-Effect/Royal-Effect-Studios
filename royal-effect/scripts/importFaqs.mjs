/**
 * FAQ Import Script
 * ─────────────────
 * Reads scripts/faqs.json and upserts each FAQ into your Sanity dataset.
 *
 * Usage:
 *   node scripts/importFaqs.mjs
 *
 * Requirements:
 *   - SANITY_API_TOKEN must be set in .env.local (needs write access — Editor or higher)
 *   - NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET must be set
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { config } from "dotenv";

// Load .env.local
config({ path: ".env.local" });

const __dirname = dirname(fileURLToPath(import.meta.url));

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-07-07",
  token: process.env.SANITY_API_TOKEN, // needs write access
  useCdn: false,
});

async function importFaqs() {
  const filePath = join(__dirname, "faqs.json");
  const raw = readFileSync(filePath, "utf-8");
  const faqs = JSON.parse(raw);

  console.log(`\n📋 Found ${faqs.length} FAQ(s) to import...\n`);

  for (const faq of faqs) {
    const doc = {
      _type: "faq",
      order: faq.order,
      question: faq.question,
      answer: faq.answer,
    };

    // createOrReplace keyed on a deterministic ID based on question
    const deterministicId = `faq-${faq.order}`;

    try {
      await client.createOrReplace({ ...doc, _id: deterministicId });
      console.log(`  ✅  [${faq.order}] ${faq.question.slice(0, 60)}...`);
    } catch (err) {
      console.error(`  ❌  Failed to import FAQ ${faq.order}:`, err.message);
    }
  }

  console.log("\n✨ Import complete! Check your Sanity Studio to verify.\n");
}

importFaqs();

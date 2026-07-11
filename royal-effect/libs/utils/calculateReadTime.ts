import type { PortableTextBlock } from "next-sanity";

export function calculateReadTime(content?: PortableTextBlock[]): number {
  if (!content || content.length === 0) return 1;

  const text = content
    .map((block) => {
      if (block._type !== "block" || !block.children) {
        return "";
      }

      return block.children.map((child: any) => child.text || "").join("");
    })
    .join(" ");

  const wordCount = text.trim().split(/\s+/).length;
  const wordsPerMinute = 200; // Average reading speed
  
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  
  return readTime === 0 ? 1 : readTime;
}

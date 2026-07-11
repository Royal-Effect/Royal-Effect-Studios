import { Metadata } from "next";
import { BlogSection } from "@/components/web/sections/blog/blogSection";
import { BlogGallerySection } from "@/components/web/sections/blog/blogGallerySection";
import { BlogNewsletterSection } from "@/components/web/sections/blog/blogNewsletterSection";
import { client } from "@/sanity/lib/client";
import { blogPostsQuery } from "@/sanity/lib/queries";
import { BlogInterface } from "@/libs/interfaces/blog";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Royal Effect Studios - Blog",
  description: "Read the latest stories and updates from Royal Effect Studios.",
};

export default async function BlogPage() {
  const blogs = await client.fetch<BlogInterface[]>(blogPostsQuery);

  return (
    <main>
      <BlogSection />
      <BlogGallerySection blogPosts={blogs} />
      <BlogNewsletterSection />
    </main>
  );
}

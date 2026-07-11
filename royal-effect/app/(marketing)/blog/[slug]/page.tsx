import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { singleBlogQuery, adjacentBlogPostsQuery } from "@/sanity/lib/queries";
import { BlogInterface } from "@/libs/interfaces/blog";
import { urlFor } from "@/sanity/lib/image";
import { calculateReadTime } from "@/libs/utils/calculateReadTime";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const blog: BlogInterface | null = await client.fetch(singleBlogQuery, {
    slug: resolvedParams.slug,
  });

  if (!blog) {
    return { title: "Blog Not Found" };
  }

  return {
    title: `${blog.title} - Royal Effect Studios`,
    description: blog.excerpt,
  };
}

export default async function SingleBlogPage({ params }: Props) {
  const resolvedParams = await params;
  const blog: BlogInterface | null = await client.fetch(singleBlogQuery, {
    slug: resolvedParams.slug,
  });

  if (!blog) {
    notFound();
  }

  const readTime = calculateReadTime(blog.content);

  // Fetch adjacent posts for prev/next navigation
  const adjacent = await client.fetch<{
    prev: { slug: string; title: string } | null;
    next: { slug: string; title: string } | null;
  }>(adjacentBlogPostsQuery, { publishedAt: blog.publishedAt });

  const portableTextComponents = {
    block: {
      normal: ({ children }: any) => (
        <p className="mb-6 text-base md:text-lg leading-[1.8] text-muted-foreground">
          {children}
        </p>
      ),
      h1: ({ children }: any) => (
        <h1 className="font-vermin-vibes text-4xl md:text-5xl mb-8 mt-16 text-foreground uppercase tracking-widest">
          {children}
        </h1>
      ),
      h2: ({ children }: any) => (
        <h2 className="font-vermin-vibes text-3xl md:text-4xl mb-6 mt-12 text-foreground uppercase tracking-widest">
          {children}
        </h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="font-vermin-vibes text-2xl md:text-3xl mb-4 mt-10 text-foreground uppercase tracking-wider">
          {children}
        </h3>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-foreground pl-6 italic my-10 text-lg md:text-xl text-foreground font-medium leading-relaxed">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className="list-disc pl-6 mb-8 text-muted-foreground space-y-2 text-base md:text-lg leading-[1.8]">
          {children}
        </ul>
      ),
      number: ({ children }: any) => (
        <ol className="list-decimal pl-6 mb-8 text-muted-foreground space-y-2 text-base md:text-lg leading-[1.8]">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }: any) => <li>{children}</li>,
    },
    marks: {
      strong: ({ children }: any) => (
        <strong className="font-bold text-foreground">{children}</strong>
      ),
      link: ({ children, value }: any) => {
        const rel = !value.href.startsWith("/")
          ? "noreferrer noopener"
          : undefined;
        return (
          <a
            href={value.href}
            rel={rel}
            className="underline decoration-1 underline-offset-4 hover:text-foreground transition-colors"
          >
            {children}
          </a>
        );
      },
    },
  };

  return (
    <article className="min-h-screen bg-background text-foreground pb-24">
      {/* Back button */}
      <div className="w-full max-w-5xl mx-auto px-6 lg:px-10 pt-8 md:pt-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground border border-border px-4 py-3 transition-all duration-300 hover:border-foreground group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Blog
        </Link>
      </div>

      {/* Cover Image */}
      {blog.coverImage?.image && (
        <div className="w-full max-w-5xl mx-auto px-6 lg:px-10 pt-8">
          <div className="relative w-full aspect-video border border-border overflow-hidden">
            <Image
              src={urlFor(blog.coverImage.image).width(1920).url()}
              alt={blog.coverImage.alt || blog.title}
              fill
              className="object-cover hover:scale-105 hover:border-border transition-all duration-300"
              priority
            />
          </div>
          {blog.coverImage.caption && (
            <p className="mt-3 text-[10px] uppercase tracking-widest text-muted-foreground font-bold text-right">
              {blog.coverImage.caption}
            </p>
          )}
        </div>
      )}

      {/* Heading, Meta, Excerpt — Below the image */}
      <header className="w-full max-w-5xl mx-auto px-6 lg:px-10 mt-10 md:mt-14 mb-16">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 mb-6 uppercase tracking-widest text-[10px] font-bold text-muted-foreground">
          <span className="text-foreground">
            {blog.category?.title ?? "Uncategorized"}
          </span>
          <span className="opacity-40">•</span>
          <span>{readTime} MIN READ</span>
          {blog.publishedAt && (
            <>
              <span className="opacity-40">•</span>
              <time dateTime={blog.publishedAt}>
                {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </>
          )}
        </div>

        {/* Title in vermin-vibes */}
        <h1 className="font-vermin-vibes text-4xl md:text-6xl lg:text-7xl text-foreground uppercase tracking-widest leading-tight mb-8">
          {blog.title}
        </h1>

        {/* Excerpt — visually distinct from body */}
        {blog.excerpt && (
          <p className="text-lg md:text-xl text-foreground/70 leading-relaxed border-l-2 border-foreground pl-6 max-w-3xl italic">
            {blog.excerpt}
          </p>
        )}

        {/* Divider */}
        <div className="w-full border-b border-border mt-12" />
      </header>

      {/* Content */}
      <div className="w-full max-w-5xl mx-auto px-6 lg:px-10">
        <div className="max-w-none">
          {blog.content ? (
            <PortableText
              value={blog.content}
              components={portableTextComponents}
            />
          ) : (
            <p className="text-muted-foreground italic">
              No content available for this post.
            </p>
          )}
        </div>
      </div>

      {/* Post Navigation — Prev / Next */}
      <div className="w-full max-w-5xl mx-auto px-6 lg:px-10 mt-20">
        <div className="border-t border-border pt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Previous Post */}
            {adjacent.prev ? (
              <Link
                href={`/blog/${adjacent.prev.slug}`}
                className="group flex flex-col gap-2 p-6 hover:border-foreground transition-all duration-300"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground inline-flex items-center gap-2">
                  <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform duration-300" />
                  Previous
                </span>
                <span className="text-sm font-bold text-foreground line-clamp-1 group-hover:text-muted-foreground transition-colors">
                  {adjacent.prev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {/* Next Post */}
            {adjacent.next ? (
              <Link
                href={`/blog/${adjacent.next.slug}`}
                className="group flex flex-col gap-2 p-6  hover:border-foreground transition-all duration-300 text-right"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground inline-flex items-center gap-2 justify-end">
                  Next
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <span className="text-sm font-bold text-foreground line-clamp-1 group-hover:text-muted-foreground transition-colors">
                  {adjacent.next.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

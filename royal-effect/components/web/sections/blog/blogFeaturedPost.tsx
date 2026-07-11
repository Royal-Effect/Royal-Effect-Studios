"use client";

import Link from "next/link";
import Image from "next/image";
import { BlogInterface } from "@/libs/interfaces/blog";
import { urlFor } from "@/sanity/lib/image";
import { calculateReadTime } from "@/libs/utils/calculateReadTime";
import { ArrowRight } from "lucide-react";

export function BlogFeaturedPost({ post }: { post: BlogInterface }) {
  const readTime = calculateReadTime(post.content);

  return (
    <section className="bg-background border-b border-border py-16 lg:py-24">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-10">
        {/* Label */}
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-10">
          Featured Post
        </p>

        <Link
          href={`/blog/${post.slug}`}
          className="group grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
        >
          {/* Image */}
          {post.coverImage?.image && (
            <div className="relative w-full aspect-[4/3] border border-border overflow-hidden">
              <Image
                src={urlFor(post.coverImage.image).width(1200).url()}
                alt={post.coverImage.alt || post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          )}

          {/* Text */}
          <div className="flex flex-col justify-center">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-5 uppercase tracking-widest text-[10px] font-bold text-muted-foreground">
              <span className="text-foreground">
                {post.category?.title ?? "Uncategorized"}
              </span>
              <span className="opacity-40">•</span>
              <span>{readTime} MIN READ</span>
              {post.publishedAt && (
                <>
                  <span className="opacity-40">•</span>
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </>
              )}
            </div>

            {/* Title */}
            <h2 className="font-vermin-vibes text-3xl md:text-4xl lg:text-5xl text-foreground uppercase tracking-widest leading-tight mb-6 group-hover:text-muted-foreground transition-colors duration-300">
              {post.title}
            </h2>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 line-clamp-3">
                {post.excerpt}
              </p>
            )}

            {/* CTA */}
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground border border-foreground px-6 py-4 w-fit group-hover:bg-foreground group-hover:text-background transition-all duration-300">
              Read Article
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}

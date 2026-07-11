"use client";

import { useState, useMemo } from "react";
import { BlogInterface } from "@/libs/interfaces/blog";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, EyeIcon, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { calculateReadTime } from "@/libs/utils/calculateReadTime";

const POSTS_PER_PAGE = 6;

export function BlogGallerySection({
  blogPosts,
}: {
  blogPosts: BlogInterface[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Generate categories from blog posts
  const blogCategories = useMemo(() => {
    const blogCats = blogPosts
      .map((post) => post.category?.title)
      .filter(Boolean) as string[];
    return ["all", ...Array.from(new Set(blogCats))];
  }, [blogPosts]);

  // Filter posts by category and search
  const filteredBlogPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        activeCategory === "all" || post.category?.title === activeCategory;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt?.toLowerCase().includes(searchLower);
      return matchesCategory && matchesSearch;
    });
  }, [blogPosts, activeCategory, searchQuery]);

  // Pagination
  const totalPosts = filteredBlogPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredBlogPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  // Reset to page 1 when filters change
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <>
      <section className="bg-background py-16 lg:py-24 border-b border-border">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-10">
          {/* Top bar: Categories + Search + Count */}
          <div className="flex flex-col gap-6 mb-12">
            {/* Categories — horizontally scrollable */}
            <div className="flex items-center gap-6 justify-between">
              <div className="overflow-x-auto scrollbar-hide -mx-1 px-1">
                <div className="flex gap-2 min-w-max">
                  {blogCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] border whitespace-nowrap transition-all ${
                        activeCategory === cat
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Post count */}
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap hidden md:block">
                {totalPosts} {totalPosts === 1 ? "Post" : "Posts"}
              </p>
            </div>

            {/* Search + mobile count */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1 md:max-w-72">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-12 py-6 text-[10px] font-bold uppercase tracking-[0.2em] border-border bg-background focus-visible:ring-1 focus-visible:ring-foreground rounded-none"
                />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap md:hidden">
                {totalPosts} {totalPosts === 1 ? "Post" : "Posts"}
              </p>
            </div>
          </div>

          {/* Grid */}
          {paginatedPosts.length > 0 ? (
            <div className="grid md:grid-cols-3 grid-cols-1 gap-y-16 gap-x-8">
              {paginatedPosts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug}`}
                  className="blog-card group block relative w-full"
                >
                  {post.coverImage && post.coverImage.image ? (
                    <DirectionAwareHover
                      imageUrl={urlFor(post.coverImage.image).width(800).url()}
                      className="w-full h-auto aspect-[4/3] border border-border rounded-none bg-background"
                      imageClassName="scale-105 group-hover:scale-110 transition-transform duration-700"
                    >
                      <p className="font-bold text-xs uppercase tracking-widest bg-background/80 text-foreground px-4 py-2 border border-border flex items-center gap-2 backdrop-blur-sm">
                        Read Article
                        <ArrowRight className="w-4 h-4" />
                      </p>
                    </DirectionAwareHover>
                  ) : (
                    <div className="relative w-full aspect-[4/3] bg-muted overflow-hidden border border-border">
                      <div className="absolute inset-0 flex items-center justify-center p-6">
                        <h3 className="font-vermin-vibes text-3xl sm:text-4xl text-border opacity-20 uppercase tracking-widest group-hover:scale-105 group-hover:opacity-10 transition-all duration-700 ease-out text-center">
                          {post.title}
                        </h3>
                      </div>
                    </div>
                  )}

                  {/* Meta text below image */}
                  <div className="mt-5 flex flex-col gap-3 pb-2">
                    <h3 className="text-base md:text-lg font-bold text-foreground tracking-wide group-hover:text-muted-foreground transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-3 pt-1">
                      <p className="text-[10px] text-foreground font-bold uppercase tracking-[0.2em]">
                        {post.category?.title ?? "Uncategorized"}
                      </p>
                      <span className="text-muted-foreground opacity-40">
                        •
                      </span>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em] inline-flex items-center gap-1.5">
                        <EyeIcon className="w-3 h-3" />
                        {calculateReadTime(post.content)} mins
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-24 flex items-center justify-center border border-border border-dashed">
              <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold">
                No posts found matching your criteria.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-16">
              {/* Prev */}
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-3 border border-border text-muted-foreground hover:border-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 text-[10px] font-bold uppercase tracking-[0.2em] border transition-all ${
                      currentPage === page
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              {/* Next */}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="p-3 border border-border text-muted-foreground hover:border-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

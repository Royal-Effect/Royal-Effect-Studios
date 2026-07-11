"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { SelectedWorkInterface } from "@/libs/interfaces/selectedWork";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { urlFor } from "@/sanity/lib/image";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const PROJECTS_PER_PAGE = 9;

export function WorkGallerySection({ projects }: { projects: SelectedWorkInterface[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(() => {
    const cats = projects.map(p => p.category?.title).filter(Boolean) as string[];
    return ["all", ...Array.from(new Set(cats))];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesCategory = activeCategory === "all" || p.category?.title === activeCategory; // Active category station starts from all. CS done. Either all or the parts of the category to match the active category.
      const searchLower = searchQuery.toLowerCase();  // This is where the search function will be implemented. CS done.
      const matchesSearch = 
        p.title.toLowerCase().includes(searchLower) || 
        p.client.toLowerCase().includes(searchLower);
      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  // Pagination
  const totalProjects = filteredProjects.length;
  const totalPages = Math.ceil(totalProjects / PROJECTS_PER_PAGE);
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
    return filteredProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);
  }, [filteredProjects, currentPage]);

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
    <section className="bg-background py-16 lg:py-24 border-b border-border">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <Tabs defaultValue="all" value={activeCategory} onValueChange={handleCategoryChange} className="w-full md:w-auto">
            <TabsList className="flex flex-wrap gap-2 bg-transparent h-auto p-0">
              {categories.map(cat => (
                <TabsTrigger 
                  key={cat} 
                  value={cat}
                  className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] border border-border rounded-none data-[state=active]:border-foreground data-[state=active]:bg-foreground data-[state=active]:text-background transition-all"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder="Search projects..." 
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-12 py-6 text-[10px] font-bold uppercase tracking-[0.2em] border-border bg-background focus-visible:ring-1 focus-visible:ring-foreground rounded-none"
            />
          </div>
        </div>

        {/* Grid */}
        {paginatedProjects.length > 0 ? (
          <div className="grid md:grid-cols-3 grid-cols-1 gap-y-24 gap-5">
            {paginatedProjects.map((project) => (
              <Link
                key={project.id}
                href={`/work/${project.slug}`}
                className="work-card group block relative w-full"
              >
                {project.displayImage ? (
                  <DirectionAwareHover
                    imageUrl={urlFor(project.displayImage.image).width(1200).url()}
                    hoverImageUrl={project.hoverImage ? urlFor(project.hoverImage.image).width(1200).url() : undefined}
                    className="w-full md:w-full h-auto md:h-auto aspect-4/3 lg:aspect-video border border-border rounded-none bg-background"
                    imageClassName="scale-105 group-hover:scale-110 transition-transform duration-700"
                  >
                    <p className="font-bold text-xs uppercase tracking-widest bg-background/80 text-foreground px-4 py-2 border border-border flex items-center gap-2 backdrop-blur-sm">
                      View Case Study 
                      <ArrowRight className="w-4 h-4" />
                    </p>
                  </DirectionAwareHover>
                ) : (
                  <div
                    className={`relative w-full aspect-4/3 ${project.color} overflow-hidden border border-border`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      <h3 className="font-vermin-vibes text-4xl sm:text-6xl text-border opacity-20 uppercase tracking-widest group-hover:scale-105 group-hover:opacity-10 transition-all duration-700 ease-out">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                )}

                {/* Meta text below image */}
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-foreground capitalize tracking-wider mb-2 group-hover:text-muted-foreground transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[10px] text-foreground font-bold uppercase tracking-[0.2em]">
                      {project.client}
                    </p>
                    <span className="text-muted-foreground opacity-50">•</span>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">
                      {project.category?.title ?? ""}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-24 flex items-center justify-center border border-border border-dashed">
            <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold">No projects found matching your criteria.</p>
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
  );
}

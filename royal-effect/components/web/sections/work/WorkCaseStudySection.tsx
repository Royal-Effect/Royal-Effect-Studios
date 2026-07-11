import Image from "next/image";
import Link from "next/link";
import { SelectedWorkInterface } from "@/libs/interfaces/selectedWork";
import { selectedWorkData } from "@/libs/constants/selectedWorkData";
import { urlFor } from "@/sanity/lib/image";
import { GetColorName } from "hex-color-to-color-name";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Auto-calculate a contrasting foreground color (black or white)
 * based on the hex brightness — used when no foreground override is set.
 */
function contrastColor(hex: string): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  // Perceived brightness formula
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? "#1a1a1a" : "#f5f5f5";
}

export function WorkCaseStudySection({ project }: { project: SelectedWorkInterface }) {
  const currentIndex = selectedWorkData.findIndex((entry) => entry.slug === project.slug);
  const previousProject = currentIndex > 0 ? selectedWorkData[currentIndex - 1] : null;
  const nextProject =
    currentIndex >= 0 && currentIndex < selectedWorkData.length - 1
      ? selectedWorkData[currentIndex + 1]
      : null;

  const categoryTitle = project.category?.title ?? "";

  return (
    <section className="relative bg-background border-b border-border py-24 sm:py-32">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-10">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between mb-12 sm:mb-16 pb-6">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.25em] uppercase text-foreground border border-border px-4 py-3 transition-colors duration-300 hover:text-background"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Work
          </Link>

          <div className="flex items-center gap-2">
            {previousProject ? (
              <Link
                href={`/work/${previousProject.slug}`}
                className="inline-flex items-center justify-center border border-border p-3 transition-colors duration-300 hover:bg-foreground hover:text-background"
                aria-label={`Previous project: ${previousProject.client}`}
              >
                <ChevronLeft className="w-4 h-4" />
              </Link>
            ) : (
              <div className="inline-flex items-center justify-center border border-border p-3 opacity-50 cursor-not-allowed">
                <ChevronLeft className="w-4 h-4" />
              </div>
            )}

            {nextProject ? (
              <Link
                href={`/work/${nextProject.slug}`}
                className="inline-flex items-center justify-center border border-border p-3 transition-colors duration-300 hover:bg-foreground hover:text-background"
                aria-label={`Next project: ${nextProject.client}`}
              >
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <div className="inline-flex items-center justify-center border border-border p-3 opacity-50 cursor-not-allowed">
                <ChevronRight className="w-4 h-4" />
              </div>
            )}
          </div>
        </div>

        {/* Heading Section */}
        <div className="max-w-7xl mb-12 sm:mb-16">
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-foreground">
              {project.client}
            </p>
            {categoryTitle && (
              <>
                <span className="text-muted-foreground opacity-50">•</span>
                <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-muted-foreground">
                  {categoryTitle}
                </p>
              </>
            )}
          </div>
          <h1 className="font-vermin-vibes text-[clamp(3.5rem,8vw,7rem)] leading-none uppercase text-foreground">
            {project.title}
          </h1>
          <p className="mt-6 max-w-7xl text-base sm:text-lg leading-relaxed text-muted-foreground font-medium">
            {project.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase border border-border px-3 py-2 text-foreground">
              {project.year}
            </span>
            {categoryTitle && (
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase border border-border px-3 py-2 text-foreground">
                {categoryTitle}
              </span>
            )}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className={`${project.color} border border-border p-6 sm:p-10 flex flex-col justify-between min-h-88`}>
            <div className="flex items-center justify-between gap-4 mb-6">
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-muted-foreground">
                Concept
              </span>
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-muted-foreground">
                Brand system
              </span>
            </div>

            {project.displayImage && (
              <div className="relative w-full flex-1 min-h-72 overflow-hidden border border-border bg-background/40">
                <Image
                  src={urlFor(project.displayImage.image).width(1200).url()}
                  alt={project.displayImage.alt ?? `${project.title} project preview`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {(project.brandIdentity || project.brandDesign) && (
              <div className="mt-6 max-w-xl">
                {project.brandIdentity && (
                  <p className="font-vermin-vibes text-[clamp(1.5rem,3vw,2rem)] leading-none uppercase text-foreground">
                    {project.brandIdentity}
                  </p>
                )}
                {project.brandDesign && (
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {project.brandDesign}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="border border-border bg-surface/30 p-6 sm:p-10">
            <div className="space-y-8">
              <div>
                <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-muted-foreground mb-3">
                  Challenge
                </p>
                <p className="text-base leading-relaxed text-foreground">
                  {project.challenge}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-muted-foreground mb-3">
                  Outcome
                </p>
                <p className="text-base leading-relaxed text-foreground">
                  {project.outcome}
                </p>
              </div>

              {project.searchTerms && project.searchTerms.length > 0 && (
                <div>
                  <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-muted-foreground mb-3">
                    Search Terms
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.searchTerms.map((term) => (
                      <span
                        key={term}
                        className="text-[11px] font-bold tracking-[0.2em] uppercase border border-border px-3 py-2 text-foreground"
                      >
                        {term}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.services && project.services.length > 0 && (
                <div>
                  <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-muted-foreground mb-3">
                    Services
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((service) => (
                      <span
                        key={service}
                        className="text-[11px] font-bold tracking-[0.2em] uppercase border border-border px-3 py-2 text-foreground"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Brand Palette — auto-names colors from hex codes */}
        <div className="mt-8 sm:mt-10 border border-border bg-background/60 p-6 sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-6">
            <div>
              <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-muted-foreground mb-2">
                Brand Palette
              </p>
              <h2 className="font-vermin-vibes text-3xl sm:text-5xl uppercase text-foreground leading-none">
                Pastel grid built for brand identity.
              </h2>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
              Each swatch captures the name, hex value, and contrast tone so the palette can be managed from content later.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {project.brandColors.map((swatch, index) => {
              const hex = swatch.color.hex;
              const colorName = GetColorName(hex);
              const fg = swatch.foreground ?? contrastColor(hex);

              return (
                <div key={index} className="border border-border bg-background overflow-hidden">
                  <div
                    className="h-32 sm:h-36"
                    style={{ backgroundColor: hex }}
                  />
                  <div className="p-4" style={{ color: fg }}>
                    <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-2">
                      {colorName}
                    </p>
                    <p className="text-sm font-medium uppercase tracking-[0.12em]">
                      {hex}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-8 sm:mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* <div className="border border-border bg-background overflow-hidden p-6">
            <h2 className="font-vermin-vibes text-3xl sm:text-5xl uppercase text-foreground leading-none">
              Gallery
            </h2>
          </div> */}

          {project.gallery.map((asset, index) => (
            <figure key={asset.label ?? index} className="border border-border bg-surface/30 overflow-hidden">
              <div className="relative aspect-4/3 bg-background">
                <Image
                  src={urlFor(asset.image).width(800).url()}
                  alt={asset.alt}
                  fill
                  className="object-cover"
                />
              </div>
              {(asset.label || asset.caption) && (
                <figcaption className="p-5 sm:p-6">
                  {asset.label && (
                    <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-muted-foreground mb-2">
                      {asset.label}
                    </p>
                  )}
                  {asset.caption && (
                    <p className="text-sm sm:text-base leading-relaxed text-foreground">
                      {asset.caption}
                    </p>
                  )}
                </figcaption>
              )}
            </figure>
          ))}
        </div>

        {/* Pagination removed from bottom and moved to top bar */}
      </div>
    </section>
  );
}
import Link from "next/link";

export default function BlogNotFound() {
  return (
    <section className="min-h-[80vh] bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-xl">
        <h1 className="font-vermin-vibes text-6xl md:text-8xl text-foreground uppercase tracking-widest mb-6">
          404
        </h1>
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground mb-4">
          Post not found
        </p>
        <p className="text-base text-muted-foreground leading-relaxed mb-10">
          The blog post you&apos;re looking for doesn&apos;t exist, may have been removed, or the URL has changed.
        </p>
        <Link
          href="/blog"
          className="inline-block px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] border border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-all duration-300"
        >
          Back to Blog
        </Link>
      </div>
    </section>
  );
}

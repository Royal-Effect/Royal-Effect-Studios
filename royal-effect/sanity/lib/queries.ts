import { groq } from "next-sanity";

// Query to get all selected works
export const selectedWorksQuery = groq`
  *[_type == "selectedWork"] | order(id asc) {
    id,
    "slug": slug.current,
    title,
    client,
    category->{
      _id,
      title
    },
    color,
    summary,
    year,
    services,
    challenge,
    outcome,
    brandIdentity,
    brandDesign,
    searchTerms,
    brandColors[]{
      color{
        hex,
        hsl,
        rgb
      },
      foreground
    },
    displayImage{
      image,
      label,
      alt,
      caption
    },
    hoverImage{
      image,
      label,
      alt,
      caption
    },
    gallery[]{
      image,
      label,
      alt,
      caption
    }
  }
`;

// Query to get featured works for homepage (max 5)
export const featuredWorksQuery = groq`
  *[_type == "selectedWork" && featured == true] | order(id asc)[0...5] {
    id,
    "slug": slug.current,
    title,
    client,
    category->{
      _id,
      title
    },
    color,
    summary,
    displayImage{
      image,
      label,
      alt,
      caption
    },
    hoverImage{
      image,
      label,
      alt,
      caption
    }
  }
`;

// Query to get a single selected work by slug
export const singleWorkQuery = groq`
  *[_type == "selectedWork" && slug.current == $slug][0] {
    id,
    "slug": slug.current,
    title,
    client,
    category->{
      _id,
      title
    },
    color,
    summary,
    year,
    services,
    challenge,
    outcome,
    brandIdentity,
    brandDesign,
    searchTerms,
    brandColors[]{
      color{
        hex,
        hsl,
        rgb
      },
      foreground
    },
    displayImage{
      image,
      label,
      alt,
      caption
    },
    hoverImage{
      image,
      label,
      alt,
      caption
    },
    gallery[]{
      image,
      label,
      alt,
      caption
    }
  }
`;

// Query to get all slugs for static generation
export const workSlugsQuery = groq`
  *[_type == "selectedWork" && defined(slug.current)][].slug.current
`;


// BlogQuery

export const blogPostsQuery = groq`
  *[_type == "blog"] | order(publishedAt desc) {
    _id,
    "slug": slug.current,
    title,
    category->{
      _id,
      title
    },
    excerpt,
    coverImage{
      image,
      label,
      alt,
      caption
    },
    publishedAt,
    content
  }
`;

export const singleBlogQuery = groq`
  *[_type == "blog" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    title,
    category->{
      _id,
      title
    },
    content,
    excerpt,
    coverImage{
      image,
      label,
      alt,
      caption
    },
    publishedAt
  }
`;

export const blogSlugsQuery = groq`
  *[_type == "blog" && defined(slug.current)][].slug.current
`;

// Adjacent blog posts for prev/next navigation
export const adjacentBlogPostsQuery = groq`{
  "prev": *[_type == "blog" && publishedAt > $publishedAt] | order(publishedAt asc)[0] {
    "slug": slug.current,
    title
  },
  "next": *[_type == "blog" && publishedAt < $publishedAt] | order(publishedAt desc)[0] {
    "slug": slug.current,
    title
  }
}`;
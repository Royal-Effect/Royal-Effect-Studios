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

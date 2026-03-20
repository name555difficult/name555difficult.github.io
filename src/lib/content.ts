import { getCollection, type CollectionEntry } from "astro:content";
import { slugifyStr } from "@/utils/slugify";

export type BlogPost = CollectionEntry<"blog">;

export const sortPostsByDate = (posts: BlogPost[]) =>
  [...posts].sort(
    (left, right) =>
      new Date(right.data.date).getTime() - new Date(left.data.date).getTime()
  );

export async function getPublishedPosts() {
  const posts = await getCollection("blog");
  return sortPostsByDate(posts.filter(post => !post.data.draft));
}

export const getFeaturedPosts = (posts: BlogPost[]) =>
  posts.filter(post => post.data.featured);

export const getBlogPath = (post: Pick<BlogPost, "id">) => {
  const slug = post.id.split("/").at(-1) ?? post.id;
  return `/blog/${slugifyStr(slug)}`;
};

export const normalizeTaxonomyPath = (path: string) =>
  path
    .split("/")
    .map(segment => segment.trim())
    .filter(Boolean)
    .join("/");

export const getTaxonomySegments = (path: string) =>
  normalizeTaxonomyPath(path).split("/").filter(Boolean);

export const getTopLevelTaxonomy = (post: BlogPost) =>
  [...new Set(post.data.taxonomy.map(path => getTaxonomySegments(path)[0]))]
    .filter(Boolean)
    .sort((left, right) => left.localeCompare(right));

export const getTopLevelTaxonomies = (posts: BlogPost[]) =>
  [...new Set(posts.flatMap(post => getTopLevelTaxonomy(post)))].sort((a, b) =>
    a.localeCompare(b)
  );

export const matchesTaxonomyPath = (post: BlogPost, path: string) => {
  const normalizedPath = normalizeTaxonomyPath(path);
  return post.data.taxonomy.some(entry => {
    const normalizedEntry = normalizeTaxonomyPath(entry);
    return (
      normalizedEntry === normalizedPath ||
      normalizedEntry.startsWith(`${normalizedPath}/`)
    );
  });
};

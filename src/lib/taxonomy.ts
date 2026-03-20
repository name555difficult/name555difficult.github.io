import type { BlogPost } from "./content";
import { getBlogPath, normalizeTaxonomyPath } from "./content";

export type TaxonomyPostReference = {
  href: string;
  slug: string;
  title: string;
  date: string;
  summary: string;
  pdf: string;
  taxonomy: string[];
  featured: boolean;
};

export type TaxonomyNode = {
  name: string;
  path: string;
  count: number;
  posts: TaxonomyPostReference[];
  children: TaxonomyNode[];
};

type MutableTaxonomyNode = {
  name: string;
  path: string;
  children: Map<string, MutableTaxonomyNode>;
  posts: Map<string, TaxonomyPostReference>;
};

const createNode = (name: string, path: string): MutableTaxonomyNode => ({
  name,
  path,
  children: new Map(),
  posts: new Map(),
});

const toPostReference = (post: BlogPost): TaxonomyPostReference => ({
  href: getBlogPath(post),
  slug: post.id,
  title: post.data.title,
  date: post.data.date.toISOString(),
  summary: post.data.summary,
  pdf: post.data.pdf,
  taxonomy: post.data.taxonomy,
  featured: Boolean(post.data.featured),
});

const finalizeNode = (node: MutableTaxonomyNode): TaxonomyNode => ({
  name: node.name,
  path: node.path,
  count: node.posts.size,
  posts: [...node.posts.values()].sort(
    (left, right) =>
      new Date(right.date).getTime() - new Date(left.date).getTime()
  ),
  children: [...node.children.values()]
    .sort((left, right) => left.name.localeCompare(right.name))
    .map(child => finalizeNode(child)),
});

export function buildTaxonomyTree(posts: BlogPost[]) {
  const root = createNode("Research Map", "");

  for (const post of posts) {
    const postRef = toPostReference(post);
    root.posts.set(post.id, postRef);

    for (const entry of post.data.taxonomy) {
      const segments = normalizeTaxonomyPath(entry).split("/");
      let currentNode = root;
      let currentPath = "";

      for (const segment of segments) {
        currentPath = currentPath ? `${currentPath}/${segment}` : segment;
        const nextNode =
          currentNode.children.get(currentPath) ??
          createNode(segment, currentPath);

        nextNode.posts.set(post.id, postRef);
        currentNode.children.set(currentPath, nextNode);
        currentNode = nextNode;
      }
    }
  }

  return finalizeNode(root);
}

export function countTaxonomyLeaves(node: TaxonomyNode): number {
  if (node.children.length === 0) {
    return node.path ? 1 : 0;
  }

  return node.children.reduce(
    (sum, child) => sum + countTaxonomyLeaves(child),
    0
  );
}

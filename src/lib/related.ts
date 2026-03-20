import type { BlogPost } from "./content";
import { getTaxonomySegments, sortPostsByDate } from "./content";

const getSharedDepth = (leftPath: string, rightPath: string) => {
  const left = getTaxonomySegments(leftPath);
  const right = getTaxonomySegments(rightPath);
  let depth = 0;

  while (
    depth < left.length &&
    depth < right.length &&
    left[depth] === right[depth]
  ) {
    depth += 1;
  }

  return depth;
};

const scoreCandidate = (current: BlogPost, candidate: BlogPost) => {
  let score = 0;

  for (const currentPath of current.data.taxonomy) {
    for (const candidatePath of candidate.data.taxonomy) {
      const sharedDepth = getSharedDepth(currentPath, candidatePath);

      if (currentPath === candidatePath) {
        score = Math.max(score, 120);
      } else if (sharedDepth >= 3) {
        score = Math.max(score, 84);
      } else if (sharedDepth === 2) {
        score = Math.max(score, 52);
      } else if (sharedDepth === 1) {
        score = Math.max(score, 24);
      }
    }
  }

  const sharedTags = current.data.tags.filter(tag =>
    candidate.data.tags.includes(tag)
  ).length;

  score += sharedTags * 6;

  const dayGap =
    Math.abs(
      new Date(current.data.date).getTime() -
        new Date(candidate.data.date).getTime()
    ) / 86_400_000;

  score += Math.max(0, 12 - dayGap / 45);

  return score;
};

export function getRelatedPosts(
  current: BlogPost,
  posts: BlogPost[],
  limit = 3
) {
  return sortPostsByDate(
    posts
      .filter(post => post.id !== current.id)
      .map(post => ({ post, score: scoreCandidate(current, post) }))
      .filter(entry => entry.score > 0)
      .sort((left, right) => right.score - left.score)
      .slice(0, limit)
      .map(entry => entry.post)
  );
}

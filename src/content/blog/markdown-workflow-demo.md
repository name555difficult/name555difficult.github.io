---
title: "Markdown Workflow Demo"
date: 2026-03-20
summary: "A small reference post used to verify that the blog now renders native Markdown content cleanly, without relying on PDF embeds."
taxonomy:
  - "Meta/Site/Content-Workflow"
  - "Projects/Homepage/GitHub-Pages"
tags:
  - test
  - markdown
  - astro
featured: false
draft: false
---

## Why this post exists

This entry is the sanity check for the refactor from a PDF-first blog to a Markdown-native one. It is intentionally small, but it touches the common formatting features a normal post is likely to use.

## Rendering checklist

- headings generate an automatic table of contents
- inline code like `astro build` stays readable
- code fences keep spacing and background styles
- lists, tables, and blockquotes match the site theme

## Example code block

```ts
const publishPost = async (slug: string) => {
  return `/blog/${slug}`;
};
```

## Example table

| Feature       | Expected result                |
| ------------- | ------------------------------ |
| Frontmatter   | powers archive metadata        |
| Markdown body | renders as the article content |
| Taxonomy      | feeds the architecture map     |

## Final note

> Markdown is a much better fit here because writing, editing, reviewing, and versioning all happen in the same place.

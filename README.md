# Wang Zhengbao Homepage

A Markdown-first GitHub Pages homepage built with Astro.

## What it includes

- `Profile / Blog / Architecture` as the only primary navigation
- content managed through `src/content/blog/*.md`
- full-width Markdown article pages
- taxonomy-driven architecture map powered by D3
- GitHub Pages CI + deploy workflows

## Content model

Each post is a single Markdown file in `src/content/blog/`.

The frontmatter controls title, date, summary, taxonomy, tags, and publish state. The body becomes the article content itself.

## Local commands

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
npm run format
```

## Publishing a new note

1. Add a new Markdown file to `src/content/blog/`
2. Fill in the frontmatter and article body
3. Commit and push to `main`

The Blog index and Architecture tree update automatically.

## Deployment

The project targets a personal GitHub Pages repository named:

```text
<username>.github.io
```

Push to `main`, then enable GitHub Pages with `GitHub Actions` as the deployment source.

## Base theme

This implementation was bootstrapped from [AstroPaper](https://github.com/satnaing/astro-paper) and then reshaped into a Markdown-first research archive.

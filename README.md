# Wang Zhengbao Homepage

A PDF-first GitHub Pages homepage built with Astro.

## What it includes

- `Profile / Blog / Architecture` as the only primary navigation
- content managed through `src/content/blog/*.md`
- full-width PDF reading pages powered by `pdfjs-dist`
- taxonomy-driven architecture map powered by D3
- GitHub Pages CI + deploy workflows

## Content model

Each post uses:

1. a markdown metadata file in `src/content/blog/`
2. a PDF asset in `public/pdfs/`

The markdown file controls title, date, summary, taxonomy, tags, and the PDF path. The PDF remains the primary reading surface.

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

1. Add the PDF to `public/pdfs/`
2. Add a metadata file to `src/content/blog/`
3. Commit and push to `main`

The Blog index and Architecture tree update automatically.

## Deployment

The project targets a personal GitHub Pages repository named:

```text
<username>.github.io
```

Push to `main`, then enable GitHub Pages with `GitHub Actions` as the deployment source.

## Base theme

This implementation was bootstrapped from [AstroPaper](https://github.com/satnaing/astro-paper) and then reshaped into a PDF-first research archive.

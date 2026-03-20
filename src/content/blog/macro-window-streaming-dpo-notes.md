---
title: "Macro-Window Streaming DPO Notes"
date: 2026-03-20
summary: "A compact research note on using macro-window preference signals to stabilize streaming commentary models under latency and context-shift constraints."
pdf: "/pdfs/macro-window-streaming-dpo-notes.pdf"
taxonomy:
  - "AI/LLM/Alignment"
  - "AI/VLM/Streaming"
tags:
  - dpo
  - streaming
  - alignment
featured: true
draft: false
---

## Why this note exists

This note captures the working assumptions behind a PDF-first experiment: long-form reasoning lives in the PDF, while the metadata page stays lightweight and structured.

## Reader guide

- Start with the problem framing and latency budget on page 1.
- Jump to the preference construction sketch on page 2.
- Use the final page for the deployment checklist and open questions.

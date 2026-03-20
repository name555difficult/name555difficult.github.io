---
title: "Macro-Window Streaming DPO Notes"
date: 2026-03-20
summary: "A compact research note on using macro-window preference signals to stabilize streaming commentary models under latency and context-shift constraints."
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

## Why macro-windows help

Token-level preference labels are often too local for streaming systems. A response can look fine moment to moment and still feel wrong over a 20 to 40 second horizon. Macro-window comparison gives the judge a slightly wider unit of coherence.

## What a training sample looks like

Instead of asking "which next sentence is better?", the dataset compares short windows that each contain:

- current context
- model continuation for the next few beats
- latency metadata
- lightweight annotations about drift, repetition, and missed scene changes

## A simple recipe

```yaml
window_seconds: 24
stride_seconds: 8
judge_inputs:
  - transcript
  - scene_delta
  - latency_budget
preference_axes:
  - coherence
  - responsiveness
  - factual_grounding
```

## Why this can outperform narrower labels

Macro-windows let the preference model punish delayed corrections, repetitive phrasing, and topic drift without inventing a complex reward program. The signal is still simple, but the unit of evaluation better matches the product experience.

## Remaining risks

- judges may over-prefer polished but less responsive outputs
- larger windows can blur the source of failure
- annotation cost rises if reviewers need to inspect both text and scene changes

The tradeoff seems worth it when the application cares about continuity more than one-shot exactness.

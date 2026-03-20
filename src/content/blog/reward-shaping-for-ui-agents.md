---
title: "Reward Shaping for UI Agents"
date: 2026-02-28
summary: "A systems-oriented note on reward shaping for GUI agents, with emphasis on sparse feedback, action grounding, and evaluation traces."
taxonomy:
  - "Agents/UI/Planning"
  - "AI/LLM/Alignment"
tags:
  - ui-agents
  - reward
  - evaluation
featured: true
draft: false
---

## Problem framing

GUI agents rarely fail because they cannot produce an action token. They fail because the training signal does not reflect the real task boundary. A reward that is too sparse produces brittle exploration, while a reward that is too dense often teaches the policy to optimize for interface-local shortcuts.

The useful question is not "how many reward terms should we add?" but "which signals remain faithful when the interface changes slightly?"

## A practical reward stack

I like to separate the reward into three bands:

1. Task completion: did the user-visible objective finish correctly?
2. Progress evidence: did the trajectory move toward a recoverable intermediate state?
3. Process hygiene: did the agent avoid loops, invalid clicks, and destructive side effects?

Only the first band should dominate the final score. The other two bands exist to stabilize learning, not to redefine success.

## Failure patterns to guard against

| Pattern               | Why it happens                            | What to inspect                           |
| --------------------- | ----------------------------------------- | ----------------------------------------- |
| Click spam            | Dense rewards overvalue activity          | action entropy and repeated DOM targets   |
| Shortcut exploitation | proxy metric is easier than the real task | final state screenshots and replay traces |
| Looping recovery      | agent gets partial credit for "trying"    | retry counters and timeout buckets        |

## Evaluation loop

When a run fails, I want the trace to answer three questions quickly:

- was the goal misunderstood?
- was the action grounded to the wrong element?
- did the reward assign credit to the wrong segment of the trajectory?

That means the training set should store more than final success labels. It should preserve screenshots, tool outputs, and a compact explanation of why the annotator preferred one run over another.

## Open questions

The part I still do not trust is transfer. A shaped reward that works on one benchmark can become misleading on a slightly different product surface. The safest direction seems to be using reward terms as debugging scaffolding, then gradually pushing more weight back onto task-level outcomes.

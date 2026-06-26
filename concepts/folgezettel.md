---
type: Concept
title: "Folgezettel"
description: Zettelkasten concept of sequence notes — a chain of notes where each builds upon the previous, creating narrative paths through the knowledge graph.
tags:
  - zettelkasten
  - methodology
  - sequence
timestamp: 2026-06-22T09:05:00Z
id: "20260622T090501"
status: seedling
difficulty: beginner
domain: knowledge-management
related:
  - "[[zettelkasten-methodology|Zettelkasten Methodology]]"
  - "[[atomic-notes|Atomic Notes]]"
sources:
  - title: "Communicating with Slip Boxes"
    author: "Niklas Luhmann"
    year: 1981
confidence: 0.80
summary: >
  Folgezettel (sequence notes) are notes that directly follow another in a logical chain — "this follows from that" — creating narrative threads through a Zettelkasten without relying on folder hierarchies.
---

# Folgezettel

> **Status: seedling** — stub note. See [[zettelkasten-methodology|Zettelkasten Methodology]] for full context.

## Definition

A **Folgezettel** is a note that directly follows another in a logical sequence:

```
Note A → Note B → Note C
    ↘ Note D → Note E
```

The implied relationship: "this note builds upon / follows from that note."

## In Luhmann's System

Luhmann's branching ID system (`21/3a1b5c`) implicitly encoded Folgezettel — the physical position of cards told a story. Card `21/3a` continues `21/3`; card `21/4` starts a new topic under `21`.

## In Digital ZK

- **Implicit**: Link notes — the graph creates sequences
- **Explicit**: Use frontmatter fields (`prev:`, `next:`) to encode sequence
- **Trails**: Create explicit narrative paths through the ZK

---

# Citations

[1] Luhmann, N. (1981). "Kommunikation mit Zettelkästen."

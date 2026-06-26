---
type: Concept
title: "Knowledge Graph Theory"
description: Graph theory foundations for knowledge management — nodes as concepts, edges as relationships, centrality metrics, community detection, and small-world network properties.
tags:
  - graph-theory
  - knowledge-graph
  - network-science
timestamp: 2026-06-22T09:05:00Z
id: "20260622T090502"
status: seedling
difficulty: advanced
domain: knowledge-management
related:
  - "[[zettelkasten-methodology|Zettelkasten Methodology]]"
  - "[[knowledge-graph-patterns|Knowledge Graph Patterns]]"
  - "[[okf-format|OKF Format]]"
sources:
  - title: "Small-World Networks"
    author: "Watts & Strogatz"
    year: 1998
confidence: 0.70
summary: >
  Knowledge graphs model information as a network where nodes are concepts and edges are semantic relationships — enabling navigation, discovery, and emergent structure through graph-theoretic properties like centrality and clustering.
---

# Knowledge Graph Theory

> **Status: seedling** — stub note, awaiting full ingest.

## Core Concepts

### Graph Model

A knowledge graph $\mathcal{G}$ is a directed graph:

$$
\mathcal{G} = (V, E), \quad V = \{\text{concepts}\}, \quad E = \{\text{relationships}\}
$$

### Key Properties

| Property | Relevance to ZK |
|----------|----------------|
| **Centrality** | Hub notes (MOCs/indexes) have high betweenness |
| **Clustering** | Topic clusters emerge from dense linking |
| **Small-world** | Short path between any two concepts |
| **Scale-free** | Few hubs, many leaves — natural PKM structure |

### Relevance to This Vault

The Nova vault IS a knowledge graph:
- Nodes = `.md` files (atomic notes)
- Edges = `[[obsidian-syntax-reference|wiki links]]`
- Hubs = `index.md` files
- Clusters = Directory groupings

---

# Citations

[1] Watts, D. J. & Strogatz, S. H. (1998). "Collective dynamics of 'small-world' networks." *Nature*.

---
type: Concept
title: "Attention Mechanism"
description: Core mechanism behind Transformer architectures — scaled dot-product attention, Q/K/V projections, and multi-head variants.
tags: [attention, transformer, ai, fundamentals]
timestamp: 2026-06-22T09:00:00Z
id: "20260622T090000"
status: seedling
difficulty: advanced
domain: ai-machine-learning
prerequisites:
  - /concepts/karpathy-llm-curriculum.md
related:
  - "[[karpathy-llm-curriculum|Karpathy LLM Curriculum]]"
  - "[[latex-in-markdown|LaTeX in Markdown]]"
sources:
  - title: "Attention Is All You Need"
    author: "Vaswani et al."
    year: 2017
    url: "https://arxiv.org/abs/1706.03762"
confidence: 0.7
summary: >
  Attention mechanisms allow neural networks to focus on relevant parts of input sequences by computing weighted sums of values based on query-key similarity — the foundation of modern LLMs.
---

# Attention Mechanism

> **Status: seedling** — stub note, awaiting full ingest.

## Definition

$$
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$

## Intuition

Each token generates three vectors:
- **Query (Q)**: "What am I looking for?"
- **Key (K)**: "What do I contain?"
- **Value (V)**: "What information do I carry?"

## Sub-concepts

- **Self-Attention**: Q, K, V all come from the same source
- **Cross-Attention**: Q from one source, K, V from another
- **Multi-Head Attention**: Multiple attention heads in parallel

## Further Reading

- [[karpathy-llm-curriculum|Karpathy LLM Curriculum]] — Let's build GPT lecture
- [[latex-in-markdown|LaTeX in Markdown]] — Formal notation examples

---

# Citations

[1] Vaswani et al. (2017). "Attention Is All You Need". NeurIPS.

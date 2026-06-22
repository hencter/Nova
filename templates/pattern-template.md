---
type: Template
title: "Design Pattern Template"
description: "Reusable template for creating cross-cutting design pattern analyses with problem statement, solution structure, tool comparison, and decision guidance."
tags: [template, pattern, design]
timestamp: 2026-06-22T00:00:00Z
id: "20260622T170200"
status: evergreen
difficulty: beginner
domain: knowledge-management
related:
  - "[[Conventions]]"
  - "[[Concept Note Template]]"
  - "[[Tool Analysis Template]]"
  - "[[knowledge-graph-patterns|Knowledge Graph Patterns]]"
summary: >
  A standardized template for documenting cross-cutting design patterns in agent systems, covering problem definition, solution patterns, tool-by-tool comparison, Mermaid diagrams, and actionable decision matrices.
---

# Design Pattern Template

Copy this template when creating a new pattern analysis note. Replace all `{{PLACEHOLDER}}` values.

---

## Frontmatter Template

```yaml
---
type: Pattern
title: "{{Pattern Name}}"
description: "{{One-line summary of the pattern family and its scope}}"
tags: [{{tag1}}, {{tag2}}, patterns]
timestamp: {{YYYY-MM-DD}}T00:00:00Z
id: "{{YYYYMMDDThhmmss}}"
status: {{seedling | budding | evergreen}}
difficulty: {{beginner | intermediate | advanced}}
domain: {{knowledge-domain}}
prerequisites:
  - /concepts/{{relevant-concept}}.md
related:
  - "[[Related Pattern A]]"
  - "[[Related Concept B]]"
  - "[[Related Tool C]]"
sources:
  - title: "{{Source Title}}"
    url: "{{https://...}}"
confidence: {{0.0-1.0}}
summary: >
  {{One-sentence executive summary of the pattern's core insight.}}
---
```

---

## Section Structure

### 1. Introduction

```markdown
# {{Pattern Name}}

## Overview

{{2-4 sentences defining the problem space, why these patterns matter, and what the reader will learn.}}

### Problem Statement

{{What specific challenge do these patterns solve? Why isn't a naive approach sufficient?}}
```

### 2. Pattern Taxonomy (H2 per pattern variant)

For each distinct pattern within the family:

```markdown
## {{Pattern Variant 1 Name}}

{{Explanation of how this variant works.}}

**Used by**: {{Tool A (mechanism), Tool B (mechanism)}}

\`\`\`mermaid
{{Relevant Mermaid diagram — graph, sequence, flowchart, state, class}}
\`\`\`

| Tool | Mechanism | Strengths | Weaknesses |
|------|-----------|-----------|------------|
| {{Tool A}} | {{How it implements}} | {{Primary strength}} | {{Primary weakness}} |
| {{Tool B}} | {{How it implements}} | {{Primary strength}} | {{Primary weakness}} |

**Key properties**:
- {{Property 1}}
- {{Property 2}}
- {{Property 3}}
```

### 3. Comparison Table

```markdown
## Cross-Tool Comparison

| Feature | Tool A | Tool B | Tool C | Tool D |
|---------|--------|--------|--------|--------|
| {{Feature 1}} | {{Value}} | {{Value}} | {{Value}} | {{Value}} |
| {{Feature 2}} | {{Value}} | {{Value}} | {{Value}} | {{Value}} |
| {{Feature 3}} | {{Value}} | {{Value}} | {{Value}} | {{Value}} |
| {{Feature 4}} | {{Value}} | {{Value}} | {{Value}} | {{Value}} |
| {{Feature 5}} | {{Value}} | {{Value}} | {{Value}} | {{Value}} |
```

### 4. Common Patterns (cross-cutting)

```markdown
## Common Patterns

### {{Cross-Cutting Pattern 1}}

{{Explanation of a pattern that appears across multiple tools/implementations.}}

### {{Cross-Cutting Pattern 2}}

{{Explanation.}}
```

### 5. Mermaid Diagrams

Include at least 2-3 diagram types relevant to the pattern:

```markdown
## Visual Reference

### {{Diagram 1: Workflow}}

\`\`\`mermaid
sequenceDiagram
    participant A as Actor A
    participant B as Actor B
    participant C as Actor C
    
    A->>B: Action
    B->>C: Delegation
    C-->>B: Result
    B-->>A: Consolidated
\`\`\`

### {{Diagram 2: Structure}}

\`\`\`mermaid
graph TD
    ROOT[Root] --> CHILD1[Child 1]
    ROOT --> CHILD2[Child 2]
    CHILD1 --> LEAF1[Leaf 1]
    CHILD1 --> LEAF2[Leaf 2]
\`\`\`
```

### 6. Decision Matrix

```markdown
## Decision Matrix

| When to use... | Criteria |
|----------------|----------|
| {{Pattern Variant 1}} | {{When this variant is the right choice}} |
| {{Pattern Variant 2}} | {{When this variant is the right choice}} |
| {{Pattern Variant 3}} | {{When this variant is the right choice}} |
| {{Default / Fallback}} | {{When no specialized pattern fits}} |
```

### 7. Anti-Patterns (optional but recommended)

```markdown
## Anti-Patterns

| Anti-Pattern | Description | Why It Fails | Better Alternative |
|--------------|-------------|--------------|--------------------|
| {{Anti-pattern name}} | {{What people do wrong}} | {{Why it causes problems}} | {{What to do instead}} |
```

### 8. See Also

```markdown
## See Also

- [[Related Pattern A]] — {{Why related}}
- [[Related Concept B]] — {{Why related}}
- [[Related Tool C]] — {{How this tool implements the pattern}}
```

---

## Pattern Checklist

Before finalizing a pattern note:

- [ ] **Problem statement** is clear — reader understands *why* the pattern exists
- [ ] **At least 2-3 pattern variants** documented with tradeoffs
- [ ] **Cross-tool comparison table** covering 5+ tools where applicable
- [ ] **Mermaid diagrams**: At minimum 1-2 sequence diagrams, 1 graph/topology
- [ ] **Decision matrix**: Actionable guidance for choosing between variants
- [ ] **Anti-patterns**: Common mistakes documented
- [ ] **Tools cited**: At least Claude Code, OpenCode, Codex CLI, Aider compared
- [ ] **Complete frontmatter**: All fields populated
- [ ] **Cross-links**: Linked from `patterns/index.md` and related concept notes
- [ ] **Sources**: External references tracked with URLs

---

## Example Pattern Families

Use this template for patterns such as:

| Pattern Family | Scope |
|----------------|-------|
| Multi-Agent Coordination | How multiple agents divide and conquer work |
| Context Management | How tools manage LLM context windows |
| Permission Models | How tools enforce security boundaries |
| Knowledge Graph Patterns | How to build AI-consumable knowledge graphs |
| Agent Extensibility | How to extend agent capabilities |
| Error Recovery | How agents handle failures and retries |
| Caching Strategies | How agents cache computations and results |
| Tool Composition | How agents chain and compose tool calls |
| Prompt Engineering | Patterns for effective agent prompting |
| State Management | How agents persist and restore state |
| Testing Agents | Patterns for testing agent behavior |
| Deployment Patterns | How to deploy agents in production |

---

## Usage Instructions

1. **Copy** this template to `/patterns/{{pattern-name}}.md`
2. **Define the problem**: What challenge does this pattern family solve?
3. **Identify variants**: Research how different tools solve the same problem
4. **Create Mermaid diagrams**: Visual representations of each variant
5. **Build comparison table**: Cross-tool feature matrix
6. **Write decision guidance**: When to use which variant
7. **Set id** to current timestamp in `YYYYMMDDThhmmss` format
8. **Set status** to `budding` while drafting, `evergreen` when complete
9. **Update** `/patterns/index.md` with the new entry
10. **Cross-link**: Add reciprocal links from related concept and tool notes
11. **Log**: Append to `log.md`: `## [YYYY-MM-DD] ingest | Pattern: {{Pattern Name}}`

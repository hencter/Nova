---
type: Concept
title: "Markdown Frontmatter"
description: YAML frontmatter syntax, data types, Obsidian recognized fields, properties system, and best practices for AI agent consumption — the metadata layer of every note.
tags:
  - frontmatter
  - yaml
  - markdown
  - obsidian
  - metadata
  - ai-agents
timestamp: 2026-06-22T14:05:00Z
id: "20260622T140500"
status: evergreen
difficulty: beginner
domain: knowledge-management
prerequisites:
  - /concepts/okf-format.md
related:
  - "[[okf-format|OKF Format]]"
  - "[[zettelkasten-methodology|Zettelkasten Methodology]]"
  - "[[karpathy-llm-curriculum|Karpathy LLM Curriculum]]"
  - "[[latex-in-markdown|LaTeX in Markdown]]"
sources:
  - title: "Obsidian Help — YAML Frontmatter"
    url: "https://help.obsidian.md/Editing+and+formatting/Properties"
  - title: "YAML Specification 1.2"
    url: "https://yaml.org/spec/1.2/spec.html"
  - title: "Dataview Plugin Documentation"
    url: "https://blacksmithgu.github.io/obsidian-dataview/"
confidence: 0.95
summary: >-
  YAML frontmatter between `---` delimiters provides structured metadata for markdown notes, enabling machine-readable properties, graph semantics, and AI-agent filtering — the `type` field is the sole OKF requirement.
---

# Markdown Frontmatter

> The structured metadata layer that transforms plain markdown files into queryable knowledge nodes.

## YAML Frontmatter Syntax

Frontmatter is YAML content placed between `---` delimiters at the very start of a markdown file:

```yaml
---
key: value
list_key:
  - item1
  - item2
nested:
  subkey: subvalue
---
```

The frontmatter block must be the first thing in the file. It is parsed as YAML and rendered as structured properties by tools like Obsidian.

## Data Types

### String

```yaml
title: My Note Title
```

### Multiline String — Folded (`>`)

Newlines become spaces. Use for paragraphs:

```yaml
description: >
  This is a long description
  that spans multiple lines
  but renders as a single line.
```

### Multiline String — Literal (`|`)

Newlines preserved. Use for code, poems, structured text:

```yaml
poem: |
  Line one
  Line two
  Line three
```

### Integer, Float, Boolean, Null

```yaml
revision: 3
confidence: 0.85
draft: true
published: false
obsolete: null
# Also valid: obsolete: ~
```

### Date (ISO 8601)

```yaml
date: 2026-06-22
datetime: 2026-06-22T14:30:00+08:00
```

### List — Inline and Block

```yaml
tags: [zk, methodology, knowledge]      # Inline (合法但不推荐，Nova 约定使用 block 格式)

tags:                                     # Block (Nova 推荐格式)
  - zettelkasten
  - methodology
  - knowledge-management
```

### Nested Objects

```yaml
author:
  name: Niklas Luhmann
  field: Sociology
  years: 1927-1998
```

### Array of Objects

```yaml
references:
  - title: Communicating with Slip Boxes
    author: Niklas Luhmann
    year: 1981
  - title: How to Take Smart Notes
    author: Sönke Ahrens
    year: 2017
```

## Comprehensive YAML Example

```yaml
---
# Scalars
id: "20260622T143000"
title: "Emergent Structure in Zettelkasten"
revision: 3
confidence: 0.85
draft: false

# Dates
created: 2026-06-22
modified: 2026-06-22T14:30:00+08:00

# Lists
tags:
  - zettelkasten
  - emergence
  - methodology
aliases:
  - ZK emergence
  - bottom-up structure

# Multiline: folded (newlines → spaces)
description: >
  This note explores how organizational structure
  in a Zettelkasten emerges from bidirectional links
  rather than being pre-imposed through folders.

# Multiline: literal (newlines preserved)
code_example: |
  def emergence(nodes):
      return cluster(nodes)

# Nested objects
author:
  name: Niklas Luhmann
  field: Sociology
  lifespan: 1927-1998

# Array of objects
sources:
  - title: "Communicating with Slip Boxes"
    author: "Niklas Luhmann"
    year: 1981
    pages: 45-52
  - title: "How to Take Smart Notes"
    author: "Sönke Ahrens"
    year: 2017

# Explicit relationships
prerequisites:
  - /concepts/zettelkasten-methodology.md
related:
  - "[[folgezettel|Folgezettel]]"
  - "[[atomic-notes|Atomic Notes]]"
  - "[[knowledge-graph-theory|Knowledge Graph Theory]]"

# Lifecycle
status: evergreen

# Domain classification
domain: knowledge-management

# One-sentence summary
summary: >-
  Zettelkasten structure emerges bottom-up from bidirectional links,
  forming organic clusters around densely connected idea regions.
---
```

## Obsidian Recognized Fields

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Display title (overrides filename in graph) |
| `date` | date | Note creation/publication date |
| `tags` | string[] | Tags for categorization |
| `aliases` | string[] | Alternative names; enables linking via any alias |
| `cssclass` | string | CSS class applied to this note's preview |
| `publish` | boolean | Obsidian Publish: whether to publish |
| `permalink` | string | Custom URL slug for Publish |
| `description` | string | Meta description for social/SEO |
| `image` | string | Social share image URL |
| `cover` | string | Cover image for Publish |

## Aliases Deep Dive

Aliases enable **multiple link targets** to resolve to the same note:

```yaml
---
aliases:
  - ZK
  - slip box
  - Zettelkasten Method
  - card index method
---
```

Now all of these resolve to the same note:

```markdown
[[zettelkasten-methodology|ZK]] → resolves here
[[zettelkasten-methodology|slip box]] → resolves here
[[zettelkasten-methodology|Zettelkasten Method]] → resolves here
```

This is critical for Zettelkasten workflows where concepts evolve multiple names over time.

Formally, if a note $N$ has aliases $A = \{a_1, a_2, \ldots, a_k\}$, then:

$$\forall a_i \in A,\ \text{link}(a_i) \mapsto N$$

## Obsidian Properties (Custom Fields)

From Obsidian 1.4+, the **Properties** system extends frontmatter with typed fields and a GUI editor:

```yaml
---
# Text
concept: Emergence

# Number
priority: 1

# Checkbox
reviewed: true

# Date
created: 2026-06-22

# Date & Time
meeting_time: 2026-06-22T14:30:00

# List
status: [draft, review, published]

# Multi-select
domains: ["AI", "Knowledge Management", "Graph Theory"]
---
```

Properties are editable via the Properties view (sidebar or top of note). This allows non-technical users to edit structured metadata without touching YAML directly.

## Best Practices for AI Agent Consumption

When designing frontmatter for AI tool consumption, follow these 8 principles:

### 1. Stable IDs

Use timestamp or UUID-based identifiers rather than mutable titles:

```yaml
id: "20260622T143000"    # YYYYMMDDThhmmss — sortable, unique, encodes creation time
```

Formally: $\text{id}(N) = f(\text{created\_at})$ where $f$ is injective and monotonic.

### 2. Explicit Types

Include a `type` field for classification. This is the **only required OKF field**:

```yaml
type: Concept    # Concept | Tool | Pattern | Meta | Tutorial | Reference
```

### 3. Explicit Relationships

Use structured relationship fields to create machine-readable link semantics:

```yaml
prerequisites:              # What you must understand first
  - /concepts/embeddings.md
related:                    # Conceptually connected notes
  - "[[attention-mechanism|Multi-Head Attention]]"
  - "[[attention-mechanism|Self-Attention]]"
sources:                    # Provenance tracking
  - title: "Attention Is All You Need"
    url: "https://arxiv.org/abs/1706.03762"
```

### 4. Status Tracking

Use a `status` field for workflow state machines:

```yaml
status: evergreen    # seedling → budding → evergreen → superseded → archived
```

### 5. Summarization

Include a short `summary` field for retrieval and index generation:

```yaml
summary: >-
  The core attention mechanism computes weighted sums of values
  based on query-key similarity, scaled by √d_k.
```

### 6. Confidence Scores

Optional `confidence` field to qualify uncertain claims:

```yaml
confidence: 0.85    # Range 0.0–1.0
```

### 7. Domain Tags

Categorize by knowledge domain for graph partitioning:

```yaml
domain: knowledge-management
tags:
  - attention
  - transformer
  - fundamentals
```

Tags answer "what category?" — Links answer "how does this connect to that specific idea?" See [[zettelkasten-methodology#Tags vs. Links|Tags vs. Links]].

### 8. Consistent Conventions

Always use the same field names across the vault. Never mix `created` with `created_at` or `dateCreated`. Consistency enables querying, filtering, and automated linting.

## Knowledge Graph Metadata

Frontmatter can encode graph-semantic relationships:

```yaml
---
id: "zk-emergence-01"
graph:
  node_type: concept              # concept | fact | question | argument | source
  edge_types:
    supports: ["note-02", "note-07"]
    contradicts: ["note-03"]
    exemplifies: ["note-05"]
  centrality: 0.72                # computed metric
  cluster: zettelkasten-core      # community detection label
---
```

This enables explicit typed edges beyond bare markdown links — supporting contradiction edges, support edges, and other semantic relationships. See [[karpathy-llm-curriculum#Self-Bootstrapping Knowledge Base|self-bootstrapping]] for how agents use these during lint operations.

## Dataview Query Examples

With the **Dataview plugin**, frontmatter becomes queryable:

```dataview
TABLE title, status, confidence
FROM #zettelkasten
WHERE status = "evergreen"
SORT confidence DESC
```

```dataview
TABLE title AS "Title", description AS "Summary", difficulty
FROM "concepts"
WHERE domain = "knowledge-management"
SORT difficulty ASC
```

```dataview
LIST
FROM #seedling
WHERE date(created) >= date(today) - dur(7 days)
```

# Citations

[1] [OKF v0.1 Specification — Frontmatter section](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)
[2] [Obsidian Help — Properties](https://help.obsidian.md/Editing+and+formatting/Properties)
[3] [Dataview Plugin Documentation](https://blacksmithgu.github.io/obsidian-dataview/)
[4] [YAML 1.2 Specification](https://yaml.org/spec/1.2/spec.html)

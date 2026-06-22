---
type: Concept
title: "Mermaid Diagrams"
description: Complete reference for embedding Mermaid diagrams in markdown — flowchart, sequence, class, state, ER, Gantt, pie, mindmap, timeline, git graph with styling and knowledge representation examples.
tags: [mermaid, diagrams, markdown, visualization, knowledge-graph]
timestamp: 2026-06-22T14:15:00Z
id: "20260622T141500"
status: evergreen
difficulty: beginner
domain: technical-writing
prerequisites:
  - /concepts/markdown-frontmatter.md
related:
  - "[[latex-in-markdown|LaTeX in Markdown]]"
  - "[[okf-format|OKF Format]]"
  - "[[zettelkasten-methodology|Zettelkasten Methodology]]"
  - "[[karpathy-llm-curriculum|Karpathy LLM Curriculum]]"
sources:
  - title: "Mermaid.js Documentation"
    url: "https://mermaid.js.org"
  - title: "Obsidian Help — Mermaid"
    url: "https://help.obsidian.md/Editing+and+formatting/Advanced+formatting+syntax#Diagram"
confidence: 0.90
summary: >-
  Mermaid diagrams embedded in fenced `mermaid` code blocks support 10 diagram types
  with full styling, theming, and subgraph composition — enabling rich visual knowledge
  representation directly in markdown.
---

# Mermaid Diagrams

> Text-driven diagramming embedded directly in markdown.

## Embedding Syntax

Mermaid diagrams use fenced code blocks with the `mermaid` language identifier:

````markdown
```mermaid
graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Do this]
    B -->|No| D[Do that]
```
````

Obsidian renders Mermaid natively (since v0.5.0). Other platforms (GitHub, GitLab) may require plugins.

## Flowchart

### Direction

```
graph TD     Top → Down (also: TB)
graph BT     Bottom → Top
graph LR     Left → Right
graph RL     Right → Left
```

### Node Shapes

```mermaid
graph LR
    A[Rectangle]
    B(Rounded edges)
    C([Stadium / pill])
    D`Subroutine`
    E[(Database / cylinder)]
    F((Circle))
    G>Asymmetric / flag]
    H{Rhombus / diamond}
    I{{Hexagon}}
    J[/Parallelogram/]
    K[\Parallelogram alt\]
    L[/Trapezoid\]
    M[\Trapezoid alt/]
    N(((Double circle)))
```

### Edge Types

```mermaid
graph LR
    A --- B
    C --> D
    E -.-> F
    G ==> H
    I --label--> J
    K -. label .-> L
    M == label ==> N
    O --o P
    Q --x R
    S <--> T
```

### Subgraphs

```mermaid
graph TB
    subgraph "Group 1"
        A1 --> A2
    end
    subgraph "Group 2"
        B1 --> B2
    end
    A2 --> B1
```

## Sequence Diagram

```mermaid
sequenceDiagram
    participant U as User
    participant A as API
    participant DB as Database

    U->>A: Send Request
    activate A
    A->>DB: Query
    activate DB
    DB-->>A: Result
    deactivate DB
    A-->>U: Response
    deactivate A

    Note over U,DB: This is a note spanning participants

    alt Success
        U->>A: Confirm
    else Failure
        U->>A: Retry
    end

    loop Every 5 minutes
        A->>DB: Health check
    end

    opt Optional step
        A->>A: Self-check
    end
```

### Arrow Types

| Syntax | Meaning |
|--------|---------|
| `->>` | Solid line, filled arrow |
| `-->>` | Dashed line, filled arrow |
| `->)` | Async (open arrow) |
| `-x` | Cross end |
| `-)` | Async (small open arrow) |

### Activations

```mermaid
sequenceDiagram
    A->>+B: Request (activate B)
    B->>-A: Response (deactivate B)
    B-->>A: Dashed response
```

## Class Diagram

```mermaid
classDiagram
    class Animal {
        +String name
        +int age
        +makeSound() void
    }

    class Dog {
        +fetch() void
    }

    class Cat {
        +purr() void
    }

    Animal <|-- Dog : Inheritance
    Animal <|-- Cat : Inheritance

    class Owner {
        +String name
        +feed(Animal a) void
    }

    Owner "1" --> "*" Animal : owns

    <<interface>> IWalkable
    IWalkable : +walk() void
    Dog ..|> IWalkable : implements
```

### Relationship Types

| Syntax | Meaning |
|--------|---------|
| `<\|--` | Inheritance |
| `*--` | Composition |
| `o--` | Aggregation |
| `-->` | Association |
| `..>` | Dependency |
| `..\|>` | Realization (implements) |

### Multiplicity

```mermaid
classDiagram
    Customer "1" --> "*" Order
    Order "1" --> "1..*" LineItem
    Student "0..1" --> "1" Desk
```

## State Diagram

```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> Review : submit for review
    Review --> Published : approve
    Review --> Draft : request changes
    Published --> Archived : archive
    Archived --> [*]

    state Draft {
        [*] --> Writing
        Writing --> SelfReview : done writing
        SelfReview --> Writing : revise
        SelfReview --> [*] : ready
    }
```

## Entity Relationship Diagram

```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER {
        int id PK
        string name
        string email UK
        date created_at
    }
    ORDER {
        int id PK
        int customer_id FK
        string status
        decimal total
    }
    LINE-ITEM {
        int id PK
        int order_id FK
        int product_id FK
        int quantity
    }
```

## Gantt Chart

```mermaid
gantt
    title Project Timeline
    dateFormat  YYYY-MM-DD
    axisFormat  %b %d

    section Research Phase
    Literature Review        :done,    r1, 2026-06-01, 14d
    Methodology Design       :active,  r2, after r1, 7d
    Ethics Approval          :crit,    r3, 2026-06-15, 14d

    section Development Phase
    Prototype                :         d1, after r2, 21d
    Testing                  :         d2, after d1, 14d
    Deployment               :         d3, after d2, 7d
```

## Pie Chart

```mermaid
pie title Knowledge Management Tools
    "Obsidian" : 45
    "Logseq" : 20
    "Roam Research" : 15
    "Notion" : 12
    "Other" : 8
```

## Mindmap

```mermaid
mindmap
  root((Zettelkasten))
    Core Principles
      Atomicity
        One idea per note
        Self-contained
      Connectivity
        Bidirectional links
        Emergent clusters
      Emergence
        No predefined hierarchy
        Structure from links
    Implementation
      Obsidian
        Wiki links
        Graph view
        Frontmatter
      Templates
      ID Systems
    Card Types
      Fleeting Notes
      Literature Notes
      Permanent Notes
      Index Notes
```

### Mindmap Shapes

```mermaid
mindmap
    root((Root))
        A
        B[Square]
        C(Rounded)
        D((Circle))
        E))Cloud((
        F{{Hexagon}}
        G))Bang((
```

## Timeline

```mermaid
timeline
    title History of Zettelkasten

    section Pre-Digital Era
        1952 : Luhmann starts his ZK
              : First card created
        1960s : ZK grows to thousands of cards
        1997 : Luhmann dies
              : ~90,000 cards total

    section Digital Era
        2000s : Early digital PKM tools
        2017 : Ahrens publishes "How to Take Smart Notes"
        2020 : Obsidian v1.0 released
        2026 : AI-integrated ZK workflows emerge
```

## Git Graph

```mermaid
gitGraph
    commit id: "initial"
    commit id: "add-readme"
    branch develop
    checkout develop
    commit id: "implement-feature-a" tag: "v0.1-alpha"
    commit id: "implement-feature-b"
    checkout main
    commit id: "hotfix-typo" type: HIGHLIGHT
    merge develop id: "merge-dev" tag: "v1.0"
    commit id: "release-prep"
```

Commit types: `NORMAL` (default), `REVERSE` (crossed circle), `HIGHLIGHT` (filled rect).

## Styling and Theming

### Global Theme Directive

```mermaid
---
config:
  theme: dark
  layout: elk
---
flowchart LR
    A --> B
```

Available themes: `default`, `base`, `forest`, `dark`, `neutral`.

### Node-Specific Styling

```mermaid
graph LR
    A[Start] --> B[End]

    style A fill:#f9f,stroke:#333,stroke-width:4px,color:#000
    style B fill:#bbf,stroke:#f66,stroke-width:2px,stroke-dasharray: 5 5
```

### Class-Based Styling

```mermaid
graph TB
    A --> B
    C --> B
    D --> C

    classDef primary fill:#1f77b4,stroke:#333,color:#fff
    classDef secondary fill:#ff7f0e,stroke:#333,color:#000
    classDef highlight fill:#2ca02c,stroke:#333,stroke-width:3px,color:#fff

    class A,C primary
    class B secondary
    class D highlight
```

## Knowledge Representation Examples

### Concept Hierarchy

```mermaid
graph TD
    PKM[Personal Knowledge Management]
    PKM --> ZK[Zettelkasten Method]
    PKM --> PARA[PARA Method]
    PKM --> GTD[Getting Things Done]

    ZK --> Atomic[Atomic Notes]
    ZK --> Links[Bidirectional Links]
    ZK --> Emerge[Emergent Structure]

    Atomic --> OneIdea[One Idea Per Note]
    Atomic --> SelfCont[Self-Contained]

    Links --> WikiLinks[Wiki Links]
    Links --> Backlinks[Backlinks]
    Links --> Graph[Graph View]
```

### Knowledge Flow

```mermaid
sequenceDiagram
    participant R as Reading/Research
    participant F as Fleeting Notes
    participant L as Literature Notes
    participant P as Permanent Notes
    participant I as Index Notes

    R->>F: Capture ideas
    F->>L: Process with source
    L->>P: Extract atomic insights
    P->>P: Link to existing notes
    P->>I: Cluster into MOCs
    I->>P: Provide navigation
```

### Workflow State Machine

```mermaid
stateDiagram-v2
    [*] --> Captured : quick capture or read
    Captured --> Processed : review & annotate
    Processed --> Atomic : extract single ideas
    Atomic --> Linked : add connections
    Linked --> Evergreen : mature & validated
    Evergreen --> Archived : superseded
    Atomic --> Archived : no longer relevant
    Processed --> Discarded : not worth keeping
    Discarded --> [*]
    Archived --> [*]
```

# Citations

[1] [Mermaid.js Documentation](https://mermaid.js.org)
[2] [Obsidian Help — Advanced Formatting Syntax (Diagrams)](https://help.obsidian.md/Editing+and+formatting/Advanced+formatting+syntax#Diagram)

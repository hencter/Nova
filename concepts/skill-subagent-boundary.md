---
type: Concept
title: "Skill vs Subagent Boundary"
description: "When to extend the main agent with a skill (injected instructions, shared context) vs spawn a subagent (isolated process, independent permissions) — the definitive decision framework for Nova vault architecture."
tags:
  - skills
  - subagents
  - agents
  - agent-architecture
  - nova
  - boundary
timestamp: 2026-06-30T00:00:00Z
id: "20260630T170000"
status: evergreen
difficulty: intermediate
domain: agent-architecture
prerequisites:
  - /concepts/agent-skills-system.md
  - /concepts/subagent-concurrency.md
related:
  - "[[agent-skills-system|Agent Skills System]]"
  - "[[subagent-concurrency|Subagent Concurrency]]"
  - "[[agent-orchestration|Agent Orchestration]]"
  - "[[permission-models|Permission Models]]"
  - "[[agent-extensibility|Agent Extensibility]]"
sources:
  - title: "AGENTS.md §8 — Skills Discovery & Atomicity"
    url: "AGENTS.md"
  - title: "AGENTS.md §9 — Multi-Agent Coordination"
    url: "AGENTS.md"
confidence: 1.0
summary: >
  Skill = extends the main agent's capability by injecting instructions into shared context (serial, same permissions, same LLM).
  Subagent = delegates work to an independent process with isolated context (parallel, different permissions, potentially different LLM).
  The boundary is: does this work need isolation (subagent) or just instruction (skill)?
---

# Skill vs Subagent Boundary

## The Core Distinction

Skills and subagents are both ways to extend an agent's capabilities, but they operate at different architectural layers:

| | **Skill** | **Subagent** |
|---|---|---|
| **Question it answers** | "How do I do X?" | "Who can do X for me?" |
| **Mechanism** | `skill("name")` injects SKILL.md into **current context** | `task({ subagent_type: "..." })` spawns **independent process** |
| **Context** | Shared with main agent (runs inline) | Fresh isolated context (returns result) |
| **Permissions** | Inherits main agent's | Independent (`edit: ask`, `bash: deny`, etc.) |
| **LLM Model** | Same as main agent | Can be different (cheaper, faster, specialized) |
| **Concurrency** | Serial — injected, executed, context continues | Parallel — N agents can run simultaneously |
| **Lifecycle** | Ephemeral — loaded on demand, unloaded after use | Task-scoped — spawned, runs, returns result, exits |
| **File location** | `<vault>/skills/<name>/SKILL.md` | `.opencode/agents/<name>.md` |
| **Frontmatter** | `name`, `description` (required) | `mode: subagent`, `permission:`, `description` |
| **State mutation** | Direct — skill instructions execute via main agent's tools | Indirect — subagent edits files, main agent merges |
| **Error containment** | Error in skill = error in main agent | Error in subagent = subagent fails, main agent unaffected |

## Decision Framework

When designing a new capability for the Nova vault, ask these questions in order:

```
New capability needed
  │
  ├─ Is this a one-off task?
  │   YES → Do NOT create skill or agent. Just do it inline.
  │   NO  → Continue.
  │
  ├─ Does it need different permissions (e.g., read-only, bash:deny)?
  │   YES → Subagent ✓
  │   NO  → Continue.
  │
  ├─ Does it need a different LLM model (cheaper, faster)?
  │   YES → Subagent ✓
  │   NO  → Continue.
  │
  ├─ Will it run in parallel with other work?
  │   YES → Subagent ✓
  │   NO  → Continue.
  │
  ├─ Is it a reusable workflow instruction set?
  │   YES → Skill ✓
  │   NO  → Continue.
  │
  └─ Does it require specialized domain knowledge injected as instructions?
      YES → Skill ✓
      NO  → Rethink: maybe this is just a concept note, not executable.
```

## Practical Examples from the Nova Vault

### Skills (live vault examples)

| Skill | Purpose | Why Skill, Not Subagent |
|-------|---------|------------------------|
| `nova-kb` | Vault maintenance operations (ingest, lint, query-file, cross-reference) | Instructions injected into main agent context — same permissions, serial workflow. The agent needs to know "how to do X" but doesn't need isolation. |

### Subagents (live vault examples)

| Subagent | Purpose | Why Subagent, Not Skill |
|----------|---------|------------------------|
| `nova-architect` | Vault structure design, refactoring, knowledge graph optimization | `edit: ask` permission — structural changes need approval gating. Could run independently analyzing the graph while the main agent handles user interaction. |
| `terminology-auditor` | LLM-facing terminology audit across all vault files | `bash: deny` + `edit: ask` — read-only scan with optional fix proposals. Runs independently, returns structured report. Perfectly parallelizable. |

### Hypothetical Future Examples

| Capability | Verdict | Rationale |
|-----------|---------|-----------|
| "How to create an Obsidian tag taxonomy" | **Skill** — add to nova-kb | Instruction injection, reusable workflow |
| "Auto-fix all broken wiki links" | **Subagent** | `edit: ask` permission isolation, parallel to main work |
| "Research a new protocol (e.g., ACP)" | **Subagent** (general) | Different scope, can run parallel to user interaction |
| "How to write a good log entry" | **Skill** — add to nova-kb | Instruction injection |
| "Validate all frontmatter against conventions.md" | **Subagent** | Read-only parallel audit, returns report |

## Why This Boundary Matters

### Skill Anti-Patterns

- ❌ Creating a skill for a one-off task — creates orphaned maintenance burden
- ❌ Creating a skill that needs different permissions — skill can't isolate permissions; make it a subagent
- ❌ Creating a skill that should run in parallel — skill is serial; blocking main agent

### Subagent Anti-Patterns

- ❌ Creating a subagent for simple instruction injection — subagent overhead (context setup, result parsing) is wasted
- ❌ Creating a subagent without isolating permissions — if it doesn't need different trust, it could be a skill
- ❌ Creating a subagent that mutates the same file as another concurrent subagent — violates write isolation (§9)

## Relationship to Vault Terminology

This note is the **canonical boundary definition** in the vault. It resolves the terminology ambiguity noted in the 2026-06-30 audit:

| Term | Canonical Definition | Source |
|------|---------------------|--------|
| **Skill** | Instruction pack loaded via `skill()` tool | AGENTS.md §8, `agent-skills-system.md` |
| **Subagent** | Independent process spawned via `task()` tool | AGENTS.md §8-§9, `subagent-concurrency.md` |
| **Agent** | Generic term for any AI process (main or sub) | This note |
| **Main Agent** / **Primary Agent** | The agent the user is directly interacting with | AGENTS.md §0 |
| **Orchestrator** | The main agent when managing multiple subagents | `agent-orchestration.md` |

## See Also

- [[agent-skills-system|Agent Skills System]] — Mechanics of the skill system: SKILL.md format, discovery paths, loading
- [[subagent-concurrency|Subagent Concurrency]] — Mechanics of subagents: task tool invocation, tree sessions, parallelism
- [[agent-orchestration|Agent Orchestration]] — Higher-level coordination patterns (LLM-driven vs code-driven)
- [[permission-models|Permission Models]] — Why subagents need different permissions
- [[agent-extensibility|Agent Extensibility]] — Plugin systems, hooks, and agent customization (broader context)

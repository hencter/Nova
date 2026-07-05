---
type: Concept
title: "Agent Conference Protocol"
description: "Async inter-agent communication via shared Markdown files — subagents write proposals and reviews in structured conference sessions, iterating through multiple rounds until consensus, with the main agent as chair driving the process."
tags:
  - conference
  - agents
  - protocol
  - async
  - collaboration
  - subagent
timestamp: 2026-06-30T22:30:00Z
id: "20260630T223000"
status: budding
difficulty: intermediate
domain: agent-architecture
prerequisites:
  - /concepts/subagent-concurrency.md
  - /concepts/skill-subagent-boundary.md
related:
  - "[[subagent-concurrency|Subagent Concurrency]]"
  - "[[skill-subagent-boundary|Skill vs Subagent Boundary]]"
  - "[[agent-orchestration|Agent Orchestration]]"
  - "[[a2a-protocol|A2A Protocol]]"
  - "[[cross-session-memory|Cross-Session Memory]]"
  - "[[conventions|Conventions]]"
  - "[[vault-architecture|Vault Architecture]]"
sources:
  - title: "conference/README.md — Conference Protocol"
    url: "conference/README.md"
  - title: "conference/session-20260630-review.md — First Multi-Round Conference"
    url: "conference/session-20260630-review.md"
confidence: 0.85
summary: >
  Agent conference = subagents communicate asynchronously through shared Markdown files. Each session file is a structured log of proposals, reviews, rebuttals, and decisions. The main agent iterates rounds until consensus or deadlock.
---

# Agent Conference Protocol

## Core Idea

Subagents spawned via `task()` have isolated contexts — they cannot directly communicate. The **conference file** is a shared memory surface where agents write messages that other agents can read, reply to, and build upon. This is the **async messaging layer** on top of subagent concurrency.

## Relationship to Other Concepts

| Related Concept | How Conference Protocol Extends It |
|----------------|-----------------------------------|
| [[subagent-concurrency|Subagent Concurrency]] | Adds communication layer on top of isolated execution |
| [[skill-subagent-boundary|Skill vs Subagent Boundary]] | Conference is the infrastructure that makes subagent collaboration composable |
| [[agent-orchestration|Agent Orchestration]] | Conference = file-mediated orchestration (vs network-mediated like A2A) |
| [[a2a-protocol|A2A Protocol]] | A2A = real-time network protocol; Conference = async file-based protocol |
| [[cross-session-memory|Cross-Session Memory]] | Conference files are a shared memory surface that survives agent context loss |

## File Structure

```
conference/
  ├── index.md                    ← Directory-level catalog
  ├── README.md                   ← Operational reference (thin pointer)
  └── session-YYYYMMDD.md         ← One session per file per topic
```

## Session File Format

```markdown
# Conference Session — YYYY-MM-DD

**Topic**: <what this conference is about>
**Chair**: <main agent>
**Participants**: <agent-name>, <agent-name>
**Goal**: <specific deliverable>

---

## [real-timestamp] <agent-name>
### <role>: <title>

<message body>

## [real-timestamp] <agent-name>
### <role>: <response title>

<response body>

---
## Consensus

<final agreed-upon decisions>
```

## Orchestration Flow

The conference protocol is **multi-round by design**, not single-round:

```
Main Agent
  │
  ├─ 1. Create session file with topic and goal
  ├─ 2. Spawn Agent A (Read → Write proposal)
  ├─ 3. Spawn Agent B (Read → Write review)
  ├─ 4. CHECK: Has Agent B raised objections or mandatory additions?
  │     YES → Spawn Agent A (Read latest → Respond → Revise)
  │          → Spawn Agent B (Read latest → Confirm or re-object)
  │          → Repeat 4 until consensus or deadlock
  │     NO  → Continue to 5
  ├─ 5. Read full conference → Summarize consensus
  └─ 6. Execute agreed-upon decisions
```

## Consensus Protocol

A conference is **closed** when:

1. The reviewing agent issues **explicit approval** (e.g., "同意", "no objections")
2. All mandatory additions from reviews have been addressed in revised proposals
3. No new objections remain unresolved

A conference is **deadlocked** when:

1. After 3 full rounds (A→B→A→B→A→B), no consensus reached
2. Main agent declares deadlock and closes with unresolved items logged

## Rules

- **Read before write**: Each agent reads the existing conversation before contributing
- **Sign your work**: Every message includes `## [real-timestamp] <agent-name>` header
- **Use real timestamps**: Agents MUST obtain actual system time (e.g., `Get-Date`) before writing. NEVER fabricate timestamps.
- **Human-readable language**: Conference files MUST use the human owner's preferred language. Per AGENTS.md §5, conference files are in the "human actively reads" layer. The human owner must be able to read and participate.
- **Decision tracking**: Final section tracks actionable decisions
- **Main agent as chair**: The main agent opens sessions, sequences agents, drives iteration, and closes with summary

## Anti-Patterns

- ❌ **Single-round conference**: Proposal → Review → Stop (no revision, no consensus)
- ❌ **English conference files in a Chinese vault**: Human owner excluded from agent conversations
- ❌ **Fabricated timestamps**: Using round-number times instead of real system time
- ❌ **Passive chair**: Main agent that just launches two agents and reports — should actively drive iteration
- ❌ **Infinite iteration**: No round limit — must have a deadlock escape (3 rounds max)

## See Also

- [[subagent-concurrency|Subagent Concurrency]] — How subagents are spawned and managed
- [[skill-subagent-boundary|Skill vs Subagent Boundary]] — When to use subagent vs skill
- [[agent-orchestration|Agent Orchestration]] — Higher-level coordination patterns
- [[a2a-protocol|A2A Protocol]] — Network-based agent-to-agent protocol (contrast)
- [[cross-session-memory|Cross-Session Memory]] — How conference files contribute to memory
- [[conventions|Conventions]] — Naming and formatting rules applied here
- [[vault-architecture|Vault Architecture]] — Where conference/ fits in vault topology

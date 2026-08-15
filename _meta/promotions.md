---
type: Meta
title: "Promotion Ledger"
aliases:
  - "Promotions"
description: Ledger of all promoted standard nodes (rules, constraint notes, knowledge notes) and retired rules — loaded every session at boot; active constraints constrain future behavior.
id: "20260805T220500"
status: evergreen
difficulty: intermediate
domain: knowledge-management
tags: [meta, promotions, standards]
related: ["[[conventions|Conventions]]", "[[vault-architecture|Vault Architecture]]", "[[self-bootstrapping|Self-Bootstrapping]]"]
confidence: 1.0
summary: Every promotion (§2.5) is registered here — Active Rules (AGENTS.md), Active Constraint Notes (boot-loaded), Knowledge Notes (advisory, not binding), and Retired. Boot reads this ledger so promoted constraints are present every session.
---

# Promotion Ledger

> **standard node** = a promoted rule/note that constrains future behavior (§2.5). This ledger is part of the per-session loading set (boot step 5). Keep ≤ 50 lines; retire entries to `/log-archive/` when over budget.

## Active Rules (AGENTS.md)

Rules written into `AGENTS.md` — loaded every session, binding by construction.

| Date | Rule | One-line lesson | Trace |
|------|------|-----------------|-------|
| 2026-07-23 | §9 no-model in agent frontmatter | Setting `model` hard-fails when provider unreachable | log 2026-07-23 |
| 2026-06-30 | §9 tool boundary (no rg/fd/fzf/bat/jq) | External search CLIs bypass permission audit | log 2026-06-30 |
| 2026-06-30 | §1 no filesystem-absolute paths | Absolute paths break on distribution | log 2026-06-30 |
| 2026-08-05 | §2.6 data accuracy — calculator required | LLM arithmetic unreliable; verify any numeric output with a calculator | log 2026-08-05 |
| 2026-08-14 | §9 DSH tool boundary + portability map | Schema names the current harness's tools; one-line map keeps portability | log 2026-08-14 |

## Active Constraint Notes (boot-loaded) — none yet

## Knowledge Notes (advisory, not binding)

Promoted lessons filed as concept/pattern/tool notes — knowledge background, no per-session constraint.

| Date | Note | Lesson | Trace |
|------|------|--------|-------|
| 2026-08-14 | [[deepseek-harness|DeepSeek Harness]] (tools/) | DSH runtime model & tool stack — the reference note behind the §9 mapping | log 2026-08-14 |
| 2026-08-14 | [[knowledge-graph-patterns|Knowledge Graph Patterns]] (patterns/) | Displayed link syntax must be escaped; lint counts only rendered edges | log 2026-08-14 |

## Retired — full history in `/log-archive/`

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
tags:
  - meta
  - promotions
  - standards
related:
  - "[[conventions|Conventions]]"
  - "[[vault-architecture|Vault Architecture]]"
  - "[[self-bootstrapping|Self-Bootstrapping]]"
confidence: 1.0
summary: >
  Every promotion (§2.5) is registered here — Active Rules (AGENTS.md), Active Constraint Notes (boot-loaded), Knowledge Notes (advisory, not binding), and Retired. Boot reads this ledger so promoted constraints are present every session.
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

## Active Constraint Notes (boot-loaded)

Operational constraint notes that must be in the loading set — register here so boot loads them.

| Date | Note | One-line constraint | Trace |
|------|------|---------------------|-------|
| — | — | (none yet) | — |

## Knowledge Notes (advisory, not binding)

Promoted lessons filed as concept/pattern/tool notes — knowledge background, no per-session constraint.

| Date | Note | Lesson | Trace |
|------|------|--------|-------|
| — | — | (none yet) | — |

## Retired

Replaced or superseded standards. Full history lives in `/log-archive/`.

| Date | Artifact | Replaced by | Reason |
|------|----------|-------------|--------|
| — | — | — | — |

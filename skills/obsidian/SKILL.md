---
name: obsidian
description: Query and operate this vault through the official Obsidian CLI (orphans, unresolved links, backlinks, tags, properties, search, daily notes). Use when linting link health, checking the knowledge graph, or when the human reads this vault in Obsidian. Falls back to opencode native tools when the CLI is unavailable.
license: MIT
compatibility: all
metadata:
  author: Nova Vault
  version: "1.0.0"
  category: vault-integration
  requires-cli: obsidian
---

# Obsidian CLI — Vault Query Skill

This vault is read by humans in **Obsidian**. Obsidian ships an official CLI (`obsidian`) that exposes the app's own graph cache — link resolution, backlinks, orphans, tags, properties — which is ground truth for what the human actually sees. Prefer it over re-deriving the graph with Grep when available.

## Availability Check (Lazy)

Only check when about to use it:

```bash
obsidian version
```

- **Success** → CLI available, use the mappings below.
- **Failure** (not installed, or Obsidian app not running) → fall back to opencode native tools (`Grep`/`Glob`/`Read`) silently. Never block vault operations on CLI absence.
- Windows note: the binary is `Obsidian.com` (console wrapper), exposed as `obsidian` on PATH by the installer.

## Lint Mappings (AGENTS.md §2.3)

| Lint check | Obsidian CLI | Native fallback |
|-----------|--------------|-----------------|
| Orphan notes (zero inbound links) | `obsidian orphans` | Grep for `[[name]]` across vault |
| Dead-end notes (zero outbound links) | `obsidian deadends` | Read each note, check for links |
| Broken/unresolved links | `obsidian unresolved verbose` | Grep all `[[...]]`, Glob targets |
| Backlinks for a note | `obsidian backlinks file=<name>` | Grep `[[<name>]]` |
| Outgoing links of a note | `obsidian links file=<name>` | Read the note |
| Tag inventory | `obsidian tags counts` | Grep frontmatter `tags:` |
| Property/frontmatter audit | `obsidian properties counts` | Grep frontmatter keys |
| Full-text search | `obsidian search query=<text>` | opencode `Grep` |

Add `total` to most commands for a count only; `format=json` where supported for parsing.

## Write Operations

**Content edits still go through opencode `Write`/`Edit`** — they are permission-audited. Use the CLI only for Obsidian-native behaviors that file writes cannot replicate:

- `obsidian daily:append content=<text>` — append to the user's daily note
- `obsidian open file=<name>` — open a note in the user's Obsidian (when the user asks "show me")
- `obsidian template:insert name=<tpl>` — insert an Obsidian template into the active file

## Hard Rules

1. **Never** run `plugin:install`, `plugin:uninstall`, `theme:set`, `plugins:restrict`, `restart`, or `delete ... permanent` without an explicit user request.
2. **Never** use `eval` or `dev:*` commands — they bypass the permission model entirely.
3. `file=<name>` resolves like a wikilink (fuzzy); `path=<folder/note.md>` is exact. Prefer `path=` in automated operations to avoid ambiguity.
4. Multi-vault systems: pass `vault=<name>` only if `obsidian vault` shows the wrong active vault.

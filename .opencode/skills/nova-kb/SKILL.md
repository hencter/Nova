---
name: nova-kb
description: Nova knowledge base maintenance workflows. Use when ingesting new knowledge, linting the vault, filing query answers as permanent notes, cross-referencing concepts, or performing any vault maintenance operation.
---

# Nova KB — Knowledge Base Maintenance Skill

You are maintaining the **Nova Knowledge Vault** at `D:\OpenCode\Note`. This skill enables you to perform vault maintenance operations efficiently and correctly.

## Core Workflows

### Ingest — New Knowledge Acquisition

When you receive new source material (research, articles, conversation insights, code):

1. **Read the source** thoroughly — understand its key concepts
2. **Identify what's new** — what concepts, patterns, or insights does this add?
3. **Extract atomic concepts** — each distinct idea gets its own note
4. **Determine the right directory**:
   - Core concepts → `/concepts/`
   - Tool-specific → `/tools/`
   - Architectural patterns → `/patterns/`
5. **Create/update notes** with complete frontmatter:
   ```yaml
   ---
   type: Concept|Tool|Pattern
   title: "Clear Title"
   description: One-line summary
   tags: [relevant, tags]
   id: "YYYYMMDDThhmmss"
   status: seedling|budding|evergreen
   difficulty: beginner|intermediate|advanced
   domain: knowledge-domain
   prerequisites:
     - /path/to/dependency.md
   related:
     - "[[Related Note]]"
   sources:
     - title: "Source"
       url: "https://..."
   confidence: 0.85
   summary: >-
     One-sentence executive summary.
   ---
   ```
6. **Cross-link** — update `related` fields on existing notes that should reference the new note
7. **Update indexes** — add entry to the relevant `index.md`
8. **Log it** — append to `/log.md`: `## [YYYY-MM-DD] ingest | <Brief description>`

### Query-File — Filing Good Answers

When you answer a question and the answer has lasting value:

1. Write a new concept note in `/concepts/` capturing the synthesized answer
2. Add complete frontmatter with `type: Concept`
3. Link to all source notes referenced in the answer
4. Add to `/concepts/index.md`
5. Log: `## [YYYY-MM-DD] query-filed | <Topic>`

### Lint — Health Check

Run lint after ~10 ingest operations or when requested:

1. **Contradiction scan**: Search the vault for conflicting claims. Two notes claiming opposite things about the same concept.
2. **Orphan detection**: Find notes with zero inbound links (check `related` fields in all notes, and all `index.md` files — any note not referenced is an orphan).
3. **Staleness check**: Notes with `status: superseded` that still appear in index files, or current notes referencing outdated/superseded concepts.
4. **Broken links**: Wiki links `[[Target]]` pointing to non-existent notes.
5. **Gap analysis**: Topics mentioned in notes but lacking dedicated concept pages.
6. **Report findings** in `/log.md`: `## [YYYY-MM-DD] lint | <Summary>`

**Auto-fix rules**:
- Fix broken links by finding the correct target or removing the link
- Add missing cross-references where semantically appropriate
- Mark superseded notes with `status: superseded` and update frontmatter
- NEVER delete notes — only change status

### Cross-Reference — Strengthening the Graph

Regularly review the knowledge graph for connection opportunities:

1. For each note in `/concepts/`, check if its `related` field covers all semantically connected notes
2. For new notes, ensure at least 2-3 incoming links exist (add to `related` fields of existing notes)
3. Update `prerequisites` chains — check that dependency order makes educational sense
4. Check tag consistency — same concepts should share domain/type tags

## Frontmatter Quick Reference

```yaml
---
type: Concept              # REQUIRED (OKF v0.1)
title: "Title Here"
description: One line.
tags: [key, words]
timestamp: 2026-06-22T00:00:00Z
id: "20260622T000000"      # YYYYMMDDThhmmss
status: seedling           # seedling|budding|evergreen|superseded|archived
difficulty: intermediate   # beginner|intermediate|advanced
domain: domain-name
prerequisites:
  - /path/to/note.md
related:
  - "[[Note Name]]"
sources:
  - title: "Source Title"
    url: "https://..."
confidence: 0.85
summary: >-
  TL;DR sentence.
---
```

## Directory Quick Reference

| Directory | For |
|-----------|-----|
| `/concepts/` | Atomic permanent notes (abstract ideas) |
| `/tools/` | Tool-specific deep dives |
| `/patterns/` | Design patterns and architectures |
| `/_identity/` | Nova's self-conception and capabilities |
| `/_meta/` | Vault-about-the-vault (architecture, conventions) |
| `/templates/` | Note templates |
| `/index.md` | Top-level catalog |
| `/log.md` | Chronological memory |
| `/AGENTS.md` | Schema layer (rules) |

## Log Format

Always use this format for log entries:
```
## [YYYY-MM-DD] operation | Description
- Bullet points with specific actions
- Files created/modified
- Key decisions
```

Operations: `init`, `ingest`, `query-filed`, `lint`, `session`, `cross-reference`, `refactor`

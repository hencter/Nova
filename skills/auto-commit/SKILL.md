---
name: auto-commit
description: Auto-commit session changes via git. Use at the end of every session to ensure all file changes are committed. This replaces the former session.idle plugin with a skill-based approach.
---

# Auto-Commit — Session Git Commit Skill

You are responsible for ensuring all vault file changes are committed to git at the end of every session. This skill replaces the former `session.idle` plugin with a deterministic skill-based workflow.

## Core Workflow

### Session End Commit

At the end of every session, as part of the shutdown sequence:

1. Check if the working directory is a git repository:
   ```
   git rev-parse --git-dir
   ```
   If not a git repo, skip silently.

2. Check for uncommitted changes:
   ```
   git status --porcelain
   ```
   If no output, nothing to commit — skip.

3. If there are changes, commit them:
   ```
   git add -A && git commit -m "chore: auto-commit session changes"
   ```

### Integration with Session End Protocol

This skill integrates with the Session End protocol defined in AGENTS.md §7. The auto-commit step runs after the session log is written and indexes are updated.

### When to Run

- At the end of every interactive session
- After completing a significant unit of work (ingest, lint, refactor)
- Before the agent's context window is about to expire

### Error Handling

- If git is not installed or not in PATH → skip silently
- If the directory is not a git repository → skip silently
- If `git commit` fails (e.g., no changes after `git add`) → skip silently
- If there's a merge conflict or other git error → log the error in `/log.md` but do NOT block

### Notes

- Always use `-c core.safecrlf=false` on Windows to avoid CRLF warnings
- Commit messages follow the convention: `chore: auto-commit session changes`
- This skill does NOT push — only local commits. Pushing is the human owner's responsibility.

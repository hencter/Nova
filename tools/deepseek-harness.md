---
type: Tool
title: "DeepSeek Harness"
description: "The current runtime of the Nova vault — a Cordis-composed agent harness with host/client planes, workspace AGENTS.md mounting, a native tool stack, sandboxed pwsh execution, and dynamic plugins."
tags:
  - deepseek-harness
  - agent-harness
  - cordis
  - runtime
timestamp: 2026-08-14T03:00:00Z
id: "20260814T111000"
status: budding
difficulty: intermediate
domain: ai-engineering
prerequisites:
  - "[[harness-engineering|Harness Engineering]]"
related:
  - "[[opencode|OpenCode]]"
  - "[[agent-skills-standard|Agent Skills Standard]]"
  - "[[skill-subagent-boundary|Skill vs Subagent Boundary]]"
  - "[[permission-models|Permission Models]]"
  - "[[capability-manifest|Capability Manifest]]"
sources:
  - title: "DeepSeek Harness — runtime context of this session (system documentation, tool manifests)"
confidence: 0.9
summary: >
  DeepSeek Harness (DSH) is the agent runtime the Nova vault runs on: AGENTS.md mounts as workspace instructions with zero config, the tool stack is the native set below, and capability extension happens through the Cordis composition and dynamic plugins — not through files inside the vault.
---

# DeepSeek Harness

DeepSeek Harness (DSH) is the agent runtime the Nova vault runs on (since 2026-08). The vault itself stays runtime-agnostic — the harness-specific layer is one tool-boundary table and a portability map in `AGENTS.md` §9.

## Runtime Model

- **Composition**: DSH is composed from [[agent-extensibility|Cordis plugins]]. A **host composition** holds shared registries (persistence, sandbox/approval stack, model route, subagent registry); an **agent preset** contributes one session's tools, persona, and prompt sections via `cordis.yml`.
- **Two planes**: Host runs in the Node.js process (files, networking, commands, model tools); Client runs in the browser page (UI slots, themes). Client→Host calls cross via package-private JSON methods.
- **Workspace instructions**: `AGENTS.md` in the working directory is mounted as per-session instructions — no config file needed (contrast: opencode requires `opencode.json` → `instructions`).
- **Skill catalog**: skills are registered in the composition; the `skill` tool loads only those. Vault skills (`skills/*/SKILL.md`) are plain files the agent reads directly.

## Native Tool Stack

| Class | Tools |
|-------|-------|
| Files | `read` (line-numbered, image support), `write`, `edit` (string replace), `glob`, `grep` |
| Shell | `pwsh` (PowerShell; sandboxed — read-only runs ConstrainedLanguage) |
| Research | `web_search` |
| Delegation | `subagent`, `subagent_fork` (background by default), `workflow` (scripted fan-out), `ralph` (fresh-agent loops) |
| Goals | `create_goal` / `get_goal` / `update_goal` — long-running objectives across continuation rounds |
| Jobs | background jobs with `job_list` / `job_output` / `job_kill` |
| UI | `ask_user_question`, `todo_write` |

## Safety Model

- **File sandbox**: read-only / workspace-write / danger-full-access modes. A denial is policy, not a bug — do not work around it or retry it another way.
- **Approval prompts**: gate dynamic-plugin runs and sandbox escalation; when disabled, denials are final.
- **Dynamic plugins**: temporary Cordis plugins defined and run inside the process (`cordis_define` / `cordis_run`); versions are immutable Packages under a `pluginId` with run / update / rollback / stop / undefine lifecycle. Definitions do not survive a process restart.

## Contrast with OpenCode

| Aspect | DeepSeek Harness | OpenCode |
|--------|------------------|----------|
| Config | Cordis composition (`cordis.yml`) | `opencode.json` |
| Instructions | workspace `AGENTS.md` auto-mount | `instructions` paths |
| Skills | composition-registered catalog | directory scanning (`skills.paths`) |
| Extensions | dynamic Cordis plugins (Host/Client) | JS plugins |
| Subagents | prompt-based `subagent` tools | typed agents in `.opencode/agents/` |
| Shell | `pwsh` (PowerShell) | `Bash` |

## Vault Impact

- `AGENTS.md` §9 names DSH tools and carries a one-line portability map for opencode-compatible runtimes.
- `opencode.json` is retained for opencode/Crush compatibility but is inert under DSH.
- `.opencode/agents/*.md` are portable agent definitions; under DSH pass their content as `subagent` prompts.
- Harness composition files live outside the vault (`~/.dsh`); vault operations never edit them.

## Citations

[1] DeepSeek Harness — runtime context of this session (system documentation, tool manifests).

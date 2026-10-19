---
type: Tool
title: "Crush"
description: "Charm's official successor to OpenCode — a Go/Bubble Tea terminal AI coding agent with BYOK providers, crush.json configuration, and multi-runtime skill compatibility."
tags:
  - crush
  - opencode
  - terminal
  - agent-tool
  - charm
timestamp: 2026-08-14T04:00:00Z
id: "20260814T120000"
status: budding
difficulty: intermediate
domain: ai-engineering
prerequisites:
  - "[[opencode-architecture|OpenCode Architecture]]"
related:
  - "[[opencode|OpenCode]]"
  - "[[claude-code|Claude Code]]"
  - "[[agent-skills-standard|Agent Skills Standard]]"
  - "[[agent-extensibility|Agent Extensibility]]"
sources:
  - title: "Crush — GitHub (charmbracelet/crush)"
    url: "https://github.com/charmbracelet/crush"
  - title: "Crush Review — Charm-Polished Terminal Coding Agent for the BYOK Generation"
    url: "https://aicoolies.com/reviews/crush-review"
  - title: "Charm's New AI Coding Agent 'Crush' Emerges from OpenCode Controversy"
    url: "https://biggo.com/news/202507310715_Charm_Crush_AI_Coding_Agent"
  - title: "Charm Crush：终端里的 AI 编程搭档，开源替代 Claude Code 的新选择"
    url: "https://gumi.ink/posts/2026-03-21-charm-crush-ai-terminal-coder/"
  - title: "OpenCode note §15 (internal successor comparison)"
confidence: 0.85
summary: >
  Crush is the official successor of OpenCode by the original Charm authors — the same client-server agent architecture rebuilt as a polished Go/Bubble Tea TUI, configured via crush.json, and positioned as a BYOK open-source alternative to Claude Code.
---

# Crush

**Crush** is the terminal AI coding agent by [Charm](https://charm.sh) (charmbracelet) — the official successor of OpenCode. When the original `opencode-ai/opencode` repository was archived (2025-09-18), the community fork `anomalyco/opencode` continued under the OpenCode name while the original authors relaunched their line as Crush, emerging "from the OpenCode controversy with a polished terminal relaunch" (launched 2025-07). The two lines share the same client-server ancestry but diverge in stack, configuration, and ecosystem.

## Positioning

- **"BYOK generation"**: model-agnostic, bring-your-own-key — positioned as an open-source alternative to [[claude-code|Claude Code]] rather than a provider-bound agent.
- **Charm-polished TUI**: first-class terminal UX from the Bubble Tea ecosystem (same lineage as Glow/Gum); a deliberate differentiator against utilitarian agent UIs.
- **Adoption signals**: third-party harnesses add Crush as a client (e.g. harness-cli multi-client expansion), and its built-in `crush-config` skill is indexed on skills registries (SkillsMP). Size/version as recorded in [[opencode|OpenCode]] §15 (v0.84.1, 26.5k stars).

## Stack & Architecture

- **Go + Bubble Tea** TUI, from the Charm ecosystem.
- Inherits OpenCode's decoupled client-server core loop — full architecture analysis in [[opencode-architecture|OpenCode Architecture]]; a detailed successor comparison table lives in [[opencode|OpenCode]] §15.

## Configuration

- **`crush.json`** — expanded schema replacing `opencode.json`; the 8-level merge precedence model is preserved ([[opencode|OpenCode]] §15.4).
- Config home: `~/.config/crush/`.
- **Global context**: `~/.config/crush/CRUSH.md` + `~/.config/AGENTS.md` — the shared `AGENTS.md` convention this vault itself runs on.
- Declarative OS integration exists (e.g. Nix Home Manager `programs.crush` options).

## Skills & Extensibility

- **Multi-runtime skill paths**: `.agents/skills/`, `.crush/skills/`, `.claude/skills/`, `.cursor/skills/` — Crush reads skill directories written for other agents, a concrete implementation of the cross-tool portability described in [[agent-skills-standard|Agent Skills Standard]].
- Built-in `crush-config` skill documents providers, LSP servers, and settings.

## Crush vs OpenCode vs Claude Code

| Aspect | Crush | OpenCode (anomalyco) | Claude Code |
|--------|-------|----------------------|-------------|
| Origin | Original authors (Charm), relaunch of archived opencode-ai line | Community fork continuing the OpenCode name | Anthropic |
| Stack | Go + Bubble Tea TUI | Original TS stack | Closed-source, Anthropic-first |
| Config | `crush.json` (expanded) | `opencode.json` | `CLAUDE.md` + settings |
| Skills | Multi-runtime paths (`.agents/`, `.claude/`, `.cursor/`) | `.opencode/skills/` | `.claude/skills/` |

## Vault Relevance

- This vault's skills are Agent-Skills-Standard files; `skills/auto-commit/SKILL.md` names Crush as a compatible runtime — Crush's multi-runtime skill paths are the working evidence behind that compatibility claim.
- OpenCode remains a reference architecture here ([[opencode-architecture]]); Crush is its canonical "where the original line went" successor, tracked alongside the fork.

# Citations

[1] charmbracelet/crush — https://github.com/charmbracelet/crush
[2] Crush Review (aicoolies) — https://aicoolies.com/reviews/crush-review
[3] Crush Emerges from OpenCode Controversy (BigGo News) — https://biggo.com/news/202507310715_Charm_Crush_AI_Coding_Agent
[4] Charm Crush 终端 AI 编程搭档 (gumi.ink) — https://gumi.ink/posts/2026-03-21-charm-crush-ai-terminal-coder/
[5] OpenCode note §15 (internal) — [[opencode]]

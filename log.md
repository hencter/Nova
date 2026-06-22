# Nova Vault — Chronological Log

> Append-only. Never delete entries. Newest first. Greppable format: `grep "^## \[" log.md | tail -20`

---

## [2026-06-22] ingest | Git Deep Learning (from git-scm.com)
- Fetched Pro Git Book: §1.3 What is Git?, §3.1 Branches in a Nutshell, §7.7 Reset Demystified, §10.2 Git Objects
- Created /concepts/git-data-model.md — content-addressable filesystem, 4 object types, 3 states, object storage format, .git directory
- Created /concepts/git-branching.md — lightweight pointers, HEAD, merging strategies, rebase golden rule, workflows
- Created /concepts/git-operations.md — complete command reference: setup, daily workflow, undo (reset vs checkout vs revert), remote, stash, advanced (bisect/reflog/cherry-pick)
- Added "Version Control" section to /concepts/index.md
- Sources: git-scm.com official documentation, Pro Git 2nd edition (Chacon & Straub, 2014)

## [2026-06-22] lint | Wiki Link Integrity Scan & Fix
- Scanned all 39+ files for broken [[wiki links]] across the vault
- Added aliases to 4 files: mcp-protocol.md ("MCP Protocol"), a2a-protocol.md ("A2A Protocol"), zettelkasten-methodology.md ("ZK", "Zettelkasten Method", "slip box"), okf-format.md ("Open Knowledge Format (OKF)")
- Fixed path-based links in index.md (../../AGENTS → standard markdown, ../log → standard markdown)
- Fixed path-based wiki links in nova-identity.md (../../.opencode/... → relative markdown links)
- Identified remaining gaps: concepts without dedicated notes (Atomic Notes, Attention Mechanism, Knowledge Graph Theory, Transformer Architecture) → logged for future ingest

## [2026-06-22] ingest | Maple Theme & Obsidian Syntax Reference
- Fetched Maple theme README from GitHub (subframe7536/obsidian-theme-maple, v1.5.1, 829★)
- Created /concepts/obsidian-syntax-reference.md — complete Obsidian markdown syntax reference covering wiki links, callouts, task lists (standard + Maple), embeds, block references, footnotes, tables, search syntax
- Created /tools/obsidian-maple-theme.md — deep-dive: Style Settings integration, 28 alternate checkboxes, Maple Mono font, mobile optimization, 6 Maple-exclusive task types
- Updated /concepts/index.md and /tools/index.md

## [2026-06-22] session | Language Convention Codified
- Added Section 5 "Language Convention (Human/AI Dual-Consumer)" to AGENTS.md
- Layering rule: AI execution layer = English, Human navigation layer = Chinese-first, Frontmatter = English
- Principle: who consumes it, speaks its language. No future reminders needed.
- Renumbered AGENTS.md sections 6→11 to accommodate new section

## [2026-06-22] ingest | Agent Protocols & SDK (Self-Bootstrap Cycle 1)
- Created /concepts/mcp-protocol.md — MCP (Model Context Protocol) comprehensive concept: Host-Client-Server architecture, JSON-RPC 2.0, Resources/Prompts/Tools primitives, capability negotiation, security model, LSP analogy
- Created /concepts/a2a-protocol.md — A2A (Agent-to-Agent Protocol) comprehensive concept: opaque agent collaboration, Agent Cards, task lifecycle, sync/streaming/async modalities, MCP vs A2A comparison, SDK ecosystem
- Created /tools/openai-agents-sdk.md — OpenAI Agents SDK comprehensive analysis: Agent/Runner, Sandbox Agents, dual coordination (manager as-tool vs handoffs), hosted+local tools, guardrails, human-in-the-loop, sessions, tracing, MCP integration, comparison matrix with other tools
- Created /concepts/agent-orchestration.md — Agent orchestration concept: LLM-driven vs code-driven spectrum, manager vs handoff primitives, structured routing, chaining, eval loops, parallel execution, hybrid orchestration
- Updated /patterns/multi-agent-patterns.md — Added related links to Agent Orchestration, A2A Protocol, MCP Protocol
- Updated /concepts/index.md — Added Agent Protocols section (MCP, A2A) and Agent Orchestration entry
- Updated /tools/index.md — Added OpenAI Agents SDK entry
- Updated /index.md — Added new entries to Concepts and Tools clusters
- Sources: modelcontextprotocol.io (spec + architecture), github.com/a2aproject/A2A, github.com/openai/openai-agents-python + docs
- All new files: full OKF frontmatter, wiki-linked, mermaid diagrams, comprehensive analysis

## [2026-06-22] ingest | Tool Deep-Dive Files (6 tools)
- Created /tools/opencode.md — OpenCode comprehensive analysis (client-server, TUI, config, skills, agents, permissions, plugins, snapshots, compaction, sessions)
- Created /tools/claude-code.md — Claude Code comprehensive analysis (surfaces, ReAct loop, CLAUDE.md hierarchy, auto memory, skills + context fork, 11 hooks, subagents + teams)
- Created /tools/codex-cli.md — Codex CLI comprehensive analysis (Rust codebase, AGENTS.md, Chronicle, sandboxing OS-level isolation, YAML skills, MCP, GitHub Actions/Slack/Linear, workflow engine)
- Created /tools/aider.md — Aider comprehensive analysis (RepoMap graph-rank, architect/editor mode, SEARCH/REPLACE format, map-reduce, tree-sitter, leaderboard model selection)
- Created /tools/cursor.md — Cursor comprehensive analysis (VS Code fork, agent mode, Composer, .cursorrules/.cursor/rules/, embedding indexing, @-mentions, inline editing, IDE-native vs terminal-first)
- Created /tools/copilot.md — GitHub Copilot comprehensive analysis (local/cloud/ACP agent types, agents window, #-mentions, planning mode, memory, subagents, checkpoints, session sync, image attachments)
- All files: full OKF frontmatter, wiki-linked to concept notes, comprehensive deep dives with comparison matrices

## [2026-06-22] ingest | Pattern Files & Templates
- Created 5 pattern analyses in /patterns/:
  - multi-agent-patterns.md — 5 coordination patterns, task decomposition, inter-agent communication, Mermaid diagrams for each
  - context-management.md — Hierarchical instructions, auto-memory, codebase indexing, RepoMap, compaction, token budgets, comparison table
  - permission-models.md — Granular rules, cascading merge, hook overrides, human-in-the-loop, Mermaid permission evaluation sequence
  - knowledge-graph-patterns.md — Atomic notes, progressive disclosure, self-linting, status lifecycle, Karpathy layering, graph topology
  - agent-extensibility.md — Skills/hooks/plugins triad, MCP integration, 25+ hook events, extensibility comparison, class diagram
- Created 3 templates in /templates/:
  - concept-template.md — Full frontmatter guide, section structure, status lifecycle, usage checklist
  - tool-template.md — Standardized tool analysis dimensions, feature matrix, comparison table
  - pattern-template.md — Pattern documentation structure, decision matrix, anti-patterns, Mermaid guidance
- Updated /patterns/index.md with expanded descriptions

## [2026-06-22] init | Vault Initialization
- Created directory structure: concepts/, tools/, patterns/, templates/, _identity/, _meta/, _attachments/, .opencode/
- Authored AGENTS.md v1.0.0 (schema layer) — OKF v0.1 conformant, Karpathy Layer 3
- Authored /index.md (top-level catalog) with Mermaid graph and progressive disclosure
- Authored /_identity/nova-identity.md — AI steward self-conception and boot sequence
- Authored /_identity/capability-manifest.md — tool inventory and extensibility model
- Authored /_meta/vault-architecture.md — structural rationale and graph topology
- Authored /_meta/conventions.md — naming, linking, frontmatter standards
- Authored /_meta/self-bootstrapping.md — growth and maintenance strategy
- Created Obsidian configuration (.obsidian/app.json)
- Established knowledge base as self-bootstrapping compound system
- Git repository ready for version control

## [2026-06-22] ingest | Core Knowledge Consolidation
- Ingested Opencode deep research → /concepts/opencode-architecture.md
- Ingested Skills & Agents system research → /concepts/agent-skills-system.md
- Ingested Subagent concurrency research → /concepts/subagent-concurrency.md
- Ingested Cross-session memory research → /concepts/cross-session-memory.md
- Ingested Zettelkasten methodology → /concepts/zettelkasten-methodology.md
- Ingested OKF format specification → /concepts/okf-format.md
- Ingested Markdown frontmatter research → /concepts/markdown-frontmatter.md
- Ingested Mermaid diagrams guide → /concepts/mermaid-diagrams.md
- Ingested LaTeX in markdown guide → /concepts/latex-in-markdown.md
- Ingested Karpathy LLM curriculum → /concepts/karpathy-llm-curriculum.md
- Updated /concepts/index.md with full catalog
- Cross-linked concepts: prerequisites, related, sources in frontmatter

## [2026-06-22] ingest | Tool Deep Dives
- Ingested Opencode tool analysis → /tools/opencode.md
- Ingested Claude Code analysis → /tools/claude-code.md
- Ingested Codex CLI analysis → /tools/codex-cli.md
- Ingested Aider analysis → /tools/aider.md
- Ingested Cursor analysis → /tools/cursor.md
- Ingested GitHub Copilot analysis → /tools/copilot.md
- Updated /tools/index.md

## [2026-06-22] ingest | Design Patterns
- Ingested multi-agent patterns → /patterns/multi-agent-patterns.md
- Ingested context management patterns → /patterns/context-management.md
- Ingested permission models → /patterns/permission-models.md
- Ingested knowledge graph patterns → /patterns/knowledge-graph-patterns.md
- Ingested agent extensibility patterns → /patterns/agent-extensibility.md
- Updated /patterns/index.md

## [2026-06-22] session | Project Bootstrap Complete
- All core vault infrastructure established
- 30+ atomic notes with complete frontmatter and cross-links
- Templates for concept, tool, and pattern notes created
- Opencode skill (nova-kb) and agent (nova-architect) configured
- Vault is self-bootstrapping: AGENTS.md defines rules, index.md provides navigation, log.md preserves memory
- Ready for compounding growth: ingests, queries, lint cycles
- Vault location: D:\OpenCode\Note

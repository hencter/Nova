---
type: Identity
title: "Capability Manifest"
description: Full inventory of Nova's tools, skills, agents, and extensibility model — what this AI can do and how it grows.
id: "20260622T050500"
status: evergreen
domain: identity
tags: [identity, capabilities, tools, extensibility]
related:
  - "[[Nova Identity]]"
  - "[[Agent Skills System]]"
  - "[[Agent Extensibility]]"
confidence: 1.0
summary: >
  Nova's capabilities span file I/O, code execution, web access, knowledge management, multi-agent coordination, and self-bootstrapping — all grounded in Opencode's tool ecosystem and extensible through skills, agents, and plugins.
---

# Capability Manifest

## Tool Inventory

Nova has access to these Opencode-provided tools:

### File Operations
| Tool | Function |
|------|----------|
| `read` | Read files and directories from the local filesystem |
| `write` | Create or overwrite files |
| `edit` | Exact string replacements in files |
| `glob` | Fast file pattern matching (e.g., `src/**/*.ts`) |
| `grep` | Regex content search across files |

### Execution
| Tool | Function |
|------|----------|
| `bash` | Execute Windows PowerShell commands with timeout |

### Knowledge & Research
| Tool | Function |
|------|----------|
| `webfetch` | Fetch and convert web content to markdown |
| `skill` | Load specialized skill instructions |

### Coordination
| Tool | Function |
|------|----------|
| `task` | Launch subagents for parallel autonomous work |
| `question` | Ask the user clarifying questions |
| `todowrite` | Create and maintain structured task lists |

## Available Agent Types

| Agent | Mode | Type | Best For |
|-------|------|------|----------|
| **build** (default) | primary | Full development | All work, all tools |
| **plan** | primary | Planning | Analysis without code changes |
| **general** | subagent | Multi-step | Complex research, parallel work |
| **explore** | subagent | Read-only | Fast file/code search |
| **Custom** (nova-architect) | subagent | Specialized | Vault architecture decisions |

## Loaded Skills

| Skill | Location | Purpose |
|-------|----------|---------|
| **nova-kb** | `.opencode/skills/nova-kb/SKILL.md` | Knowledge base maintenance: ingest, lint, cross-reference, query-file workflows |
| **customize-opencode** | Built-in | Editing opencode's own configuration |
| **weread-skills** | `~/.agents/skills/weread-skills/` | 微信读书 assistant |

## Core Capabilities

### Knowledge Ingestion
Read source material → extract concepts → create atomic notes with frontmatter → cross-link → update indexes → log the operation.

### Query Answering
Navigate `index.md` → drill into concepts/tools/patterns → synthesize with citations → file valuable answers as permanent notes.

### Vault Maintenance
- **Lint**: Scan for contradictions, orphans, stale notes, broken links, gaps
- **Index updates**: Keep `index.md` files synchronized with actual content
- **Cross-linking**: Ensure every note has 1–3+ inbound links
- **Status management**: Move notes through lifecycle (seedling → evergreen → superseded)

### Code & Development
- Read, write, and edit source code
- Execute PowerShell commands
- Search codebases with glob and grep
- Debug and fix issues

### Web Research
- Fetch web content and convert to markdown
- Extract and synthesize information from multiple sources

### Multi-Agent Coordination
- Spawn multiple subagents for parallel independent research
- Merge and synthesize results from subagents
- Use explore agents for codebase search
- Use general agents for complex multi-step tasks

## Extensibility Model

Nova can grow its capabilities through:

### Skills (`.opencode/skills/`)
Skills inject specialized workflows into the agent's context. Criteria for skill creation:
1. Reusable across sessions → worth the skill overhead
2. Specialized domain knowledge → benefits from dedicated instructions
3. Clear 1–2 sentence description → can be accurately triggered

### Agents (`.opencode/agents/`)
Custom agents extend the parallel execution model. Criteria for agent creation:
1. Different permission model → needs dedicated agent
2. Different model → different cost/capability balance
3. Specialized system prompt → distinct personality and focus
4. Not doable by primary agent alone → justifies complexity

### Plugins (`.opencode/plugins/`)
JavaScript/TypeScript modules that hook into opencode's lifecycle. For:
- Custom tools
- Environment injection
- Security guards
- Notifications
- Context compaction hooks

### Future Growth Areas
- **Domain skills**: Code review, security audit, paper analysis, teaching
- **MCP servers**: External data integration, API access
- **Automated ingest**: Scheduled source scanning, RSS feeds
- **Graph analytics**: Centrality metrics, community detection, link prediction

## Limitations

Nova currently does not have:
- **Persistent memory beyond this vault** — No database, no vector store. The vault IS the memory.
- **Real-time collaboration** — Single writer at a time (git-based concurrency)
- **External compute** — No access to cloud GPUs or remote execution
- **Visual rendering** — No image generation or diagram rendering (though Mermaid/LaTeX are supported in markdown)

These are intentional design choices: the vault is deliberately minimal and offline-first. Capabilities are added only when there's a clear, recurring need.

---

# Citations

[1] Opencode Documentation. https://opencode.ai
[2] Opencode Config Schema. https://opencode.ai/config.json

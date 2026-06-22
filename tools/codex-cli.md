---
type: Tool
title: "Codex CLI"
description: "Comprehensive deep-dive analysis of Codex CLI by OpenAI — terminal/IDE/desktop/web surfaces, Rust codebase, AGENTS.md, Chronicle memory system, sandboxing architecture, skills, hooks, MCP integration, plugin system, GitHub Actions/Slack/Linear integrations, workflow orchestration, and permission model."
tags: [codex-cli, tool-analysis, openai, agent-platform, rust, sandboxing]
timestamp: 2026-06-22T16:10:00Z
id: "20260622T161000"
status: evergreen
difficulty: advanced
domain: ai-tools
prerequisites:
  - /concepts/agent-skills-system.md
  - /concepts/cross-session-memory.md
  - /concepts/subagent-concurrency.md
related:
  - "[[OpenCode Architecture]]"
  - "[[Agent Skills System]]"
  - "[[Cross-Session Memory]]"
  - "[[Permission Models]]"
  - "[[Agent Extensibility]]"
  - "[[OpenCode]]"
  - "[[Claude Code]]"
sources:
  - title: "Codex CLI GitHub Repository"
    url: "https://github.com/openai/codex"
  - title: "OpenAI Codex Documentation"
    url: "https://platform.openai.com/docs/guides/codex"
confidence: 0.88
summary: >
  Codex CLI is OpenAI's Rust-based agent coding platform spanning terminal, IDE, desktop, and web surfaces, featuring sandboxed execution via OS-level isolation, the Chronicle memory system for persistent context, AGENTS.md for project conventions, a plugin and MCP ecosystem, deep CI/CD integration (GitHub Actions, Slack, Linear), and a declarative workflow engine for multi-step automation.
---

# Codex CLI — Comprehensive Tool Analysis

## 1. Architecture Overview

Codex CLI is OpenAI's agent coding platform, written in **Rust** for performance and safety. Unlike OpenCode's client-server model, Codex CLI uses a **monolithic process architecture** with optional sandboxing.

### Key Architectural Decisions
- **Rust codebase**: Memory safety, zero-cost abstractions, cross-platform native binaries
- **Monolithic process**: Single binary with optional sandbox containers
- **OpenAI backend**: GPT-4o, o3, o4-mini, and future models via OpenAI API
- **Open source**: Apache 2.0 license

### Surface Architecture
| Surface | Description | Entry Point |
|---------|-------------|-------------|
| **Terminal** | Native Rust CLI binary | `codex` |
| **IDE** | VS Code extension | Marketplace install |
| **Desktop** | Standalone Electron/Tauri app | Download from openai.com |
| **Web** | Browser-based Codex workspace | codex.openai.com |

---

## 2. AGENTS.md System

Codex CLI adopts the **AGENTS.md** convention for project-level agent instructions, similar to OpenCode's approach but with Codex-specific extensions.

### AGENTS.md Structure (Codex Style)
```markdown
# Project: My Application

## Build Commands
- Build: `cargo build --release`
- Test: `cargo test`
- Lint: `cargo clippy`

## Architecture
- Microservices with gRPC communication
- PostgreSQL for persistence
- Redis for caching

## Conventions
- Rust 2024 edition
- async/await throughout
- thiserror for error handling

## Security
- Never log PII
- Validate all inputs
- Use parameterized queries
```

### AGENTS.md vs CLAUDE.md
| Aspect | Codex AGENTS.md | Claude CLAUDE.md |
|--------|----------------|------------------|
| Convention origin | OpenCode ecosystem | Anthropic ecosystem |
| Hierarchy | Single file per project | 4-level hierarchy (Managed→User→Project→Local) |
| Syntax | Standard markdown | Markdown + `@file` includes |
| Cross-tool compat | Read by OpenCode | Read by OpenCode (dual support) |

---

## 3. Chronicle Memory System

The **Chronicle** is Codex CLI's persistent memory system, implementing [[Cross-Session Memory]].

### What Chronicle Stores
- Project context and conventions
- Past decisions and their rationale
- Common patterns and templates
- User preferences and style choices
- Session summaries with key outcomes

### How Chronicle Works
1. During active sessions, significant events are logged
2. At session end, a summary is generated and appended to the Chronicle
3. On next session start, the Chronicle is loaded into context
4. The agent references Chronicle entries to maintain continuity

### Chronicle Storage
```
~/.codex/chronicle/
├── projects/
│   └── <project-hash>.json
├── global.json
└── sessions/
    └── <session-id>.json
```

### Chronicle vs OpenCode Log
| Aspect | Chronicle | OpenCode log.md |
|--------|-----------|-----------------|
| Format | Structured JSON | Markdown |
| Query | Semantic search | Grep |
| Automation | AI-generated | AI + human |
| Scope | Per-project + global | Global vault |
| Versioning | Timestamped entries | Append-only markdown |

---

## 4. Sandboxing Architecture

Codex CLI's defining feature is its **OS-level sandboxing** for safe code execution. This is the most security-forward approach among agent coding tools.

### Sandbox Models

| Model | Isolation | Performance | Use Case |
|-------|-----------|-------------|----------|
| **Docker** | Container-level | Moderate | Default, cross-platform |
| **Firecracker** | microVM-level | Good | Higher security needs |
| **macOS Sandbox** | OS-level (App Sandbox) | Excellent | macOS-native |
| **Linux Namespaces** | Kernel-level | Excellent | Linux-native |
| **None** | No isolation | Best | Trusted environments |

### Sandbox Configuration
```json
{
  "sandbox": {
    "enabled": true,
    "type": "docker",
    "image": "codex-sandbox:latest",
    "network": "none",
    "readOnlyRootfs": true,
    "memoryLimit": "2Gi",
    "cpuLimit": "2.0",
    "timeout": 300,
    "volumes": [
      {
        "host": "./project",
        "container": "/workspace",
        "mode": "rw"
      }
    ],
    "allowedHosts": [
      "api.openai.com",
      "registry.npmjs.org"
    ]
  }
}
```

### Sandbox Lifecycle
1. **Create**: Sandbox instance created with specified isolation
2. **Mount**: Project files mounted at `/workspace`
3. **Execute**: Shell commands run inside sandbox
4. **Capture**: stdout, stderr, exit code captured
5. **Destroy**: Sandbox torn down after command or timeout

### Network Policies
- `none` — no network access
- `restricted` — only allowed hosts
- `full` — unrestricted (not recommended)

### Filesystem Protections
- Root filesystem read-only by default
- Only mounted volumes are writable
- Prevents `rm -rf /`, config tampering, credential theft

### Comparison: Sandboxing Approaches
| Tool | Approach | Security Level |
|------|----------|---------------|
| **Codex CLI** | OS-level containers/microVMs | High |
| **OpenCode** | Permission system + git snapshots | Medium |
| **Claude Code** | Permission modes + rules | Medium |
| **Aider** | Git auto-commits for rollback | Low-Medium |

Codex CLI's sandboxing represents [[Permission Models]] taken to the OS level — isolation as security, not just policy.

---

## 5. Skills System

Codex CLI supports a skills system aligned with [[Agent Skills System]].

### Skill Definition
```yaml
# .codex/skills/database-migrations.yaml
name: database-migrations
description: Safe database migration workflows
model: gpt-4o
tools: [read, write, bash]
instructions: |
  You are a database migration specialist.
  Always create rollback scripts alongside migrations.
  Never run DROP TABLE without confirmation.
```

### Skill Features
- **Declarative specification** (YAML-based, not markdown)
- **Model pinning** — skills can specify which model to use
- **Tool restriction** — skills can limit tool access
- **Context injection** — instructions merged into system prompt

### Skill Storage
| Scope | Path |
|-------|------|
| Global | `~/.codex/skills/` |
| Project | `.codex/skills/` |
| Community | Codex marketplace |

### Skills vs OpenCode/Claude
| Aspect | Codex CLI | OpenCode | Claude Code |
|--------|-----------|----------|-------------|
| Format | YAML | Markdown (SKILL.md) | Markdown (SKILL.md) |
| Model pinning | Yes | No | No |
| Tool restriction | Yes | Via agent config | Via agent config |
| Context forking | No | No | Yes (`context: fork`) |

---

## 6. Hooks System

Codex CLI provides lifecycle hooks for extensibility.

### Hook Events
| Event | Trigger | Use Case |
|-------|---------|----------|
| `pre_prompt` | Before prompt sent to model | Inject context, validate input |
| `post_response` | After model response | Post-process, log, format |
| `pre_tool_exec` | Before tool execution | Validate arguments, block dangerous ops |
| `post_tool_exec` | After tool execution | Transform output, trigger side effects |
| `on_error` | Error occurs | Custom error handling, recovery |
| `on_session_start` | Session begins | Setup environment, load chronicle |
| `on_session_end` | Session ends | Save state, update chronicle |

### Hook Implementation
```yaml
# .codex/hooks/pre_tool_exec.yaml
event: pre_tool_exec
matcher: "bash"
command: "python3 .codex/hooks/validate_bash.py"
timeout: 5000
on_failure: deny
```

### Hook vs Plugin
| Aspect | Hook | Plugin |
|--------|------|--------|
| Complexity | Simple, single-purpose | Complex, multi-capability |
| Language | Any (shell command) | JavaScript/TypeScript |
| State | Stateless | Can maintain state |
| Distribution | Single file | Package with dependencies |

---

## 7. MCP Integration

Codex CLI supports [[Model Context Protocol (MCP)]] for connecting to external tool servers.

### MCP Configuration
```json
{
  "mcp": {
    "servers": {
      "filesystem": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-filesystem", "/allowed/path"]
      },
      "github": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-github"]
      },
      "postgres": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/mydb"]
      }
    }
  }
}
```

### MCP Security
- MCP servers run inside the same **sandbox** as other tools
- Network access controlled by sandbox policies
- Tool results are sanitized before entering context

---

## 8. Plugin System

Codex CLI supports plugins for extending capabilities.

### Plugin Anatomy
```
.codex/plugins/my-plugin/
├── plugin.yaml         # Plugin manifest
├── index.js            # Entry point
├── tools/              # Custom tools
│   └── deploy.js
├── hooks/              # Custom hooks
│   └── on_deploy.js
└── skills/             # Bundled skills
    └── deploy.yaml
```

### Plugin Manifest
```yaml
# plugin.yaml
name: my-plugin
version: 1.0.0
description: Custom deployment plugin
author: dev-team
tools:
  - name: deploy
    description: Deploy to staging environment
    parameters:
      environment:
        type: string
        enum: [staging, production]
hooks:
  - event: post_tool_exec
    matcher: "deploy"
    handler: hooks/on_deploy.js
```

### Plugin Discovery
- `.codex/plugins/` in project root
- `~/.codex/plugins/` for global plugins
- Codex marketplace for community plugins

---

## 9. CI/CD & Service Integrations

Codex CLI deeply integrates with development workflows.

### GitHub Actions
```yaml
# .github/workflows/codex-review.yml
name: Codex Code Review
on: [pull_request]
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: openai/codex-action@v1
        with:
          prompt: "Review this PR for bugs, security issues, and style violations"
          model: gpt-4o
```

### Slack Integration
- Mention `@codex` in Slack channels to trigger agent actions
- Codex can post summaries, alert on issues, respond to queries
- Configured via Slack App + webhook

### Linear Integration
- Automatic issue triage and labeling
- PR-to-issue linking
- Status updates from agent activity
- Sprint planning assistance

### Workflow Engine
```yaml
# .codex/workflows/deploy.yaml
name: Deploy to Production
trigger:
  - on: pull_request.merged
    branches: [main]
steps:
  - name: Run Tests
    command: "npm test"
  - name: Build
    command: "npm run build"
  - name: Deploy
    command: "npm run deploy"
    requires_approval: true
  - name: Notify
    slack: "#deployments"
    message: "Deployed ${commit} to production"
```

---

## 10. Permission Model

Codex CLI's permission model is founded on **sandboxing** as the primary security boundary, supplemented by policy rules.

### Permission Architecture
```
Layer 1: OS Sandbox (Docker/Firecracker/macOS Sandbox)
    └── Layer 2: Network Policy (none/restricted/full)
        └── Layer 3: Filesystem Policy (read-only/read-write mounts)
            └── Layer 4: Tool Policy (allowed tools + matchers)
                └── Layer 5: Approval Gates (require user confirmation)
```

### Policy Configuration
```json
{
  "permissions": {
    "defaultMode": "sandboxed",
    "approvalGates": [
      { "pattern": "bash:git push*", "require": "always" },
      { "pattern": "bash:npm publish*", "require": "always" },
      { "pattern": "write:**/production.yaml", "require": "always" }
    ],
    "deny": [
      "bash:rm -rf /*",
      "bash:curl * | sh"
    ],
    "network": {
      "mode": "restricted",
      "allowedHosts": ["api.openai.com", "github.com"]
    }
  }
}
```

### Comparison of Permission Philosophies
| Tool | Philosophy | Strength |
|------|-----------|----------|
| **Codex CLI** | Sandbox isolation first, policy second | Highest security ceiling |
| **OpenCode** | Granular pattern matching | Most configurable |
| **Claude Code** | Simple mode + binary rules | Easiest to understand |

---

## 11. Workflow Orchestration

Codex CLI features a built-in **declarative workflow engine**.

### Workflow Definition
```yaml
name: Onboard New Service
description: Creates a new microservice from template
parameters:
  - name: service_name
    type: string
    required: true
  - name: team
    type: string
    default: platform
steps:
  - id: scaffold
    uses: template
    with:
      source: github.com/org/templates/microservice
      destination: services/${service_name}
  - id: configure
    command: "./scripts/configure-service.sh ${service_name} ${team}"
  - id: register
    command: "./scripts/register-service.sh ${service_name}"
    requires_approval: true
  - name: Notify Team
    slack: "#${team}-notifications"
    message: "New service ${service_name} created"
```

### Workflow Features
- **Parameterized**: Accept runtime parameters
- **Conditional**: Steps can have conditions
- **Approval gates**: Steps can require human approval
- **Parallel execution**: Independent steps run concurrently
- **Rollback**: Failed workflows can trigger rollback steps

---

## 12. Comparison: Codex CLI vs Claude Code vs OpenCode

| Dimension | Codex CLI | Claude Code | OpenCode |
|-----------|-----------|-------------|----------|
| **Language** | Rust | TypeScript | TypeScript |
| **License** | Apache 2.0 | Proprietary | MIT |
| **Provider** | OpenAI only | Anthropic only | 75+ providers |
| **Architecture** | Monolithic | Monolithic | Client-Server |
| **Security** | OS sandboxing | Permission modes | Permission cascading |
| **Memory** | Chronicle (JSON) | CLAUDE.md + auto memory | AGENTS.md + log.md |
| **Skills** | YAML-based | SKILL.md + context fork | SKILL.md |
| **Hooks** | 7 events | 11 events | 8 events |
| **Subagents** | Not natively typed | Explore/Plan/General | Explore/General/Custom |
| **CI/CD** | GitHub Actions, Slack, Linear | GitHub/GitLab integration | CLI scripting |
| **Workflows** | Declarative YAML engine | — | — |
| **Desktop** | Electron/Tauri app | Native app | Beta app |
| **MCP** | Full support | Full support | Full support |

---

## 13. Unique Strengths

1. **Sandboxing** — The only agent tool with OS-level isolation (Docker, Firecracker, macOS Sandbox)
2. **Rust codebase** — Performance, safety, single-binary distribution
3. **Workflow engine** — Declarative, parameterized, approval-gated workflows
4. **Chronicle** — Structured JSON memory with semantic search
5. **Deep integrations** — Native Slack, Linear, GitHub Actions
6. **Apache 2.0** — Fully open source for enterprise customization

---

## 14. Limitations

1. **OpenAI-locked** — Cannot use Anthropic, Google, or other providers
2. **No typed subagents** — Less sophisticated parallel execution than OpenCode or Claude Code
3. **Smaller ecosystem** — Fewer plugins, skills, and community extensions than VS Code-based tools
4. **Chronicle is young** — Memory system less battle-tested than CLAUDE.md or AGENTS.md ecosystems

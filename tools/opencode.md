---
type: Tool
title: "OpenCode"
description: "Comprehensive deep-dive analysis of OpenCode — client-server architecture, TUI interface, configuration system, skills and agents, permission model, plugin system, snapshots, compaction, and session management."
tags:
  - opencode
  - tool-analysis
  - agent-platform
  - tui
  - client-server
timestamp: 2026-06-22T16:00:00Z
id: "20260622T160000"
status: evergreen
difficulty: advanced
domain: ai-tools
prerequisites:
  - /concepts/opencode-architecture.md
  - /concepts/agent-skills-system.md
  - /concepts/subagent-concurrency.md
  - /concepts/cross-session-memory.md
related:
  - "[[opencode-architecture|OpenCode Architecture]]"
  - "[[agent-skills-system|Agent Skills System]]"
  - "[[subagent-concurrency|Subagent Concurrency]]"
  - "[[cross-session-memory|Cross-Session Memory]]"
  - "[[permission-models|Permission Models]]"
  - "[[agent-extensibility|Agent Extensibility]]"
  - "[[claude-code|Claude Code]]"
  - "[[codex-cli|Codex CLI]]"
sources:
  - title: "OpenCode Documentation"
    url: "https://opencode.ai/docs"
  - title: "OpenCode GitHub Repository"
    url: "https://github.com/anomalyco/opencode"
confidence: 0.92
summary: >
  OpenCode is an agent coding platform with a decoupled client-server architecture, supporting TUI/CLI/web/desktop/IDE interfaces, 75+ LLM providers via the AI SDK, a cascading permission system, a plugin/hook ecosystem, snapshot-based undo/redo, and declarative configuration merging across 8 precedence levels.
---

# OpenCode — Comprehensive Tool Analysis

## 1. Architecture Overview

OpenCode's architecture is detailed in [[opencode-architecture|OpenCode Architecture]]. The core design separates the **headless HTTP server** (exposing an OpenAPI 3.1 REST API) from **client frontends** (TUI, CLI, web, desktop, IDE plugins). This decoupling means:

- The TUI can crash or restart without losing server state
- Multiple client types can attach to the same server session
- Programmatic access is first-class via `opencode serve`
- The server is the single source of truth for tool execution, LLM calls, and state management

### Core Agent Loop (ReAct-Style)

```
User Input → TUI Client → [HTTP] → Server → AI SDK → LLM Provider
                                              ↑          ↓
                                         Tool Results ← Tool Calls
                                              ↓
                                         Execute Tools (filesystem, web, subagents)
                                              ↓
                                         Tool Results → AI SDK → LLM → Response
```

The loop is **interleaved reasoning and action**: the LLM emits tool calls, the server executes them, results feed back into the context, and the LLM reasons further. This continues until a final text response is produced.

### Provider Architecture

OpenCode uses **Vercel AI SDK** (`@ai-sdk`) as its provider abstraction layer, giving it access to every provider on [models.dev](https://models.dev) — **75+ providers** including Anthropic, OpenAI, Google, Meta, DeepSeek, xAI, Mistral, and others. The model ID format is:

```
provider/model-id
```

Examples: `anthropic/claude-sonnet-4-5`, `openai/gpt-4o`, `github-copilot/claude-sonnet-4`, `deepseek/deepseek-v4-pro`

Built-in authentication sources:
| Service | Auth Method |
|---------|-------------|
| GitHub Copilot | OAuth device flow via GitHub |
| OpenAI (ChatGPT Plus/Pro) | OAuth via ChatGPT subscription |
| GitLab Duo | OAuth via GitLab |
| OpenCode Zen | Curated models, included |
| OpenCode Go | $10/mo subscription tier |

### Filesystem Tools

| Tool | Purpose | Key Behavior |
|------|---------|-------------|
| `read` | Read file contents | Supports images and PDFs, returns line-numbered output |
| `write` | Create or overwrite files | Atomic write, requires prior `read` for overwrites |
| `edit` | Exact string replacement | Line-based diff matching, supports `replaceAll` flag |
| `glob` | File pattern matching | Fast filesystem traversal, respects `.gitignore` |
| `grep` | Content regex search | Uses ripgrep, respects `.gitignore` |
| `bash` | Execute shell commands | Platform-native, timeout support |
| `apply_patch` | Apply unified diff patches | Used for complex multi-file changes |
| `task` | Spawn subagents | Parallel execution, typed agent selection |
| `webfetch` | Fetch URL content | Converts to markdown/text/html |
| `websearch` | Search the web | For current information retrieval |
| `skill` | Load specialized skills | Injects skill instructions into context |
| `question` | Ask user clarifying questions | Interactive clarification flow |

---

## 2. TUI Interface

The Terminal User Interface is the default interaction mode. Key features:

### Navigation
| Key | Action |
|-----|--------|
| `Tab` | Switch between primary agents (Build ↔ Plan) |
| `@` | Fuzzy-search files in project for context injection |
| `/` | Slash-command mode (`/init`, `/undo`, `/redo`, `/share`, `/connect`, `/models`, `/status`, `/export`) |
| `Ctrl+C` | Interrupt current generation |
| `Up/Down` | Navigate command history |

### Visual Features
- **Syntax-highlighted code blocks** in responses
- **Streaming token display** during generation
- **Tool call visualization** — shows which tools are being invoked and their results inline
- **Diff preview** for edits — before/after views of file changes
- **Image drag-and-drop** — images dragged into the terminal are auto-normalized and attached to the prompt
- **Multi-line input** via `Alt+Enter` or paste

### Session Display
- Current model and provider shown in status bar
- Token usage counters
- Agent mode indicator (Build/Plan)
- Permission prompt display for ask-mode operations

### TUI Configuration (`tui.json`)
```json
{
  "theme": "dark",
  "autoScroll": true,
  "diffPreview": true,
  "syntaxHighlighting": true,
  "maxHistory": 1000,
  "fontSize": 14
}
```

---

## 3. Configuration System

### File Locations

| Scope | Config File | TUI Config |
|-------|------------|------------|
| Global | `~/.config/opencode/opencode.json` | `~/.config/opencode/tui.json` |
| Project | `<project>/opencode.json` | `<project>/tui.json` |
| Inline | `OPENCODE_CONFIG_CONTENT` env var | — |
| Custom path | `OPENCODE_CONFIG` env var | — |
| Remote | `.well-known/opencode` | — |
| Managed | MDM `.mobileconfig` (macOS) | — |

### Config Merge Precedence (highest wins)
1. macOS Managed Preferences (`.mobileconfig` via MDM)
2. Managed config files
3. Inline config (`OPENCODE_CONFIG_CONTENT`)
4. `.opencode` directories
5. Project config (`opencode.json`)
6. Custom config (`OPENCODE_CONFIG`)
7. Global config (`~/.config/opencode/opencode.json`)
8. Remote config (`.well-known/opencode`)

Config files are **merged**, not replaced — only conflicting keys are overridden by higher-precedence sources.

### Key Configuration Sections

```json
{
  "model": "anthropic/claude-sonnet-4-5",
  "backupModel": "openai/gpt-4o",
  "snapshot": true,
  "autoCompact": true,
  "compactThreshold": 0.85,
  "permission": {
    "defaultMode": "default",
    "rules": []
  },
  "provider": {
    "anthropic": {
      "apiKey": "{env:ANTHROPIC_API_KEY}",
      "baseURL": "https://api.anthropic.com",
      "timeout": 60000
    }
  },
  "env": {
    "NODE_ENV": "development"
  },
  "mcpServers": {},
  "plugins": [],
  "hooks": {}
}
```

### Environment Variable Interpolation
- `{env:VARIABLE_NAME}` — resolved at runtime from environment
- `{env:VARIABLE_NAME:default_value}` — with fallback
- Used for API keys, base URLs, and other secrets

---

## 4. Skills System

Detailed in [[agent-skills-system|Agent Skills System]]. Skills are specialized instruction sets loaded dynamically into the agent's context.

### SKILL.md Format
```markdown
---
name: skill-name
description: What this skill does
location: file:///path/to/skill
---

# Skill Title

Detailed instructions, workflows, and domain knowledge for the agent.
```

### Storage Locations
| Scope | Path |
|-------|------|
| Global skills | `~/.config/opencode/skills/` |
| Project skills | `.opencode/skills/` |
| Built-in skills | Bundled with OpenCode installation |

### Skill Loading
- Skills are loaded via the `skill` tool — the agent decides when to invoke a skill based on the task description
- The skill's full content is injected into the system prompt
- Skills are stateless — they provide instructions but don't maintain state between invocations
- Skills can bundle scripts, references, and templates in their directory

### Skill Lifecycle
1. **Discovery**: Agent sees `available_skills` in system prompt
2. **Matching**: Task description is compared against skill descriptions
3. **Loading**: `skill` tool is called with the skill name
4. **Injection**: Skill instructions are injected into context
5. **Execution**: Agent follows skill-specific workflows
6. **Unload**: Skill instructions leave context on next compaction or new session

---

## 5. Agents System

### Agent Architecture
OpenCode has a **typed agent hierarchy**:

| Agent Type | Purpose | Capabilities |
|------------|---------|-------------|
| **primary** | Main Build agent | Full read/write/edit/bash, spawns subagents |
| **plan** | Plan/architect agent | Read-only analysis, planning, research |
| **explore** | Fast codebase search | Read-only, optimized for parallel file search |
| **general** | General-purpose subagent | Read+write, multi-step implementation tasks |
| **custom** | User-defined agents | Configurable via `.opencode/agents/<name>.md` |

### Agent Definition (File-based)
Agents are defined as markdown files with frontmatter:

```markdown
---
name: my-agent
description: A custom agent for database migrations
model: anthropic/claude-haiku-4-5
permission: read-only
tools: [read, write, edit, bash]
---

# My Agent

You are a database migration specialist...
```

### Agent Definition (Inline)
Agents can also be defined inline in `opencode.json`:

```json
{
  "agents": {
    "my-agent": {
      "description": "Database migration specialist",
      "model": "anthropic/claude-haiku-4-5",
      "permission": "read-only",
      "tools": ["read", "write", "edit", "bash"],
      "systemPrompt": "You are a database migration specialist..."
    }
  }
}
```

### Primary vs Subagent
- The **primary agent** is the user-facing agent (Build or Plan mode)
- **Subagents** are spawned via the `task` tool for parallel work
- The primary agent consolidates subagent results and presents them to the user
- See [[subagent-concurrency|Subagent Concurrency]] for the parallel execution model

### Subagent Spawning
```
task({ subagent: "explore", description: "Find all test files", prompt: "..." })
task({ subagent: "general", description: "Implement auth middleware", prompt: "..." })
```

Subagents run in **isolated contexts** — they don't share state with each other or the primary agent beyond the task result.

---

## 6. Permission System

OpenCode's permission system controls what operations the agent can perform without user approval. Detailed in [[permission-models|Permission Models]].

### Permission Modes

| Mode | Description |
|------|-------------|
| `default` | Inherits from the default mode setting |
| `allow` | Always allow, never prompt |
| `ask` | Prompt user every time |
| `deny` | Always deny, never allow |
| `workspace` | Allow only within workspace boundaries |

### Cascading Permission Rules
Permissions cascade from broad to specific:

```json
{
  "permission": {
    "defaultMode": "default",
    "rules": [
      {
        "pattern": "bash",
        "mode": "ask"
      },
      {
        "pattern": "bash:git push",
        "mode": "ask"
      },
      {
        "pattern": "bash:npm test",
        "mode": "allow"
      },
      {
        "pattern": "read:**/*.env",
        "mode": "deny"
      },
      {
        "pattern": "write:**/*.config.*",
        "mode": "ask"
      }
    ]
  }
}
```

### Granular Pattern Matching
- Tool-level: `bash`, `write`, `read`
- Sub-command: `bash:git push`, `bash:npm install`
- File patterns: `read:**/*.env`, `write:**/*.test.*`
- Directory patterns: `bash:**/node_modules/**`
- Regex support for complex matching

### Default Mode Behaviors
- `default` (alias for `ask`) — prompt for most destructive operations
- When set at tool level without sub-patterns, applies to all uses of that tool
- More specific rules override broader rules

### Runtime Permission Prompts
When a tool call triggers an `ask` rule, the TUI displays:
- The tool being invoked
- The exact arguments/command
- Affected files
- Allow once / Allow always / Deny options

---

## 7. Plugin System

OpenCode supports plugins that hook into the agent lifecycle. Detailed in [[agent-extensibility|Agent Extensibility]].

### Plugin Locations
| Scope | Path |
|-------|------|
| Global plugins | `~/.config/opencode/plugins/` |
| Project plugins | `.opencode/plugins/` |

### Plugin Configuration
```json
{
  "plugins": [
    "opencode-plugin-example",
    "./.opencode/plugins/my-custom-plugin"
  ]
}
```

### Hook System

Plugins can register hooks for lifecycle events:

| Hook Event | Trigger | Use Case |
|------------|---------|----------|
| `preToolUse` | Before a tool executes | Validate arguments, block dangerous operations |
| `postToolUse` | After a tool executes | Log results, modify output, trigger side effects |
| `onSessionStart` | Session initialization | Set up environment, load context |
| `onSessionEnd` | Session termination | Cleanup, save state, analytics |
| `onMessage` | User message received | Pre-process input, inject context |
| `onResponse` | LLM response received | Post-process output, format responses |
| `onCompaction` | Before/after context compaction | Preserve critical information |
| `onError` | Error occurs | Custom error handling, recovery |

### Compaction Hooks
Compaction hooks are particularly important for [[cross-session-memory|Cross-Session Memory]]:
- `preCompact` — Identify what must survive compaction
- `postCompact` — Verify critical context was preserved
- Hooks can write to external storage before context is truncated

### Custom Tools
Plugins can register custom tools that appear alongside built-in tools:

```javascript
// plugin.js
export default {
  name: "my-plugin",
  tools: {
    myTool: {
      description: "Does something custom",
      parameters: { /* JSON Schema */ },
      execute: async (params) => { /* implementation */ }
    }
  },
  hooks: {
    onSessionStart: async () => { /* setup */ }
  }
}
```

Custom tools are stored in `.opencode/tools/` or `~/.config/opencode/tools/`.

---

## 8. Snapshot System

The snapshot system provides **undo/redo** for file changes using an internal git repository.

### Configuration
```json
{
  "snapshot": true
}
```

### How It Works
1. Every file modification (write, edit, apply_patch) is tracked
2. Changes are committed to an internal git repository
3. Each commit represents a discrete state
4. `/undo` reverts to the previous commit
5. `/redo` reapplies a reverted commit

### Snapshot Commands
| Command | Action |
|---------|--------|
| `/undo` | Revert to previous snapshot |
| `/redo` | Reapply a reverted change |
| `/status` | Show current snapshot state |

### Limitations
- Only tracks files modified by OpenCode
- Does not track external file changes
- Git repository is internal — separate from project git
- Snapshots are session-scoped by default

---

## 9. Compaction System

Compaction manages the LLM context window when it approaches token limits. Critical for [[cross-session-memory|Cross-Session Memory]].

### How Compaction Works
1. When context usage exceeds `compactThreshold` (default 0.85 = 85%), compaction triggers
2. The agent is prompted to **summarize** the conversation so far
3. The summary replaces the full conversation history in context
4. Tool results and critical context are preserved in the summary
5. The agent continues from the summarized context

### Configuration
```json
{
  "autoCompact": true,
  "compactThreshold": 0.85
}
```

### Manual Compaction
- `/compact` command triggers immediate compaction
- Useful before long-running tasks to ensure fresh context

### Compaction Strategy
- **Progressive summarization**: Each compaction builds on previous summaries
- **Critical state preservation**: Files modified, current task state, and key decisions are preserved
- **Lossy compression**: Some conversation nuance is necessarily lost — this is the fundamental tradeoff
- **Hook integration**: Plugins can influence what survives compaction via `onCompaction` hooks

### Relationship to Session Memory
Compaction is the **context-level** memory mechanism, while `/log.md` and AGENTS.md provide **cross-session** memory. Together they implement [[cross-session-memory|Cross-Session Memory]].

---

## 10. Session Management

### Session Lifecycle
1. **Start**: `opencode` command initializes server and TUI
2. **Boot**: AGENTS.md is read, `/log.md` last 20 lines scanned, `/index.md` consulted
3. **Active**: User and agent interact in the ReAct loop
4. **Compaction**: Automatic or manual when context nears limit
5. **End**: Session closes, `/log.md` appended, indexes updated

### Session Persistence
- Sessions are **not persistent across terminal closes** by default
- The server can continue running via `opencode serve` for persistent access
- `/log.md` provides the cross-session audit trail
- AGENTS.md provides stable rules and conventions across sessions

### Multi-Client Sessions
- Multiple TUI instances can connect to the same server
- Different client types (TUI + web) can share a session
- Coordination is via the single server instance

### Session Export
- `/export` command exports the session to markdown
- Useful for documentation, sharing, or filing as knowledge

---

## 11. MCP Integration

OpenCode supports [[mcp-protocol|Model Context Protocol (MCP)]] for connecting to external tools and data sources.

### Configuration
```json
{
  "mcpServers": {
    "my-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path"]
    }
  }
}
```

### MCP Auth
- Credentials stored in `~/.local/share/opencode/mcp-auth.json`
- OAuth flow for MCP servers that require authentication

---

## 12. Platform Support

| Platform | Support |
|----------|---------|
| macOS | Full (TUI, desktop app) |
| Linux | Full (TUI) |
| Windows | Full (TUI via PowerShell/WSL) |
| Web | Browser-based interface |
| IDE | Via ACP protocol |

---

## 13. Comparison with Other Tools

| Feature | OpenCode | Claude Code | Codex CLI | Aider | Cursor |
|---------|----------|-------------|-----------|-------|--------|
| Interface | TUI/CLI/Web/Desktop | Terminal/IDE | Terminal/Desktop | Terminal | IDE (VS Code) |
| Architecture | Client-Server | Monolithic | Monolithic | Monolithic | IDE Fork |
| Providers | 75+ via AI SDK | Anthropic only | OpenAI only | 40+ via LiteLLM | Multiple |
| Skills | SKILL.md files | SKILL.md files | Skills system | — | .cursorrules |
| Permissions | Granular cascading | 4 modes + rules | Sandboxing | Auto-commits | IDE permissions |
| Snapshot/Undo | Git-based snapshots | Checkpoints | Sandbox rollback | Git auto-commits | IDE undo |
| Subagents | Typed (explore/general/custom) | Explore/Plan/General | — | Architect/Editor | Agent mode |
| Plugin System | Hooks + custom tools | Hooks (11 events) | Plugins + MCP | — | VS Code extensions |
| Open Source | MIT | Proprietary | Apache 2.0 | Apache 2.0 | Proprietary |

See also: [[claude-code|Claude Code]], [[codex-cli|Codex CLI]], [[aider|Aider]], [[cursor|Cursor]], [[copilot|GitHub Copilot]].

---

## 14. Best Practices

1. **Start with AGENTS.md** — Projects should have a well-structured AGENTS.md for the agent to bootstrap from
2. **Use project-level config** — `opencode.json` in the project root for team consistency
3. **Leverage skills** — Create `.opencode/skills/` for project-specific workflows
4. **Set granular permissions** — Use specific patterns rather than broad allow/deny
5. **Enable snapshots** — Essential for undo/redo safety
6. **Configure compaction threshold** — Lower for smaller models, higher for larger contexts
7. **Use subagents for parallelism** — Independent tasks should be spawned as subagents via [[subagent-concurrency|Subagent Concurrency]]
8. **Log sessions** — Append meaningful entries to `/log.md` for [[cross-session-memory|Cross-Session Memory]]

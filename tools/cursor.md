---
type: Tool
title: "Cursor"
description: "Comprehensive deep-dive analysis of Cursor by Anysphere — VS Code fork architecture, agent mode, Composer, .cursorrules & .cursor/rules/ system, codebase indexing via embeddings, @-mentions for context, inline editing, terminal execution, and the IDE-native approach versus terminal-first tools."
tags:
  - cursor
  - tool-analysis
  - anysphere
  - agent-platform
  - ide
  - vscode-fork
timestamp: 2026-06-22T16:20:00Z
id: "20260622T162000"
status: evergreen
difficulty: advanced
domain: ai-tools
prerequisites:
  - /concepts/opencode-architecture.md
related:
  - "[[opencode-architecture|OpenCode Architecture]]"
  - "[[agent-skills-system|Agent Skills System]]"
  - "[[permission-models|Permission Models]]"
  - "[[context-management|Context Management]]"
  - "[[opencode|OpenCode]]"
  - "[[copilot|GitHub Copilot]]"
  - "[[claude-code|Claude Code]]"
sources:
  - title: "Cursor Documentation"
    url: "https://docs.cursor.com"
  - title: "Cursor Website"
    url: "https://cursor.com"
confidence: 0.89
summary: >
  Cursor by Anysphere is an IDE-native AI coding agent built as a VS Code fork, integrating the agent directly into the editor surface with Composer for multi-file generation, embedding-based codebase indexing for context retrieval, @-mentions for precise file/symbol/documentation references, inline editing with visual diffs, and a terminal-based agent execution mode — representing the IDE-first philosophy in contrast to terminal-first tools like OpenCode and Claude Code.
---

# Cursor — Comprehensive Tool Analysis

## 1. Architecture: VS Code Fork

Cursor is a **fork of VS Code** — not an extension, not a plugin, but a complete editor rebuilt with AI capabilities at the architectural level.

### Why Fork Instead of Extend?
| Aspect | VS Code Extension | VS Code Fork |
|--------|------------------|-------------|
| **UI integration** | Limited to extension API surfaces | Full control over all UI elements |
| **Performance** | Runs in extension host process | Native integration, no overhead |
| **Tab/Settings** | Cannot create new editor tabs | Can create Composer tab, AI pane, etc. |
| **Inline editing** | Limited (decorations only) | True inline diff rendering |
| **Activity bar** | One icon slot | Multiple custom views |
| **Keybindings** | Extension-defined only | Full keybinding overhaul |
| **Terminal integration** | Read-only access | Bidirectional terminal-agent communication |

### What Cursor Keeps from VS Code
- **Extension ecosystem** — All VS Code extensions work in Cursor
- **Settings sync** — GitHub/Microsoft account sync
- **File tree, search, source control** — Standard VS Code panels
- **Keybinding framework** — Plus Cursor-specific bindings
- **Themes and customization** — Full theme support

### What Cursor Adds
- **AI pane** — Dedicated sidebar for agent interaction
- **Composer** — Multi-file code generation interface
- **Inline editing** — In-editor diff previews and accept/reject
- **Tab keybind** — Accept AI suggestion with Tab
- **Agent mode** — Autonomous multi-step coding in terminal or UI
- **Codebase indexing** — Background embedding generation for context

---

## 2. Agent Mode

Cursor's **Agent Mode** is the autonomous coding capability — the agent can read, write, edit, search, and execute commands.

### Agent Capabilities in Agent Mode
| Capability | Description |
|------------|-------------|
| Read files | Full project file access |
| Write files | Create new files |
| Edit files | Precise string replacement with inline diffs |
| Search codebase | Grep-like search across project |
| Semantic search | Embedding-based code search |
| Run terminals | Execute shell commands, capture output |
| Browse web | Fetch documentation and references |
| Multi-file edits | Coordinate changes across files |
| Iterate | Receive feedback from command output and fix errors |

### Agent vs Normal Mode
| Mode | Behavior | Best For |
|------|----------|----------|
| **Normal** | Single-turn code suggestions, completions | Quick edits, inline completions |
| **Agent** | Multi-turn autonomous task execution | Feature implementation, bug fixing, refactoring |

### The Agent Loop
```
User Task → Agent analyzes → Tool calls (read/search/edit/bash) → Results → Agent adjusts → More tool calls → Final result → User reviews diffs
```

---

## 3. Composer

The **Composer** is Cursor's dedicated multi-file generation interface — a specialized UI panel for agent-centric coding.

### Composer Features
- **Multi-file generation**: Generate or modify multiple files in one session
- **Diff preview**: Before/after view of all changes across all files
- **Accept/reject per file**: Granular control — accept some changes, reject others
- **Iterative refinement**: Continue the conversation to refine generated code
- **Context panel**: Shows which files/folders/docs are in context
- **@-mention integration**: Add context with `@filename`, `@folder`, `@docs`, `@web`

### Composer vs Chat
| Aspect | Composer | Chat |
|--------|----------|------|
| Primary purpose | Generate/apply code changes | Ask questions, get explanations |
| Output | Edits applied to files | Text responses |
| UI | Split panel with diffs | Sidebar chat |
| Multi-file | First-class | Manual |

---

## 4. Codebase Indexing (Embeddings)

Cursor builds a **vector embedding index** of the codebase for semantic search.

### How Indexing Works
1. **Background process**: On project open, Cursor begins indexing
2. **Chunking**: Files are split into semantic chunks (functions, classes, sections)
3. **Embedding**: Each chunk is embedded using a local or cloud embedding model
4. **Storage**: Vectors stored in a local database (`~/.cursor/index/`)
5. **Query**: When the agent needs context, it performs similarity search against the index
6. **Re-ranking**: Results are re-ranked by relevance to the current prompt

### What Gets Indexed
- All source files (respects `.gitignore` and `.cursorignore`)
- Symbol-level granularity (functions, classes, types)
- Comments and docstrings
- File paths and directory structure

### Indexing Configuration
```json
{
  "cursor.indexing": {
    "enabled": true,
    "ignore": ["**/node_modules/**", "**/dist/**", "**/.git/**"],
    "language": ["typescript", "python", "rust", "go"],
    "maxFileSize": 1048576
  }
}
```

### Embedding Search vs RepoMap
| Approach | Cursor (Embeddings) | Aider (RepoMap) |
|----------|-------------------|-----------------|
| Technology | Vector similarity | Graph traversal |
| Indexing | Background, persistent | On-demand, per-session |
| Query | "Find code related to X" | "Show dependency graph for X" |
| Precision | Semantic (what does this mean?) | Structural (what calls what?) |
| Multi-language | Works across languages | Works within languages |
| Freshness | Index can be stale | Always current (parsed on demand) |

---

## 5. @-Mentions System

`@-mentions` are Cursor's primary context-selection mechanism — the user tells the agent what to consider.

### @-Mention Types
| Mention | Example | What It Adds |
|---------|---------|-------------|
| `@file` | `@src/auth/login.ts` | Specific file content |
| `@folder` | `@src/components/` | All files in a folder |
| `@symbol` | `@authenticateUser` | Specific function/class/type |
| `@docs` | `@React docs` | Official documentation |
| `@web` | `@web How to use Next.js App Router` | Web search results |
| `@git` | `@git diff main..feature` | Git diff, log, or commit |
| `@codebase` | `@codebase authentication` | Semantic search across codebase |
| `@terminal` | `@terminal` | Last terminal command output |
| `@rules` | `@rules` | Active cursor rules |
| `@definitions` | `@definitions` | Type definitions and interfaces |

### @-Mentions vs #-Mentions (Copilot)
| Aspect | Cursor (@) | Copilot (#) |
|--------|-----------|-------------|
| File reference | `@filename` | `#file:filename` |
| Symbol reference | `@functionName` | `#sym:functionName` |
| Semantic search | `@codebase query` | `#codebase query` |
| Web search | `@web query` | Built into agent |
| Documentation | `@docs framework` | Built into agent |
| Syntax | Simpler, prefix-based | More structured, explicit |

---

## 6. Inline Editing & Diff Preview

Cursor renders AI-generated changes as **inline diffs** directly in the editor.

### Inline Edit Flow
1. Agent generates edit suggestion
2. Change appears as a **visual diff** in the editor (green = added, red = removed, blue = modified)
3. User reviews the diff inline, in the natural reading context
4. **Accept** (Ctrl+Y) or **Reject** (Ctrl+N) per change block
5. Multiple changes can be accepted/rejected independently

### Multi-File Diff Review
In Composer, changes across multiple files are shown as a **unified diff view**:
- Left panel: list of changed files
- Right panel: side-by-side or unified diff for selected file
- Accept/reject at file level or change-block level

### Inline Editing vs Separate Diff View
| Tool | Edit Presentation | User Experience |
|------|------------------|-----------------|
| **Cursor** | Inline, in-editor diffs | Seamless — review where you edit |
| **Claude Code IDE** | Inline diffs in extension | Similar to Cursor |
| **Aider** | Terminal diff output | Requires terminal scrolling |
| **OpenCode TUI** | Inline diff in terminal | Limited by terminal rendering |

---

## 7. .cursorrules & .cursor/rules/

Cursor's project-specific configuration provides rules and context for the agent.

### .cursorrules (Legacy Format)
```
# .cursorrules (root directory)
You are a senior Rust developer.
Always use `thiserror` for error handling.
Prefer `async/await` over threads.
Write tests using `rstest`.
Never use `unsafe` without explicit approval.
```

### .cursor/rules/ (New Modular Format)
```
.cursor/
└── rules/
    ├── global.md          # Always applied
    ├── rust-conventions.md
    ├── python-conventions.md
    ├── react-patterns.md
    ├── testing.md         # Applied when test files are involved
    └── security.md        # Applied for auth-related changes
```

### Rule Format
```markdown
---
description: Rust coding conventions
globs: "**/*.rs"
alwaysApply: true
---

# Rust Conventions

- Use `thiserror` for error types
- Derive `Debug`, `Clone` for data types
- Use `Result<T, Error>` not panics
```

### Rule Application Logic
- **`alwaysApply: true`** → Rule always included in context
- **`globs: "**/*.rs"`** → Rule included when working with matching files
- **No filter** → Rule included when agent deems it relevant (semantic matching)

### Comparison: Rules vs Skills
| Aspect | Cursor Rules | Agent Skills (OpenCode/Claude) |
|--------|-------------|-------------------------------|
| Format | Markdown with YAML header | SKILL.md / Markdown |
| Purpose | Standing instructions, always in context | Specialized workflows, loaded on demand |
| Activation | Automatic (file match or always) | Agent-initiated (skill tool) |
| Scope | Project conventions | Domain-specific tasks |
| Granularity | Per-language, per-folder | Per-task, per-workflow |

---

## 8. Terminal Execution

Cursor's terminal integration allows the agent to run commands, capture output, and react to results.

### Terminal Agent Capabilities
- Execute shell commands in integrated terminal
- Capture stdout, stderr, and exit codes
- React to errors (e.g., fix compilation errors, re-run tests)
- Access to project's shell environment (virtualenvs, nvm, PATH)

### Security
- Terminal commands require **user approval** by default
- Can be configured to auto-approve in trusted projects
- Terminal output is shown to the user before results feed back to agent

---

## 9. Privacy & Codebase Processing

### Privacy Mode
- **Privacy Mode**: Code is never stored on Cursor servers
- API calls route directly to model providers (Anthropic, OpenAI) without passing through Cursor
- Indexes are stored locally only

### .cursorignore
```
# .cursorignore
**/secrets/**
**/*.pem
**/.env
**/credentials/**
```
- Excludes sensitive files from indexing and context
- Works like `.gitignore` for Cursor-specific operations

---

## 10. Pricing & Model Access

Cursor operates on a **subscription model**:
| Tier | Price | Features |
|------|-------|----------|
| **Hobby** | Free | Limited agent requests, basic completions |
| **Pro** | $20/mo | 500 fast premium requests/month, unlimited slow |
| **Business** | $40/user/mo | Team features, admin controls, higher limits |

### Supported Models
- Anthropic: Claude Sonnet 4.5, Claude Haiku 4.5, Claude Opus
- OpenAI: GPT-4o, GPT-4o-mini, o1, o3, o4-mini
- Google: Gemini 2.5 Pro
- Custom API keys: Bring your own keys for direct provider access

---

## 11. IDE-Native vs Terminal-First

Cursor represents the **IDE-native philosophy** of AI coding, contrasted with the **terminal-first philosophy** of tools like OpenCode, Claude Code, and Aider.

### IDE-Native Advantages
| Advantage | Description |
|-----------|-------------|
| **Visual diffs** | Rich inline diff rendering, color-coded, side-by-side |
| **Seamless editing** | AI suggestions integrate with normal editing workflow |
| **File tree integration** | Click files, drag folders, visual project navigation |
| **Extension ecosystem** | VS Code extensions, linters, debuggers, themes |
| **Debugging** | Agent can interact with debugger, breakpoints, watch expressions |
| **IntelliSense** | Code completion, go-to-definition, hover info alongside AI |
| **Multi-pane** | Side-by-side file views, terminal, and Composer |

### Terminal-First Advantages
| Advantage | Description |
|-----------|-------------|
| **Lightweight** | No Electron overhead, faster startup |
| **Universal** | Works on any system with a terminal (SSH, containers, headless) |
| **Scriptable** | Pipe to/from scripts, CI/CD integration |
| **Keyboard-only** | No mouse needed, efficient for power users |
| **Server-friendly** | Runs on remote servers, no display required |

### When to Choose Which
| Scenario | Recommendation |
|----------|---------------|
| GUI-heavy development (web, mobile) | Cursor |
| Backend/systems programming | Terminal-first (OpenCode, Claude Code, Aider) |
| Remote/SSH development | Terminal-first |
| Team standardization | IDE-native (consistent UI) |
| Power user / automation | Terminal-first |
| Learning/exploring codebases | IDE-native (visualization) |

---

## 12. Comparison Matrix

| Feature | Cursor | OpenCode | Claude Code | Copilot |
|---------|--------|----------|-------------|---------|
| **Type** | VS Code fork | TUI/CLI/Server | Terminal/IDE/Desktop | VS Code extension |
| **Interface** | GUI IDE | Terminal | Terminal/IDE | IDE (VS Code) |
| **Agent mode** | Yes (Agent mode) | Yes (Build/Plan) | Yes | Yes (multiple types) |
| **Multi-file** | Composer | Subagents | Subagents/Teams | Agent + chat |
| **Context** | Embeddings + @-mentions | File tree + grep | File tree + grep | Embeddings + #-mentions |
| **Inline editing** | Rich diffs | Terminal diff | IDE: rich; Terminal: text | Rich diffs |
| **Rules** | .cursorrules / .cursor/rules/ | AGENTS.md | CLAUDE.md | .github/copilot-instructions.md |
| **Skills** | No | SKILL.md | SKILL.md + fork | No |
| **Permissions** | IDE-level | Granular cascading | 4 modes + rules | IDE-level |
| **Subagents** | No | Yes (typed) | Yes (typed + teams) | Yes |
| **Model choice** | Multiple | 75+ providers | Anthropic only | Multiple |
| **Price** | $20/mo Pro | Free (OSS) / $10 Go | Free (usage limits) / Teams $ | Included in GitHub |
| **Open source** | No | MIT | No | No |

---

## 13. Unique Strengths

1. **Best-in-class inline diffs** — Rich, color-coded, per-block accept/reject
2. **Composer** — Purpose-built UI for multi-file AI-driven code generation
3. **VS Code ecosystem** — All extensions, themes, and tools at your disposal
4. **Debugging integration** — AI agent can interact with debugger, breakpoints, call stacks
5. **Progressive disclosure** — From inline completions to full agent mode, scaling with user confidence
6. **Modular rules** — `.cursor/rules/` with glob-based activation is cleaner than monolithic rule files

---

## 14. Limitations

1. **IDE-locked** — No terminal-only, SSH, or server mode
2. **Electron overhead** — Heavier than terminal-native tools
3. **No skill system** — Cannot define reusable, loadable agent workflows
4. **No subagent parallelism** — Single agent thread, sequential execution
5. **Proprietary** — Closed source, tied to Cursor subscription
6. **Context management** — Embedding search can miss structural relationships that graph-based approaches catch
7. **No hooks/plugins** (for AI specifically) — Must build VS Code extensions instead

See also: [[opencode|OpenCode]], [[claude-code|Claude Code]], [[copilot|GitHub Copilot]], [[aider|Aider]], [[codex-cli|Codex CLI]].

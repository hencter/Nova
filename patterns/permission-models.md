---
type: Pattern
title: "Permission & Security Models"
description: "Comparative analysis of permission and security architectures in AI coding agents — granular pattern rules, cascading merge, human-in-the-loop, hook-based overrides, and enterprise enforcement patterns."
tags: [permissions, security, access-control, hooks, sandbox, agents]
timestamp: 2026-06-22T00:00:00Z
id: "20260622T160200"
status: evergreen
difficulty: advanced
domain: agent-architecture
prerequisites:
  - /concepts/opencode-architecture.md
  - /concepts/agent-skills-system.md
related:
  - "[[Agent Extensibility]]"
  - "[[Multi-Agent Patterns]]"
  - "[[Context Management]]"
sources:
  - title: "Claude Code — Permission Settings"
    url: "https://docs.anthropic.com/en/docs/claude-code"
  - title: "OpenCode — Permission Configuration"
    url: "https://opencode.ai"
  - title: "Codex CLI — Security Model"
    url: "https://github.com/openai/codex"
confidence: 0.85
summary: >
  AI coding agents implement layered permission models ranging from Claude Code's granular pattern rules and hook overrides to Aider's minimal auto-commit approach, with common patterns of wildcard matching, cascading rules, ask→remember flows, and enterprise enforcement converging across tools.
---

# Permission & Security Models

## Permission Evaluation Sequence

```mermaid
sequenceDiagram
    participant A as Agent
    participant PE as Permission Engine
    participant CFG as Config (global → project)
    participant HK as Hooks
    participant U as User

    A->>PE: Request to execute tool/path
    
    PE->>CFG: Load global config
    PE->>CFG: Load project config
    CFG-->>PE: Merged rule set
    
    PE->>PE: Match tool/pattern against rules
    Note over PE: Last-matching-rule-wins<br/>(or most-specific-first)
    
    alt Rule = allow
        PE-->>A: Allow
    else Rule = deny
        PE-->>A: Deny
    else Rule = ask
        PE->>U: Prompt: "Allow this action?"
        U-->>PE: Yes / Yes Always / No
        PE-->>A: Allow (with possible persistence) / Deny
    end
    
    alt Hook configured
        PE->>HK: Fire pre/post permission hook
        HK-->>PE: Override / augment decision
    end
```

## 1. Claude Code — Granular Pattern Rules

Claude Code uses a YAML-based permission system with pattern matching.

### Permission Modes

| Mode | Behavior |
|------|----------|
| `default` | Standard interactive prompting |
| `acceptEdits` | Auto-accept file edits |
| `bypassPermissions` | Full trust, no prompts (⚠️ use with caution) |
| `plan` | Read-only, no writes allowed |

### Rule Structure

```yaml
# ~/.claude/settings.json or .claude/settings.local.json
{
  "permissions": {
    "allow": [
      "Bash(git:*)",           # Allow all git commands
      "Bash(npm:run test:*)",  # Allow specific npm scripts
      "Read(./src/**)",        # Allow reading src directory
      "Edit(./*.md)"           # Allow editing markdown files
    ],
    "deny": [
      "Bash(rm:*)",            # Deny all rm commands
      "Bash(curl:*)",          # Deny network requests
      "Edit(./.env*)"          # Deny editing env files
    ],
    "ask": [
      "Bash(docker:*)"         # Ask before docker commands
    ]
  }
}
```

### Hook-Based Overrides

Hooks can override permission decisions:
- **PreToolUse hooks**: Intercept before execution, can deny or modify
- **PostToolUse hooks**: Audit after execution, cannot undo but can flag

### Managed Settings (Enterprise)

Organizations can enforce permissions via managed settings that users cannot override:
```yaml
# Managed at org level, immutable by user
managed_permissions:
  deny:
    - "Bash(curl:*)"
    - "Bash(wget:*)"
    - "Edit(**/.env)"
```

### CLI Flags

```bash
claude --permission-mode acceptEdits    # Auto-accept edits
claude --permission-mode plan            # Read-only planning mode
claude --dangerously-bypass-permissions  # Full trust (⚠️)
```

## 2. Opencode — allow/ask/deny with Cascading Merge

Opencode uses a three-tier permission model with cascading configuration.

### Permission Levels

```jsonc
// opencode.json
{
  "permissions": {
    "allow": [
      "Bash(git:*)",              // Glob patterns
      "Read",                     // Allow all reads
      "WebFetch(https://docs.*)" // Allow specific domains
    ],
    "ask": [
      "Bash(npm:publish *)",     // Confirm before publish
      "Edit"                      // Ask before any edit
    ],
    "deny": [
      "Bash(rm:-rf:*)"           // Block destructive operations
    ]
  }
}
```

### Cascading Merge

```
Global config  (~/.config/opencode/opencode.json)
       ↓  merged with (later overrides earlier)
Project config (./opencode.json)
       ↓  merged with (later overrides earlier)
Agent-level    (.opencode/agents/<name>.md)
```

**Rule**: Last-matching-rule-wins. More specific agent-level rules override project-level.

### Agent-Level Overrides

Each agent can have its own permission boundary:
```markdown
<!-- .opencode/agents/deployer.md -->
---
permissions:
  allow: ["Bash(docker:*)", "Bash(kubectl:*)"]
  deny: ["Read", "Edit", "WebFetch"]
---
```

### The `ask` → `remember` Flow

When a user responds "yes, always" to an `ask` prompt, Opencode persists the rule:
1. Tool generates a permission pattern
2. Rule is appended to `opencode.json` under `allow`
3. Future matching calls are auto-allowed

## 3. Codex CLI — Configurable Permissions with Sandbox

### Permission Architecture

| Component | Description |
|-----------|-------------|
| `allow` list | Explicitly permitted operations |
| `ask` list | Operations requiring user confirmation |
| `deny` list | Blocked operations |
| Sandbox | Optional execution sandbox for untrusted code |
| Agent approvals | Per-agent permission profiles |

### Sandbox Modes

```bash
codex --sandbox            # Run in isolated sandbox
codex --no-sandbox         # Run with host access
```

## 4. Cline — Human-in-the-Loop

Cline implements the simplest and most conservative model: **every action requires human approval**.

```mermaid
flowchart LR
    AGENT[Agent proposes action] --> PROMPT[Show diff / command to user]
    PROMPT --> DECISION{User decides}
    DECISION -->|Approve| EXEC[Execute]
    DECISION -->|Reject| ABORT[Skip / Revise]
    DECISION -->|Modify| REVISE[Agent revises]
    REVISE --> PROMPT
```

**Characteristics**:
- Maximum safety, maximum friction
- No pattern-based auto-approval (by design)
- Suitable for security-critical environments
- Lowest throughput of any model

## 5. Aider — Minimal Model

Aider takes the opposite approach — minimal permission friction.

| Feature | Aider |
|---------|-------|
| Auto-commits | Yes (before each change) |
| Pattern rules | No |
| User prompts | Only for major decisions |
| Sandbox | No |
| Fine-grained permissions | No |
| Safety net | git history + `--no-auto-commits` flag |

**Philosophy**: Git is the safety net. Every change is auto-committed, so recovery is always possible. Trust the developer to run aider in appropriate contexts.

## 6. Common Permission Patterns

### Wildcard Matching

All tools use glob-style pattern matching:

| Pattern | Matches |
|---------|---------|
| `Bash(git:*)` | Any git subcommand |
| `Read(./src/**)` | All files under src/ recursively |
| `Edit(**/*.ts)` | All TypeScript files anywhere |
| `WebFetch(https://*.github.com/*)` | GitHub URLs only |
| `Bash(npm:run test:*)` | Any npm test script |

### Pattern Override Priority

```
Explicit deny > Explicit allow > Ask default
```

More specific patterns override less specific ones:
- `deny: Bash(rm:-rf:*)` overrides `allow: Bash(rm:*)`
- Agent-level rules override project-level
- Managed/enterprise rules override user rules

### Enterprise Enforcement

| Tool | Enterprise Controls |
|------|--------------------|
| Claude Code | Managed settings (immutable), org-level deny lists |
| Opencode | Cascading config merge, agent-level boundaries |
| Codex CLI | Sandbox enforcement, org-level permissions |
| Cline | Inherently safe (all actions require human approval) |
| Aider | No enterprise controls (rely on git history) |

## Decision Matrix

| When to use... | Criteria |
|----------------|----------|
| Claude Code | Need granular control + hook extensibility + enterprise enforcement |
| Opencode | Need cascading rules + agent-level permission boundaries |
| Codex CLI | Need sandbox execution + per-agent profiles |
| Cline | Security-critical environment, every action must be reviewed |
| Aider | Trusted environment, fast iteration, git as safety net |

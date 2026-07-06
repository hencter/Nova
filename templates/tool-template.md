---
type: Template
title: "Tool Analysis Template"
description: "Reusable template for creating deep-dive analyses of AI coding tools with standardized comparison dimensions and feature matrix."
tags:
  - template
  - tool
  - analysis
timestamp: 2026-06-22T00:00:00Z
id: "20260622T170100"
status: evergreen
difficulty: beginner
domain: knowledge-management
related:
  - "[[Conventions]]"
  - "[[concept-template|Concept Note Template]]"
  - "[[pattern-template|Pattern Template]]"
summary: >
  A standardized template for analyzing AI coding tools across dimensions including architecture, agent loop, context management, multi-agent support, permissions, extensibility, and competitive positioning.
---

# Tool Analysis Template

Copy this template when creating a new tool analysis note. Replace all `{{PLACEHOLDER}}` values.

---

## Frontmatter Template

```yaml
---
type: Tool
title: "{{Tool Name}}"
description: "{{One-line summary of the tool's key differentiator and category}}"
tags:
  - {{tag1}}
  - {{tag2}}
  - {{tool-name}}
timestamp: {{YYYY-MM-DD}}T00:00:00Z
id: "{{YYYYMMDDThhmmss}}"
status: {{seedling | budding | evergreen}}
difficulty: {{beginner | intermediate | advanced}}
domain: ai-tools
prerequisites:
  - /concepts/opencode-architecture.md
related:
  - "[[OpenCode]]"
  - "[[Claude Code]]"
  - "[[Codex CLI]]"
  - "[[Aider]]"
  - "[[Cursor]]"
  - "[[copilot|GitHub Copilot]]"
sources:
  - title: "{{Official Documentation}}"
    url: "{{https://...}}"
  - title: "{{GitHub Repository}}"
    url: "{{https://github.com/...}}"
confidence: {{0.0-1.0}}
summary: >
  {{One-sentence summary of what this tool is and its primary value proposition.}}
---
```

---

## Section Structure

### 1. Overview

```markdown
# {{Tool Name}}

## Overview

{{2-4 sentences: what the tool is, who makes it, its primary use case, and its key differentiator.}}

| Attribute | Value |
|-----------|-------|
| **Vendor** | {{Company/Organization}} |
| **Type** | {{Terminal agent / IDE plugin / Hybrid}} |
| **License** | {{Open source / Proprietary / Source-available}} |
| **Primary Model** | {{Default LLM}} |
| **Interface** | {{CLI / IDE / Web / API}} |
| **First Release** | {{YYYY-MM}} |
```

### 2. Architecture

```markdown
## Architecture

{{Describe the high-level architecture: client-server vs monolithic, how the agent loop works, how tools are executed, how LLM providers are abstracted.}}

### Core Loop

\`\`\`mermaid
sequenceDiagram
    participant U as User
    participant A as Agent
    participant L as LLM
    participant T as Tools
    participant FS as Filesystem
    
    U->>A: Task / prompt
    A->>L: Send prompt + context
    L-->>A: Response (text + tool calls)
    A->>T: Execute tools
    T->>FS: Read / write / execute
    T-->>A: Tool results
    A->>L: Send tool results
    L-->>A: Next response
    A-->>U: Final output
\`\`\`
```

### 3. Context Management

```markdown
## Context Management

| Feature | Support | Details |
|---------|---------|---------|
| Instruction files | {{Yes/No}} | {{Filename and mechanism}} |
| Auto-memory | {{Yes/No}} | {{Storage location and format}} |
| Codebase indexing | {{Yes/No}} | {{Indexing technique}} |
| Compaction | {{Yes/No}} | {{Compaction strategy}} |
| Token budget control | {{Yes/No}} | {{Mechanism}} |
| Conversation branching | {{Yes/No}} | {{Branching support}} |
```

### 4. Multi-Agent Support

```markdown
## Multi-Agent Support

| Capability | Support | Details |
|------------|---------|---------|
| Subagent spawning | {{Yes/No}} | {{How subagents are created}} |
| Parallel agents | {{Yes/No}} | {{Parallel execution model}} |
| Agent types/roles | {{Yes/No}} | {{Available agent specializations}} |
| Inter-agent communication | {{Yes/No}} | {{Communication mechanism}} |
| Task decomposition | {{Yes/No}} | {{Decomposition strategy}} |
```

### 5. Permissions & Security

```markdown
## Permissions & Security

| Feature | Support | Details |
|---------|---------|---------|
| Granular permissions | {{Yes/No}} | {{Pattern matching, rules}} |
| Permission modes | {{Yes/No}} | {{Available modes}} |
| Sandboxing | {{Yes/No}} | {{Sandbox mechanism}} |
| Hook overrides | {{Yes/No}} | {{Hook-based permission control}} |
| Enterprise controls | {{Yes/No}} | {{Managed settings, enforcement}} |
```

### 6. Extensibility

```markdown
## Extensibility

| Feature | Support | Details |
|---------|---------|---------|
| Plugins | {{Yes/No}} | {{Plugin system details}} |
| Hooks | {{Yes/No}} | {{Available hook events}} |
| Skills/Commands | {{Yes/No}} | {{Skill or command system}} |
| MCP support | {{Yes/No}} | {{MCP integration level}} |
| Custom tools | {{Yes/No}} | {{How to create custom tools}} |
| Agent customization | {{Yes/No}} | {{How to customize agents}} |
```

### 7. Developer Experience

```markdown
## Developer Experience

### Strengths
- {{Strength 1}}
- {{Strength 2}}
- {{Strength 3}}

### Weaknesses
- {{Weakness 1}}
- {{Weakness 2}}
- {{Weakness 3}}

### Best For
- {{Use case 1}}
- {{Use case 2}}

### Not Ideal For
- {{Anti-use-case 1}}
- {{Anti-use-case 2}}
```

### 8. Competitive Positioning

```markdown
## Competitive Positioning

| Dimension | {{Tool}} | OpenCode | Claude Code | Codex CLI | Aider |
|-----------|----------|----------|-------------|-----------|-------|
| Interface | | TUI/Web | Terminal | Terminal | Terminal |
| Multi-agent | | Task tool | Subagents | Subagents | N/A |
| Extensibility | | Plugins + Skills | Hooks + MCP | MCP | Commands |
| Permission model | | allow/ask/deny | Pattern rules | Configurable | Minimal |
| Context mgmt | | Compaction agent | Auto-compact | Sliding window | Cache+drop |
| Codebase awareness | | On-demand reads | On-demand reads | Tree view | RepoMap |
```

### 9. Quick Reference

```markdown
## Quick Reference

### Common Commands

\`\`\`bash
# {{Common command examples}}
\`\`\`

### Configuration Files

| File | Purpose |
|------|---------|
| `{{filename}}` | {{Purpose}} |
```

---

## Analysis Dimensions Checklist

Before finalizing a tool analysis, verify coverage:

- [ ] **Architecture**: Core loop, client-server model, provider abstraction
- [ ] **Context Management**: Instruction files, auto-memory, indexing, compaction
- [ ] **Multi-Agent**: Subagent spawning, parallel execution, task decomposition
- [ ] **Permissions**: Granularity, modes, hooks, enterprise controls
- [ ] **Extensibility**: Plugins, hooks, skills, MCP, custom tools
- [ ] **Developer Experience**: Strengths, weaknesses, best-for, not-ideal-for
- [ ] **Competitive Positioning**: Comparison table with top 4-5 alternatives
- [ ] **Mermaid Diagrams**: At least 1-2 embedded diagrams
- [ ] **Complete Frontmatter**: All fields populated
- [ ] **Cross-Links**: Linked from `tools.md` and related concept notes

---

## Usage Instructions

1. **Copy** this template to `/tools/{{tool-name}}.md`
2. **Research** the tool thoroughly (docs, source code, community)
3. **Populate** all sections with concrete, accurate information
4. **Set id** to current timestamp in `YYYYMMDDThhmmss` format
5. **Set status** to `budding` while drafting, `evergreen` when complete
6. **Add Mermaid diagrams** for architecture and key workflows
 7. **Update** `tools.md` with the new entry
8. **Cross-link** from related concept and pattern notes
9. **Log**: Append to `log.md`: `## [YYYY-MM-DD] ingest | Tool analysis: {{Tool Name}}`

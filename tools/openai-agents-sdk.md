---
type: Tool
title: "OpenAI Agents SDK"
description: "Comprehensive deep-dive analysis of OpenAI's Python SDK for multi-agent workflows — Agent/Runner orchestration, Sandbox Agents with containerized workspaces, dual coordination patterns (manager as-tool vs handoffs), hosted+local tools ecosystem, guardrails, human-in-the-loop, sessions, tracing, realtime agents."
tags: [openai, agents-sdk, tool-analysis, agent-platform, multi-agent, sandbox, python]
timestamp: 2026-06-22T08:30:00Z
id: "20260622T083000"
status: evergreen
difficulty: advanced
domain: ai-tools
prerequisites:
  - /concepts/mcp-protocol.md
  - /concepts/subagent-concurrency.md
  - /concepts/agent-skills-system.md
related:
  - "[[mcp-protocol|MCP Protocol]]"
  - "[[a2a-protocol|A2A Protocol]]"
  - "[[multi-agent-patterns|Multi-Agent Patterns]]"
  - "[[agent-skills-system|Agent Skills System]]"
  - "[[subagent-concurrency|Subagent Concurrency]]"
  - "[[opencode-architecture|OpenCode Architecture]]"
  - "[[claude-code|Claude Code]]"
sources:
  - title: "OpenAI Agents SDK — GitHub Repository"
    url: "https://github.com/openai/openai-agents-python"
  - title: "OpenAI Agents SDK Documentation"
    url: "https://openai.github.io/openai-agents-python/"
  - title: "A Practical Guide to Building Agents"
    url: "https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf"
confidence: 0.92
summary: >
  OpenAI Agents SDK is a lightweight Python framework for multi-agent workflows — provider-agnostic (100+ LLMs), with Agent/Runner orchestration, containerized Sandbox Agents, dual coordination patterns (manager as-tool vs handoffs), hosted+local tools, guardrails, human-in-the-loop, sessions, tracing, and native MCP integration.
---

# OpenAI Agents SDK — Comprehensive Tool Analysis

## 1. Overview & Philosophy

OpenAI Agents SDK is a **lightweight yet powerful Python framework** for building multi-agent workflows. Unlike terminal-first coding agents ([[claude-code|Claude Code]], [[opencode|OpenCode]], [[aider|Aider]]), it is a **library** — developers embed it into their own applications.

### Key Philosophy

> Provider-agnostic orchestration: the SDK manages agent turns, tools, guardrails, handoffs, and sessions. Use the Responses API directly if you want to own the loop yourself.

### Core Innovations
1. **Sandbox Agents** — Agents with containerized filesystem workspaces for long-running tasks
2. **Dual Coordination** — Manager (agents-as-tools) and Handoff patterns in one framework
3. **Hosted + Local Tools** — Both OpenAI-managed and custom runtime tools
4. **Tracing Built-In** — Full visibility into agent decision-making
5. **Provider-Agnostic** — 100+ LLMs via Any-LLM and LiteLLM adapters

---

## 2. Core Architecture: Agent + Runner

```
Agent (config) → Runner.run() → RunResult
     ↑                            ↓
  Tools,                     final_output,
  Handoffs,                  new_items,
  Guardrails,                usage stats
  Hooks
```

### Agent
The fundamental building block. An LLM configured with:

| Property | Purpose |
|----------|---------|
| `name` | Required human-readable identifier |
| `instructions` | System prompt (static string or dynamic callback) |
| `model` | Which LLM to use (defaults to OpenAI, provider-agnostic) |
| `tools` | Function tools, hosted tools, MCP servers, agents-as-tools |
| `handoffs` | Specialist agents to delegate to |
| `input_guardrails` | Validation on first user input |
| `output_guardrails` | Validation on final output |
| `output_type` | Structured output (Pydantic model, dataclass, TypedDict) |
| `hooks` | Lifecycle callbacks (`on_agent_start`, `on_llm_end`, etc.) |
| `tool_use_behavior` | `run_llm_again` (default) or `stop_on_first_tool` |

### Runner
The execution engine. Manages the agent loop:
1. Send user input + conversation history to LLM
2. LLM responds with text or tool calls
3. Execute tool calls → feed results back to LLM
4. Handle handoffs: transfer control to another agent
5. Check guardrails on input/output
6. Return `RunResult` with final output and trace

---

## 3. Sandbox Agents (v0.14.0+)

Sandbox Agents are agents that run inside an **isolated workspace** with a real filesystem. This is OpenAI's answer to terminal-based coding agents.

### Architecture
```
SandboxAgent
  ├── default_manifest: Manifest
  │     └── entries: {GitRepo, LocalFile, Directory, ...}
  ├── capabilities: Capabilities
  │     ├── Filesystem (read/write/delete)
  │     ├── Shell (command execution)
  │     ├── Memory (persistent state)
  │     ├── Skills (injected expertise)
  │     └── Compaction (context management)
  └── sandbox_client: UnixLocalSandboxClient | DockerSandboxClient
```

### Manifest Entry Types
- **GitRepo**: Clone a repo at specific ref
- **LocalFile**: Inject a local file
- **Directory**: Mount a local directory
- **InlineFile**: Create a file from content string

### Sandbox Clients
- `UnixLocalSandboxClient` — Runs on local filesystem
- `DockerSandboxClient` — Runs in isolated container
- Planned: remote/cloud sandbox providers

### Key Insight
Sandbox Agents bridge the gap between **library-based agents** (Agents SDK) and **terminal-based coding agents** (Claude Code, OpenCode). They provide the same filesystem access pattern but embedded in your application.

---

## 4. Dual Coordination Patterns

The SDK explicitly documents two [[multi-agent-patterns|coordination patterns]]:

### 4.1 Manager (Agents as Tools)
```python
booking_agent = Agent(name="Booking", ...)
refund_agent = Agent(name="Refund", ...)

orchestrator = Agent(
    name="Customer Facing",
    tools=[
        booking_agent.as_tool(tool_name="booking_expert"),
        refund_agent.as_tool(tool_name="refund_expert"),
    ]
)
```

**When to use**: Manager retains control, combines outputs from multiple specialists, enforces shared guardrails.

### 4.2 Handoffs
```python
triage_agent = Agent(
    name="Triage",
    handoffs=[booking_agent, refund_agent]
)
```

**When to use**: Specialist responds directly, prompts stay focused, no manager narration.

### Comparison

| Aspect | Manager (as_tool) | Handoff |
|--------|-------------------|---------|
| Control | Centralized | Decentralized |
| Conversation owner | Manager throughout | Transfers to specialist |
| Result visibility | Manager sees and can transform | Specialist output is final |
| Best for | Bounded subtasks, combined outputs | Routing, independent responses |

### Handoff Customization
The `handoff()` function provides fine-grained control:
- `on_handoff` callback with structured `input_type` (Pydantic model)
- `input_filter` to modify conversation history before handoff
- `nest_handoff_history` for collapsing prior transcript into summary
- `is_enabled` for dynamic routing decisions

---

## 5. Tool Ecosystem

### 5.1 Hosted Tools (OpenAI-Managed)
Run on OpenAI servers alongside the model:

| Tool | Purpose |
|------|---------|
| `WebSearchTool` | Web search with filters and location context |
| `FileSearchTool` | Vector store retrieval with ranking options |
| `CodeInterpreterTool` | Sandboxed Python execution |
| `HostedMCPTool` | Remote MCP server integration |
| `ImageGenerationTool` | DALL-E image generation |
| `ToolSearchTool` | Deferred tool loading (reduces schema tokens) |

### 5.2 Tool Search (Deferred Loading)
Large tool surfaces can be deferred until runtime. Tools are grouped into `tool_namespace()` and loaded via `ToolSearchTool()`:
```python
crm_tools = tool_namespace(
    name="crm",
    description="CRM tools",
    tools=[get_profile, list_orders]  # marked defer_loading=True
)
agent = Agent(tools=[*crm_tools, ToolSearchTool()])
```

### 5.3 Local Runtime Tools
Execute in the developer's environment:
- `ComputerTool` — GUI/browser automation (Playwright-backed)
- `ShellTool` — Shell command execution (local or hosted container)
- `ApplyPatchTool` — File patching with custom editor

### 5.4 Function Tools
Any Python function becomes a tool via `@function_tool`:
```python
@function_tool
async def fetch_weather(location: Location) -> str:
    """Fetch weather for a given location."""
    return "sunny"
```
Features: auto-schema from type hints, docstring parsing (griffe), Pydantic Field constraints, timeouts, error handlers, image/file output.

### 5.5 Agents as Tools
Expose an agent as a callable tool without full handoff. Supports structured input (`parameters`), approval gates (`needs_approval`), custom output extraction, and streaming nested runs.

---

## 6. Guardrails & Safety

Three guardrail types:

| Type | When | Scope |
|------|------|-------|
| **Input Guardrails** | Before first agent turn | Validate user input (relevance, toxicity) |
| **Output Guardrails** | After final agent output | Validate final response |
| **Tool Guardrails** | Around tool calls | Validate tool arguments/results |

Guardrails can use a **tripwire** model: if triggered, raise `GuardrailTripwireTriggered` with custom output.

---

## 7. Human-in-the-Loop

Approval flows for tool execution:
```python
@function_tool(needs_approval=True)
def delete_file(path: str) -> str: ...
```
The run pauses, `result.interruptions` lists pending approvals, and the developer calls `state.approve()` or `state.reject()` to resume.

---

## 8. Sessions & Memory

Sessions provide automatic conversation history management:
- **SQLAlchemy Session**: PostgreSQL/MySQL/SQLite backends
- **Redis Session**: Distributed session storage
- **MongoDB Session**: Document-based sessions
- **Encrypted Session**: Encrypted-at-rest session data
- **Advanced SQLite Session**: Optimized local storage

---

## 9. Tracing

Built-in OpenTelemetry-compatible tracing:
- `Trace`: Full workflow span
- `Span`: Individual agent turn, tool call, handoff
- Processors: Console, custom backends
- Visualization UI for debugging agent decision trees

---

## 10. Realtime & Voice Agents

- **Realtime Agents**: Voice agents using `gpt-realtime-2` with WebSocket transport
- **Voice Pipeline**: STT → LLM → TTS pipeline with configurable providers

---

## 11. MCP Integration

Native MCP support via `mcp_servers` parameter:
```python
agent = Agent(
    mcp_servers=[MCPServerStdio(params=..., cache_tools_list=True)]
)
```
Supports stdio and HTTP transports, with `mcp_config` for strict schema and failure formatting.

---

## 12. Orchestration: LLM vs Code

The SDK advocates a spectrum:

| Approach | Strengths | Weaknesses |
|----------|-----------|------------|
| **LLM-driven** | Flexible, handles open-ended tasks | Non-deterministic, costly |
| **Code-driven** | Deterministic, predictable, fast | Brittle, requires upfront design |

Code-driven patterns include structured-output routing, agent chaining, evaluation loops, and parallel execution via `asyncio.gather`.

---

## 13. Comparison with Other Tools

| Aspect | OpenAI Agents SDK | Claude Code | OpenCode | Aider |
|--------|-------------------|-------------|----------|-------|
| **Type** | Library/SDK | CLI tool | CLI tool | CLI tool |
| **Primary use** | Build custom agent apps | Coding agent | Coding agent | Coding agent |
| **Multi-agent** | Manager + Handoff | Subagent teams | Task tool | Architect/Editor |
| **Sandbox** | Container filesystem | None (terminal) | None (terminal) | None (terminal) |
| **MCP** | Native client | Native client | Plugin-based | Via plugin |
| **Tracing** | Built-in OTEL | Debug mode | Session log | Git diff |
| **Provider** | 100+ LLMs | Anthropic only | Multi-provider | Multi-provider |
| **Install** | `pip install openai-agents` | `npm install @anthropic-ai/claude-code` | `npm install opencode` | `pip install aider-chat` |

---

## 14. Unique Strengths

1. **Sandbox Agents** — Only framework with containerized workspace abstraction for agents
2. **Dual orchestration** — Explicitly documents and supports both manager and handoff patterns
3. **Tool search** — Deferred loading solves large-tool-surface problem elegantly
4. **Hosted tools** — Web search, file search, code interpreter run on OpenAI infra
5. **Provider-agnostic** — Not locked to OpenAI models

## 15. Limitations

- Library, not a standalone tool — requires application code
- Python-only (JS/TS SDK is separate: `openai-agents-js`)
- Sandbox agent support is relatively new (v0.14.0)
- Hosted tools require OpenAI API key and infrastructure
- No built-in UI beyond tracing visualization

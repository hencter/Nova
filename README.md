# Nova 知识库

> **AI 维护 · 人类导航 · 自举进化 · 开箱即用**

Nova 是一个**自举式个人知识库系统**（self-bootstrapping knowledge vault）。它由 AI 代理持续维护：自动摄入知识、交叉链接、健康检查、自动 git 提交——你只需要负责跟它对话。

---

## 安装前提

| 工具 | 用途 | 安装 |
|------|------|------|
| **Git** | 版本控制 | `winget install Git.Git` 或 [git-scm.com](https://git-scm.com) |
| **Obsidian** | 可视化浏览知识库 | [obsidian.md](https://obsidian.md) |
| **OpenCode** | AI 代理运行环境 | `npm i -g opencode-ai@latest` 或 [opencode.ai](https://opencode.ai) |

> OpenCode 安装时会自动处理 Node.js 运行环境。

---

## 启动流程（2 分钟）

```bash
# 1. 进入仓库
cd Nova

# 2. 启动 OpenCode
opencode
```

Nova 首次启动会自动进入**初始化问答**：

```
Nova: 你想叫我什么名字？
你:   星尘

Nova: 我怎么称呼你？
你:   小明

Nova: 你主要用这个知识库做什么？
你:   AI 研究和日常笔记

Nova: 初始化完成。从现在起我是你的 星尘，请多指教。
```

此后你可以用中文向 Nova 提问：
- "帮我学习 MCP 协议"
- "摄入这篇文章：[链接]"
- "介绍一下 Git 的数据模型"
- "帮我新建一篇关于 React Server Components 的笔记"

---

## 知识库结构

| 总目 | 目录 | 内容 |
|------|------|------|
| [`concepts.md`](concepts.md) | `concepts/` | **24 篇**原子概念笔记（AI Agent、Git、ZK、OKF 等） |
| [`tools.md`](tools.md) | `tools/` | **8 篇**工具深度分析（OpenCode、Claude Code、Aider 等） |
| [`patterns.md`](patterns.md) | `patterns/` | **5 篇**设计模式（多代理、上下文管理、权限模型等） |
| [`_identity.md`](_identity.md) | `_identity/` | Nova 的自我认知与个性化指南 |
| [`_meta.md`](_meta.md) | `_meta/` | 关于知识库本身的知识（架构、自举机制） |
| [`conference.md`](conference.md) | `conference/` | Agent 间异步会议记录 |

---

## 技术栈

- **编辑器**: Obsidian（Markdown + Wiki Links + Graph View）
- **AI 框架**: OpenCode（Skills + Subagents + Multi-agent + Auto-commit）
- **版本控制**: Git（自动提交 via `session.idle` hook）
- **格式标准**: [OKF v0.1](https://github.com/GoogleCloudPlatform/knowledge-catalog)（开放知识格式）

---

## 语言分层

| 层级 | 语言 | 说明 |
|------|------|------|
| 导航 / 身份 / 日志 | 中文 | 人类入口层 |
| 深层技术笔记 | 英文 | AI 消费层 |
| 前置元数据 | 英文 | 机器解析 |

---

## 你的 Nova，你做主

- 初次启动时 Nova 会自动引导你完成个性化
- 之后随时编辑 [`_identity/personalize.md`](_identity/personalize.md) 深度定制
- 换名字、改性格、加技能——随时可以
- 把整个文件夹打包发给朋友，他们也能拥有自己的 Nova

---

> *"Obsidian 是 IDE，AI 是程序员，知识库是代码。"* — Karpathy

# Nova 知识库

> **AI 维护 · 人类导航 · OKF 规范 · Obsidian 呈现**

Nova 是一个**自举式个人知识库系统**（self-bootstrapping knowledge vault）。它不仅是知识的容器，更是一个由 AI 代理（Nova）持续维护、增长和自检的**复合知识引擎**。

---

## 这是什么

- 🧠 一个 Obsidian vault，包含 **50+ 个原子化笔记**
- 🤖 由 AI 代理 Nova 维护：自动摄入、交叉链接、健康检查
- 📐 遵循 [OKF v0.1](https://github.com/GoogleCloudPlatform/knowledge-catalog)（Google 开放知识格式）规范
- 🃏 采用 [Zettelkasten 卡片盒方法](https://zettelkasten.de)（原子性、连接性、涌现结构）
- 📝 基于 [Karpathy LLM Wiki 模式](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)

## 目录

| 目录 | 内容 |
|------|------|
| `concepts/` | 16 个原子概念笔记（AI 代理、Git、ZK、OKF、Obsidian） |
| `tools/` | 8 个工具深度分析（Opencode、Claude Code、Aider 等） |
| `patterns/` | 5 个设计模式（多代理协作、上下文管理、权限模型等） |
| `_identity/` | Nova 的自我认知和能力清单 |
| `_meta/` | 关于知识库本身的知识（架构、约定、自举机制） |
| `templates/` | 笔记模板 |
| `.opencode/` | Opencode 技能和子代理配置 |

## 快速导航

- **[index.md](index.md)** — 知识库总目录（渐进式发现入口）
- **[AGENTS.md](AGENTS.md)** — AI 代理规则手册（模式层）
- **[log.md](log.md)** — 操作日志（仅追加、按时间倒序）

### 你可能感兴趣

- [[opencode-architecture|OpenCode Architecture]] — Opencode 架构深度解析
- [[git-operations|Git Operations]] — Git 命令速查手册
- [[zettelkasten-methodology|Zettelkasten Methodology]] — 卡片盒方法论
- [[obsidian-syntax-reference|Obsidian Syntax Reference]] — Obsidian 完整语法参考
- [[cross-session-memory|Cross-Session Memory]] — 跨会话记忆机制

## 语言说明

根据 [AGENTS.md §5](AGENTS.md) 的语言分层规则：

| 层级 | 语言 | 原因 |
|------|------|------|
| 导航/身份/日志 | 🇨🇳 中文为主 | 人类入口层，你读的 |
| 深层技术笔记 | 🇬🇧 英文 | AI 消费层，你提问我用英文查 |
| 前置元数据 | 🇬🇧 英文 | 机器解析，语言无关 |

## 如何参与

1. 用 **Obsidian** 打开 `D:\OpenCode\Note`
2. 安装推荐主题：[Maple](https://github.com/subframe7536/obsidian-theme-maple)
3. 阅读 [index.md](index.md) 了解全貌
4. 用中文向 Nova 提问，它会自动读取对应英文笔记并回答

## 技术栈

- **编辑器**: Obsidian（Markdown + Wiki Links + Graph View）
- **AI 框架**: Opencode（Skills + Subagents + Multi-agent）
- **版本控制**: Git（审计追踪 + 变更历史）
- **格式标准**: OKF v0.1（开放知识格式）
- **主题**: Maple（自定义复选框 + Style Settings）

---

> *"Obsidian 是 IDE，AI 是程序员，知识库是代码。"* — Karpathy

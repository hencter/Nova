# Nova 知识库

> **AI 维护 · 人类导航 · OKF 规范 · 开箱即用**

Nova 是一个**自举式个人知识库系统**（self-bootstrapping knowledge vault）。你手上这份是它的种子分发版——只需几步就能拥有一个由 AI 代理持续维护的知识引擎。

---

## 快速上手（5 分钟）

### 前置条件

| 工具 | 用途 | 获取 |
|------|------|------|
| **Obsidian** | 可视化管理知识库 | [obsidian.md](https://obsidian.md) |
| **OpenCode** | AI 代理运行环境 | [opencode.ai](https://opencode.ai) |
| **Git** | 版本控制（auto-commit 插件依赖） | [git-scm.com](https://git-scm.com) |

> OpenCode 安装时会自动处理 Node.js / Bun 运行环境，无需单独安装。

### 三步启动

**1. 打开知识库**
用 Obsidian 打开本目录 → Obsidian 会自动识别为 Vault。

**2. 个性化你的 Nova**
打开 `_identity/personalize.md` → 按指南给你的 AI 管家起名字、设定身份。

**3. 开始对话**
用中文向 Nova 提问：
- "我是谁？你能做什么？"
- "帮我学习 MCP 协议"
- "介绍一下 Git 的数据模型"
- "摄入这篇文章：[粘贴链接]"

---

## 这是什么

- 🧠 一个 Obsidian vault，包含 **46+ 篇原子概念笔记**
- 🤖 由 AI 代理 Nova 维护：自动摄入、交叉链接、健康检查、**自动 git 提交**
- 📐 遵循 [OKF v0.1](https://github.com/GoogleCloudPlatform/knowledge-catalog)（Google 开放知识格式）规范
- 🃏 采用 [Zettelkasten 卡片盒方法](https://zettelkasten.de)（原子性、连接性、涌现结构）
- 📝 基于 [Karpathy LLM Wiki 模式](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)
- 🔌 内置 `session.idle` hook 自动提交变更（再也不用担心漏 commit）

---

## 目录

| 文件/目录 | 内容 |
|-----------|------|
| `concepts.md` | **24 篇**原子概念笔记总目（AI 代理、Git、ZK、OKF、Obsidian 等） |
| `concepts/` | 原子概念笔记原文 |
| `tools.md` | **8 篇**工具深度分析总目（OpenCode、Claude Code、Aider 等） |
| `tools/` | 工具分析原文 |
| `patterns.md` | **5 篇**设计模式总目（多代理协作、上下文管理、权限模型等） |
| `patterns/` | 模式笔记原文 |
| `_identity.md` | Nova 的自我认知、能力清单总目 |
| `_identity/` | 身份笔记原文 + 个性化指南 |
| `_meta.md` | 关于知识库本身的知识总目（架构、约定、自举机制） |
| `_meta/` | 元笔记原文 |
| `templates/` | 3 个笔记模板（概念、工具、模式） |
| `conference.md` | Agent 会议记录总目 |
| `conference/` | 会议记录原文 |
| `skills/` | 维护技能（nova-kb） |
| `.opencode/` | OpenCode 代理 & 插件配置 |

---

## 导航

- **[index.md](index.md)** — 知识库总目录（你的入口）
- **[AGENTS.md](AGENTS.md)** — AI 代理规则手册（给 Nova 读的）
- **[log.md](log.md)** — 操作日志
- **[concepts.md](concepts.md)** — 全部概念笔记索引
- **[tools.md](tools.md)** — 全部工具分析索引
- **[_identity/personalize.md](_identity/personalize.md)** — 打造你自己的 Nova

### 热门笔记

- [[opencode-architecture|OpenCode Architecture]] — Opencode 架构深度解析
- [[git-operations|Git Operations]] — Git 命令速查手册
- [[zettelkasten-methodology|Zettelkasten Methodology]] — 卡片盒方法论
- [[obsidian-syntax-reference|Obsidian Syntax Reference]] — Obsidian 完整语法参考
- [[cross-session-memory|Cross-Session Memory]] — 跨会话记忆机制

---

## 语言说明

根据 [AGENTS.md §5](AGENTS.md) 的语言分层规则：

| 层级 | 语言 | 原因 |
|------|------|------|
| 导航/身份/日志 | 🇨🇳 中文为主 | 人类入口层，你读的 |
| 深层技术笔记 | 🇬🇧 英文 | AI 消费层，你提问 Nova 用英文查 |
| 前置元数据 | 🇬🇧 英文 | 机器解析，语言无关 |

---

## 你的 Nova，你做主

Nova 的设计哲学是**每个人都有自己的 Nova**。你的 Nova 应该有：
- 🏷️ 你自己的名字
- 🎯 符合你兴趣的知识域
- 📝 你自己的笔记和积累
- 🔧 你需要的技能和工具

详细个性化步骤见 [`_identity/personalize.md`](_identity/personalize.md)。

---

## 技术栈

- **编辑器**: Obsidian（Markdown + Wiki Links + Graph View）
- **AI 框架**: Opencode（Skills + Subagents + Multi-agent）
- **版本控制**: Git（审计追踪 + 变更历史）
- **格式标准**: OKF v0.1（开放知识格式）

---

> *"Obsidian 是 IDE，AI 是程序员，知识库是代码。"* — Karpathy

---

## 来自创建者

嗨，朋友！这个知识库是我和 Nova 一起搭建的种子项目。如果你读到这，希望它也能帮到你——就像它已经帮到我一样。

你可以：
- 📖 直接拿来用，它有 46+ 篇现成笔记
- ✏️ 随意改名、改结构、改一切
- 🔗 把它分享给更多人
- 🤝 通过 GitHub 贡献回来

Nova 是你的了。

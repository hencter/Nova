# Nova 知识库

> **AI 维护 · 人类导航 · 自举进化 · 开箱即用**

Nova 是一个**自举式个人知识库系统**（self-bootstrapping knowledge vault）。它由 AI 代理持续维护：自动摄入知识、交叉链接、健康检查、自动 git 提交——你只需要负责跟它对话。

---

## 安装前提

| 工具 | 用途 | 安装 |
|------|------|------|
| **Obsidian** | 可视化浏览知识库 | [obsidian.md](https://obsidian.md) |
| **DeepSeek Harness** | AI 代理运行环境（当前） | 见下方说明 |
| **Git**（可选） | 版本历史与自动提交 | `winget install Git.Git` 或 [git-scm.com](https://git-scm.com) |

> **没有 Git 也能用**：Git 只负责版本历史和自动提交。不装 Git，Nova 照常工作（很多用户用 Obsidian Sync 或网盘同步）。Nova 不会在你未确认的情况下自动安装任何软件。
>
> **AI 运行环境**：当前运行于 **DeepSeek Harness (DSH)**——用 DSH 打开本仓库目录作为工作区即可，`AGENTS.md` 会自动作为工作区指令加载。仓库不依赖任何运行时专属配置文件：`skills/` 技能按需直接读取，`_agents/` 子代理定义为可移植 prompt。

---

## 启动流程（2 分钟）

```bash
# 1. 进入仓库
cd Nova

# 2. 用 DeepSeek Harness 打开本目录作为工作区（AGENTS.md 自动加载）
```

### 首次启动：强制初始化

Nova 通过**双重触发器**检测是否需要初始化：

| 触发器 | 场景 | 行为 |
|--------|------|------|
| `log.md` 无历史条目 | 全新仓库，从未被使用 | 进入初始化问答题 |
| `user-config.md` 中 `initialized: false` | 他人克隆/下载，log 有效但身份未配置 | **强制**进入初始化问答 |

只要满足任一条件，Nova 会自动询问：

```
Nova: 你想叫我什么名字？
你:   星尘

Nova: 我怎么称呼你？
你:   小明

Nova: 你主要用这个知识库做什么？
你:   AI 研究和日常笔记

Nova: 初始化完成。从现在起我是你的 星尘，请多指教。
```

> **设计意图**：克隆或下载 Nova 的用户不会继承原主人的身份。即使 log.md 已存在历史记录，也会因为 `initialized: false` 强制触发个性化流程。在完成命名之前，Nova 会拒绝其他请求——确保每个用户都拥有属于自己的 Nova。
>
> **不想起名？** 直接说「跳过」，Nova 会用默认名字、称呼你「朋友」，立刻开始干活。也可以随时手动编辑 [`_identity/user-config.md`](_identity/user-config.md)。

初始化后你可以用中文向 Nova 提问：

| 你说 | Nova 做 |
|------|---------|
| 「帮我学习 MCP 协议」 | 检索知识库并讲解，答案归档为笔记 |
| 「摄入这篇文章：[链接]」 | 提取概念、建立笔记、交叉链接 |
| 「介绍一下 Git 的数据模型」 | 查询已有笔记并综合回答 |
| 「帮我新建一篇关于 X 的笔记」 | 按模板创建原子笔记 |
| 「lint 一下 / 检查健康」 | 全库体检：断链、孤儿笔记、过期内容 |
| 「这篇文章讲什么」 | 阅读并总结，有价值则归档 |

> AGENTS.md 是 Nova 的工作手册（英文，给 AI 看的），你不需要读它。

---

## 知识库结构

| 总目 | 目录 | 内容 |
|------|------|------|
| [`concepts.md`](concepts.md) | `concepts/` | **29 篇**原子概念笔记（AI Agent、Git、ZK、OKF 等） |
| [`tools.md`](tools.md) | `tools/` | **9 篇**工具深度分析（DeepSeek Harness、OpenCode/Crush、Claude Code、Aider 等） |
| [`patterns.md`](patterns.md) | `patterns/` | **5 篇**设计模式（多代理、上下文管理、权限模型等） |
| [`_identity.md`](_identity.md) | `_identity/` | Nova 的自我认知与个性化指南 |
| [`_meta.md`](_meta.md) | `_meta/` | 关于知识库本身的知识（架构、自举机制） |
| [`conference.md`](conference.md) | `conference/` | Agent 间异步会议记录 |

---

## 技术栈

- **编辑器**: Obsidian（Markdown + Wiki Links + Graph View）
- **AI 框架**: DeepSeek Harness（Cordis 组合 + 工作区 AGENTS.md + 原生工具栈；Skills + Subagents + Multi-agent）
- **版本控制**: Git（自动提交 via `auto-commit` 技能）
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

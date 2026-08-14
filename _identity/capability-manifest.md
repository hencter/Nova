---
type: Identity
title: "Capability Manifest"
description: Full inventory of Nova's tools, skills, agents, and extensibility model — what this AI can do and how it grows.
id: "20260622T050500"
status: evergreen
domain: identity
tags:
  - identity
  - capabilities
  - tools
  - extensibility
related:
  - "[[nova-identity|Nova Identity]]"
  - "[[agent-skills-system|Agent Skills System]]"
  - "[[agent-extensibility|Agent Extensibility]]"
confidence: 1.0
summary: >
  Nova's capabilities span file I/O, command execution, web research, knowledge management, multi-agent coordination, and self-bootstrapping — grounded in the DeepSeek Harness tool ecosystem and extensible through skills, agents, and dynamic plugins.
---

# 能力清单

## 工具清单

Nova 运行于 **DeepSeek Harness (DSH)**，可以访问以下原生工具：

### 文件操作
| 工具 | 功能 |
|------|----------|
| `read` | 读取本地文本文件（行号输出）与图片 |
| `write` | 创建或完整覆盖文件 |
| `edit` | 在文件中进行精确字符串替换 |
| `glob` | 快速文件模式匹配（如 `skills/**`） |
| `grep` | 跨文件正则内容搜索 |

### 命令执行
| 工具 | 功能 |
|------|----------|
| `pwsh` | 执行 PowerShell 命令，支持超时与后台作业；受 DSH 文件沙箱约束 |

### 知识与研究
| 工具 | 功能 |
|------|----------|
| `web_search` | 联网搜索并返回摘要与来源链接 |
| `skill` | 加载 harness 已注册技能（vault 技能 = 直接读 SKILL.md） |

### 协作与执行
| 工具 | 功能 |
|------|----------|
| `subagent` / `subagent_fork` | 派生子 Agent 并行独立工作（默认后台） |
| `workflow` | 脚本化多子 Agent 编排（大规模 fan-out） |
| `ask_user_question` | 向用户提出澄清性问题 |
| `todo_write` | 创建和维护结构化任务列表 |
| `create_goal` / `update_goal` | 跨轮次的长期目标跟踪 |
| `job_list` / `job_output` / `job_kill` | 后台作业管理 |

## 子 Agent（DSH）

DSH 没有固定类型的子 Agent 目录——通过 `subagent` / `subagent_fork` 工具按 prompt 派发。仓库内 `.opencode/agents/*.md` 是可移植的 Agent 定义（prompt 文本）：在 DSH 下调用时，把定义文件内容作为 prompt 传入。

| Agent 定义 | 最适合场景 |
|-----------|-----------|
| **nova-architect** | 知识库架构设计与重构决策 |
| **terminology-auditor** | 术语一致性审计 |

## 技能

| 技能 | 位置 | DSH 加载方式 |
|-------|----------|---------|
| **nova-kb** | `skills/nova-kb/SKILL.md` | 按需直接读取文件 |
| **auto-commit** | `skills/auto-commit/SKILL.md` | 会话结束时读取（AGENTS.md §7） |
| **obsidian** | `skills/obsidian/SKILL.md` | 按需直接读取文件 |
| harness 注册技能 | harness 组合配置 | 通过 `skill` 工具加载 |

## 核心能力

### 知识摄入
阅读源材料 → 提取概念 → 创建带 frontmatter 的原子笔记 → 交叉链接 → 更新索引 → 记录操作。

### 查询回答
浏览 `index.md` → 深入概念/工具/模式笔记 → 带引用的综合回答 → 将有价值的答案归档为原子概念笔记。

### 知识库维护
- **检查（Lint）**：扫描矛盾、孤立笔记、过时内容、断链、知识缺口
- **索引更新**：保持 `index.md` 文件与实际内容同步
- **交叉链接**：确保每篇笔记有 1–3+ 条入链
- **状态管理**：推动笔记通过生命周期（seedling → evergreen → superseded）

### 代码与开发
- 读取、编写和编辑源代码
- 执行 PowerShell 命令
- 使用 glob 和 grep 搜索代码库
- 调试和修复问题

### 网络研究
- 通过 `web_search` 搜索并从多个来源提取、综合信息

### 多 Agent 协调
- 用 `subagent` 派发并行独立研究，合并并综合子 Agent 结果
- 用 `workflow` 编排大规模 fan-out
- 用 `create_goal` / `update_goal` 跟踪跨轮次的长期目标

## 扩展模型

Nova 可以通过以下方式增长其能力：

### 技能（`skills/`，受 AGENTS.md §8 保护）
技能将专项工作流注入 Agent 的上下文。技能创建标准：
1. 跨会话可复用 → 值得付出技能开销
2. 专项领域知识 → 从专属指令中获益
3. 能用 1–2 句话清楚描述 → 可被准确触发

### Agent（`.opencode/agents/` 定义，受 AGENTS.md §8 保护）
自定义 Agent 扩展并行执行模型。Agent 创建标准：
1. 需要不同的权限模型 → 需要专用 Agent
2. 需要不同的模型 → 不同的成本/能力平衡
3. 需要专项系统提示 → 独特的个性和关注点
4. 主 Agent 无法单独完成 → 值得增加复杂度

### 动态插件（DSH Dynamic Cordis Plugins）
在运行进程内临时定义并执行的 Cordis 插件（Host/Client 双侧）。用于：
- 扩展模型工具与事件
- 浏览器 UI（Slot / 主题）
- 临时接口

插件定义存于进程内，重启即失效；仅当用户明确要求时才创建。

### 未来成长领域
- **领域技能**：代码审查、安全检查、论文分析、教学
- **MCP 服务器**：外部数据集成、API 访问
- **自动化摄入**：定时来源扫描、RSS 订阅
- **图谱分析**：中心性度量、社群发现、链接预测

## 局限性

Nova 目前不具备：
- **超越本知识库的持久记忆** — 无数据库、无向量存储。知识库就是记忆。
- **实时协作** — 同时只能一位写入者（基于 git 的并发）
- **外部计算** — 无云 GPU 或远程执行能力
- **可视化渲染** — 无图像生成或图表渲染（但 markdown 中支持 Mermaid/LaTeX）

这些是有意为之的设计选择：知识库刻意追求极简和离线优先。只有在出现清晰、持续的需求时才会增加新能力。

---

# Citations

[1] DeepSeek Harness — 本会话运行时上下文（工具清单与机制文档）。

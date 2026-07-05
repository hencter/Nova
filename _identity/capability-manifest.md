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
  Nova's capabilities span file I/O, code execution, web access, knowledge management, multi-agent coordination, and self-bootstrapping — all grounded in Opencode's tool ecosystem and extensible through skills, agents, and plugins.
---

# 能力清单

## 工具清单

Nova 可以访问以下由 OpenCode 提供的工具：

### 文件操作
| 工具 | 功能 |
|------|----------|
| `read` | 读取本地文件系统中的文件和目录 |
| `write` | 创建或覆盖文件 |
| `edit` | 在文件中进行精确字符串替换 |
| `glob` | 快速文件模式匹配（如 `src/**/*.ts`） |
| `grep` | 跨文件正则内容搜索 |

### 命令执行
| 工具 | 功能 |
|------|----------|
| `bash` | 执行 Windows PowerShell 命令，支持超时控制 |

### 知识与研究
| 工具 | 功能 |
|------|----------|
| `webfetch` | 获取网页内容并转换为 markdown 格式 |
| `skill` | 加载专项技能指令 |

### 协作
| 工具 | 功能 |
|------|----------|
| `task` | 启动子 Agent 进行并行自主工作 |
| `question` | 向用户提出澄清性问题 |
| `todowrite` | 创建和维护结构化任务列表 |

## 可用的 Agent 类型

| Agent | 模式 | 类型 | 最适合场景 |
|-------|------|------|----------|
| **build**（默认） | 主 Agent | 全流程开发 | 所有工作、全部工具 |
| **plan** | 主 Agent | 规划分析 | 无需修改代码的分析 |
| **general** | 子 Agent | 多步骤 | 复杂研究、并行工作 |
| **explore** | 子 Agent | 只读 | 快速文件/代码搜索 |
| **自定义**（nova-architect） | 子 Agent | 专项 | 知识库架构决策 |

## 已加载的技能

| 技能 | 位置 | 用途 |
|-------|----------|---------|
| **nova-kb** | `skills/nova-kb/SKILL.md` | 知识库维护：摄入、检查、交叉引用、查询归档工作流 |
| **customize-opencode** | 内置 | 编辑 opencode 自身配置 |
| **weread-skills** | `~/.agents/skills/weread-skills/` | 微信读书助手 |

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
- 获取网页内容并转换为 markdown
- 从多个来源提取和综合信息

### 多 Agent 协调
- 派生子 Agent 进行并行独立研究
- 合并并综合子 Agent 结果
- 使用 explore Agent 进行代码库搜索
- 使用 general Agent 进行复杂多步骤任务

## 扩展模型

Nova 可以通过以下方式增长其能力：

### 技能（`skills/`，受 AGENTS.md §11 保护）
技能将专项工作流注入 Agent 的上下文。技能创建标准：
1. 跨会话可复用 → 值得付出技能开销
2. 专项领域知识 → 从专属指令中获益
3. 能用 1–2 句话清楚描述 → 可被准确触发

### Agent（`.opencode/agents/`，受 AGENTS.md §11 保护）
自定义 Agent 扩展并行执行模型。Agent 创建标准：
1. 需要不同的权限模型 → 需要专用 Agent
2. 需要不同的模型 → 不同的成本/能力平衡
3. 需要专项系统提示 → 独特的个性和关注点
4. 主 Agent 无法单独完成 → 值得增加复杂度

### 插件（`.opencode/plugins/`）
挂载到 opencode 生命周期的 JavaScript/TypeScript 模块。用于：
- 自定义工具
- 环境注入
- 安全保障
- 通知
- 上下文压缩钩子

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

[1] Opencode Documentation. https://opencode.ai
[2] Opencode Config Schema. https://opencode.ai/config.json

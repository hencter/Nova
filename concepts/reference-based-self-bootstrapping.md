---
type: Concept
title: "Reference-Based Self-Bootstrapping"
description: How Nova uses opencode's References feature to pull external knowledge sources (like the opencode source repo) into the vault's self-bootstrapping loop, enabling offline access and continuous self-improvement.
id: "20260706T180000"
status: budding
difficulty: intermediate
domain: knowledge-management
tags:
  - self-bootstrapping
  - references
  - opencode
  - architecture
related:
  - "[[self-bootstrapping|Self-Bootstrapping]]"
  - "[[opencode-architecture|OpenCode Architecture]]"
  - "[[agent-skills-system|Agent Skills System]]"
  - "[[cross-session-memory|Cross-Session Memory]]"
  - "[[vault-architecture|Vault Architecture]]"
sources:
  - title: "OpenCode References Documentation"
    url: "https://opencode.ai/docs/references/"
confidence: 0.9
summary: >
  opencode's References feature allows Nova to pull external Git repositories (like the opencode source) into the vault's runtime context, eliminating web-fetch dependency and enabling offline self-evolution through direct access to platform source code and documentation.
---

# Reference-Based Self-Bootstrapping

## 问题

Nova 的自举循环（AGENTS.md §10）依赖三个支柱：
- **模式** (AGENTS.md) — 定义维护规则
- **记忆** (log.md) — 跨会话持久化
- **导航** (index.md) — 知识库结构

但这三个支柱有一个盲区：**关于 opencode 平台本身的知识**。当 Nova 需要了解 opencode 的某个功能、API 或架构决策时，只能通过 `webfetch` 访问在线文档——这意味着：
1. 依赖网络连接
2. 文档可能已过时（缓存问题）
3. 每次查询消耗额外 token
4. 无法对比源码实现

## 解决方案：References

opencode v1.17+ 的 [References](https://opencode.ai/docs/references/) 功能允许在 `opencode.json` 中配置外部 Git 仓库作为项目引用：

```jsonc
{
  "references": {
    "opencode": {
      "repository": "anomalyco/opencode",
      "branch": "dev",
      "description": "Use to understand opencode internals..."
    }
  }
}
```

配置后，Nova 可以通过 `Read` 工具直接访问 opencode 源码仓库中的任何文件，包括：
- **文档源文件** (`packages/web/src/content/docs/*.mdx`) — 等同于在线文档的最新版本
- **AGENTS.md** (`AGENTS.md`) — opencode 项目自身的 agent 规范（可作为 Nova AGENTS.md 的参考）
- **`.opencode/` 目录** — opencode 自身的 agent/skill/command 定义（最佳实践参考）
- **源码实现** — 当需要理解某个工具的精确行为时

## 自举闭环升级

```
                    ┌──────────────────────────────┐
                    │     opencode source repo      │
                    │  (anomalyco/opencode@dev)     │
                    └──────────────┬───────────────┘
                                   │ Reference (Read)
                                   ▼
┌──────────┐   读取规则   ┌─────────────────┐   写入笔记   ┌──────────┐
│ AGENTS.md │ ◄────────── │     Nova        │ ──────────► │ concepts/ │
│ (模式层)   │ ──────────► │  (primary agent) │ ◄────────── │   (知识)   │
└──────────┘   遵循规则   └────────┬────────┘   交叉链接   └──────────┘
                                  │
                        ┌─────────┼─────────┐
                        ▼         ▼         ▼
                   ┌────────┐ ┌──────┐ ┌──────────┐
                   │ log.md │ │index │ │ _meta/   │
                   │ (记忆)  │ │(导航) │ │ (元信息)  │
                   └────────┘ └──────┘ └──────────┘
```

**新增路径**（虚线）：
1. Nova 可以随时读取 opencode 源码来了解自身运行时
2. 将学到的知识写入 vault 概念笔记
3. 用新知识改进 AGENTS.md 和其他规则文件
4. 形成「读取外部知识 → 内化为 vault 笔记 → 优化自身规则」的自进化循环

## 与现有自举的关系

参考 [[self-bootstrapping|现有自举架构]] 的三阶段模型：

| 阶段 | 原定义 | References 增强 |
|------|--------|-----------------|
| 播种 | 人类 + AI 协作创建初始结构 | references 可引入上游最佳实践作为种子 |
| 成长 | AI 辅助摄入外部来源 | references 消除网络依赖，降低摄入成本 |
| 自我维护 | 主动缺口检测 + 持续检查 | references 提供权威参考源用于矛盾裁决 |

## 与 webfetch 的对比

| 维度 | webfetch | References (Read) |
|------|----------|-------------------|
| 网络依赖 | 需要 | 不需要（本地缓存） |
| 延迟 | HTTP 往返 | 本地文件读取 |
| 内容范围 | 单页面 | 整个仓库 |
| 版本一致性 | URL 可能未锁定版本 | 锁定 branch/ref |
| 搜索能力 | 需多次 fetch | Grep/Glob 可用 |
| 离线 | 不可用 | 可用（异步刷新后） |

## 配置示例

Nova vault 的 `opencode.json`：

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "skills": { "paths": ["skills"] },
  "instructions": ["AGENTS.md"],
  "references": {
    "opencode": {
      "repository": "anomalyco/opencode",
      "branch": "dev",
      "description": "OpenCode source code and documentation. Use to understand opencode internals, tool implementations, agent architecture, and the latest docs without web fetching."
    }
  }
}
```

Reference 通过 `@opencode` 在 TUI autocomplete 中可用，agent 自动获得其描述和路径。

## 局限

1. **首次克隆需网络** — 首次使用需拉取仓库，后续使用本地缓存
2. **大型仓库开销** — opencode 仓库 ~14k commits，克隆体积较大
3. **异步刷新** — 缓存可能落后于上游，需定期刷新
4. **Read-only** — Reference 对外部仓库为只读，不可提交修改

## 未来方向

- 添加更多 references：AI agent 框架源码（LangChain, CrewAI）、知识管理工具（Obsidian 插件 API）
- 自动化 reference 刷新：定期检查上游更新
- 基于 references 的 lint 增强：用 opencode 官方文档验证 vault 中的 opencode 相关笔记准确性

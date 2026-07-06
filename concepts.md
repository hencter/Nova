---
type: Index
title: "Concepts — Core Ideas"
description: Atomic concept notes on fundamental concepts across AI agents, knowledge management, and system design.
tags:
  - index
  - concepts
timestamp: 2026-07-06T18:00:00Z
---

# 核心概念

本目录包含**原子概念笔记**——每篇文件精确捕获一个概念，完整展开，配有完整的前置元数据和交叉链接。

## AI Agent 架构

- [[opencode-architecture|OpenCode Architecture]] — Opencode 的客户端-服务端设计、核心循环、文件系统交互、LLM 提供商
- [[agent-skills-system|Agent Skills System]] — 技能如何扩展 agent 能力、SKILL.md 格式、存储位置
- [[subagent-concurrency|Subagent Concurrency]] — 多 agent 并行执行、task 工具、agent 类型、协调模型
- [[skill-subagent-boundary|Skill vs Subagent Boundary]] — 何时用 skill（指令注入）vs 何时用 subagent（进程隔离），Nova 库架构决策框架
- [[cross-session-memory|Cross-Session Memory]] — 会话持久化、压缩、log.md、AGENTS.md、知识连续性
- [[agent-orchestration|Agent Orchestration]] — LLM 驱动 vs 代码驱动的协调、manager vs handoff 原语

## Agent 协议与标准

- [[mcp-protocol|MCP Protocol]] — 模型上下文协议：LLM 到工具集成标准（Anthropic）
- [[a2a-protocol|A2A Protocol]] — Agent 间协议：跨 agent 通信标准（Google/Linux Foundation）
- [[agent-conference-protocol|Agent Conference Protocol]] — Agent 通过共享文件进行异步通信：会议格式、编排流、共识协议

## AI 基础理论

- [[attention-mechanism|Attention Mechanism]] — Transformer 核心机制：缩放点积注意力、Q/K/V 投影、多头注意力

## 版本控制

- [[git-data-model|Git Data Model]] — 内容寻址文件系统、四种对象类型（blob/tree/commit/tag）、SHA-1 哈希、三种状态
- [[git-branching|Git Branching]] — 轻量指针、HEAD、合并（快进/三方合并）、rebase vs merge、工作流
- [[git-operations|Git Operations]] — 完整命令参考：初始化、日常工作、撤销（reset/checkout/revert/restore）、远程、暂存、标签、高级操作

## 知识管理

- [[zettelkasten-methodology|Zettelkasten Methodology]] — ZK 核心原则、卡片类型、Luhmann 系统、数字化实现
- [[atomic-notes|Atomic Notes]] — ZK 基本单位：每张卡片只捕获一个想法，自包含
- [[folgezettel|Folgezettel]] — ZK 序列笔记：每篇在前一篇基础上构建，形成知识图谱中的叙事路径
- [[knowledge-graph-theory|Knowledge Graph Theory]] — 节点即概念、边即关系、中心性度量、社区检测、小世界网络
- [[okf-format|OKF Format]] — Google 开放知识格式 v0.1 规范与约定
- [[markdown-frontmatter|Markdown Frontmatter]] — YAML 前置元数据语法、Obsidian 属性、AI 消费最佳实践
- [[karpathy-llm-curriculum|Karpathy LLM Curriculum]] — 渐进式从零构建课程、LLM wiki 模式、复利效应
- [[reference-based-self-bootstrapping|Reference-Based Self-Bootstrapping]] — 通过 opencode References 引入外部知识库，实现离线自进化

## 技术技能

- [[mermaid-diagrams|Mermaid Diagrams]] — 全部图表类型（流程图、时序图、类图、状态图、ER 图、思维导图、时间线、git 图）
- [[latex-in-markdown|LaTeX in Markdown]] — 数学语法、符号、环境、矩阵、形式化知识表示
- [[obsidian-syntax-reference|Obsidian Syntax Reference]] — 完整 Obsidian markdown 语法：wiki 链接、标注块、任务列表（标准 + Maple）、嵌入、脚注、表格、搜索语法

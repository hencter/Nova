---
type: Meta
title: Development Workflow
description: Branching strategy and release process for vault maintainers — not needed for daily use.
tags:
  - meta
  - development
  - git
timestamp: 2026-07-27T00:00:00Z
status: evergreen
related:
  - "[[self-bootstrapping]]"
---

# 开发工作流

> 普通用户不需要读这篇。这是给仓库维护者的分支与发布规范，日常使用时 AI 不会加载它。

## 分支策略

```
main ← stable, release-ready (merge from dev only)
  ↑
dev  ← active development (default branch)
```

- **`dev`** 是默认分支——所有日常工作都在这里
- **`main`** 仅用于发布——从 `dev` 合并，合并即发布
- 功能分支（`feat/*`、`fix/*`）从 `dev` 分出，合并回 `dev`
- `gh repo create` 从 `main` 生成模板，因此克隆者拿到的是稳定版

## dev 分支上的自动提交

`auto-commit` 技能提交到**当前检出的分支**。在 `dev` 上工作时，变更自动提交到 `dev`。手动 `git merge dev → main` 保留给人类维护者——发布是有意图的行为。

## 对克隆用户的影响

- 从 `main` 克隆的用户拿到稳定版，init lockdown 为 HARD 模式（必须先完成个性化或明确跳过）
- 在 `dev` 上开发时 lockdown 为 SOFT 模式（只提示，不阻塞）
- 分支检测见 AGENTS.md §Boot Sequence

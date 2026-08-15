---
type: Meta
title: "Log Archive"
description: Archive home for retired log entries, promotion-ledger history, and other trace-layer overflow — read on demand, not at boot.
tags: [meta, archive]
status: evergreen
domain: knowledge-management
---

# 日志归档

> 选择性记忆原则的落点：全量历史不进入 boot 加载集。旧 trace 从这里按需检索。

## 归档什么

- `log.md` 的陈旧条目（lint §2.3 step 5 标记后移入）
- `_meta/promotions.md` 超预算时退休的台账历史（§2.5，> 50 行时）
- 被 `superseded` 且确认无图价值的笔记副本（先改状态，再谈归档）

## 规则

- `log.md` 本体 append-only：归档 = 移出至本目录并在原处留一行指针，不重写历史
- 归档文件命名：`<source>-<date>.md`（如 `log-2026-06.md`、`promotions-history.md`）
- 本目录文件是机器配置，不是图节点（与 `skills/`、`_agents/` 同类，不进 hub）

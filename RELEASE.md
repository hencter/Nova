# RELEASE.md — dev → main 合并清单

> **维护于 `dev` 分支。** 发布时随 dev 合入 main，内容更新只在 dev 进行。记录需要从 dev 带到 main 的内容。

---

## 合并规则

| 类别 | 合并到 main？ | 示例 |
|------|:-----------:|------|
| 新概念笔记 / 工具分析 / 模式 | ✅ | `concepts/new-topic.md` |
| 已有笔记的内容完善 | ✅ | 补充说明、新增交叉链接 |
| 术语修正 / 路径修正 | ✅ | 全库范围的规范修正 |
| AGENTS.md 用户可见规则 | ✅ | 启动序列、first-run 检测 |
| AGENTS.md dev 专属段 | ❌ | （当前无 dev 专属段，分支规则已并入 boot sequence） |
| 会议记录 | ❌ | `conference/session-*.md` |
| RELEASE.md 自身 | ❌ | 本文件 |
| `.agents/skills/` 技能、`_agents/` 代理定义 | ✅ | 用户也需要 auto-commit、子代理 |

---

## 当前 dev 独有内容（不合并）

- [x] `AGENTS.md §14` — 分支策略（v1.6.0 起无 dev 专属段，通用规则已并入 boot sequence）
- [x] `conference/` 会议记录
- [x] `RELEASE.md` 本文件

---

## 下次合并候选（待定）

*(新开发的内容，确认要合并后放入此表)*

| 内容 | 状态 | 说明 |
|------|:----:|------|
| — | — | — |

---

## 合并操作

```bash
# worktree 模式（2026-08-14 起）：每个分支锁定在各自 worktree，
# 不跨 worktree 执行 checkout。发布 = 在对应目录执行合并：

# ① dev worktree（D:\OpenCode\Navo-dev）——迭代完成后自动提交已在此完成
# ② main worktree（D:\OpenCode\Navo）执行：
git merge dev --no-ff -m "release: merge dev → main"
git push origin main

# ③ dev worktree（D:\OpenCode\Navo-dev）同步远程：
git push origin dev
```

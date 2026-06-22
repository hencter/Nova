---
type: Concept
title: "Git Operations"
description: Complete Git command reference organized by workflow stages — setup, daily work (add/commit/status/diff/log), undo operations (reset/checkout/revert/restore), remote collaboration (clone/fetch/pull/push), stashing, tagging, and advanced operations (bisect, reflog, cherry-pick).
tags: [git, commands, reference, operations, undo, remote]
timestamp: 2026-06-22T08:00:00Z
id: "20260622T080200"
status: evergreen
difficulty: beginner
domain: version-control
prerequisites:
  - /concepts/git-data-model.md
  - /concepts/git-branching.md
related:
  - "[[git-data-model|Git Data Model]]"
  - "[[git-branching|Git Branching]]"
sources:
  - title: "Pro Git Book — §7.7 Reset Demystified"
    url: "https://git-scm.com/book/en/v2/Git-Tools-Reset-Demystified"
  - title: "Pro Git Book — §2 Git Basics"
    url: "https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository"
  - title: "Git Reference Manual"
    url: "https://git-scm.com/docs"
confidence: 0.95
summary: >
  Git operations span five stages: setup (init/clone/config), daily workflow (add/commit/status/diff/log), undo (reset/checkout/revert/restore), remote collaboration (fetch/pull/push/remote), and advanced tools (stash/bisect/reflog/cherry-pick) — with reset being the most misunderstood yet powerful undo mechanism.
---

# Git Operations

## 1. Setup & Config

```bash
# 初始化或克隆仓库
git init                          # 创建新仓库
git clone <url>                   # 克隆远程仓库
git clone <url> <dir>             # 克隆到指定目录

# 配置
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global core.editor "code --wait"
git config --list                 # 列出所有配置
git config --global --edit        # 编辑全局配置

# .gitignore
echo "*.log" >> .gitignore
```

---

## 2. Daily Workflow (日常工作流)

```bash
# 查看状态
git status                        # 工作区状态
git status -s                     # 精简输出
git diff                          # 工作区 vs 暂存区
git diff --staged                 # 暂存区 vs HEAD
git diff HEAD                     # 工作区 vs HEAD

# 暂存
git add <file>                    # 暂存指定文件
git add .                         # 暂存所有修改
git add -p                        # 交互式暂存（逐块选择）
git add -A                        # 暂存所有（含删除）

# 提交
git commit -m "message"           # 提交
git commit -am "message"          # 跳过 add（仅限已跟踪文件）
git commit --amend                # 修改最后一次提交
git commit --amend --no-edit      # 追加到上一次 commit（不改信息）

# 查看历史
git log                           # 提交历史
git log --oneline                 # 单行输出
git log --oneline --graph --all   # 图形化分支历史
git log -p                        # 显示 diff
git log -n 5                      # 最近 5 条
git log --author="name"           # 按作者过滤
git log --since="2026-06-01"     # 按时间过滤
git log -- <file>                 # 特定文件的提交历史
git show <commit>                 # 显示某次提交详情
git blame <file>                  # 查看每行的最后修改者
```

---

## 3. Undo Operations (撤销操作)

### Reset Demystified

`reset` 按顺序操作三棵树，停在你指定的位置：

```mermaid
graph TD
    H[HEAD / 分支指针] -->|Step 1: --soft| I[Index / 暂存区]
    I -->|Step 2: --mixed (default)| W[Working Directory]
    W -->|Step 3: --hard| END[全部完成]
```

### Reset vs Checkout vs Revert vs Restore

| 命令 | HEAD | Index | Working Dir | Safe? | 用途 |
|------|------|-------|-------------|-------|------|
| `reset --soft <commit>` | 移动分支 | 不变 | 不变 | ✅ | 撤销 commit 但保留修改 |
| `reset (--mixed) <commit>` | 移动分支 | 更新 | 不变 | ✅ | 撤销 commit + unstage |
| `reset --hard <commit>` | 移动分支 | 更新 | **覆盖** | ❌ | 完全回退（危险！） |
| `reset <file>` | 不变 | 更新 | 不变 | ✅ | Unstage 文件 |
| `checkout <branch>` | 移动 HEAD | 更新 | 更新 | ✅ | 切换分支 |
| `checkout <file>` | 不变 | 更新 | **覆盖** | ❌ | 丢弃文件修改 |
| `revert <commit>` | 新建 commit | 新建 | 新建 | ✅ | 反向提交（最安全） |
| `restore <file>` | 不变 | 可选 | 可选 | ✅ | Git 2.23+ 推荐的撤销 |
| `restore --staged <file>` | 不变 | 更新 | 不变 | ✅ | Unstage（新方式） |

### 常用撤销场景

```bash
# 撤销工作区修改（丢弃未暂存的改动）
git restore <file>                  # Git 2.23+
git checkout -- <file>              # 旧方式

# 取消暂存（unstage）
git restore --staged <file>         # Git 2.23+
git reset HEAD <file>               # 旧方式

# 撤销最后一次 commit（保留修改在暂存区）
git reset --soft HEAD~1

# 撤销最后一次 commit（保留修改在工作区）
git reset HEAD~1
# 或 git reset --mixed HEAD~1

# 完全撤销最后一次 commit（丢弃所有修改！）
git reset --hard HEAD~1

# 安全撤销已推送的 commit（创建反向 commit）
git revert HEAD

# 回到任意历史 commit
git checkout <commit-sha>
# 或创建分支后再操作
```

---

## 4. Remote Collaboration

```bash
# 远程管理
git remote -v                       # 列出远程仓库
git remote add <name> <url>         # 添加远程
git remote remove <name>            # 删除远程
git remote rename <old> <new>       # 重命名远程

# 同步
git fetch                           # 下载所有远程更新（不合并）
git fetch <remote>                  # 下载指定远程
git fetch --prune                   # 同时清理已删除的远程分支

git pull                            # fetch + merge
git pull --rebase                   # fetch + rebase（推荐）
git pull --ff-only                  # 仅快进合并（失败则报错）

git push origin main                # 推送
git push -u origin main             # 推送并设置 upstream
git push --force-with-lease         # 安全强制推送
git push --tags                     # 推送标签
```

---

## 5. Stashing

```bash
git stash                           # 暂存工作区修改
git stash save "message"            # 带信息暂存
git stash list                      # 查看 stash 列表
git stash apply                     # 应用最近的 stash（不删除）
git stash apply stash@{2}           # 应用指定 stash
git stash pop                       # 应用并删除最近的 stash
git stash drop stash@{2}            # 删除指定 stash
git stash clear                     # 清空所有 stash
git stash -u                        # 包含未跟踪文件
git stash -p                        # 交互式暂存
```

---

## 6. Tags

```bash
git tag                             # 列出所有标签
git tag -l "v1.*"                   # 按模式过滤
git tag v1.0                        # 轻量标签（指向 commit）
git tag -a v1.0 -m "message"        # 注释标签（含作者/日期/信息）
git tag -a v1.0 <commit-sha>        # 给历史 commit 打标签
git show v1.0                       # 查看标签信息
git push origin v1.0                # 推送单个标签
git push --tags                     # 推送所有标签
```

---

## 7. Advanced Operations

```bash
# 精心挑选
git cherry-pick <commit-sha>        # 将指定 commit 应用到当前分支
git cherry-pick <A>..<B>            # 挑选 A 到 B 之间的 commit

# 二分查找 Bug
git bisect start                    # 开始二分查找
git bisect good <commit>            # 标记为 good
git bisect bad <commit>             # 标记为 bad
git bisect reset                    # 退出二分查找

# 引用日志（救命稻草）
git reflog                          # 查看 HEAD 变更历史
git reflog <branch>                 # 查看分支变更历史
git reset --hard HEAD@{2}           # 恢复到 reflog 中的某个状态

# 清理
git clean -n                        # 预览要删除的未跟踪文件
git clean -f                        # 删除未跟踪文件
git clean -fd                       # 删除未跟踪文件和目录

# 搜索
git grep "pattern"                  # 搜索仓库内容
git grep -n "pattern"               # 显示行号
git grep --count "pattern"          # 统计匹配数

# 子模块
git submodule add <url> <path>
git submodule update --init --recursive

# 压缩历史
git rebase -i HEAD~3               # 交互式 rebase 最近 3 个 commit
# 在编辑器中标记 commit 为 squash/fixup
```

---

## 8. Nova Vault 专用 Git 工作流

```bash
# 日常操作
git status                         # 检查 vault 变更
git add -A                         # 暂存所有变更
git commit -m "ingest | <topic>"   # 提交（参考 log.md 格式）
git log --oneline -10              # 查看最近变更

# 跨会话记忆
# log.md 是 AI 的 append-only 记忆
# git 历史是文件级别的精确变更追踪
# 两者互补，缺一不可
```

---

## Reset/Checkout 速查表

| 命令 | HEAD | Index | Workdir | WD Safe? |
|------|------|-------|---------|----------|
| **Commit Level** | | | | |
| `reset --soft [commit]` | REF | NO | NO | ✅ |
| `reset [commit]` | REF | YES | NO | ✅ |
| `reset --hard [commit]` | REF | YES | YES | ❌ |
| `checkout <commit>` | HEAD | YES | YES | ✅ |
| **File Level** | | | | |
| `reset [commit] <paths>` | NO | YES | NO | ✅ |
| `checkout [commit] <paths>` | NO | YES | YES | ❌ |

> **REF** = 移动 HEAD 指向的分支；**HEAD** = 移动 HEAD 自身

---

# Citations

[1] Chacon, S. & Straub, B. (2014). *Pro Git* (2nd ed.). Apress. https://git-scm.com/book/en/v2

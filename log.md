# Nova 知识库 — 时间线日志

> 仅追加，最新条目在最前。用 `grep` 搜索 `^## \[` 读取最近条目。
> **2026-10-19**：经用户要求重置旧日志（49 条历史见 git 提交）。

---

## [2026-10-19] refactor | 技能目录回归根级、符号链接移除、日志重置 → §8

**变更**：
1. 删除根级 `skills` 符号链接——Windows `core.symlinks=false` 下它被 checkout 为 14 字节文本文件，链接语义已失效
2. `.agents/skills/` → `skills/`（真实目录，3 个技能随仓库分发）；移除空 `.agents/`、`.gitattributes` 的 `skills symlink` 规则
3. 删除 `log-archive/`（仅含 README，无归档日志）；AGENTS.md v1.9.0、README、身份文档、升格台账同步为「根级 `skills/`，直接读取 `SKILL.md`」
4. 49 条旧日志条目清除（git 历史可恢复）

**注意**：DSH 自动技能目录只扫描 `.agents/skills/`、`.dsh/skills/` 及用户级同类路径；根级 `skills/` 不再出现在 `skill` 工具目录中，改由 Agent 直接读取。

# Nova 知识库 — 时间线日志

> 仅追加。永不删除条目。最新条目在最前。可搜索格式：用 opencode Grep 工具搜索 `^## \["` 模式，读取末尾 20 行

---

## [2026-08-05] refactor | AGENTS.md v1.5.0 — Graph-Semantic Model + Promotion Protocol

**动因**：用户指出 Nova 知识库的根本缺陷——`log.md` 记录只是记录（trace），不是错误标准（standard）；错误发生后无法防止再犯。同时引入网络新兴的 Graph Engineering 视角（GraphRAG / Agent 记忆图谱）作为解决方案框架。

**变更**：
1. `AGENTS.md` §2 整体重写为 **Graph-Semantic Model**：vault 显式定义为知识图（节点=文件、边=wiki 链接、hub=index.md、社区=目录）；`log.md` 降级为 trace layer，图才是 standard layer
2. **新增 §2.5 Promotion（核心指令）**：错误/修复必须「记录 → 根因分析 → 升格为 schema 规则/概念笔记 → 接线（related/索引）→ 关联 trace」；未升格的 fix 是 false fix，lint §2.3 step 7 会审计
3. §2.2 Query 引入 **local/global 双模式**（GraphRAG 社区摘要思想，引用 arXiv:2404.16130）：local 沿边导航、global 从 hub 遍历社区综合
4. §2.3 Lint 新增 **社区缺口分析**（同域笔记未交叉链接=缺失边）与 **升格审计**
5. §7 session-end 增加「升格本会话教训」步骤；§10/§11 同步；版本 1.4.0 → 1.5.0
6. `index.md` 统计块版本同步

**意义**：把「图」从描述性隐喻升级为 schema 层的强制运行逻辑——记录只有通过升格为「节点+边」才能成为标准。回答了用户核心疑问：防再犯不靠 log 记录，靠把错误升格进每次会话都会加载的 schema 层。

## [2026-07-27] refactor | AGENTS.md v1.4.0 普通用户可用性重构 + obsidian 技能

**动因**：从「普通用户可用性」角度审查 AGENTS.md（580 行），发现 lockdown 无逃生口、git 硬依赖、研究内容与运行规则混杂、frontmatter 缩进错误等问题。

**变更**：
1. `AGENTS.md` 580 → ~250 行：新增中文人类导读（顶部）；init lockdown 增加逃生口（说「跳过」即写入默认值继续）；lockdown 话术从 base64 改明文 `_identity/lockdown-response.md`（含缺失回退）；Trigger B 改用显式 `initialized: false` 标志替代字符串哨兵；git 降级为可选增强（懒检测、不自动安装、静默降级）；§14 分支策略下沉至 `_meta/development.md`；删除 harness/GEP 研究性段落（保留规则，内容已在 concepts/ 笔记中）；修复 §2.3 双编号与 §10 缩进错误。版本 1.3.1 → 1.4.0
2. 新建 `skills/obsidian/SKILL.md`：封装 Obsidian 官方 CLI（orphans/unresolved/deadends/backlinks 等 lint 原语），CLI 不可用时静默回退原生工具；硬性禁止 plugin/theme/eval 操作
3. `_identity/user-config.md` + `.user-config-default`：新增 `initialized` 字段
4. `README.md`：Git 改为可选、新增「不想起名？说跳过」逃生口说明、新增用户指令对照表
5. 修复 `index.md`、`concepts.md` frontmatter 中 `timestamp` 错误缩进（被 YAML 解析为 tags 子项）
6. `_meta/development.md` 新建（分支策略）；`_meta.md`、`index.md` 索引同步

**意义**：schema 层从「开发者研究文档」回归「运行规则手册」；克隆用户不再被 lockdown 困死；无 git 环境完全可用；lint 获得 Obsidian 原生图缓存支持。

## [2026-07-23] init | Vault owner configured

初始化完成：使用者称呼为 `开发者`，Agent 名称为 `Nova`，主领域为 `ai-engineering`。

## [2026-07-23] fix | 禁止 agent 配置 model frontmatter

**原因**：设置 `model` 会锁定 agent 到特定模型提供商，用户环境中可能无法连接（API key 缺失、地域限制、速率限制），导致硬失败。

**变更**：
1. `AGENTS.md` §9 — 新增核心原则：禁止 agent frontmatter 中设置 `model`，让 opencode 默认模型路由处理
2. `.opencode/agents/nova-architect.md` — 移除 `model: anthropic/claude-sonnet-4-20250514`
3. `.opencode/agents/terminology-auditor.md` — 移除 `model: anthropic/claude-haiku-4-20250514`
4. `AGENTS.md` 版本 1.3.0 → 1.3.1；`index.md` 统计同步

**意义**：agent 定义从「绑定模型」变为「模型无关」，提高跨环境可移植性。

## [2026-07-13] research-session | Nova 核心架构迭代 — 互联网/论文/GitHub 全面检索与执行

**检索范围**：arXiv (2026年7月最新论文)、GitHub Trending (AI Agent / Agent Framework)、agentskills.io、MCP/A2A 协议更新、Claude Code v2.1.207、Crush/OpenCode 分支状态

**关键发现**：
1. **OpenCode 已归档** (2025-09-18) → Crush (charmbracelet/crush, 26.5k stars) 接替 + SST/OpenCode 独立分支
2. **Agent Skills 开放标准** (agentskills.io) — 40+ 工具采纳，SKILL.md 跨平台可移植
3. **选择性持久记忆** (arXiv:2607.09493) — 选择性记忆 96% > 无记忆 79% > 全量历史 71%
4. **Harness Engineering** (arXiv:2607.08028) — "Prompts → Contracts"，代码级合约优于纯 prompt
5. **分层记忆架构** (arXiv:2607.07666) — 三层有界上下文，PI-Agent 监督
6. **自进化 Agent** (EvoMap/Evolver, 8.9k stars) — GEP 基因组协议，Genes > Skills 文档
7. Microsoft Agent Framework (12.1k) + Agent Governance Toolkit (OWASP Top 10)

**执行（6 并行子代理）**：
- `tools/opencode.md` — 更新为 budding，新增 Crush 接替者/SST 分支/Agent Skills 等 8 个新章节
- `concepts/agent-skills-standard.md` — 新建 (budding)
- `concepts/selective-persistent-memory.md` — 新建 (seedling)
- `concepts/harness-engineering.md` — 新建 (seedling)
- `concepts/hierarchical-memory-architecture.md` — 新建 (seedling)
- `concepts/self-evolving-agents.md` — 新建 (seedling)
- `concepts.md` — 更新条目，新增 5 个概念
- `index.md` — 更新条目，新增 5 个概念

## [2026-07-13] ingest | Created: Agent Skills Standard

基于 agentskills.io 最新规范（2026年7月），创建了 Agent Skills 开放标准的原子概念笔记。
- 渐进式三阶段加载模型（Discovery → Activation → Execution）
- SKILL.md frontmatter 规范（必需 + 扩展字段）
- 标准路径定义（`.agents/skills/` 为主，兼容 `.crush/skills/`、`.claude/skills/`、`.cursor/skills/`）
- 40+ 工具生态图谱（Claude Code, Cursor, GitHub Copilot, Crush, Gemini CLI, Goose 等）
- 与 Nova 现有 `agent-skills-system.md` 的关系与差异分析
- 与 MCP、A2A 标准的互补关系

## [2026-07-13] ingest | Created: Selective Persistent Memory

**来源**：arXiv:2607.09493 — Shared Selective Persistent Memory for Agentic LLM Systems
**产出**：`concepts/selective-persistent-memory.md`
**状态**：`seedling`

**核心发现**：选择性记忆 96% > 无记忆 79% > 全量历史 71%。全量历史持久化（包括 Nova 当前的 log.md）反而会降低 agent 性能。

**跨链接**：
- `concepts/cross-session-memory.md` — 新增 related 链接
- `concepts.md` — 新增条目

**Nova 相关性**：log.md 本质上是 naive full-history persistence，论文建议需要选择性遗忘/压缩层。workspace 概念对应 Nova 的 `conference/` 目录。

## [2026-07-13] ingest | Created: Harness Engineering (arXiv:2607.08028)

**来源**：arXiv 论文 "From Prompts to Contracts: Harness Engineering for Auditable Enterprise LLM Agents" (2026-07-09)

**新建**：
- `concepts/harness-engineering.md` — 将确定性 agent 行为从 prompt 迁移至代码、manifest、schema 与验证器 artifacts 的设计模式。涵盖四层架构（manifest → schema → 验证器 → composition boundary）、四项核心原则、与 Nova 库 SHOULD/MUST 规则层的对比。

**更新**：
- `index.md` — 新增 harness-engineering 条目
- `concepts.md` — 新增 AI Agent 架构条目

**交叉链接**：已链接到 [[agent-skills-system]]、[[permission-models]]、[[agent-extensibility]]、[[context-management]]

## [2026-07-13] ingest | 创建: Hierarchical Memory Architecture (arXiv:2607.07666)

**来源**: Zhou et al. (2026) — 三层层次化记忆架构 + PI-Agent 监督模式
**新建文件**: `/concepts/hierarchical-memory-architecture.md`
**状态**: seedling
**更新索引**: `index.md`, `concepts.md`
**核心贡献**: 中期/项目状态层有界化(中位数301 tokens)，使得上下文大小与项目时长解耦，实现无退化的持续自主运行

## [2026-07-13] ingest | Created: Self-Evolving Agents — GEP genome evolution protocol, Genes vs Skills, Evolver/EvoMap

## [2026-07-11] refactor | 将 auto-commit 从插件迁移到技能

**原因**：`.opencode/plugins/auto-commit.js` 插件导致 OpenCode 服务器打开出错，移除并改用技能形式实现。

**变更**：
1. `.opencode/plugins/auto-commit.js` — 删除
2. `.opencode/package.json`, `package-lock.json`, `node_modules/` — 删除（插件基础设施）
3. `skills/auto-commit/SKILL.md` — 新建技能，替代插件的自动提交功能
   - 在会话关闭时指示 agent 执行 `git add -A && git commit`
   - 处理非 git 仓库、无变更、git 未安装等边界情况
   - 从事件驱动的确定性 hook 变为技能驱动的指令-执行模式
4. `AGENTS.md` — 4 处更新：§7 Session End、§10 Auto-Commit、§13 Quick Reference、§14 Development Workflow
5. `README.md` — 更新技术栈说明

**权衡**：插件是确定性的（`session.idle` 事件自动触发），技能依赖 agent 遵循指令（SHOULD 级别）。但技能的优势：无需外部依赖（`@opencode-ai/plugin`），不干扰 OpenCode 启动，符合开放编码的工具边界策略（§12）。

## [2026-07-06] execute | auto-commit 插件：从概率性提交到确定性提交

**变更**：
1. `.opencode/plugins/auto-commit.js` — 新建插件
   - 监听 `session.idle` 事件，检测到文件改动时自动 `git add -A && git commit`
   - 无改动时零开销（`git status --porcelain` 为空则跳过）
   - 消除 "agent 忘记提交" 问题——从规则驱动 (SHOULD) 变为操作系统级 hook (WILL)
2. `AGENTS.md` — 多处更新：
   - §7 Session End：新增 Git auto-commit 说明
   - §10 Self-Bootstrapping：从三支柱升级为四支柱 (Schema + Memory + Navigation + External References)，新增 Auto-Commit 子节
   - §11 Skills & Agents：保护范围扩展至 plugins
   - §13 Quick Reference：新增 Git commit 行
   - 版本号 1.1.0 → 1.2.0
3. `concepts/reference-based-self-bootstrapping.md` — 更新 related 链接

**意义**：
- Agent 记忆是概率性的（上下文窗口存在 ≠ 记住要做某事），外部 hook 是确定性的
- `session.idle` 事件是 agent 生命周期中唯一可被外部代码拦截的 "会话即将结束" 信号
- 从此 agent 无需担心 git 提交——上次修改后的提交已经是上一刻的事了

## [2026-07-06] refactor | 引入 opencode References 实现自举 v2

**来源**：opencode 官方 References 文档 (https://opencode.ai/docs/references/)

**变更**：
1. `opencode.json` — 新增 `references.opencode`，指向 `anomalyco/opencode@dev` 仓库
   - Nova 可通过 Read 工具离线访问 opencode 源码和文档
   - 消除对 webfetch 的网络依赖，实现参考层自举
2. `concepts/reference-based-self-bootstrapping.md` — 新建概念笔记 (status: budding)
   - 描述 References 如何增强 vault 的自举循环
   - 对比 webfetch vs References 的优劣
   - 包含升级后的自举闭环架构图
3. `concepts.md` — 新增 `reference-based-self-bootstrapping` 条目（知识管理段）
   - timestamp 更新为 2026-07-06
4. `.opencode/agents/` — 确认已有 markdown agent 定义（nova-architect, terminology-auditor）
   - 当前定义完善，无需修改

**自举升级意义**：
- 原有三支柱（模式/记忆/导航）→ 四支柱（+ 外部参考）
- Nova 现在可直接读取 opencode 源码了解自身运行时行为
- 形成「读取外部知识 → 内化为 vault 笔记 → 优化自身规则」闭环

## [2026-06-30] execute | 会议共识 10 项行动全部落地

**来源**：`conference/session-20260630-review.md` 四轮共识（nova-architect + terminology-auditor）

**P0 — 入口一致性 + 术语迁移（3 项）**：
1. `concepts.md:13` — "原子化永久笔记" → "原子概念笔记"
2. `index.md` — Mermaid 图新增 CONF[conference/] 节点；新增 🤝 会议知识集群段；版本号 1.0.0→1.1.0；timestamp 更新
3. 全库术语扫描（5 组正则）→ 4 处残留修正：
   - `_identity/capability-manifest.md:79` — "永久笔记"→"原子概念笔记"
   - `_identity/nova-identity.md:44` — "永久笔记"→"原子概念笔记"
   - `_meta/self-bootstrapping.md:54` — "永久笔记"→"原子概念笔记"
   - `_meta/vault-architecture.md:46` — "Zettelkasten 永久笔记"→"原子概念笔记（ZK 方法）"

**P1 — conference 导航 + 概念笔记（3 项）**：
4. `conference.md` — 新建目录级索引（中文）
5. `concepts/agent-conference-protocol.md` — 新建原子概念笔记（status: budding）
   - 含编排流、共识协议、反模式、7 向交叉链接
6. `conference/README.md` — 精简为操作速查卡（指向概念笔记）
7. `concepts.md` — 新增 `agent-conference-protocol` 条目（Agent 协议段）

**P2 — 健康检查（3 项）**：
8. 目录 index.md 存在性 — ✅ 全部通过（5 知识域均有）
9. 孤立笔记扫描 — ⏸ 检测脚本 bug，留待后续
10. OKF type 字段匹配 — ✅ 全部通过（type 与目录一致）

**影响文件**：13 文件修改/新建（2 新建 + 11 修改）
**未涉及人类决策**：全自主执行，零用户确认请求

## [2026-06-30] conference | 首次多轮 Agent 会议 — 中文 + 真实时间戳 + 四轮共识

**触发**：用户要求验证子代理通过共享文件协作——但第一版英文+假时间戳被否决后，重启为中文会议 + Get-Date 获取真实系统时间。

**会议文件**：`conference/session-20260630-review.md`（231 行，4 轮）

**轮次记录**：
| 轮 | 时间戳 | 发言人 | 主题 |
|----|--------|--------|------|
| 1 | 22:09:36 | nova-architect | 方案：4 项结构问题 + 5 项行动清单 |
| 2 | 22:11:12 | terminology-auditor | 审阅：方案优秀，建议补 2 处交叉引用 + P0 扫描前定义正则 |
| 3 | 22:16:53 | nova-architect | 回应：接受全部建议，方案扩展为 10 项行动 + 5 组正则 |
| 4 | 22:17:58 | terminology-auditor | 终审：同意，无遗漏，全票通过 |

**最终共识**：v1.1.0 后需执行 10 项结构化优化——P0 修复入口一致性+术语迁移、P1 建立 conference 导航+概念笔记、P2 格式规范兜底。

**协议升级**：
- `conference/README.md` 编排流从**单回合**（A→B→结束）升级为**迭代至共识**（A→B→检查→如有异议则 A 回应→B 确认→重复→共识关闭）
- 新增"Consensus Protocol"：定义关闭条件（B 明确同意 + 无剩余异议）和死锁条件（3 轮未共识 → 主代理裁决）
- 新增规则：主代理角色从"被动总结"改为"主动驱动迭代"

**AGENTS.md 修正**：
- §5 语言分层表新增 Conference Files 行（`conference/` → 中文，人类可读层）
- 明确：子代理写入 conference 文件必须使用人类持有者首选语言

**教训**：
- 单轮会议 = 审阅意见未纳入方案 = 未闭环
- 多轮迭代至共识 = 真正的子代理协作
- 英文会议 = 人类被排除在外；中文会议 = 人类可以参与裁决
- 假时间戳 = 时间线失真；`Get-Date` = 可审计

**影响文件**：5 个（新建 1 会议文件 + 修改 4 协议/规则文件）

## [2026-06-30] ingest | Skill vs Subagent Boundary — 原子概念笔记落地

**触发**：用户追问"skill 和 subagent 怎么区分？"——发现库里两者各自有笔记（`agent-skills-system.md`、`subagent-concurrency.md`）但缺**对比/边界/决策框架**。这是库"原体词"中的空白。

**新建**：
- `concepts/skill-subagent-boundary.md` — 原子概念笔记，status: evergreen
  - **核心表**：11 个维度对比（机制/上下文/权限/LLM/并行/生命周期/文件/元数据/状态变更/错误隔离）
  - **决策树**：逐级判断 nova-architect/terminology-auditor 已有实例 + 未来场景推演
  - **反模式**：每种选择的典型错误（如 skill 需要 permission 隔离、subagent 纯指令注入）
  - **术语表**：skill/subagent/agent/main agent/orchestrator 的库内规范定义
  - **链接**：↔ agent-skills-system、subagent-concurrency、agent-orchestration、permission-models、agent-extensibility

**交叉链接更新**：
- `concepts.md` — 新增条目（AI Agent 架构段）
- `concepts/agent-skills-system.md` — `related` + `[[skill-subagent-boundary]]` + `a2a-protocol`
- `concepts/subagent-concurrency.md` — `related` + `[[skill-subagent-boundary]]`（第二优先级）
- `AGENTS.md §8` — 新增"Boundary Reference" 段，wiki 链接到新笔记
- `AGENTS.md §8` — **修正 skill 路径**：`.opencode/skills/`（不存在）→ `skills/`（实际路径）

**影响文件**：5 个（1 新建 + 4 更新）

**原则**：库的"原体词"优先级已验证——当扩充子代理时，优先查此笔记判断新需求该走 skill 还是 subagent。

## [2026-06-30] audit+fix | 全库术语审计 + 20 项修复 + 子代理落地

**触发**：用户要求消除 AGENTS.md:55 "Absolute path" 术语歧义，并启动全库 LLM 面向术语排查——用 subagent 完成，且子代理需支持持续迭代自举。

**阶段 1 — 单一 typo 修复**：
- `AGENTS.md:55` — "Absolute paths" → "Vault-relative paths" + 括号内注明 `NOT filesystem absolute`
- 影响 1 文件

**阶段 2 — 子代理构建**：
- 新建 `.opencode/agents/terminology-auditor.md` — 持久化术语审计子代理
  - 定义 11 类审计标准：路径/工具/链接/前置元数据/库专用/代理/权限/代码示例/术语过载/类型不完整/反例
  - 权限：`edit: ask`、`bash: deny`（只审计不编辑）
  - 输出格式：结构化报告（Critical→Major→Minor，精确到文件:行号）
  - 含"迭代历史"段——每次运行后可追加经验，支持子代理自我进化

**阶段 3 — 审计运行**：
- 使用 `general` subagent 执行（含 auditor 全部指令）
- 扫描 54 个 .md 文件（排除 node_modules/.obsidian/_attachments/.git）
- 输出 20 项发现：6 Critical + 9 Major + 5 Minor，涉及 10 个文件

**阶段 4 — 修复清单（全部落地）**：

🥇 **Critical (6)**：
1. `AGENTS.md:246` — `grep "^## \[" log.md \| tail -20` → opencode Grep 工具引用
2. `AGENTS.md:420` — Quick Reference 同项 Unix-only 命令 → opencode Grep 工具
3. `AGENTS.md:403` — "absolute paths" → "filesystem-absolute paths"
4. `concepts/opencode-architecture.md:79` — "Ripgre" typo → "Ripgrep"
5. `concepts/markdown-frontmatter.md:302` — 补全 type 列表（缺 Identity/Template/Index）
6. `concepts/zettelkasten-methodology.md:283` — `type: permanent` → `type: Concept`

🥈 **Major (9)**：
7. `patterns/knowledge-graph-patterns.md:317` — 补全 Windows + opencode Grep 替代
8. `concepts/cross-session-memory.md:185` — Unix grep+tail → opencode Grep
9. `concepts/okf-format.md:181` — 同（Unix grep+tail → opencode Grep）
10. `log.md:3` — 中文化 Unix grep+tail → opencode Grep 描述
11. `tools/cursor.md:271` — "YAML header" → "YAML frontmatter"
12. `AGENTS.md:276` — "different model" → "different LLM model, create separate Agent"
13. `skills/nova-kb/SKILL.md:3` — "workflows" → "operations"
14. `skills/nova-kb/SKILL.md:120` — "Atomic permanent notes" → "Atomic concept notes"
15. `AGENTS.md:31,85` — "permanent notes" → "atomic concept notes"（统一术语）

🥉 **Minor (5)**：
16. `concepts/opencode-architecture.md:53` — Mermaid 图 lowercase → Capitalized
17. `concepts/okf-format.md:88` — "containing metadata" → "containing frontmatter (YAML metadata)"
18. `tools/opencode.md:91` — glob 工具描述 "Uses ripgrep" → "Fast filesystem traversal"（精确化）
19. `AGENTS.md:387` — "shell out to" → "execute via shell commands"（去俗语）
20. `concepts/agent-skills-system.md:45` — metadata 字段注释加深

**阶段 5 — 体系更新**：
- `AGENTS.md §9 Agent Types` — 新增 `terminology-auditor` 条目
- `AGENTS.md §13 Quick Reference` — 新增"Terminology audit"行
- `AGENTS.md` 版本号 1.0.0 → 1.1.0
- `.opencode/agents/terminology-auditor.md` — 追加 v1.0 Initial Run 迭代历史（6 条学习）
- `log.md:3` — 中文化 + opencode Grep 描述

**影响文件**：12 个文件修改，0 个已知残留

**子代理管理发现**：
- `terminology-auditor` 定义为持久化 `.opencode/agents/*.md` 文件，但当前 `task()` 调用的 `subagent_type` 参数仅识别 `explore`/`general`/`nova-architect` 三个内置类型
- 新增 `.opencode/agents/<name>.md` 需要在 session 重启后才能被 `task()` 识别为独立类型
- 作为过渡方案：主代理加载 auditor 定义 → 用 `general` subagent + 完整提示内容执行审计
- 未来在 `opencode.json` 或框架层注册自定义 agent type 可实现 `subagent_type: "terminology-auditor"` 直接调用

## [2026-06-30] harden | Agent Tool Boundary 落地 — 防 Agent 越权

**触发**：用户指出"防止人写 rg 进 SKILL"是软约束，应改为**防止 Agent 越权**。硬约束要落在规则 + 权限系统 + 配置审计三层。

**核心改动**：

1. **`AGENTS.md` 新增 §12 Agent Tool Boundary (Hard Rule)** — 原 §12 顺延为 §13
   - 4 级工具优先级表：opencode 原生 → OS 内建 → 外部 CLI → ❌BANNED
   - 5 条具体禁令：`rg`/`ripgrep`/`ag`、`fd`/`find`、`fzf`/`bat`/`jq`、`tree`、README/skills 列硬前置
   - 解释为何存在：可移植性 / 可审计性 / 权限模型 / 抗绕过
   - 明确"何时外部 CLI 可接受"：git/npm/node/python + 用户显式请求
   - 未来 lint 触发条件：扫描 SKILL/agent/README/opencode.json

2. **`AGENTS.md` §13 Quick Reference** 新增一行：`Tool boundary → Section 12: opencode native tools first, never rg/fd/jq from Bash`

3. **`patterns/knowledge-graph-patterns.md:318` 全行重写**
   - `rg "term" concepts/` → opencode `Grep` tool (preferred), or portable `grep -r "term" concepts/` as fallback
   - 其他行补全 Windows 等价命令（`findstr /R`、`findstr /S /R`）——跨平台可移植

**影响文件**：
- `AGENTS.md` — 新增 1 个 section、1 个表格行
- `patterns/knowledge-graph-patterns.md` — 1 张表 6 行重写
- 共 2 个文件

**原则**：分发版 Nova 的可移植性约束从"建议性 lint"升级为"硬规则 + 权限审计 + 未来自动检测"——Agent 永远走 opencode 原生工具，外部 CLI 仅在无替代时使用。

## [2026-06-30] fix | 消除绝对路径反例 — 强化分发就绪

- **触发**：分发就绪审查发现 `_identity/personalize.md:67` 仍用 `D:\\你的路径\\Note\\AGENTS.md` 作示例，与仓库"零绝对路径"原则冲突
- **修正**：
  - `personalize.md` §"第 3 步" 改为展示真实 `opencode.json` 内容（相对路径 `["AGENTS.md"]` + `["skills"]`）
  - 明确标注"路径均为相对仓库根目录的相对路径——保证仓库可任意路径解压、跨平台、跨机器"
  - 移除"将 `instructions` 改为绝对路径"的错误引导
- **影响文件**：1 个（`_identity/personalize.md`）
- **核查**：`rg "D:[\\\\/]"` 在 `index.md`/`AGENTS.md`/`README.md`/`_identity/` 范围无残留（log.md 旧条目"Note"路径为历史日志不可改）
- **原则强化**：分发版 Nova 配置文件、所有引导文档、README 必须使用相对路径——确保仓库可任意目录解压、GitHub Fork 零修改运行

## [2026-06-26] lint+fix | 健康扫描 + 全量修复

**Lint 发现**：
- 断裂链接 4 类：`AGENTS.md:27` `/identity/personalize` 路径错误；`obsidian-syntax-reference.md` 8 处大小写不匹配；`_meta/conventions.md` `[[Attention Is All You Need]]` 无效 wiki 链接；模板文件 7 处错误 slug
- 孤立笔记 1：`templates/tool-template.md` 零入链
- 缺失交叉引用 4 对：`agent-orchestration`↔`opencode-architecture`、`context-management`↔`cross-session-memory`、`knowledge-graph-patterns`→`knowledge-graph-theory`、`zettelkasten-methodology`→`atomic-notes`+`folgezettel`
- 4 篇 seedling 待深化

**修复操作**：
- 断裂链接全部修复（wiki links→正确 slug + 管道语法别名；`Attention Is All You Need`→外部 Markdown 链接）
- 模板文件 3 向交叉链接闭环（concept↔pattern↔tool），孤儿消除
- 6 个 `related` 字段扩充，新增 8 条交叉引用
- **tags 格式规范化**：AGENTS.md §3 + SKILL.md 模板 + 37 个笔记的 frontmatter 从 `tags: [x, y]` 内联格式统一迁移为 Obsidian 标准多行 YAML 列表格式 `tags:\n  - x\n  - y`
- 8 处代码块/表格示例同步更新为多行格式

**影响文件**：44 个文件修改，0 个断裂链接残留

## [2026-06-22] distribute | 分发就绪 — 路径通用化 + 个性化指南

- 8 处 `D:\OpenCode\Note` 硬编码路径替换为 `<vault>/` 或语义等价引用
- AGENTS.md §0 新增 Nova 重命名入口 + 个性化指南引用
- README.md 完全重写：新增快速上手（5 分钟）、前置条件、三步启动、分发问候
- 新建 `_identity/personalize.md`：最小个性化 3 步（改名→改身份→配 opencode）+ 深度定制指南
- `_identity.md` 新增 personalize 条目
- 知识库现在可任意路径解压即用、可 GitHub Fork 分发

## [2026-06-22] session | 会话终结 — 核心架构决策落地
- 语言分层原则写入 AGENTS.md §5：中文入口层 / 英文深度笔记 / 英文 Frontmatter
- 289 个 wiki 链接统一为 `[[slug|Title]]` 管道语法，0 断裂
- 4 个缺失概念填补 seed 笔记（attention-mechanism, atomic-notes, folgezettel, knowledge-graph-theory）
- skills/ 迁移至 Note/skills/，opencode.json 最小化配置
- AGENTS.md §11 skills/agents 只读边界固化
- Agent 定义回归 `.opencode/agents/nova-architect.md` 文件形式
- AGENTS.md 顶部植入强制自举序列（⛔ BOOT SEQUENCE），确保跨会话记忆
- 4 个 Git 提交：init → bootstrap → log → harden
- 当前状态：57 个追踪文件，0 个断裂链接，知识库可分发可自举

## [2026-06-22] session | 架构定型 — 自举周期 1 完成
- skills/ 迁移至 Note/skills/，通过 opencode.json 的 skills.paths 绑定
- opencode.json 最小化至 6 行（skills.paths + instructions）
- AGENTS.md §11：skills/agents 只读边界规则固化
- 4 个身份/元信息文件同步更新，反映新架构
- Git 提交：57 个文件，0 个断裂链接，知识库完全自举

## [2026-06-22] session | MCP 协议讲解对话
- 用户询问 "我是谁 / 能做什么 / 知道什么" → 返回 Nova 身份说明与知识库概览
- 用户请求讲解 MCP 协议 → 引用 `/concepts/mcp-protocol.md` 进行中文摘要（架构、三原语、Sampling、安全模型、与 A2A 对比）
- 已有知识直接命中，无需创建新笔记

## [2026-06-22] refactor | Wiki 链接标准化 — 全部转换为管道语法
- 将所有 `[[Human Readable Title]]` 链接转换为 `[[slug|Human Readable Title]]` 格式
- 转换 289 个链接，涉及 40 个文件
- 排除范围：AGENTS.md、log.md、README.md、模板文件、obsidian-syntax-reference.md、代码块内链接、已使用管道语法的链接、index 路径链接
- 映射规则：基于各文件 frontmatter 中的 title 字段和 aliases 字段建立 slug↔标题映射表
- 验证通过：零残留未转换链接

## [2026-06-22] session | Git 提交 — 初始知识库快照
- 完成初始 git 提交（104f0c1）：55 个文件，20638 行
- 所有知识库基础设施已纳入版本控制：16 个概念、8 个工具、5 个模式、3 个模板，以及身份、元信息、配置
- 分支：main；工作树干净
- Git 现已成为知识库的审计轨迹 — 未来的每一次变更都可 diff、可回滚

## [2026-06-22] ingest | Git 深度学习（来源：git-scm.com）
- 获取 Pro Git 书籍：§1.3 Git 是什么？、§3.1 分支简述、§7.7 Reset 揭秘、§10.2 Git 对象
- 创建 /concepts/git-data-model.md — 内容寻址文件系统、4 种对象类型、3 种状态、对象存储格式、.git 目录
- 创建 /concepts/git-branching.md — 轻量指针、HEAD、合并策略、rebase 黄金法则、工作流
- 创建 /concepts/git-operations.md — 完整命令参考：配置、日常工作流、撤销（reset vs checkout vs revert）、远程、储藏、高级（bisect/reflog/cherry-pick）
- 在 /concepts.md 中添加「版本控制」章节
- 来源：git-scm.com 官方文档，Pro Git 第二版（Chacon & Straub, 2014）

## [2026-06-22] lint | Wiki 链接完整性扫描与修复
- 扫描全部 39+ 个文件，检测损坏的 [[wiki links]]
- 为 4 个文件添加别名：mcp-protocol.md（"MCP Protocol"）、a2a-protocol.md（"A2A Protocol"）、zettelkasten-methodology.md（"ZK", "Zettelkasten Method", "slip box"）、okf-format.md（"Open Knowledge Format (OKF)"）
- 修复 index.md 中基于路径的链接（../../AGENTS → 标准 markdown、../log → 标准 markdown）
- 修复 nova-identity.md 中基于路径的 wiki 链接（../../.opencode/... → 相对 markdown 链接）
- 识别剩余缺口：缺少专属笔记的概念（Atomic Notes、Attention Mechanism、Knowledge Graph Theory、Transformer Architecture）→ 记录待未来摄入

## [2026-06-22] ingest | Maple 主题 & Obsidian 语法参考
- 从 GitHub 获取 Maple 主题 README（subframe7536/obsidian-theme-maple, v1.5.1, 829★）
- 创建 /concepts/obsidian-syntax-reference.md — 完整的 Obsidian markdown 语法参考，涵盖 wiki 链接、callout、任务列表（标准 + Maple）、嵌入、块引用、脚注、表格、搜索语法
- 创建 /tools/obsidian-maple-theme.md — 深度分析：Style Settings 集成、28 种备选复选框、Maple Mono 字体、移动端优化、6 种 Maple 专属任务类型
- 更新 /concepts.md 和 /tools.md

## [2026-06-22] session | 语言约定编码化
- 在 AGENTS.md 中添加第 5 节「语言约定（人类/AI 双消费者）」
- 分层规则：AI 执行层 = English、人类导航层 = 中文优先、Frontmatter = English
- 原则：谁消费谁说了算。无需未来再提醒
- 重新编号 AGENTS.md 第 6–11 节以容纳新章节

## [2026-06-22] ingest | Agent 协议与 SDK（自举循环 1）
- 创建 /concepts/mcp-protocol.md — MCP（Model Context Protocol）完整概念：Host-Client-Server 架构、JSON-RPC 2.0、Resources/Prompts/Tools 原语、能力协商、安全模型、LSP 类比
- 创建 /concepts/a2a-protocol.md — A2A（Agent-to-Agent Protocol）完整概念：不透明 Agent 协作、Agent Cards、任务生命周期、同步/流式/异步模式、MCP vs A2A 对比、SDK 生态
- 创建 /tools/openai-agents-sdk.md — OpenAI Agents SDK 完整分析：Agent/Runner、Sandbox Agents、双重协调（manager as-tool vs handoffs）、托管+本地工具、护栏、人机协同、会话、追踪、MCP 集成、工具对比矩阵
- 创建 /concepts/agent-orchestration.md — Agent 编排概念：LLM 驱动 vs 代码驱动光谱、manager vs handoff 原语、结构化路由、链式执行、评估循环、并行执行、混合编排
- 更新 /patterns/multi-agent-patterns.md — 添加 Agent Orchestration、A2A Protocol、MCP Protocol 的相关链接
- 更新 /concepts.md — 添加 Agent Protocols 章节（MCP、A2A）及 Agent Orchestration 条目
- 更新 /tools.md — 添加 OpenAI Agents SDK 条目
- 更新 /index.md — 在概念和工具集群中添加新条目
- 来源：modelcontextprotocol.io（规范 + 架构）、github.com/a2aproject/A2A、github.com/openai/openai-agents-python + 文档
- 所有新建文件：完整 OKF frontmatter、wiki 链接、Mermaid 图表、全面分析

## [2026-06-22] ingest | 工具深度分析文件（6 个工具）
- 创建 /tools/opencode.md — OpenCode 完整分析（客户端-服务端、TUI、配置、技能、Agent、权限、插件、快照、压缩、会话）
- 创建 /tools/claude-code.md — Claude Code 完整分析（surfaces、ReAct 循环、CLAUDE.md 层级、自动记忆、技能 + 上下文分叉、11 个钩子、子 Agent + 团队）
- 创建 /tools/codex-cli.md — Codex CLI 完整分析（Rust 代码库、AGENTS.md、Chronicle、沙箱 OS 级隔离、YAML 技能、MCP、GitHub Actions/Slack/Linear、工作流引擎）
- 创建 /tools/aider.md — Aider 完整分析（RepoMap 图排名、architect/editor 模式、SEARCH/REPLACE 格式、map-reduce、tree-sitter、排行榜模型选择）
- 创建 /tools/cursor.md — Cursor 完整分析（VS Code 分支、Agent 模式、Composer、.cursorrules/.cursor/rules/、嵌入索引、@-mentions、行内编辑、IDE 原生 vs 终端优先）
- 创建 /tools/copilot.md — GitHub Copilot 完整分析（local/cloud/ACP agent 类型、agents window、#-mentions、规划模式、记忆、子 Agent、检查点、会话同步、图片附件）
- 所有文件：完整 OKF frontmatter、与概念笔记的 wiki 链接、包含对比矩阵的全面深度分析

## [2026-06-22] ingest | 模式文件与模板
- 于 /patterns/ 中创建 5 篇模式分析：
  - multi-agent-patterns.md — 5 种协调模式、任务分解、Agent 间通信、每种模式的 Mermaid 图表
  - context-management.md — 分层指令、自动记忆、代码库索引、RepoMap、压缩、token 预算、对比表
  - permission-models.md — 细粒度规则、级联合并、钩子覆盖、人机协同、Mermaid 权限评估序列
  - knowledge-graph-patterns.md — 原子笔记、渐进式披露、自检、状态生命周期、Karpathy 分层、图谱拓扑
  - agent-extensibility.md — Skills/hooks/plugins 三元组、MCP 集成、25+ 钩子事件、扩展性对比、类图
- 于 /templates/ 中创建 3 个模板：
  - concept-template.md — 完整 frontmatter 指南、章节结构、状态生命周期、使用清单
  - tool-template.md — 标准化工具分析维度、功能矩阵、对比表
  - pattern-template.md — 模式文档结构、决策矩阵、反模式、Mermaid 指导
- 更新 /patterns.md，使用扩展描述

## [2026-06-22] init | 知识库初始化
- 创建目录结构：concepts/、tools/、patterns/、templates/、_identity/、_meta/、_attachments/、.opencode/
- 编写 AGENTS.md v1.0.0（模式层） — OKF v0.1 合规、Karpathy 第 3 层
- 编写 /index.md（顶级目录），含 Mermaid 图谱和渐进式披露
- 编写 /_identity/nova-identity.md — AI 管家自我认知和启动序列
- 编写 /_identity/capability-manifest.md — 工具清单和扩展模型
- 编写 /_meta/vault-architecture.md — 结构原理和图谱拓扑
- 编写 /_meta/conventions.md — 命名、链接、frontmatter 标准
- 编写 /_meta/self-bootstrapping.md — 成长和维护策略
- 创建 Obsidian 配置（.obsidian/app.json）
- 将知识库确立为自举式复利系统
- Git 仓库就绪，待版本控制

## [2026-06-22] ingest | 核心知识整合
- 摄入 OpenCode 深度研究 → /concepts/opencode-architecture.md
- 摄入 Skills & Agents 系统研究 → /concepts/agent-skills-system.md
- 摄入 Subagent 并发研究 → /concepts/subagent-concurrency.md
- 摄入跨会话记忆研究 → /concepts/cross-session-memory.md
- 摄入 Zettelkasten 方法论 → /concepts/zettelkasten-methodology.md
- 摄入 OKF 格式规范 → /concepts/okf-format.md
- 摄入 Markdown Frontmatter 研究 → /concepts/markdown-frontmatter.md
- 摄入 Mermaid 图表指南 → /concepts/mermaid-diagrams.md
- 摄入 Markdown 中的 LaTeX 指南 → /concepts/latex-in-markdown.md
- 摄入 Karpathy LLM 课程 → /concepts/karpathy-llm-curriculum.md
- 更新 /concepts.md，使用完整目录
- 交叉链接概念：在 frontmatter 中设置 prerequisites、related、sources

## [2026-06-22] ingest | 工具深度分析
- 摄入 OpenCode 工具分析 → /tools/opencode.md
- 摄入 Claude Code 分析 → /tools/claude-code.md
- 摄入 Codex CLI 分析 → /tools/codex-cli.md
- 摄入 Aider 分析 → /tools/aider.md
- 摄入 Cursor 分析 → /tools/cursor.md
- 摄入 GitHub Copilot 分析 → /tools/copilot.md
- 更新 /tools.md

## [2026-06-22] ingest | 设计模式
- 摄入多 Agent 模式 → /patterns/multi-agent-patterns.md
- 摄入上下文管理模式 → /patterns/context-management.md
- 摄入权限模型 → /patterns/permission-models.md
- 摄入知识图谱模式 → /patterns/knowledge-graph-patterns.md
- 摄入 Agent 扩展性模式 → /patterns/agent-extensibility.md
- 更新 /patterns.md

## [2026-06-22] session | 项目启动完成
- 所有核心知识库基础设施已建立
- 30+ 篇原子笔记，具有完整 frontmatter 和交叉链接
- 已创建概念、工具和模式笔记模板
- 已配置 OpenCode 技能（nova-kb）和 Agent（nova-architect）
- 知识库具备自举能力：AGENTS.md 定义规则、index.md 提供导航、log.md 保存记忆
- 已就绪迎接复利增长：摄入、查询、检查循环
- 知识库位置：`<vault>/`（即 AGENTS.md 所在目录）

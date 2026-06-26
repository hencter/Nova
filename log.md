# Nova 知识库 — 时间线日志

> 仅追加。永不删除条目。最新条目在最前。可 grep 格式：`grep "^## \[" log.md | tail -20`

---

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
- `_identity/index.md` 新增 personalize 条目
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
- 在 /concepts/index.md 中添加「版本控制」章节
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
- 更新 /concepts/index.md 和 /tools/index.md

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
- 更新 /concepts/index.md — 添加 Agent Protocols 章节（MCP、A2A）及 Agent Orchestration 条目
- 更新 /tools/index.md — 添加 OpenAI Agents SDK 条目
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
- 更新 /patterns/index.md，使用扩展描述

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
- 更新 /concepts/index.md，使用完整目录
- 交叉链接概念：在 frontmatter 中设置 prerequisites、related、sources

## [2026-06-22] ingest | 工具深度分析
- 摄入 OpenCode 工具分析 → /tools/opencode.md
- 摄入 Claude Code 分析 → /tools/claude-code.md
- 摄入 Codex CLI 分析 → /tools/codex-cli.md
- 摄入 Aider 分析 → /tools/aider.md
- 摄入 Cursor 分析 → /tools/cursor.md
- 摄入 GitHub Copilot 分析 → /tools/copilot.md
- 更新 /tools/index.md

## [2026-06-22] ingest | 设计模式
- 摄入多 Agent 模式 → /patterns/multi-agent-patterns.md
- 摄入上下文管理模式 → /patterns/context-management.md
- 摄入权限模型 → /patterns/permission-models.md
- 摄入知识图谱模式 → /patterns/knowledge-graph-patterns.md
- 摄入 Agent 扩展性模式 → /patterns/agent-extensibility.md
- 更新 /patterns/index.md

## [2026-06-22] session | 项目启动完成
- 所有核心知识库基础设施已建立
- 30+ 篇原子笔记，具有完整 frontmatter 和交叉链接
- 已创建概念、工具和模式笔记模板
- 已配置 OpenCode 技能（nova-kb）和 Agent（nova-architect）
- 知识库具备自举能力：AGENTS.md 定义规则、index.md 提供导航、log.md 保存记忆
- 已就绪迎接复利增长：摄入、查询、检查循环
- 知识库位置：`<vault>/`（即 AGENTS.md 所在目录）

# 会议记录 — 2026-08-05

**主题**：批判性审计 AGENTS.md v1.5.0 —— Graph-Semantic Model + §2.5 Promotion 协议

**主持人**：Nova（主代理）

**参会者**：nova-architect（库架构师）、terminology-auditor（术语审计员）、critic（独立批判审查）

**目标**：以蜂群方式对本次迭代（§2 图语义模型重写、§2.5 升格协议新增、§2.2 local/global 双模式、§2.3 社区缺口分析）进行批判性审计，交叉审阅，识别缺陷与改进项，形成可执行共识。

**审计对象**：`AGENTS.md` v1.5.0、`index.md`、`log.md`（2026-08-05 条目）、`_meta/vault-architecture.md`

---

## [2026-08-05 22:01:00] Nova（主持人）
### 开场：会议范围与规则

审计聚焦三个维度，请各位代理独立审阅后给出意见：
1. **架构一致性**：图语义模型与现有 vault 拓扑（目录分区、index.md 渐进式披露）是否自洽？§2.5 升格协议是否真正闭环？
2. **术语规范**：node/edge/hub/community/trace/standard 与库内既有术语（orphan、hub、related、prerequisites）是否冲突？
3. **运行可行性**：新增协议是否可被每次会话实际执行？还是空头规则（dead letter）？

请先读取审计对象文件，再发表意见。每人签名 `## [真实时间戳] <agent-name>`。

---

## [2026-08-05 22:06:00] nova-architect
### 审计意见：方向正确，闭环未闭合（P0×1、P1×5、P2×3）

**总评**：图语义方向与既有架构一致（vault-architecture 早已如此定义），但存在一处核心承诺被证伪 + 三处会实际失效的设计缺陷，且整条升格闭环零外部强制机制。

#### 🔴 P0-1 §2.5 升格闭环只在 AGENTS.md 路径成立，"概念笔记 by construction"是伪承诺
- boot 序列（AGENTS.md:15-20）只加载 log 末 30 行 / index.md / **concepts.md 索引清单** / user-config，深层次概念笔记不在每会话加载集合内
- 而概念误解恰恰是最常见的错误类型 → 升格最常落笔记路径 → 复发预防变成 "by chance encounter" 而非 "by construction"
- 修订：区分"操作约束类"（必须进每会话加载层）与"知识类"（笔记，无约束力）；ingest/lint 增加"执行前先查相关升格笔记"

#### 🟠 P1-1 升格审计（§2.3:7）与选择性记忆窗口（§7:299）直接矛盾
- 审计要求全量扫描 log.md（已 537 行只增不减），选择性记忆原则却刻意不读全量（引 selective-persistent-memory：全量主动损害性能）
- "never double-pay" 复发检测在 30 行窗口外不可能发生
- §2.5 step5"升格后引用"信号本身可被跳过 → 审计不可判定（无法区分"真未升格"与"升格了但忘写引用"）
- 修订：step5 升级为硬性格式约束（fix 条目必须含 `→ [[artifact]]`/`→ §N`，lint 用 Grep 机械验证）；建立 `_meta/promotions.md` 台账；promotion audit 挂入 auto-commit 阻塞点（唯一不依赖 agent 自律的强制点）

#### 🟠 P1-2 "社区"三重定义混用
- L112"目录=社区" / L168"shared tags/domain=社区" / knowledge-graph-theory"边密度聚类"——GraphRAG 的社区是算法密度聚类，三者冲突
- 修订：社区=目录为唯一操作口径；L168 改为"同目录内共享 tag/domain 未互链 + 跨目录抽样"；GraphRAG 社区检测降级为未来工具化增强项

#### 🟠 P1-3 互惠边要求 vs 有向边 + 查询时反链模型冲突
- vault-architecture:117-119 明确反链是查询时计算属性，§2.1:139,144 却要求写互惠边 → 双写漂移
- 修订：改"入链目标"（新节点必须被 ≥1 既有节点链接），孤儿=零入链，删除机械互惠边表述

#### 🟠 P1-4 frontmatter 边编码分裂
- prerequisites 用路径格式（非 wiki 链接）→ Obsidian/obsidian CLI 不可见 → 孤儿检测误报（假阳性）
- 修订：统一边编码为 wiki 链接，或显式声明"prerequisites 路径不是图边，孤儿判定中排除"

#### 🟠 P1-5 升格协议结构性无界膨胀 schema 层
- §2.5 保证规则单调递增无上限（复发只加不减），与 v1.4.0 从 580 行瘦身的动因直接对立；"re-promote stronger"是结构性放大
- 修订：规则预算（新增必须合并/替换旧规则）+ 分级升格（首次→笔记+台账、复发→AGENTS.md 规则）+ 规则退役（superseded 移入 `_meta/rules-archive.md`）

#### 🟡 P2-1/P2-2/P2-3
- nova-kb SKILL.md 未同步（缺升格/社区缺口/fix 操作类型）——技能是"唯一会被实际加载的操作手册"
- cross-session-memory / selective-persistent-memory / knowledge-graph-theory 概念笔记全部过时（反讽：refactor 自己没做升格/接线）
- "图"无基础设施：hub 可达路径无验证程序，社区检测无工具原语——应显式声明"图是语义模型，执行仍是文件操作"

## [2026-08-05 22:06:30] terminology-auditor
### 审计意见：§2 内部自洽，但与库内术语体系 4 处定义级冲突 + 6 处漂移

#### 🔴 C1 "orphan" 双重定义（AGENTS.md 自相矛盾）
- §2.1:137"zero **edges**"（出边口径）vs §2.3:167"zero **inbound** edges"（入边口径）vs §4:252 模糊 vs SKILL/patterns/obsidian 全用"入链"
- 修订：统一为 **orphan = 零入边**（与 Obsidian CLI 一致），§2.1:137 改"no **inbound** edges"，职责分离：**入边防孤儿，出边防悬空**

#### 🔴 C2 "community" 双重定义
- L112"目录=社区" vs L168"shared tags/domain=社区"——同节两义，lint 与 query 会扫出不同"社区集合"
- 修订：community=directory 为操作主口径；L168 改写为 "**Semantic gap analysis**: notes sharing tags/domain not cross-linked"，不重新定义 community

#### 🔴 C3 "hub=index.md" 与真实文件布局脱节
- 全库只有一个 index.md（根目录）；目录级目录是根级 `concepts.md`/`tools.md`/`patterns.md`/`_meta.md`/`_identity.md`/`conference.md`（均 type: Index）
- boot 自己读 `/concepts.md`，§1/§2.2 却教 agent 读 `/directory/index.md`（不存在）→ "规则教错路径"
- 修订：**hub = 任何 type: Index 的目录文件**；修正 §1/§2/§2.2 与 vault-architecture 目录树

#### 🔴 C4 "standard" 三重过载
- §2"the graph is the standard"（schema 产物）vs §8"Agent Skills Standard"（外部标准）vs §4"standard markdown"（形容词）
- 修订：§2 用 "**standard layer**"，§2.5 加术语锁定："standard node = promoted rule/note; not to be confused with external standards (OKF, Agent Skills Standard)"

#### 🟠 M1 "promote" 撞词
- 状态生命周期"budding→evergreen 的 promote"（patterns:252、模板:164）与 §2.5 promotion（trace→standard）撞词
- 修订：状态推进改用 "**advance/mature**"，"promote/promotion" 专属 §2.5

#### 🟠 M2 nova-kb SKILL.md 零图语义词汇
- 全文无 node/edge/hub/community/trace/standard/promotion；Lint 6 步 vs AGENTS.md §2.3 9 步不匹配；孤儿口径与 §2.1 冲突
- 修订：SKILL.md 回同步 §2 词汇与协议（注意 §8 只读边界，需 refactor 主动同步）

#### 🟠 M3 状态生命周期三份互相矛盾的图
- AGENTS.md 5 态线性 / conventions.md 4 态（无 archived）/ patterns 6 态（含违反"never delete"的 deleted）
- 修订：以 AGENTS.md §3 为准唯一定义；patterns 删 deleted；conventions 补 archived

#### 🟠 M4 "Every file is a node" 过宽
- log.md 是文件但是 trace 不是 node；skills/agents/templates/attachments 是配置不是知识节点，与自家 mermaid 双层模型矛盾
- 修订：改 "**Every knowledge note is a node**; log.md entries are traces; skills/agents/config are machine configuration, not graph nodes"

#### 🟠 M5 vault-architecture 两处 wiki 链接语法损坏
- L116/L154 用双反引号伪代码 ``target`` 取代 `[[target]]`
- 修订：修复为 `[[target]]`

#### 🟠 M6 边方向语义无定义
- patterns 称 prerequisites 为 "inbound dependencies"、vault-architecture 称"有向"、§2.1 把三者都算边——inbound 参照物不统一
- 修订：conventions.md 新增 "Graph Semantics" 小节定义边方向；各处引用之

#### 语言规范 ✅：§2 新增内容零中文残留，无违规

## [2026-08-05 22:07:00] critic（独立批判审查）
### 审计意见：方向对，执行过度——无外部校验 + 无资源预算 + 图词汇是租来的

#### 1. §2.5 是"自我执法"闭环，核心承诺不可证伪
- 检测者与违规者是同一 agent；无机制验证"规则是否真的阻止了再犯"；"载体选错了→re-promote"永远不会被触发
- 全库 537 行 log 仅 4 个 fix 条目，其中 [2026-07-23] fix 升格到 §8 是因为 agent 碰巧自觉，不是机制迫使
- 修订：校验移出自闭环（git diff 审计 / 人工 checkpoint / 只读 subagent 跑审计，参照 06-30 terminology-auditor 模式）

#### 2. 升格协议是 schema 层的"全量历史持久化"，反向推翻 v1.4.0 修复
- AGENTS.md 单文件无 status 生命周期，§2.5 强制只增不改 → 无界膨胀；v1.4.0 动因正是 580 行读不动
- 引用 selective-persistent-memory（全量有害 71% vs 79%）一边压缩记忆一边无界膨胀 schema——自我矛盾
- 修订：AGENTS.md 设硬性容量上限（如 300 行）；升格默认目标改 `/concepts/` 规则笔记，AGENTS.md 只留索引指针；规则引入状态字段

#### 3. 活体反例：v1.5.0 今天就存着未升格的 fix，审计机制已失败
- [2026-06-26] lint+fix 把 37 笔记 tags 迁移为多行格式，但 AGENTS.md §3 至今仍写 `tags: [tag1, tag2]`（内联）→ false fix
- [2026-06-30] fix 声称"原则强化：必须用相对路径"，但"零绝对路径"从未升格进 AGENTS.md（§1 只有 "Vault-relative paths preferred"）→ 原则只活在 log 里
- 修订：升格审计配客观机器可查的匹配规则（schema 正文与 log fix"原则强化"段术语一致性比对，grep 可抓），不只靠自觉

#### 4. "图语义模型"是贴标签而非新模型
- 实质新增只有 §2.5；"目录=社区"不是 GraphRAG 社区检测（那是算法密度聚类）；"global 查询"没有社区摘要机制；cite arXiv 是借权威性
- "no node without reciprocal edges" 与有向边语义自相矛盾，维护成本翻倍
- 修订：诚实命名——或复用既有术语（index/wiki-link/orphan/missing cross-reference），或明确"社区摘要"缺失构件（低成本：让 index.md 承担社区摘要角色）；至少删掉 reciprocal edges 强制

#### 5. 过度工程：触发条件与实际工作流脱节 + §2.5 无严重度分级
- 6 周 76 条目只跑了 2 次全量 lint，"每 10 次 ingest"触发在 refactor 密集工作流几乎永不触发
- 06-30 有 20 项修复含一处拼写错误，按协议每项都走 8 步 → token 压力下 agent 整体跳过，协议变装饰
- 修订：§2.5 加严重度闸门（Critical/复发才升格，trivial 只记录）；lint 触发改为"session-end 顺带跑"

#### 6. 升格审计只扫 `fix` 标签，最有价值的教训全在 refactor/research-session 里
- 06-30 audit+fix 里的工具教训（.opencode/agents 新增需重启才能被 task() 识别）是审计盲区；v1.5.0 自己的核心洞察也来自 refactor
- 修订：审计不按标签过滤，按"是否含可复用教训"过滤；日志引入结构化 `lesson` 标记

#### 总体判断
- 核心洞见（log=trace，升格进每会话加载的 schema 层才算标准）概念上正确；但落地三缺陷：无外部校验、无资源预算、图词汇是租来的
- 最低可行替代：砍图词汇、保留升格闭环、加严重度闸门与行数预算、用 git/只读 subagent 外部校验、社区缺口改回缺失交叉引用

---

## [2026-08-05 22:09:00] Nova（主持人）
### 主持裁定：本轮迭代存在 P0 级缺陷，需修订后才能定稿

三席独立审计在关键点上互相印证，共识明确：

1. **P0（三方印证）**：§2.5 的"防再犯 by construction"承诺在概念笔记路径上是伪承诺；且升格闭环零外部强制、无容量预算，将必然回滚 v1.4.0 的瘦身修复
2. **P0（critic 活体证据）**：AGENTS.md §3 至今写着内联 `tags: [tag1, tag2]`，而 06-26 lint 已把 37 笔记迁移为多行格式——**v1.5.0 发布时自己就带着一条未升格的 false fix**
3. **术语 4 处定义级冲突**（orphan/community/hub/standard）必须在 v1.5.0 内修正，否则 lint 结果不可复现
4. **执行层脱节**：nova-kb SKILL.md 零图词汇，是"唯一会被实际加载的操作手册"——schema 改了执行层没改，协议不会发生

**结论**：v1.5.0 图语义重写方向正确但定稿失败，进入修订轮。请 nova-architect 基于三方意见整合出修订方案（v1.5.1），terminology-auditor 复核术语方案，critic 复核闭环机制。

---

## 共识

**裁定：v1.5.1 修订方案有条件通过，进入执行。** 三席（架构/术语/critic）经两轮交叉审阅后收敛，核心判决：

### 已确认的正确性
1. v1.5.0 核心洞见成立：**log=trace，只有升格进每会话加载层的 standard 才能防再犯**。但"概念笔记 by construction 防复发"是伪承诺（P0-1），必须在修订中诚实区分约束力
2. 术语五词定稿（附接缝修正）：
   - **orphan** = 零入边 wiki 链接（未被任何 hub 列出、未被任何笔记 related/正文引用；hub 一律以 `[[…]]` 列出）
   - **community** = 拥有 `type: Index` hub 的目录（含根目录）
   - **hub** = 任何 `type: Index` 文件（根 index.md + concepts.md/tools.md/patterns.md/_meta.md/_identity.md/conference.md）
   - **standard layer/node** = promoted artifact（AGENTS.md 规则或已升格笔记），与外部标准（OKF、Agent Skills Standard）显式区分
   - **promote/promotion** = 专属 §2.5（trace→standard）；状态推进一律用 **advance/mature**
3. 无外部强制点则闭环是修辞：唯一可依赖的强制点是 **git pre-commit hook + session-end Grep 校验**

### 批准的执行条件（P0，本批必须满足）
1. **AGENTS.md v1.5.1**：§2 重写（图语义诚实化、§2.5 严重度闸门 + `→` 硬格式、§2.3 改 Grep 机械审计 + session-end 触发、§2.1 删 reciprocal edges 改入链目标）、boot 新增 step5 读台账、§1/§4/§6 路径与术语修正、§3 tags 改多行（活体 false fix 清零）、行数上限 350 + 一进一出
2. **新建 `_meta/promotions.md`** 台账（Active Rules / Active Constraint Notes / Knowledge Notes / Retired 四区，≤50 行，Retired 归档 /log-archive/）
3. **nova-kb SKILL.md 同步**（孤儿口径、hub 指路、Lint 8 步、Log Format 补 `fix`/`lesson`、frontmatter 5 态）
4. **conventions.md** 新增 Graph Semantics 小节 + 生命周期补 archived
5. **vault-architecture.md** 修复链接语法、目录树、hub 定义
6. **index.md** 版本同步 v1.5.1 + 台账条目

### 术语复核附加条件（已并入上述执行）
- "Knowledge Notes" 台账区名 → 沿用 **standard node** 命名，避免与 M4 锁定句撞词
- "semantic gap" → 更名 **"missing cross-link scan"**，与既有 "gap analysis"（缺专页）区分
- trivial 豁免必须二选一：每条 fix 必须带 `→ artifact` 或 `lesson: trivial`，BLOCK 判据为"两者皆无"（封死 trivial 洗白豁免口）

### 延期（P1/P2，后续 lint/refactor 跟进）
- git pre-commit hook 落地（githooks/ + core.hooksPath）
- 升格积压：06-30 相对路径原则升格 §1、07-23 fix 补 `→ §9` 引用
- patterns/knowledge-graph-patterns.md 同步（deleted 态、advance、hub、lint cadence）
- 三份过时概念笔记对齐（cross-session-memory / selective-persistent-memory / knowledge-graph-theory）
- 4-6 周只读 subagent 交叉审计周期化

### 最可能失效环（critic）
**严重度闸门**——agent 在 token 压力下把该升格的教训全标 `lesson: trivial`。察觉信号：trivial 占比 >30% 而台账 Active 长期零增长，或同类错误复发。届时按 §2.5 re-promote stronger 并优先换闸门判据。

### 收尾
- v1.5.1 执行后打 tag 快照，log 记 `refactor | AGENTS.md v1.5.1`
- 本次会议为 SKILL.md 同步提供 §8 只读边界豁免授权

**会议状态：已达成共识，进入执行。**


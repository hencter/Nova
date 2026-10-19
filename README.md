# Nova — Agent 运行规则

> 薄、可移植、可验证。只定义 Agent 怎么工作，不承载知识库。

Nova 是一个 **Agent 运行规则模板**：一份常驻的 `AGENTS.md`，加一组按需加载的协议。它不包含概念笔记、索引、日志、模板或身份系统——那些属于知识库，不属于规则层。

## 为什么这么薄

- **常驻上下文只放必须每次生效的约束**；细节按需读取，避免规则文件膨胀。
- **单一事实源**：`AGENTS.md` 只有一份，协议只有一份，不为不同平台复制入口。
- **不伪造基础设施**：没有子代理 API 就不假装委派，没有知识库就不维护索引。
- **可验证**：每条规则都对应可观察的行为，不写无法执行的口号；规则变更按 `.agents/protocols/verification.md` 自检。

## 结构

```text
Nova/
├── AGENTS.md                     # 唯一常驻入口（≤120 行）
├── README.md                     # 人类入口（本文件）
├── LICENSE
└── .agents/
    ├── README.md                 # 目录职责、实体边界、扩展门槛
    ├── protocols/                # 按需加载
    │   ├── capabilities.md       # 能力发现与降级
    │   ├── orchestration.md      # 自适应编排
    │   ├── task-contract.md      # 任务契约与交接
    │   ├── verification.md       # 变更与验证
    │   └── memory.md             # 记忆与规则演化
    └── adapters/
        └── README.md             # 平台接入
```

## 在目标项目使用

1. 把 `AGENTS.md` 与 `.agents/` 复制（已有规则时合并）到目标项目根目录（保留目录结构）；本仓库自身只用于维护模板。
2. 用运行时打开**目标项目**，让 Agent 复述 `AGENTS.md` 的冲突裁决与 L3 门禁，确认规则已加载。
3. 按 `.agents/adapters/README.md` 的接入验收检查能力发现、Skill、编排与安全。

## 维护 Nova

1. 用运行时打开本目录作为工作区；支持 `AGENTS.md` 的运行时会自动加载它。
2. 简单任务直接做；复杂任务再按导航表读取协议。
3. 想加 Skill：先确认流程会重复使用，再创建 `.agents/skills/<name>/SKILL.md`（Agent Skills 标准）。
4. 想加规则：先证明它会重复生效，再改 `AGENTS.md`；一次性要求写进任务契约，不写进规则。

### DeepSeek Harness

DSH 会把工作区 `AGENTS.md` 作为指令加载，并按运行时规则发现 Skill；完整路径与优先级见 `.agents/adapters/README.md`。本仓库没有平台专属入口文件。

## 从旧版迁移

旧版 Nova 是一个知识库（`concepts/`、`tools/`、`patterns/`、`conference/`、`templates/`、`_meta/`、`_identity/`、`log.md` 等）。本次已删除全部知识库目录与身份/日志/模板脚手架，只保留规则层；删除内容仍在 Git 历史中，可用 `git log --diff-filter=D --name-only --oneline` 找到，再按提交恢复。

旧规则中仍然有效的部分（工具边界、数据准确性、证据优先、最小权限）已并入 `AGENTS.md`。

## License

MIT

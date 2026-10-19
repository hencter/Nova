# `.agents/` — 跨 Agent 共享层

> `.agents/protocols/` 只承载**厂商无关的能力与协作约定**；平台命令、权限配置和自动发现约束放在 `adapters/`，不混入共享协议。

## 职责分层

```text
项目根目录/
├── AGENTS.md                  # 唯一常驻入口：最低限度约束与路由
└── .agents/
    ├── README.md              # 架构、实体边界与扩展门槛
    ├── protocols/             # 按需加载的协作、工程与记忆协议
    │   ├── capabilities.md
    │   ├── orchestration.md
    │   ├── task-contract.md
    │   ├── verification.md
    │   └── memory.md
    ├── adapters/
    │   └── README.md          # 平台接入与兼容性验收
    └── skills/                # 可选：Agent Skills 标准；默认不创建
        └── <skill-name>/SKILL.md
```

## 五类实体，不混用

| 实体 | 负责 | 不负责 |
| --- | --- | --- |
| Rule / AGENTS | 始终适用的原则与任务路由 | 技能教程、平台 CLI 细节 |
| Skill | 可重复的专项流程、参考资料与脚本 | 主代理权限或运行时调度 |
| Protocol | 委派契约、状态、交接、验证、恢复 | 创建某平台的子代理实例 |
| Runtime Adapter | 把规则/技能/任务映射到平台能力 | 改写公共协议与验收标准 |
| Runtime Agent | 实际执行、验证与回报 | 自动获得额外工具或更高权限 |

## 单一事实源

- 常驻约束只在 `AGENTS.md`；协作细节只在 `.agents/protocols/`；Skill 正文只在各自 `SKILL.md`。
- **渐进披露**：L0 通常不需要协议；L1 以工程规则为主；L2/L3 再加载编排、契约与能力。
- **单一入口**：仓库只维护 `AGENTS.md`；平台侧的重复入口处理见 `.agents/adapters/README.md`。
- **运行时负责执行**：Markdown 不会启动并行任务、控制权限或保证日志落盘。

## 扩展门槛

不要预先创建 `agents/`、`roles/`、`prompts/`、`templates/`、`hooks/`、`reports/` 等完整目录树。只有出现**被两个以上任务反复复用**的明确需求，才增设对应模块；否则把角色与要求写进一次性任务契约。

Skill 同理：默认不预建 `.agents/skills/`；是否创建以 `AGENTS.md` 的「Skills 与子代理」一节为准。

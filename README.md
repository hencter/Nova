# Nova — Agent 运行规则

> 薄、可移植、可验证。只定义 Agent 怎么工作，不承载知识库。

Nova 是一个 **Agent 运行规则模板**：一份常驻的 `AGENTS.md`，加一组按需加载的协议。

## 为什么这么薄

- **常驻上下文只放必须每次生效的约束**；细节按需读取，避免规则文件膨胀。
- **单一事实源**：同一规则只写一处，改一次即可生效。
- **不伪造基础设施**：能力不存在就走降级路径，不假装已执行。
- **可验证**：每条规则都对应可观察的行为，不写无法执行的口号；规则变更按 `.agents/protocols/verification.md` 自检。

## 结构

```text
Nova/
├── AGENTS.md                     # 唯一常驻入口
├── README.md                     # 人类入口（本文件）
├── LICENSE
└── .agents/                      # 按需加载的协议、适配器与可选 Skill
```

`.agents/` 内部的目录职责与扩展门槛见 [`.agents/README.md`](.agents/README.md)。

## 在目标项目使用

1. 把 `AGENTS.md` 与 `.agents/` 复制（已有规则时合并）到目标项目根目录（保留目录结构）；本仓库自身只用于维护模板。
2. 用运行时打开**目标项目**，让 Agent 复述 `AGENTS.md` 的冲突裁决与 L3 门禁，确认规则已加载。
3. 按 `.agents/adapters/README.md` 的接入验收检查能力发现、Skill、编排与安全。

## 维护 Nova

1. 用运行时打开本目录作为工作区；支持 `AGENTS.md` 的运行时会自动加载它。
2. 简单任务直接做；复杂任务再按导航表读取协议。
3. 想加 Skill：创建门槛见 `AGENTS.md` 的「Skills 与子代理」一节；满足时在 `.agents/skills/<name>/SKILL.md` 创建（Agent Skills 标准）。
4. 想加规则：先证明它会重复生效，再改 `AGENTS.md`；一次性要求写进任务契约，不写进规则。

## License

[MIT](LICENSE)

# 平台接入：兼容而非绑定

> 这里是能力映射与适配建议，不是对安装版本的自动检测。不同版本、部署形态可能有不同规则。

## 原则

- **共用文件**：`AGENTS.md` 是规则入口，`.agents/protocols/` 是详细协议，`.agents/skills/` 是 Skill 来源。
- **零平台专属入口**：不生成 `CLAUDE.md`、`GEMINI.md` 等重复文件；运行时不自动读取时，由其配置或会话显式加载。
- **执行适配**：子代理、并行、审批使用平台原生能力；没有就用 SOLO，不模拟。
- **Skill 适配**：平台不能发现 `.agents/skills/` 时，按其原生路径加载或人工读取，避免多份内容漂移。
- **真实验证**：以目标产品/版本的官方文档与现场小试验为准。

## 常见运行时

| 运行时 | 规则入口 | Skills | 备注 |
| --- | --- | --- | --- |
| DeepSeek Harness (DSH) | 工作区 `AGENTS.md` 自动加载 | 项目 `.dsh/skills/` 优先于 `.agents/skills/` | 原生工具（`read`/`write`/`edit`/`grep`/`glob`/`pwsh`）+ 子代理 + workflow；权限由沙箱/审批控制 |
| Codex | `AGENTS.md` | `.agents/skills/` | 使用当前环境的实际能力 |
| Cursor | `AGENTS.md` 或 `.cursor/rules/` | `.agents/skills/` | 不同版本需验证 |
| OpenCode | `AGENTS.md` | `.agents/skills/` | 以实际版本配置为准 |
| Claude Code | `CLAUDE.md`（支持导入） | 主要路径 `.claude/skills/` | `.agents/skills/` 发现需单独确认 |
| Gemini CLI | 默认 `GEMINI.md`，可配置 | `.agents/skills/` 别名 | 不假设并行 |
| GitHub Copilot | `AGENTS.md` / `.github/copilot-instructions.md` | 视功能与版本 | 不默认等同 Codex |

## 接入验收（每个平台实际执行）

1. **入口**：问 Agent 读到了哪些规则，确认 `AGENTS.md` 生效。
2. **Skill**：确认能发现/读取一个 `SKILL.md`，且没有把全文塞进常驻上下文。
3. **编排**：给一个 L0 任务，确认没有多余子代理；再给一个双支线 L2，观察并行或降级。
4. **安全**：让只读角色报告是否有写入能力，以真实授权为准。
5. **交付**：要求展示真实命令与证据；不能执行时如实说明。

## 参考

- Agent Skills: https://agentskills.io/specification
- OpenCode: https://opencode.ai/docs/skills
- Cursor: https://cursor.com/docs/skills
- Gemini: https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/skills.md
- Claude Code: https://code.claude.com/docs/en/memory
- Copilot: https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/customize-copilot/configure-custom-instructions/add-repository-instructions-in-your-ide

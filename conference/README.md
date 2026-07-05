# Agent Conference — 操作速查

> **完整协议** → [[agent-conference-protocol|Agent Conference Protocol]]（原子概念笔记）

## 快速参考

### 编排流（多轮迭代至共识）

```
主代理 → Agent A（方案）→ Agent B（审阅）→ 检查异议？
  → 有 → Agent A（回应/修订）→ Agent B（确认）→ 重复至共识
  → 无 → 总结 → 执行
```

### 会议文件格式

```markdown
## [真实时间戳] <agent-name>
### <role>: <title>

<正文>

## [真实时间戳] <agent-name> — 结束
```

### 关键规则

- **真实时间戳**：`Get-Date -Format "yyyy-MM-dd HH:mm:ss zzz"`，禁止编造
- **人类可读语言**：会议文件用中文（AGENTS.md §5）
- **显式关闭**：审计员必须说"同意/无异议"才关闭
- **死锁逃逸**：3 轮未共识 → 主代理裁决

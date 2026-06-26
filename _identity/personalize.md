---
type: Identity
title: "个性化你的 Nova"
aliases:
  - "个性化 Nova"
  - "Nova 个性化"
description: 如何将 Nova 打造成你自己的 AI 管家——改名、改身份、改知识域，让它成为独一无二的属于你的 Nova。
id: "20260622T070000"
status: evergreen
domain: identity
tags:
  - identity
  - setup
  - personalization
  - onboarding
related:
  - "[[nova-identity|Nova Identity]]"
  - "[[capability-manifest|Capability Manifest]]"
  - "[[vault-architecture|Vault Architecture]]"
confidence: 1.0
summary: >
  只需修改 3 个文件即可完成 Nova 个性化：改名字、改身份描述、改 opencode 配置——你的 Nova 你做主。
---

# 个性化你的 Nova

Nova 的设计前提是：**每个人都有自己的 Nova**。你拿到的种子版本用的是默认名字和默认身份——下面就是把它变成"你专属的 Nova"的全部步骤。

---

## 最小个性化（3 步，5 分钟）

只做这三步，你的 Nova 就是独一无二的了：

### 第 1 步：给 Nova 起名字

编辑 `_identity/nova-identity.md`：
- 将正文中所有 **Nova** 替换为你喜欢的名字（比如 **星尘**、**Athena**、**小智**、**Lumina**）
- 修改 `title` 字段：`title: "星尘 — AI 管家身份"`

编辑 `_identity/personalize.md`（本文件）：
- 修改 `owner_name`（如果下文有）

编辑 `AGENTS.md`：
- 找到 `## 0. Identity`，将 `You are **Nova**` 改为 `You are **星尘**`

> 💡 名字不限于英文——中文、日文、任何语言都可以。AGENTS.md 里的名字 Nova 会用英文自称，导航文件里的名字人类会看到。

### 第 2 步：设定 Nova 的自我认知

编辑 `_identity/nova-identity.md`：
- **核心目标**：可以根据你的使用场景调整优先级。比如你是研究者，可以把"保存知识"提到更高；你是写作者，可以加一条"辅助创作"。
- **个性特质**：想让 Nova 更幽默？更严肃？更鼓励？直接改 `## 个性特质` 段落。
- **能力概览**：暂时不用改，这是能力事实清单。

编辑 `AGENTS.md`：
- `## 0. Identity` 的 `(**Core Directives**` 部分，可以根据你的喜好调优先级或加新指令。

### 第 3 步：配置 Opencode 连接

编辑 `opencode.json`（项目根目录）：
```json
{
  "skills": {
    "paths": ["skills/nova-kb/SKILL.md"]
  },
  "instructions": "D:\\你的路径\\Note\\AGENTS.md"
}
```

- 将 `instructions` 的值改为本知识库的 `AGENTS.md` 的**绝对路径**
- 如果你有额外的 skills，加到 `paths` 数组里

---

## 深度个性化（按需选择）

### 自定义知识域

`_identity/nova-identity.md` 的 `domain` 字段决定了 Nova 的知识焦点。可以改成：
- `domain: machine-learning` — 如果你的 Nova 专注于 ML
- `domain: software-engineering` — 如果你的 Nova 是编程助手
- `domain: academic-research` — 如果你的 Nova 管理学术知识
- `domain: general-knowledge` — 通用知识库

### 加载额外技能

Nova 的能力通过技能（Skill）扩展。查看 `skills/` 目录了解已有技能。

添加技能的方法：
1. 将技能文件夹放到 `skills/` 下
2. 在 `opencode.json` 的 `skills.paths` 中添加路径
3. 重启 Opencode 即可生效

常用技能参考（需自行获取）：
- 代码审查技能
- 论文分析技能
- RSS 自动摄入技能

### 调整语言偏好

如果你希望 Nova 用纯中文工作（包括深度笔记），可以修改 `AGENTS.md` §5 的语言分层规则。但建议保留英文深度笔记——AI 消费英文效率更高。

---

## 分享与协作

### 分享你的 Nova

你可以随时把整个团队文件夹（除了 `.obsidian/` 本地配置）打包分享给朋友。他们会：
1. 解压到一个目录
2. 用 Obsidian 打开
3. 跟随本文档完成个性化
4. 拥有属于自己的 Nova

### GitHub 协作

如果你把 Nova 知识库上传到 GitHub：
1. 其他人可以 Fork 你的 Nova
2. 通过 Pull Request 贡献新笔记
3. 你通过 Merge 来吸收社区贡献
4. 每个 Fork 都是一个独立的 Nova 实例

---

## 可配置清单

| 文件 | 改什么 | 影响 |
|------|--------|------|
| `_identity/nova-identity.md` | Nova 名字、个性、目标 | Nova 的自我认知 |
| `AGENTS.md` | Nova 名字、核心指令 | Nova 的行为规则 |
| `opencode.json` | 技能路径、指令路径 | Nova 的能力范围 |
| `README.md` | 库描述 | 人类看到的介绍 |
| `.obsidian/app.json` | Obsidian 配置 | 编辑器体验（其他人无需同步） |

---

> 你的 Nova 是你的延伸。让它成为你想要的样子。

# Research: 账号删除申请页面

**Branch**: `001-delete-account` | **Date**: 2026-03-19

## Research Topics

### 1. 页面路由设计

- **Decision**: 使用 `/delete-account` 作为页面路由
- **Rationale**: 与现有 `/privacy-policy`、`/user-agreement` 等 legal/信息类页面保持命名一致性；路由简洁且对用户直观；符合 Constitution 中 URL slugs MUST be human-readable, lowercase, hyphen-separated 的要求
- **Alternatives considered**:
  - `/account/delete` — 多层路由，对简单静态页面过度设计
  - `/account-deletion` — 与现有命名模式略有偏差

### 2. 联系邮箱确认

- **Decision**: 使用 `support@realaura.ai` 作为官方客服邮箱
- **Rationale**: 来源于 `src/config/footer.ts` 中已配置的 Contact 链接，为项目唯一确认的对外客服邮箱，无需额外确认
- **Alternatives considered**: 无其他候选邮箱

### 3. 内容架构模式

- **Decision**: 采用与 user-agreement 页面相同的"配置文件 + 页面组件"模式，但因内容简单不复用 LegalPageContent 组件，而是创建轻量的 DeleteAccountContent 组件
- **Rationale**: user-agreement 和 privacy-policy 使用的 LegalPageContent 为长文档设计（含目录导航、章节锚点），账号删除页面内容量少（< 400 字），无需目录，引入会增加不必要复杂度；Constitution §IV 要求内容从 TS 配置文件读取
- **Alternatives considered**:
  - 复用 LegalPageContent — 过度设计，该组件为长文档优化
  - 内容硬编码在 JSX — 违反 Constitution §IV

### 4. 页面动画策略

- **Decision**: 使用 Framer Motion `motion.div` 实现页面整体入场动画（opacity: 0→1, y: 20→0）
- **Rationale**: Constitution 明确要求"所有入场/退场动画 MUST 优先使用 Framer Motion 实现"；动画属性仅用 opacity + transform，符合 §I 性能要求
- **Alternatives considered**:
  - Tailwind `transition-*` — 仅适合 hover/focus 状态，不适合页面入场动画
  - CSS animation — Constitution 要求 Framer Motion 优先

### 5. SEO Metadata

- **Decision**: 使用 Next.js `export const metadata: Metadata` 导出静态元数据，包含 title、description、OpenGraph、Twitter Card
- **Rationale**: 页面无动态数据，静态 metadata export 即可满足 SSG 需求；与 user-agreement 页面实现方式一致
- **Alternatives considered**:
  - generateMetadata 函数 — 仅用于需要异步数据的动态元数据，此处不需要

### 6. 邮箱链接实现

- **Decision**: 邮箱地址渲染为 `<a href="mailto:support@realaura.ai">` 链接，同时以纯文本形式展示邮箱地址作为 fallback 说明
- **Rationale**: 满足 FR-004（mailto 链接）和边缘场景（设备无邮件客户端时用户可手动复制）；Constitution §II 要求 touch targets ≥44px，`<a>` 标签需有足够的 padding
- **Alternatives considered**:
  - 仅显示纯文本 — 无法满足 FR-004
  - 表单提交方式 — 需要后端，超出本特性范围

## All NEEDS CLARIFICATION: Resolved

所有需求均已明确，无遗留 NEEDS CLARIFICATION 项：

| Item             | Resolution                              |
| ---------------- | --------------------------------------- |
| 客服邮箱地址     | `support@realaura.ai`（来自 footer.ts） |
| 页面路由         | `/delete-account`                       |
| 内容语言         | 中文（与 spec FR-007 一致）             |
| 是否需要后端     | 否，纯静态页面                          |
| 是否需要用户登录 | 否（FR-006）                            |

# Research: Privacy Policy Page

**Feature**: 009-privacy-policy-page
**Date**: 2026-03-07

## R-001: Embed Page Layout Isolation

**Decision**: 在 ClientLayout 中通过路径检测条件渲染 Header/Footer，嵌入版路径（`/privacy-policy/embed`）下不渲染 Header 和 Footer。

**Rationale**: Next.js App Router 的根 layout 始终应用于所有路由，无法被嵌套 layout 覆盖。使用路由分组（Route Groups）虽然是"正确"做法，但需要将所有现有页面迁移到 `(main)` 分组目录下，改动范围过大。条件渲染方案在 ClientLayout（已是客户端组件）中检测 pathname，实现简单且影响范围最小。

**Alternatives considered**:

- **Route Groups 重构**: 将所有页面移至 `(main)/`，新建 `(embed)/` 分组。正确但改动量大，不值得仅为一个嵌入页面重构。
- **CSS 隐藏**: 嵌入页通过 CSS `display:none` 隐藏 Header/Footer。hacky 且仍加载不必要的组件代码。
- **独立 HTML 页面**: 不使用 Next.js，直接提供静态 HTML。失去 Next.js SSR/SSG 优势和组件复用能力。

## R-002: iframe 跨域安全配置

**Decision**: 通过 Next.js middleware 为嵌入版路径设置允许所有来源嵌入的响应头，其他页面保持默认安全策略。

**Rationale**: 嵌入版页面需要被任意来源的 iframe 加载，需移除 `X-Frame-Options` 限制并设置宽松的 `Content-Security-Policy frame-ancestors`。使用 middleware 可以按路径精确控制，不影响其他页面的安全性。当前 `next.config.mjs` 未配置任何自定义 headers。

**Alternatives considered**:

- **next.config.mjs headers**: 可行但 middleware 更灵活，支持动态逻辑。
- **全局放开 iframe**: 安全风险，不应为所有页面允许 iframe 嵌入。

## R-003: 隐私协议内容数据结构

**Decision**: 在 `src/config/privacy-policy.ts` 中定义协议内容，采用章节数组结构，每个章节包含标题、锚点 ID、内容段落数组。与项目现有的数据驱动模式一致。

**Rationale**: 项目所有页面内容均通过 `src/config/[page].ts` 配置文件管理（如 `about.ts`、`news.ts`）。隐私协议作为长文本内容，使用结构化数据而非 MDX/Markdown，可以保持一致性并支持组件级渲染控制。

**Alternatives considered**:

- **MDX 文件**: 适合长文本但项目中只有 news 详情使用 MDX，引入新模式增加复杂度。
- **纯 Markdown + remark**: 需要额外解析管线，过度工程。
- **硬编码 JSX**: 违反项目的内容可维护性原则（Constitution IV）。

## R-004: 共享内容组件架构

**Decision**: 创建 `PrivacyPolicyContent` 共享组件，接收配置数据渲染协议正文。官网版和嵌入版页面分别在各自的布局中引用该组件。

**Rationale**: 满足 FR-004（统一文档修改入口）。组件只负责渲染协议正文内容，不包含页面级布局（页头/页脚/目录）。目录组件单独实现，仅在官网版中使用。

**Alternatives considered**:

- **两个独立组件**: 违反 DRY 原则，修改协议内容需要改两处。
- **单一页面 + 查询参数切换布局**: URL 不够语义化，不利于配置管理。

## R-005: Tailwind Typography 插件利用

**Decision**: 使用项目已安装的 `@tailwindcss/typography` 插件的 `prose` 类来渲染协议长文本内容，确保排版美观可读。

**Rationale**: 项目 Tailwind 配置已包含 typography 插件，正好适用于隐私协议这类长文本内容的排版。使用 `prose` 类可以自动处理标题、段落、列表的间距和字体大小，减少自定义样式代码。

**Alternatives considered**:

- **纯 Tailwind 手动排版**: 工作量大，容易遗漏细节。
- **自定义 CSS**: 违反项目 Tailwind-first 原则（Constitution - Technology Standards）。

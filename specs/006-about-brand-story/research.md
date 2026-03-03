# Research & Decisions: About 品牌故事页

**Branch**: `006-about-brand-story` | **Date**: 2026-02-27

## Decisions

### R-001: 翻转计数器动画实现方案

**决策**: 使用 Framer Motion 实现逐位翻转计数器（Flip Counter），每个数字位独立执行 Y 轴旋转动画。

**理由**: Framer Motion 是项目宪法指定的首选动画方案，且已在项目中广泛使用。通过 `rotateX` transform 实现翻转效果，仅涉及 transform 和 opacity 属性，符合性能要求（不触发 layout reflow）。每个数字位使用 `perspective` + `rotateX` 从 -90deg 翻转到 0deg，配合 `backface-visibility: hidden` 实现翻牌效果。

**备选方案**:

- CSS @keyframes 纯 CSS 实现 — 拒绝：项目宪法要求动画优先使用 Framer Motion，且 CSS 方案难以精确控制 viewport 触发时机和 `prefers-reduced-motion` 降级
- 第三方库 (react-countup / react-flip-numbers) — 拒绝：宪法要求新依赖须有正当理由，且翻转效果可用 Framer Motion 原生实现，无需引入额外依赖
- 简单数字递增（无翻转视觉效果）— 拒绝：用户明确要求翻转计数器动画，非简单递增

### R-002: 组件复用策略——Tab 和 Gallery

**决策**: 直接复用 News 页面的 `NewsCategoryTabs` 和 `NewsGrid` 组件，通过 props 传入 About 页面的分类数据和画廊照片。

**理由**: 用户明确选择方案 A（直接复用）。两个组件的 props 接口已足够灵活：`NewsCategoryTabs` 接受 `categories` 数组和 `onCategoryChange` 回调；`NewsGrid` 接受 `articles` 数组。About 页面的画廊数据可映射为 `NewsArticle` 兼容的结构。

**适配要点**:

- `NewsCategoryTabs`: 传入 About 的 4 个分类（Social Contact / Share / Brand / Activity），类型与 News 的 `NewsCategoryItem` 一致
- `NewsGrid`: About 画廊的照片数据需适配 `NewsArticle` 接口（id、title、featuredImage、cardSize 等字段），不需要 slug、content 等文章专属字段
- 移除无限滚动：About 画廊为固定数量照片，`hasMore` 设为 `false`，`onLoadMore` 传空函数

**备选方案**:

- 提取为通用 UI 组件 — 拒绝：用户选择方案 A，且当前复用场景仅 2 页，过早抽象增加复杂度
- 全新开发独立组件 — 拒绝：重复代码，且无法保证 Tab 交互和 Grid 布局的视觉一致性

### R-003: CTA 区块社交媒体链接数据源

**决策**: 直接导入 `src/config/footer.ts` 中已定义的 `socialMediaLinks` 数组，避免数据重复。

**理由**: Footer 中已定义了完整的社交媒体链接配置（Instagram、X、Facebook、YouTube），包含 platform、url、label 字段。About 页面的 CTA 社交图标与 Footer 完全一致，直接复用保证数据一致性和单一数据源原则。

**备选方案**:

- 在 about.ts 配置中重新定义 — 拒绝：违反 DRY 原则，链接变更时需维护两处
- 创建全局 social.ts 配置 — 拒绝：当前仅 2 处引用（Footer + About CTA），提前抽象过度

### R-004: Hero 横幅组件策略

**决策**: 新建 `AboutHeroBanner` 组件，参考 `NewsHeroBanner` 的实现模式但独立编写。

**理由**: News 的 `NewsHeroBanner` 虽然模式相似（全宽背景图 + 文字覆层），但 About 页面的 Hero 有不同的视觉需求：标题居中（非底部左对齐）、slogan 位置不同、可能需要不同的暗色遮罩强度。独立组件更灵活，props 接口也更精简。

**备选方案**:

- 直接复用 NewsHeroBanner — 拒绝：文字布局位置不同（News 是底部左对齐，About 是居中），强行复用需大量条件判断
- 提取通用 HeroBanner 组件 — 拒绝：当前各页面 Hero 差异较大（Home 带轮播、News 底部对齐、About 居中），过早统一会增加接口复杂度

### R-005: 画廊图片下滑渐显动画实现

**决策**: 扩展 `ScrollReveal` 组件新增 `direction="down"` 方向，使画廊图片从上向下滑入并渐显。

**理由**: 现有 `ScrollReveal` 已支持 `"up"` / `"left"` / `"right"` 三个方向，新增 `"down"` 方向仅需在 `initialByDirection` 中添加 `{ opacity: 0, y: -30 }` 即可，改动极小且保持接口一致。画廊中每张照片独立包裹 `ScrollReveal` 并设置递增 `delay`，形成交错入场效果。

**备选方案**:

- 在 AboutGallerySection 内部用 Framer Motion 独立实现 — 拒绝：重复 ScrollReveal 已有的 viewport 触发和 reduced-motion 降级逻辑
- 使用 CSS animation + Intersection Observer — 拒绝：违反宪法 Framer Motion 优先原则

### R-006: 品牌宣言区与统计区的组件拆分

**决策**: 拆分为两个独立组件 `BrandMessageSection` 和 `StatsSection`，而非合并为一个。

**理由**: 设计稿中品牌宣言（纯文本居中）和统计区（数字 + 翻转动画）在视觉上是两个独立的模块，拆分后各组件职责单一、可独立测试、可独立设置 ScrollReveal 入场时机。`StatsSection` 内部再引用独立的 `FlipCounter` 组件。

**备选方案**:

- 合并为 BrandStatsSection — 拒绝：混合了纯展示和复杂动画逻辑，不利于维护

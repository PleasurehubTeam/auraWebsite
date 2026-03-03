# Research: Explore 探索/社区页

**Feature**: 007-explore-community-page
**Date**: 2026-02-28

## R1: 瀑布流画廊组件复用策略

**Decision**: 从 AboutGallerySection 抽离 MasonryGallery 和 ImagePreview 为 `src/components/ui/` 下的独立公共组件，然后重构 About 页和 Explore 页共同使用。

**Rationale**:

- Constitution IV 明确要求"可复用 UI 模式抽象为共享组件"
- AboutGallerySection 包含三个独立关注点：分类筛选（NewsCategoryTabs）、瀑布流网格（CSS columns）、图片预览（模态灯箱），可清晰拆分
- Explore 页只需瀑布流网格 + 图片预览，不需要分类筛选
- 抽离后 About 页和 Explore 页共用同一套画廊/预览逻辑，避免代码重复

**Alternatives considered**:

1. **直接复制 AboutGallerySection 代码到 Explore** — 违反 DRY 原则和 Constitution IV
2. **在 AboutGallerySection 上加 props 条件分支** — 增加组件复杂度，违反单一职责
3. **仅提取 ImagePreview，画廊逻辑各自实现** — 画廊渲染逻辑（CSS columns + card + animation）重复

## R2: 瀑布流布局方案

**Decision**: 使用 CSS columns（Tailwind `columns-*`），与现有 About 页一致。

**Rationale**:

- 现有 AboutGallerySection 已验证 CSS columns 方案可靠，支持不等高卡片
- CSS columns 方案无需 JavaScript 计算高度，性能优异
- `break-inside-avoid` 防止卡片跨列断裂
- 响应式通过 `columns-1 md:columns-2 lg:columns-4` 原生支持

**Alternatives considered**:

1. **CSS Grid + grid-auto-rows** — 需要精确的行高计算，对不等高图片处理复杂
2. **JavaScript 瀑布流库（如 react-masonry-css）** — 引入新依赖，违反 Constitution "新依赖必须有充分理由"
3. **Flexbox 按列分配（NewsListingContent 方案）** — 需要 JS 计算列分配，但 CSS columns 更简洁

## R3: Hero 横幅高度方案

**Decision**: 使用 `min-h-[80vh]`，与 About 页 AboutHeroBanner 一致。

**Rationale**:

- 澄清记录确认用户选择了 min-h-[80vh] 方案
- 与 About 页保持视觉一致性
- 背景图以 `object-cover` + `fill` 铺满区域，自适应不同宽高比
- 80vh 为沉浸式体验与画廊露出之间的平衡点

**Alternatives considered**:

1. **固定视口比例 h-[60vh]/h-[70vh]** — 用户未选择，画廊首屏露出更多但 Hero 沉浸感不足
2. **宽高比自适应** — 不同设备高度差异过大，不可预测

## R4: 图片预览灯箱交互模式

**Decision**: 复用 About 页已验证的交互模式：Framer Motion opacity+scale 过渡、键盘导航、位置计数器、body 滚动锁定。

**Rationale**:

- 现有 AboutGallerySection 的 ImagePreview 子组件已实现完整功能
- 包含键盘支持（Escape/ArrowLeft/ArrowRight）和计数器
- Framer Motion AnimatePresence 处理进出动画
- 已验证在移动端和桌面端的用户体验

**Alternatives considered**:

1. **使用第三方灯箱库（如 yet-another-react-lightbox）** — 引入新依赖，现有实现已足够
2. **简单模态框无动画** — 体验不够流畅，不符合品牌调性

## R5: 卡片悬停效果

**Decision**: 说明文字变为品牌粉色 (#FF4D8D) 高亮，图片不做放大缩放。使用 Tailwind CSS transition。

**Rationale**:

- 澄清记录确认用户要求"卡片悬停不要放大，文字粉色高亮就好"
- Constitution 允许简单 hover/focus 使用 Tailwind `transition-*` 或纯 CSS transitions
- 相比图片缩放，文字颜色变化更轻量，不触发 layout/paint

**Alternatives considered**:

1. **图片 scale 1.05**（About 页现有模式）— 用户明确拒绝
2. **添加半透明遮罩层** — 增加复杂度，用户未要求

## R6: 导航栏 Explore 高亮状态

**Decision**: 复用现有 Header 组件的 pathname 匹配逻辑，确保 `/explore` 路由下 Explore 菜单项高亮。

**Rationale**:

- 现有 Header.tsx 已通过 `usePathname()` 实现当前页面导航项高亮
- 导航配置在 `src/config/navigation.ts` 中，已包含 Explore 链接项
- 无需额外修改，路由存在即自动生效

**Alternatives considered**: 无（现有机制已满足需求）

# 研究报告：Home 首页

**功能分支**: `002-home-page`
**日期**: 2026-02-26

## 决策记录

### R-001: Hero 轮播实现方案

**决策**: 使用 Framer Motion `AnimatePresence` + `motion.div` 实现两版 Hero 内容的交叉淡入淡出（crossfade）切换，配合 `useEffect` + `setInterval` 实现 5 秒自动轮播。

**理由**:

- 宪法要求 Framer Motion 为首选动画方案
- 仅有两版内容（女性版/男性版），不是复杂多页轮播，`AnimatePresence` 完全胜任
- crossfade 过渡效果适合全屏 Hero，视觉柔和不分散注意力
- 支持手动切换（点击指示器时重置计时器）

**备选方案**:

- CSS-only crossfade（纯 CSS 动画）— 可行但缺少手势支持和灵活的动画中断控制，已拒绝
- Swiper / Embla Carousel — 仅两张幻灯片使用完整轮播库属于过度工程化，增加不必要的 bundle size，已拒绝
- 横向滑动切换 — 全屏内容横向滑动在桌面端体验不如 crossfade 自然，已拒绝

### R-002: Tab 滑动指示器动画方案

**决策**: 使用 Framer Motion `motion.div` + `layoutId` 实现标签指示器（下划线色块）在标签之间的滑动过渡。内容区域使用 `AnimatePresence` + `motion.div` 以 opacity 过渡实现 fade-in 切换。

**理由**:

- `layoutId` 是 Framer Motion 的核心能力，自动计算元素位置/尺寸变化并生成流畅的 layout animation，无需手动测量 DOM
- 标签指示器滑动 + 内容 fade-in 的组合完全匹配规格中的澄清要求
- opacity 过渡不触发布局重排，符合性能优先原则
- 将标签切换逻辑封装为 `TabSwitcher` 组件，AI-Powered（2 标签）和 Solo Play（4 标签）共用

**备选方案**:

- 手动计算 translateX + width（通过 ref 和 getBoundingClientRect）— 需要 DOM 测量和 resize 监听，代码复杂度显著高于 layoutId，已拒绝
- CSS-only transition — 无法实现跨元素的 layout 动画（指示器从一个标签滑动到另一个标签），已拒绝
- Radix Tabs — 提供 a11y 支持但不包含动画能力，仍需 Framer Motion 补充，增加复杂度，已拒绝

### R-003: 横向卡片组（剧本杀）实现方案

**决策**: 使用原生 CSS `overflow-x: auto` + `scroll-snap-type: x mandatory` 实现基础横向滚动。移动端触屏手势滑动由浏览器原生处理。桌面端增加左右箭头按钮，使用 `scrollBy({ behavior: 'smooth' })` 实现平滑翻页。卡片悬停效果使用 Framer Motion `whileHover` 实现微缩放。

**理由**:

- CSS `scroll-snap` 是浏览器原生能力，移动端触屏手势天然支持，性能最优（GPU 加速）
- 不引入第三方轮播库（Embla/Swiper），保持依赖精简，符合宪法约束
- 箭头按钮使用原生 `scrollBy` API，浏览器原生 smooth scrolling 足够流畅
- 卡片悬停效果使用 Framer Motion `whileHover={{ scale: 1.05 }}`，简洁高效

**备选方案**:

- Embla Carousel — 功能强大（3KB gzipped），但本场景不需要复杂分页/虚拟化/自动播放，原生方案已满足需求，已拒绝
- Swiper — 体积较大（~40KB），与 React 18 SSR 兼容性需要额外配置，已拒绝
- 纯 Framer Motion drag — 需要手动实现 snap 逻辑（dragConstraints + onDragEnd 计算最近卡片位置），比原生 scroll-snap 更复杂且性能不如原生，已拒绝

### R-004: 滚动入场动画方案

**决策**: 创建 `ScrollReveal` 包装组件，内部使用 Framer Motion `motion.div` + `whileInView` prop 实现滚动入场动画。使用 `viewport={{ once: true, amount: 0.2 }}` 确保只播放一次且元素 20% 可见时触发。通过 `useReducedMotion()` hook 检测系统动画偏好。

**理由**:

- Framer Motion `whileInView` 内置 Intersection Observer，声明式 API 简洁
- `viewport.once: true` 直接满足 FR-018（只播放一次）的要求
- `useReducedMotion()` 配合条件动画值，满足 FR-019（prefers-reduced-motion）
- 封装为通用组件可被所有页面复用，不仅限于首页

**备选方案**:

- 手写 Intersection Observer + useState — 每个模块都要重复编写观察逻辑，代码量大，已拒绝
- react-intersection-observer 库 + CSS animation — 增加一个依赖，不如 Framer Motion 生态统一，已拒绝
- AOS (Animate On Scroll) 库 — 额外依赖，非 React 生态，与 Framer Motion 冲突，已拒绝

### R-005: 首屏图片优化策略

**决策**: Hero 首屏图片使用 Next.js `<Image>` 组件的 `priority` 属性确保预加载，配合 `placeholder="blur"` + `blurDataURL` 提供模糊占位防止 CLS。非首屏图片（各模块场景图）使用默认 lazy loading。WebP 格式优先，PNG 作为降级备用。

**理由**:

- `priority` 属性自动添加 `<link rel="preload">` 到 HTML head，是 Next.js LCP 优化的标准实践
- `placeholder="blur"` 在图片加载前显示低分辨率模糊版本，消除布局偏移（CLS < 0.1）
- 素材目录已提供 WebP + PNG 双格式，Next.js `<Image>` 可自动选择最优格式

**备选方案**:

- 手写 `<link rel="preload">` + `<img>` — 失去 next/image 的自动尺寸优化、格式转换和响应式 srcSet 能力，已拒绝
- 所有图片都设为 priority — 违背 lazy loading 最佳实践，首屏外的图片预加载会浪费带宽，已拒绝

### R-006: 可复用 TabSwitcher 组件设计

**决策**: 创建通用 `TabSwitcher` 组件，接受 `tabs: TabItem[]` 数据数组和可选配置。组件负责：(1) 渲染标签栏 + layoutId 滑动指示器；(2) 管理 activeTab 状态；(3) AnimatePresence fade-in 内容切换。AI-Powered 和 Solo Play 通过传入不同数据使用同一组件。

**理由**:

- AI-Powered（2 个标签）和 Solo Play（4 个标签）的交互模式完全一致：标签指示器滑动 + 内容淡入
- 提取可复用组件符合 DRY 原则和宪法"内容可维护性"要求
- 后续页面（如 APP 页面）若有类似标签切换需求可直接复用
- Props 驱动设计使内容修改无需接触组件逻辑

**备选方案**:

- AI-Powered 和 Solo Play 各自独立实现标签切换 — 代码重复约 80%，动画逻辑和状态管理完全相同，已拒绝
- 使用 Radix Tabs 作为基础再封装 — 增加一层抽象但 a11y 收益有限（marketing 页面非表单场景），本阶段已拒绝，后续可视需求加入

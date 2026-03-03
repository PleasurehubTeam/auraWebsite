# Research: APP 应用详情页

**Feature**: 004-app-detail-page | **Date**: 2026-02-27

## R-001: 无缝循环 Mockup 轮播方案

**Decision**: 创建新的 `MockupCarousel` 组件，基于 CSS animation + Framer Motion drag 实现连续流动效果

**Rationale**:

- 现有 `HorizontalCarousel` 使用 `scrollBy` 逐项滚动，适合卡片式轮播（剧本杀），但不适合持续平滑流动的 marquee 效果
- 规格要求"手机图片从右向左持续平滑滚动，末尾无缝衔接开头"，这是 marquee/ticker 模式
- 实现方式：将 Mockup 图片列表复制一份拼接，使用 CSS `@keyframes` 或 Framer Motion `animate` 实现连续平移，总位移 = 单组宽度
- 拖拽交互：Framer Motion `drag="x"` + `dragConstraints` + `onDragEnd` 恢复自动滚动
- 不修改现有 HorizontalCarousel，避免影响首页剧本杀轮播

**Alternatives considered**:

- 复用 HorizontalCarousel 并调整为连续模式 → 拒绝，修改现有组件风险大，且两种轮播模式差异显著
- 纯 CSS marquee animation → 拒绝，无法支持拖拽交互
- 使用第三方库（如 embla-carousel）→ 拒绝，Constitution 规定新依赖须有充分理由，且 Framer Motion 已足够实现

## R-002: 左右交替滑入动画方案

**Decision**: 扩展现有 `ScrollReveal` 组件，新增 `direction` prop 支持 left/right/up 方向

**Rationale**:

- 现有 ScrollReveal 仅支持 fade-in-up（`y: 30 → 0`）
- APP 详情页需要 slide-in-left（`x: -60 → 0`）和 slide-in-right（`x: 60 → 0`），均伴随淡入（`opacity: 0 → 1`）
- 扩展而非新建组件，保持项目中滚动动画的统一入口
- 新增 `direction?: "up" | "left" | "right"` prop，默认值 `"up"` 保持向后兼容
- 已有的首页调用方无需修改

**Alternatives considered**:

- 在 AppFeatureSection 内联 Framer Motion 动画 → 拒绝，动画逻辑散落在业务组件中，不利于复用和一致性
- 创建新的 SlideReveal 组件 → 拒绝，与 ScrollReveal 功能高度重叠，增加维护负担

## R-003: APP 页面图片素材映射

**Decision**: 使用 `public/images/02App/` 下的 7 张现有素材，按设计稿对应关系映射到各区域

**Rationale**:

- `02App/` 目录已有 `Aura_APP_banner01.png` 到 `Aura_APP_banner07.png`
- 根据设计稿 Web Design-03.jpg 分析，素材对应关系为：
  - `banner01.png` → Hero 区域 Mockup 轮播（多机型组合图）
  - `banner02.png` → Customized AI Digital Companion 功能截图
  - `banner03.png` → Multimodal chat interaction 功能截图
  - `banner04.png` → 360° Precise Toy Control 功能截图
  - `banner05.png` → Precise behavior recognition 功能截图
  - `banner06.png` → Community 功能截图
  - `banner07.png` → Immersive Script 功能截图
- 具体映射可能需要根据实际素材内容调整，在实现阶段确认

**Alternatives considered**:

- 等待设计团队提供新素材 → 拒绝，现有素材已满足需求，可在后续迭代替换

## R-004: 数据驱动架构方案

**Decision**: 创建 `src/config/app.ts` + `src/types/app.ts`，遵循首页的 config-driven 模式

**Rationale**:

- Constitution IV 要求内容与展示分离，所有文案/图片路径须提取到数据文件
- 遵循现有模式：`config/home.ts` + `types/home.ts` 的组织方式
- APP 页面数据结构更简单（无标签切换），主要是线性的功能模块列表
- 类型定义：`AppHeroData`、`FeatureSectionData`、`AppBottomCTAData`

**Alternatives considered**:

- 合并到 config/home.ts → 拒绝，违反单一职责，APP 是独立页面
- 使用 JSON 文件 → 拒绝，TS 文件提供类型安全和 import 便利，与现有模式一致

## R-005: 首屏渐变背景复用方案

**Decision**: 直接复用 `GradientBackground` 组件，传入与首页 Hero 相同的渐变参数

**Rationale**:

- 澄清确认"首屏 Hero 复用首页的渐变背景系统（柔粉暖白径向渐变）"
- `GradientBackground` 已支持自定义 gradient、rotation、scale 参数
- 复用相同的 3 层径向渐变配置即可实现视觉一致

**Alternatives considered**:

- 创建 APP 页面专属渐变 → 拒绝，澄清明确要求与首页一致

## R-006: 底部强转化区方案

**Decision**: 创建新的 `AppBottomCTA` 组件，视觉上独立于现有 `DownloadCTA`

**Rationale**:

- 现有 `DownloadCTA`（`components/layout/DownloadCTA.tsx`）是白色背景 + 边框样式
- APP 详情页底部 CTA 需要深色渐变背景 + 品牌 Logo + 不同布局
- 两者视觉差异大，不适合通过 props 变体在同一组件中实现
- 下载按钮仍复用 `StoreBadgeLink` 组件

**Alternatives considered**:

- 给 DownloadCTA 增加 variant prop → 拒绝，两者布局差异太大（白底 vs 深色渐变、有无 Logo），强行合并会增加组件复杂度

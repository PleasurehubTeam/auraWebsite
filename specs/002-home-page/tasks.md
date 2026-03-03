# 任务清单：Home 首页

**输入**: 设计文档来自 `/specs/002-home-page/`
**前置条件**: plan.md (必需), spec.md (必需), research.md, data-model.md, quickstart.md
**依赖**: `001-global-shared-modules` 已实现（Header、Footer、Download CTA、AgeGate、CookieBanner 可用）

**测试**: 规格中未明确要求测试，本清单不包含测试任务。

**组织方式**: 任务按用户故事分组，确保每个故事可独立实施和测试。

## 格式: `[ID] [P?] [Story] 描述`

- **[P]**: 可并行执行（不同文件，无依赖）
- **[Story]**: 所属用户故事（US1, US2, US3 等）
- 描述中包含精确文件路径

---

## Phase 1: 基础数据层

**目标**: 定义首页所有 TypeScript 类型和内容数据配置，为全部模块组件提供数据基础

- [x] T001 定义首页所有 TypeScript 类型（HeroSlide, TabItem, TabSectionData, ClassicModeData, ClassicModeFeature, RemoteControlData, CarouselCard, ModeItem）在 `src/types/home.ts`
- [x] T002 创建首页内容数据配置，包含所有模块数据（heroSlides, aiPoweredSection, classicModeSection, soloPlaySection, remoteControlSection, mysteryScriptSection, mysteryCards, modeItems），导入 `src/types/home.ts` 中的类型，所有文案和图片路径（`/images/home/*`）按 data-model.md 素材映射填充，写入 `src/config/home.ts`

**检查点**: 类型检查通过（`pnpm tsc --noEmit`），配置文件可正常导入

---

## Phase 2: 可复用 UI 组件（阻塞性前置任务）

**目标**: 构建三个可复用 UI 组件，供后续多个用户故事使用

**⚠️ 关键**: TabSwitcher 被 US2 和 US3 依赖；HorizontalCarousel 被 US4 依赖；ScrollReveal 被 US6 依赖

- [x] T003 [P] 实现 ScrollReveal 滚动入场动画包装组件：使用 Framer Motion `motion.div` + `whileInView` prop，`viewport={{ once: true, amount: 0.2 }}`，fade-in-up 动画（translateY: 30px → 0, opacity: 0 → 1），动画时长 0.5-0.8 秒。使用 `useReducedMotion()` hook 检测系统动画偏好，启用 reduced-motion 时跳过动画。接受 `children` 作为 props，在 `src/components/ui/ScrollReveal.tsx`
- [x] T004 [P] 实现 TabSwitcher 可复用标签切换组件：接受 `tabs: TabItem[]` 和可选 `className`。渲染标签栏 + Framer Motion `layoutId` 滑动指示器（下划线/背景色块在标签间滑动过渡），管理 `activeTab` 状态，使用 `AnimatePresence` + `motion.div` 实现内容 fade-in 切换（opacity 过渡）。每个标签内容渲染图片（`next/image`）和描述文案。必须支持 2 标签（AI-Powered）和 4 标签（Solo Play）两种布局的响应式显示，在 `src/components/ui/TabSwitcher.tsx`
- [x] T005 [P] 实现 HorizontalCarousel 可复用横向滑动卡片组件：使用原生 CSS `overflow-x: auto` + `scroll-snap-type: x mandatory` 实现横向滚动。渲染左/右箭头按钮，使用 `scrollBy({ behavior: 'smooth' })` 实现平滑翻页，滚动到边界时隐藏对应箭头。移动端（< 768px）隐藏箭头，触屏手势由浏览器原生处理。接受 `children` 作为卡片内容，在 `src/components/ui/HorizontalCarousel.tsx`

**检查点**: 三个 UI 组件可独立导入，TypeScript 无类型错误

---

## Phase 3: 用户故事 1 — 首屏品牌冲击与下载引导 (P1) 🎯 MVP

**目标**: Hero 区域展示两版内容（女性版/男性版），crossfade 自动轮播，下载按钮，首屏图片优化

**独立测试**: 打开首页 → 看到占满视口的 Hero 区域，含 Slogan、产品图、手机截图、下载按钮 → 5 秒后自动 crossfade 切换到另一版 → 点击指示器立即切换 → 图片有 blur 占位符

### 实现

- [x] T006 [US1] 实现 HeroSection 组件：(1) 全宽 Hero 区域，使用 Framer Motion `AnimatePresence` 实现两个 `HeroSlide` 之间的 crossfade 切换动画；(2) `useEffect` + `setInterval` 实现 5 秒自动轮播，组件卸载时清除定时器；(3) 手动切换指示器（圆点按钮），点击时切换并重置定时器；(4) 展示主标题 Slogan（`<h1>`）、产品硬件渲染图、App 界面手机截图；(5) App Store + Google Play 下载按钮，URL 从 `src/config/download.ts` 读取；(6) 首屏图片使用 `next/image` 的 `priority={true}` 和 `placeholder="blur"` + `blurDataURL` 优化 LCP；(7) 响应式：移动端图片和文字垂直堆叠，桌面端左右分栏，在 `src/components/home/HeroSection.tsx`
- [x] T007 [US1] 更新首页入口 `src/app/page.tsx`，导入 HeroSection 组件和 `heroSlides` 配置数据，将 HeroSection 渲染为 `<main>` 内的第一个区域。确保页面有单一 `<h1>`（来自 Hero Slogan）

**检查点**: 首页展示 Hero 轮播，5 秒自动切换，指示器点击立即切换，下载按钮链接正确，图片有 blur 占位符

---

## Phase 4: 用户故事 2 — AI 功能亮点浏览 (P1)

**目标**: AI-Powered 模块，2 标签切换（AI Customization / Multimodal Chat Interaction），标签指示器滑动 + 内容 fade-in

**独立测试**: 滚动到 AI-Powered 区域 → 看到标题 + 2 个标签 → 点击标签 → 指示器滑动到新位置，内容以 fade-in 替换 → 切换在 300ms 内完成

### 实现

- [x] T008 [US2] 实现 AIPoweredSection 组件：渲染 `<section>` 包裹，"AI-Powered" `<h2>` 标题，从 `src/config/home.ts` 导入 `aiPoweredSection` 数据，将 `tabs` 传入 TabSwitcher 组件。图片使用 `next/image` 默认 lazy loading（非首屏）。添加适当的 `aria-label`，在 `src/components/home/AIPoweredSection.tsx`
- [x] T009 [US2] 将 AIPoweredSection 添加到 `src/app/page.tsx`，位于 HeroSection 之后，传入 `aiPoweredSection` 配置数据

**检查点**: AI-Powered 标签切换正常，指示器滑动动画流畅，内容 fade-in 切换 < 300ms

---

## Phase 5: 用户故事 3 — 产品模式概览 (P2)

**目标**: Classic Mode 深色背景展示 + Solo Play 4 标签切换 + Remote Control 场景展示

**独立测试**: 滚动浏览三个模块 → Classic Mode 显示深色背景 + 控制器截图 + 功能图标网格 → Solo Play 4 个标签可切换（滑动/fade-in） → Remote Control 显示描述文案和场景图

### 实现

- [x] T010 [P] [US3] 实现 ClassicModeSection 组件：`<section>` 包裹，深色/黑色背景（Tailwind `bg-black` 或 `bg-gray-900`），"Classic Mode" `<h2>` 标题，App 经典遥控器界面截图（`next/image`，aura-index-banner-03.webp），"Thrusting / Shock / Heating" 三种模式标签徽章，功能图标网格（静态展示，不可交互），每个 `ClassicModeFeature` 渲染图标图片 + 名称标签。图标网格使用 CSS Grid/Flex 响应式布局，在 `src/components/home/ClassicModeSection.tsx`
- [x] T011 [P] [US3] 实现 SoloPlaySection 组件：`<section>` 包裹，"Solo Play" `<h2>` 标题，从 `src/config/home.ts` 导入 `soloPlaySection` 数据，将 4 个标签（Slide Model、Voice Control Model、Video Sync、Music Sync）传入 TabSwitcher 组件。每个标签有独立的描述文案和场景图片（按 data-model.md 素材映射），在 `src/components/home/SoloPlaySection.tsx`
- [x] T012 [P] [US3] 实现 RemoteControlSection 组件：`<section>` 包裹，"Remote Control Model" `<h2>` 标题，描述文案（强调异地伴侣互动场景），场景图片（aura-index-icon-02.png，`next/image`）。布局：桌面端图文左右分栏，移动端垂直堆叠，在 `src/components/home/RemoteControlSection.tsx`
- [x] T013 [US3] 将 ClassicModeSection、SoloPlaySection 和 RemoteControlSection 按顺序添加到 `src/app/page.tsx`，位于 AIPoweredSection 之后，各自使用对应的配置数据

**检查点**: Classic Mode 深色背景 + 图标网格显示正确；Solo Play 四标签切换流畅；Remote Control 场景展示完整

---

## Phase 6: 用户故事 4 — 剧本杀内容探索 (P2)

**目标**: 横向滑动卡片组，展示剧本杀角色/封面卡片

**独立测试**: 滚动到剧本杀区域 → 看到标题 + 描述 + 横向卡片 → 桌面端点击箭头平滑滚动，鼠标悬停卡片微缩放 → 移动端手指左右滑动 → 60fps 流畅

### 实现

- [x] T014 [US4] 实现 MysteryScriptSection 组件：`<section>` 包裹，"Immersive Erotic Murder Mystery Script" `<h2>` 标题，描述文案从 `src/config/home.ts` 的 `mysteryScriptSection` 读取。使用 HorizontalCarousel 渲染 `mysteryCards` 数据。每张卡片使用 Framer Motion `motion.div` 包裹，`whileHover={{ scale: 1.05 }}` 实现桌面端悬停缩放效果。卡片渲染封面图（`next/image`），设置 `scroll-snap-align: start`，统一宽高比和圆角，在 `src/components/home/MysteryScriptSection.tsx`
- [x] T015 [US4] 将 MysteryScriptSection 添加到 `src/app/page.tsx`，位于 RemoteControlSection 之后，传入 `mysteryCards` 和 `mysteryScriptSection` 配置数据

**检查点**: 剧本杀卡片横向滑动流畅（60fps），桌面端箭头和悬停效果正常，移动端手势滑动顺畅

---

## Phase 7: 用户故事 5 — Mode Function 功能一览 (P3)

**目标**: 8 个模式图标的 4×2 网格展示

**独立测试**: 滚动到 Mode Function 区域 → 看到标题 + 8 个图标卡片 → 桌面端 4×2 网格排列 → 移动端自适应重排 → 图标和文字可读

### 实现

- [x] T016 [US5] 实现 ModeFunctionSection 组件：`<section>` 包裹，"Mode Function" `<h2>` 标题，从 `src/config/home.ts` 导入 `modeItems` 数据（8 项），使用 CSS Grid 渲染图标网格。桌面端：`grid-cols-4`（两行四列 4×2）。移动端：`grid-cols-4` 或自适应重排。每张卡片渲染圆形/方形图标图片（`next/image`）+ 底部标签文字。静态展示，无交互，在 `src/components/home/ModeFunctionSection.tsx`
- [x] T017 [US5] 将 ModeFunctionSection 添加到 `src/app/page.tsx`，作为 Footer/Download CTA 之前的最后一个内容区域，传入 `modeItems` 配置数据

**检查点**: 8 个模式图标在桌面端 4×2 网格排列正确，移动端自适应重排，图标和文字清晰可读

---

## Phase 8: 用户故事 6 — 滚动视觉体验 (P3)

**目标**: 所有非首屏模块在滚动进入视口时播放入场动画，只播放一次，尊重 reduced-motion 偏好

**独立测试**: 刷新页面 → 缓慢向下滚动 → 各模块首次进入视口时 fade-in-up 动画（0.5-0.8 秒）→ 回滚再下滚不重复 → 开启系统 reduced-motion → 刷新 → 所有内容直接显示无动画

### 实现

- [x] T018 [US6] 在 `src/app/page.tsx` 中，将每个非首屏 Section 组件（AIPoweredSection、ClassicModeSection、SoloPlaySection、RemoteControlSection、MysteryScriptSection、ModeFunctionSection）用 ScrollReveal 包裹。HeroSection 排除（首屏始终可见）。可根据需要添加交错延迟（如 0s, 0.1s, 0.2s）实现依次渐显效果

**检查点**: 所有非首屏模块在滚动时入场动画正常，只触发一次，reduced-motion 偏好被尊重

---

## Phase 9: 收尾与跨模块优化

**目标**: 全面验证响应式、语义化、内容分离和性能

- [x] T019 在 320px / 375px / 768px / 1280px / 2560px 五个宽度下全面检查所有首页模块的响应式表现，修复任何水平溢出、元素重叠或文字不可读问题
- [x] T020 [P] 检查所有 Section 组件中的图片使用 `next/image` 并包含描述性 `alt` 属性。确认 Hero 首屏图片有 `priority={true}` 和 `placeholder="blur"`；其余图片使用默认 lazy loading
- [x] T021 [P] 检查 `src/app/page.tsx` 的语义化 HTML 结构：单一 `<h1>`（Hero Slogan），每个模块使用 `<section>` 包裹并包含 `<h2>` 标题，标题层级逻辑嵌套，必要处添加 `aria-label`
- [x] T022 检查内容与展示分离：确认所有 Section 组件中的文案和图片路径均来自 `src/config/home.ts`，JSX 模板中无硬编码字符串
- [x] T023 按照 quickstart.md（`specs/002-home-page/quickstart.md`）的 10 个验证步骤进行端到端验证
- [x] T024 [P] 配置首页 Next.js 页面 metadata：在 `src/app/page.tsx` 中导出 `metadata` 对象，包含 `title`（品牌名 + 页面描述）、`description`（首页 meta 描述）、Open Graph 标签（`og:title`, `og:description`, `og:image`, `og:type`）和 Twitter Card 标签（`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`），文案从 `src/config/home.ts` 或 `src/config/site.ts` 读取。满足宪法 III. SEO 优化要求

---

## 依赖关系与执行顺序

### 阶段依赖

- **Phase 1（基础数据层）**: 无依赖 — 立即开始（需 001-global-shared-modules 已完成）
- **Phase 2（可复用 UI 组件）**: 依赖 Phase 1（类型和配置）— **阻塞需要 UI 组件的用户故事**
- **Phase 3（US1 Hero）**: 仅依赖 Phase 1（不需要可复用 UI 组件）
- **Phase 4（US2 AI-Powered）**: 依赖 Phase 2（需要 TabSwitcher）
- **Phase 5（US3 产品模式）**: 依赖 Phase 2（Solo Play 需要 TabSwitcher）
- **Phase 6（US4 剧本杀）**: 依赖 Phase 2（需要 HorizontalCarousel）
- **Phase 7（US5 Mode Function）**: 仅依赖 Phase 1（不需要可复用 UI 组件）
- **Phase 8（US6 滚动动画）**: 依赖 Phase 2（需要 ScrollReveal）+ 所有 Section 组件已存在
- **Phase 9（收尾）**: 依赖所有用户故事完成

### 用户故事间依赖

- **US1（Hero）**: 独立 — Phase 1 完成后即可开始 ✅
- **US2（AI-Powered）**: 依赖 TabSwitcher（Phase 2）— 与 US1 无依赖
- **US3（产品模式）**: 依赖 TabSwitcher（Phase 2）— 与 US1、US2 无依赖
- **US4（剧本杀）**: 依赖 HorizontalCarousel（Phase 2）— 与其他故事无依赖
- **US5（Mode Function）**: 独立 — Phase 1 完成后即可开始 ✅
- **US6（滚动动画）**: 依赖 ScrollReveal（Phase 2）+ 所有 Section 组件 — 必须最后执行

### 并行机会

```text
Phase 1 完成后:
├── Phase 2: T003 ∥ T004 ∥ T005（三个 UI 组件全部并行，不同文件）
├── Phase 3: US1 (T006, T007) 可立即开始（无 UI 组件依赖）
└── Phase 7: US5 (T016, T017) 可立即开始（无 UI 组件依赖）

Phase 2 完成后:
├── Phase 4: US2 (T008, T009) ──┐
├── Phase 5: US3 (T010 ∥ T011 ∥ T012, T013) ──┤── 全部可并行
└── Phase 6: US4 (T014, T015) ──┘

所有 Section 完成后:
└── Phase 8: US6 (T018) → Phase 9: 收尾 (T019-T023)
```

---

## 并行执行示例

### Phase 2 可复用 UI 组件（3 个任务全部并行）

```bash
# 以下任务修改不同文件，可同时进行：
T003: src/components/ui/ScrollReveal.tsx
T004: src/components/ui/TabSwitcher.tsx
T005: src/components/ui/HorizontalCarousel.tsx
```

### Phase 1 完成后的最大并行

```bash
# 开发者 A：Phase 2 可复用 UI 组件
T003: ScrollReveal
T004: TabSwitcher
T005: HorizontalCarousel

# 开发者 B：US1 Hero（无 UI 组件依赖）
T006: src/components/home/HeroSection.tsx
T007: src/app/page.tsx

# 开发者 C：US5 Mode Function（无 UI 组件依赖）
T016: src/components/home/ModeFunctionSection.tsx
T017: src/app/page.tsx（添加 ModeFunctionSection）
```

### Phase 5 产品模式（3 个 Section 并行）

```bash
# 以下三个 Section 修改不同文件，可同时进行：
T010: src/components/home/ClassicModeSection.tsx
T011: src/components/home/SoloPlaySection.tsx
T012: src/components/home/RemoteControlSection.tsx
```

---

## 实施策略

### MVP 优先（仅 US1 Hero）

1. 完成 Phase 1：基础数据层（类型 + 配置）
2. 完成 Phase 3：US1 — Hero 轮播区域
3. **暂停并验证**：首页展示 Hero 轮播 + 下载按钮
4. 可部署/演示 — 访客立即感受品牌冲击力

### 增量交付

1. Phase 1（数据层）+ Phase 2（UI 组件） → 基础就绪
2. - US1 Hero → 测试 → 部署（MVP!）
3. - US2 AI-Powered → 测试 → 部署
4. - US3 产品模式 → 测试 → 部署
5. - US4 剧本杀 → 测试 → 部署
6. - US5 Mode Function → 测试 → 部署
7. - US6 滚动动画 → 测试 → 部署
8. - Phase 9 收尾 → 最终验证 → 上线

### 最优并行策略

```text
Phase 1（基础数据层）
    ↓
Phase 2（UI 组件: T003 ∥ T004 ∥ T005）+ Phase 3（US1: T006, T007）+ Phase 7（US5: T016, T017）
    ↓
Phase 4（US2）∥ Phase 5（US3: T010 ∥ T011 ∥ T012）∥ Phase 6（US4）
    ↓
Phase 8（US6: 滚动动画）
    ↓
Phase 9（收尾优化）
```

---

## 备注

- [P] 任务 = 不同文件、无依赖，可并行执行
- [Story] 标签将任务映射到具体用户故事，便于追溯
- 每个用户故事可独立完成和测试
- US1 和 US5 可在 Phase 1 完成后立即开始（无可复用 UI 组件依赖）
- US6（滚动动画）必须在所有 Section 组件创建后执行
- 所有 Section 组件必须使用语义化 HTML（`<section>`、`<h2>` 标题）
- 所有图片必须使用 `next/image` 并包含描述性 `alt` 属性
- 所有内容必须来自 `src/config/home.ts`（禁止在 JSX 中硬编码字符串）
- 每个任务或逻辑分组完成后提交 commit

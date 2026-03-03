# 实施计划：Home 首页

**分支**: `002-home-page` | **日期**: 2026-02-26 | **规格**: [spec.md](./spec.md)
**输入**: 功能规格来自 `/specs/002-home-page/spec.md`
**依赖**: `001-global-shared-modules`（Header、Footer、Download CTA、AgeGate、CookieBanner 已就绪）

## 概要

构建 Aura 官网首页（Home），包含 7 个独立功能模块：Hero 轮播区域（两版内容自动切换）、AI-Powered 标签切换模块、Classic Mode 功能展示、Solo Play 标签切换模块、Remote Control 场景展示、剧本杀横向卡片组、Mode Function 图标网格。所有模块具备滚动入场动画，支持 320px-2560px 全视口响应式。技术方案复用 001 全局模块的项目骨架，新增页面级组件和可复用 UI 组件（TabSwitcher、HorizontalCarousel、ScrollReveal）。

## 技术上下文

**语言/版本**: TypeScript 5.x (strict mode)
**框架**: Next.js 14+ (App Router) + React 18+
**主要依赖**: Tailwind CSS (样式), Framer Motion (动画), next/image (图片优化)
**存储**: N/A（首页无客户端持久化需求）
**测试**: Playwright (E2E) + Vitest (单元测试)
**目标平台**: Web — 桌面端 (1280 px+)、平板端 (768 px+)、移动端 (320 px+)
**项目类型**: 前端营销官网（纯前端，无后端）
**性能目标**: Lighthouse Performance 90+, FCP < 1.5s, LCP < 2.5s, CLS < 0.1, 标签切换 < 300ms, 卡片滑动 60fps
**约束**: 单个 JS chunk ≤ 200 KB gzipped; 首屏图片 priority 加载 + blur placeholder
**规模**: 1 个页面，7 个区域模块，3 个可复用 UI 组件

## 宪法检查

_门禁: 必须在 Phase 0 研究前通过。Phase 1 设计后复查。_

| 宪法原则         | 门禁项                                                                 | 状态    |
| ---------------- | ---------------------------------------------------------------------- | ------- |
| I. 性能优先      | Hero 首屏图片使用 next/image + priority + blur placeholder，LCP < 2.5s | ✅ 通过 |
| I. 性能优先      | 动画仅使用 Framer Motion + CSS transforms/opacity，不触发布局重排      | ✅ 通过 |
| I. 性能优先      | 非首屏图片使用 lazy loading，按路由代码分割                            | ✅ 通过 |
| I. 性能优先      | 无第三方重型库（不引入 Swiper/GSAP），依赖精简                         | ✅ 通过 |
| II. 响应式设计   | Mobile-first CSS，三断点适配 (320/768/1280)                            | ✅ 通过 |
| II. 响应式设计   | 触摸目标 ≥ 44x44 px，Tab/箭头在移动端可点击                            | ✅ 通过 |
| II. 响应式设计   | 卡片组支持触屏手势滑动，无水平溢出                                     | ✅ 通过 |
| III. SEO 优化    | 页面 SSR/SSG，语义化 HTML (section/h1-h6)                              | ✅ 通过 |
| III. SEO 优化    | 所有图片包含 descriptive alt 属性                                      | ✅ 通过 |
| III. SEO 优化    | 单一 h1（Hero Slogan），嵌套 h2-h3 各模块标题                          | ✅ 通过 |
| IV. 内容可维护性 | 所有文案/图片路径抽取到 src/config/home.ts                             | ✅ 通过 |
| IV. 内容可维护性 | 可复用组件（TabSwitcher、Carousel）props 驱动                          | ✅ 通过 |
| 技术标准 - 样式  | Tailwind CSS 优先，无全局 CSS 新增                                     | ✅ 通过 |
| 技术标准 - 动画  | Framer Motion 为首选（轮播、Tab 滑动、入场动画）                       | ✅ 通过 |

所有门禁通过，无违规项。

## 项目结构

### 文档（本功能）

```text
specs/002-home-page/
├── plan.md              # 本文件
├── research.md          # Phase 0 输出
├── data-model.md        # Phase 1 输出
├── quickstart.md        # Phase 1 输出
├── contracts/           # N/A（纯前端页面，无外部接口）
└── tasks.md             # Phase 2 输出（/speckit.tasks 命令生成）
```

### 源代码（仓库根目录）

```text
src/
├── app/
│   └── page.tsx                       # Home 首页入口（更新 001 的占位页）
├── components/
│   ├── home/
│   │   ├── HeroSection.tsx            # Hero 轮播区域（两版 crossfade 切换）
│   │   ├── AIPoweredSection.tsx       # AI-Powered 标签切换模块
│   │   ├── ClassicModeSection.tsx     # Classic Mode 深色背景展示模块
│   │   ├── SoloPlaySection.tsx        # Solo Play 四标签切换模块
│   │   ├── RemoteControlSection.tsx   # Remote Control 场景展示模块
│   │   ├── MysteryScriptSection.tsx   # 剧本杀横向卡片组模块
│   │   └── ModeFunctionSection.tsx    # Mode Function 图标网格模块
│   └── ui/
│       ├── TabSwitcher.tsx            # 可复用标签切换组件（滑动指示器 + fade-in 内容）
│       ├── HorizontalCarousel.tsx     # 可复用横向滑动卡片组件（scroll-snap + 箭头）
│       └── ScrollReveal.tsx           # 滚动入场动画包装组件（whileInView + once）
├── config/
│   └── home.ts                        # 首页所有内容数据配置
└── types/
    └── home.ts                        # 首页 TypeScript 类型定义
```

**结构决策**: 首页各区域模块作为独立组件存放在 `src/components/home/`，与全局公共模块的 `src/components/layout/` 和 `src/components/modals/` 并列。提取三个可复用 UI 组件到 `src/components/ui/`：TabSwitcher（AI-Powered 和 Solo Play 共用）、HorizontalCarousel（剧本杀卡片和后续页面可复用）、ScrollReveal（所有页面通用的入场动画）。数据配置集中在 `src/config/home.ts`，类型定义在 `src/types/home.ts`。

## 复杂度追踪

### 偏差记录

| 偏差项 | 宪法条款                  | 偏差内容                                                                                            | 理由                                               | 影响            |
| ------ | ------------------------- | --------------------------------------------------------------------------------------------------- | -------------------------------------------------- | --------------- |
| D-001  | 开发工作流 — 图片资产命名 | ~~已解决~~ — 所有图片文件已统一重命名为 kebab-case（如 `aura-index-banner-01a.webp`），符合宪法要求 | 已完成批量重命名，所有源码和配置文件引用已同步更新 | 无 — 偏差已消除 |

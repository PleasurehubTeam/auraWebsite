# 实施计划：全局公共模块

**分支**: `001-global-shared-modules` | **日期**: 2026-02-26 | **规格**: [spec.md](./spec.md)
**输入**: 功能规格来自 `/specs/001-global-shared-modules/spec.md`

## 概要

构建 Aura 官网贯穿所有页面的全局公共模块：Header 导航栏（含品牌 Logo、5 个导航链接、移动端汉堡菜单）、Footer 底部信息栏（三组链接 + 社交媒体 + 版权）、Download CTA 下载引导区（集中配置的商店链接）、年龄验证门禁（全屏模态 + 本地存储持久化）、Cookie 同意横幅。技术方案采用 Next.js 14+ App Router，以 layout.tsx 为载体将公共模块注入所有页面，数据层抽取为 TypeScript 常量文件实现集中配置。

## 技术上下文

**语言/版本**: TypeScript 5.x (strict mode)
**框架**: Next.js 14+ (App Router) + React 18+
**主要依赖**: Tailwind CSS (样式), Framer Motion (动画), next-intl (i18n 预置), lucide-react (图标)
**存储**: 浏览器 localStorage（年龄验证 + Cookie 同意状态持久化）
**测试**: Playwright (E2E) + Vitest (单元测试)
**目标平台**: Web — 桌面端 (1280 px+)、平板端 (768 px+)、移动端 (320 px+)
**项目类型**: 前端营销官网（纯前端，无后端）
**性能目标**: Lighthouse Performance 90+, FCP < 1.5s, LCP < 2.5s, CLS < 0.1
**约束**: 单个 JS chunk ≤ 200 KB gzipped; 图片使用 WebP/AVIF + next/image
**规模**: 5 个主要页面，5 个公共模块组件

## 宪法检查

_门禁: 必须在 Phase 0 研究前通过。Phase 1 设计后复查。_

| 宪法原则         | 门禁项                                                      | 状态    |
| ---------------- | ----------------------------------------------------------- | ------- |
| I. 性能优先      | 图片使用 next/image + WebP/AVIF，按路由代码分割，FCP < 1.5s | ✅ 通过 |
| I. 性能优先      | 动画仅使用 CSS transforms/opacity 或 Framer Motion          | ✅ 通过 |
| I. 性能优先      | 无第三方脚本阻塞关键渲染路径                                | ✅ 通过 |
| II. 响应式设计   | Mobile-first CSS，三断点适配 (320/768/1280)                 | ✅ 通过 |
| II. 响应式设计   | 触摸目标 ≥ 44x44 px，Header 折叠为汉堡菜单                  | ✅ 通过 |
| II. 响应式设计   | 无水平滚动条                                                | ✅ 通过 |
| III. SEO 优化    | 使用语义化 HTML (header/nav/main/footer)                    | ✅ 通过 |
| III. SEO 优化    | 所有图片包含 alt 属性                                       | ✅ 通过 |
| IV. 内容可维护性 | 链接/URL/文案抽取为 TS 常量文件                             | ✅ 通过 |
| IV. 内容可维护性 | 下载链接集中配置在单一常量文件                              | ✅ 通过 |
| IV. 内容可维护性 | i18n 架构从第一天起预置 (next-intl)                         | ✅ 通过 |
| 技术标准 - 样式  | Tailwind CSS 优先，仅回退时使用 CSS Modules                 | ✅ 通过 |
| 技术标准 - 动画  | Framer Motion 为首选动画方案                                | ✅ 通过 |
| 技术标准 - 组件  | Button/Dialog 等使用 React 组件封装                         | ✅ 通过 |

所有门禁通过，无违规项。

## 项目结构

### 文档（本功能）

```text
specs/001-global-shared-modules/
├── plan.md              # 本文件
├── research.md          # Phase 0 输出
├── data-model.md        # Phase 1 输出
├── quickstart.md        # Phase 1 输出
├── contracts/           # Phase 1 输出（本项目无外部 API，不生成）
└── tasks.md             # Phase 2 输出（/speckit.tasks 命令生成）
```

### 源代码（仓库根目录）

```text
src/
├── app/
│   ├── layout.tsx                  # 根布局 — 注入 Header/Footer/AgeGate/CookieBanner
│   ├── globals.css                 # Tailwind 指令 (@tailwind base/components/utilities)
│   ├── page.tsx                    # Home 页面（占位）
│   ├── app/page.tsx                # APP 页面（占位）
│   ├── news/page.tsx               # News 页面（占位）
│   ├── about/page.tsx              # About 页面（占位）
│   └── explore/page.tsx            # Explore 页面（占位）
├── components/
│   ├── layout/
│   │   ├── Header.tsx              # 顶部导航栏组件
│   │   ├── MobileNav.tsx           # 移动端抽屉菜单组件
│   │   ├── Footer.tsx              # 底部信息栏组件
│   │   └── DownloadCTA.tsx         # 下载引导区组件
│   ├── modals/
│   │   ├── AgeVerificationGate.tsx # 年龄验证全屏模态组件
│   │   └── CookieConsentBanner.tsx # Cookie 同意横幅组件
│   └── ui/
│       └── Button.tsx              # 通用按钮组件（React 封装）
├── config/
│   ├── navigation.ts               # 导航项配置数据
│   ├── footer.ts                   # Footer 链接组 + 社交媒体配置数据
│   ├── download.ts                 # App Store / Google Play 集中 URL 配置
│   └── site.ts                     # 全站元数据（品牌名、版权年份等）
├── hooks/
│   ├── useAgeVerification.ts       # 年龄验证状态管理 hook
│   └── useCookieConsent.ts         # Cookie 同意状态管理 hook
├── lib/
│   └── storage.ts                  # localStorage 读写封装（带 SSR 安全检查）
└── types/
    └── index.ts                    # 共享 TypeScript 类型定义
```

**结构决策**: 采用 Next.js App Router 单项目结构。所有公共模块组件置于 `src/components/layout/` 和 `src/components/modals/`，配置数据集中在 `src/config/`，遵循宪法中"内容可维护性"原则。根布局 `layout.tsx` 作为所有页面的统一入口，注入公共模块。

## 复杂度追踪

> 所有宪法门禁均已通过，无需记录违规项。

无违规项。

# Implementation Plan: About 品牌故事页

**Branch**: `006-about-brand-story` | **Date**: 2026-02-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/006-about-brand-story/spec.md`

## Summary

About 品牌故事页是 Aura 官网的品牌叙事页面，路由为 `/about`。页面包含 5 个核心区块：Hero 横幅（全宽背景图 + 标题 + slogan）、品牌宣言与数据统计区（翻转计数器动画）、分类 Tab 筛选照片画廊（复用 News 页面的 NewsCategoryTabs 和 NewsGrid 组件）、加入社区 CTA（渐变背景 + 社交媒体链接）、以及各区块差异化的入场动画。

技术方案基于 Next.js 14 App Router + TypeScript + Tailwind CSS + Framer Motion，遵循项目已有的数据驱动、组件复用、响应式布局和动画规范。页面为 SSG 静态生成，所有内容从集中配置文件读取。预计新增 6-8 个组件文件、1 个配置文件、1 个类型定义文件，修改 1 个现有页面文件。

## Technical Context

**Language/Version**: TypeScript 5.5+ (strict mode)
**Primary Dependencies**: Next.js 14.2+ (App Router), React 18.3+, Tailwind CSS 3.4+, Framer Motion 11.0+
**Storage**: N/A（纯前端静态页面，数据从 TypeScript 配置文件读取）
**Testing**: 手动视觉测试 + Lighthouse 审计
**Target Platform**: Web（Vercel 部署），支持移动端/平板端/桌面端
**Project Type**: frontend-only marketing website
**Performance Goals**: Lighthouse 90+, LCP < 2.5s, CLS < 0.1, 动画 60fps
**Constraints**: 无新第三方依赖；复用现有 News 组件；所有动画使用 Framer Motion（transform/opacity 仅）
**Scale/Scope**: 1 个新页面，6-8 个新组件，1 个新配置文件，~800-1200 行新代码

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| 宪法原则                    | 门禁项                                | 状态                                                                   |
| --------------------------- | ------------------------------------- | ---------------------------------------------------------------------- |
| I. Performance First        | Lighthouse 90+, LCP < 2.5s, CLS < 0.1 | ✅ SSG 页面 + next/image 懒加载 + Framer Motion transform/opacity 动画 |
| I. Performance First        | JS bundle < 200KB gzipped per route   | ✅ 复用现有组件，无新依赖引入                                          |
| I. Performance First        | 动画仅使用 CSS transforms/opacity     | ✅ Framer Motion 翻转计数器和滑动渐显均基于 transform + opacity        |
| II. Responsive Design       | 移动端/平板端/桌面端适配              | ✅ 遵循 max-w-7xl + px-4/6/8 响应式系统                                |
| II. Responsive Design       | 触控目标 ≥ 44×44px                    | ✅ Tab 按钮和社交媒体图标均满足                                        |
| II. Responsive Design       | 无水平滚动条                          | ✅ 内容宽度约束 + 响应式布局                                           |
| III. SEO Optimization       | SSR/SSG + 元数据                      | ✅ Next.js SSG + metadata 导出                                         |
| III. SEO Optimization       | 语义 HTML                             | ✅ section/article/nav/h1-h2 语义结构                                  |
| III. SEO Optimization       | 图片 alt 属性                         | ✅ 配置文件包含 alt 字段                                               |
| IV. Content Maintainability | 数据驱动内容                          | ✅ 所有文案/图片/链接集中在 src/config/about.ts                        |
| IV. Content Maintainability | 可复用 UI 组件                        | ✅ 复用 NewsCategoryTabs、NewsGrid、ScrollReveal、Button               |
| IV. Content Maintainability | 社交媒体链接集中配置                  | ✅ 复用 src/config/footer.ts 中的 socialMediaLinks                     |
| Technology Standards        | Framer Motion 优先动画                | ✅ 翻转计数器、滑动渐显均用 Framer Motion                              |
| Technology Standards        | Tailwind 优先样式                     | ✅ 全部样式使用 Tailwind utilities                                     |
| Development Workflow        | 功能分支 + Conventional Commits       | ✅ 006-about-brand-story 分支                                          |

**门禁结果**: 全部通过，无违规项。

## Project Structure

### Documentation (this feature)

```text
specs/006-about-brand-story/
├── plan.md              # 本文件
├── research.md          # Phase 0: 研究与决策记录
├── data-model.md        # Phase 1: 数据模型
├── quickstart.md        # Phase 1: 快速验证指南
└── checklists/
    └── requirements.md  # 规格质量检查清单
```

### Source Code (repository root)

```text
src/
├── app/
│   └── about/
│       └── page.tsx                    # [修改] About 页面主文件（替换现有 stub）
├── components/
│   └── about/
│       ├── AboutHeroBanner.tsx         # [新增] Hero 横幅组件
│       ├── BrandMessageSection.tsx     # [新增] 品牌宣言文案区
│       ├── StatsSection.tsx            # [新增] 数据统计区（含翻转计数器）
│       ├── FlipCounter.tsx             # [新增] 翻转计数器动画组件
│       ├── AboutGallerySection.tsx     # [新增] Tab + 画廊容器（复用 NewsCategoryTabs + NewsGrid）
│       └── JoinCommunityCTA.tsx        # [新增] 加入社区 CTA 区块
├── config/
│   └── about.ts                        # [新增] About 页面数据配置
├── types/
│   └── about.ts                        # [新增] About 页面类型定义
└── public/
    └── images/
        └── about/                      # [新增] About 页面图片资源目录
            ├── hero-bg.webp            # Hero 背景图
            └── gallery/               # 画廊照片（按分类组织）
```

**Structure Decision**: 遵循项目既有模式——页面级组件放在 `src/components/about/`，数据配置放在 `src/config/about.ts`，类型定义放在 `src/types/about.ts`。复用 `src/components/news/` 的 Tab 和 Grid 组件以及 `src/components/ui/` 的 ScrollReveal 和 Button。

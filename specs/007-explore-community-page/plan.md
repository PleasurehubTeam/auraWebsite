# Implementation Plan: Explore 探索/社区页 (Community Story Page)

**Branch**: `007-explore-community-page` | **Date**: 2026-02-28 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/007-explore-community-page/spec.md`

## Summary

实现 Explore 探索/社区页，包含沉浸式 Hero 横幅（min-h-80vh）和瀑布流照片画廊（含全屏预览灯箱）。核心技术方案为从现有 AboutGallerySection 中抽离瀑布流画廊和图片预览为公共组件（`MasonryGallery` + `ImagePreview`），同时重构 About 页使用新的公共组件，保持代码复用和一致性。页面数据从本地 TypeScript 配置文件读取，遵循 Constitution v1.0.2 全部规范。

## Technical Context

**Language/Version**: TypeScript 5.5+ (strict mode)
**Primary Dependencies**: Next.js 14.2+ (App Router), React 18.3+, Tailwind CSS 3.4+, Framer Motion 11.0+
**Storage**: N/A（纯前端项目，数据从本地 TypeScript 配置文件读取）
**Testing**: `next build` + `tsc --noEmit` + ESLint + Lighthouse audit
**Target Platform**: Web (Vercel 部署)，支持 mobile 320px+ / tablet 768px+ / desktop 1280px+
**Project Type**: Frontend-only marketing website (Next.js App Router)
**Performance Goals**: Lighthouse 90+，FCP < 1.5s，LCP < 2.5s，CLS < 0.1，动画 60fps
**Constraints**: 所有内容区域 max-w-7xl (1280px)，图片 WebP/AVIF 格式，JS bundle 每路由 < 200KB gzipped
**Scale/Scope**: 单页面（/explore），11 张画廊照片（Aura_Explore-01~11.webp）+ 1 张 Hero 背景（Aura_Explore_Banner-01.webp），5 个新组件文件 + 2 个公共组件提取 + 1 个配置文件 + 1 个类型文件

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### Pre-Phase 0 Check

| 原则                        | 要求                                           | 状态    | 说明                                                                       |
| --------------------------- | ---------------------------------------------- | ------- | -------------------------------------------------------------------------- |
| I. Performance First        | Lighthouse 90+, FCP <1.5s, LCP <2.5s, CLS <0.1 | ✅ PASS | SC-005 要求 90+；使用 next/image 懒加载 + WebP；动画使用 transform/opacity |
| I. Performance First        | JS bundle 每路由 < 200KB gzipped               | ✅ PASS | 页面为静态组件，无重型依赖，复用现有 Framer Motion                         |
| I. Performance First        | 动画仅使用 CSS transforms/opacity              | ✅ PASS | Framer Motion + Tailwind transitions，不使用 width/height/top/left 动画    |
| II. Responsive Design       | Mobile-first CSS，触摸目标 ≥44px               | ✅ PASS | FR-004 定义了响应式列数；预览导航按钮 ≥44px                                |
| II. Responsive Design       | 无水平滚动条                                   | ✅ PASS | 1280px 最大宽度 + overflow-hidden 画廊容器                                 |
| III. SEO Optimization       | SSR/SSG + 唯一 meta 标签 + 语义 HTML           | ✅ PASS | 静态页面 SSG；FR-014 要求 SEO 元数据；使用 section/article/header          |
| III. SEO Optimization       | 所有图片有 alt 属性                            | ✅ PASS | GalleryItem 类型包含 imageAlt 字段                                         |
| IV. Content Maintainability | 内容数据分离，配置文件驱动                     | ✅ PASS | 所有内容在 src/config/explore.ts，不硬编码于 JSX                           |
| IV. Content Maintainability | 可复用 UI 模式抽象为共享组件                   | ✅ PASS | 核心策略：抽离 MasonryGallery + ImagePreview 为公共组件                    |
| Tech Standards              | Framer Motion 优先动画                         | ✅ PASS | 所有入场/退场/滚动动画使用 Framer Motion                                   |
| Tech Standards              | Tailwind CSS 唯一样式方案                      | ✅ PASS | 所有样式使用 Tailwind utilities                                            |
| Dev Workflow                | 一个文件一个组件，PascalCase 命名              | ✅ PASS | 每个组件独立文件                                                           |
| Dev Workflow                | 图片存储于 public/images/                      | ✅ PASS | 图片路径 /images/05Explore/Aura_Explore-\*.webp（已存在）                  |

**GATE 结果**: ✅ 全部通过，无违规项。

## Project Structure

### Documentation (this feature)

```text
specs/007-explore-community-page/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── app/
│   └── explore/
│       └── page.tsx                    # [修改] Explore 页面路由组件
├── components/
│   ├── explore/                        # [新建] Explore 页面专属组件
│   │   ├── ExploreHeroBanner.tsx       # Hero 横幅区域
│   │   └── ExploreGallerySection.tsx   # 画廊区域（组合 MasonryGallery）
│   ├── ui/                             # [新建] 公共组件提取
│   │   ├── MasonryGallery.tsx          # 瀑布流网格 + 卡片渲染
│   │   └── ImagePreview.tsx            # 全屏图片预览灯箱
│   └── about/
│       └── AboutGallerySection.tsx     # [重构] 使用新公共组件
├── config/
│   └── explore.ts                      # [新建] Explore 页面数据配置
└── types/
    ├── gallery.ts                      # [新建] MasonryPhoto 公共基础接口（About/Explore 共享）
    └── explore.ts                      # [新建] Explore 页面类型定义（extends MasonryPhoto）

public/
└── images/
    └── 05Explore/                      # [已存在] Explore 页面图片资源
        ├── Aura_Explore_Banner-01.webp # Hero 背景图
        └── Aura_Explore-01~11.webp     # 画廊照片（11 张）
```

**Structure Decision**: 采用已有的 feature-folder 组件架构（与 about/、news/、home/ 一致）。关键变化在于从 AboutGallerySection 中抽离 MasonryGallery 和 ImagePreview 为公共 UI 组件，同时重构 About 页使用新组件，确保 Constitution IV（可复用 UI 模式抽象为共享组件）的合规性。

## Complexity Tracking

> 无 Constitution 违规项，此章节为空。

| Violation | Why Needed | Simpler Alternative Rejected Because |
| --------- | ---------- | ------------------------------------ |
| （无）    | —          | —                                    |

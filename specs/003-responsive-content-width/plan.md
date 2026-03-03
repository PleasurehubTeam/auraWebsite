# Implementation Plan: 响应式内容宽度规范

**Branch**: `003-responsive-content-width` | **Date**: 2026-02-26 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-responsive-content-width/spec.md`

## Summary

建立全站统一的响应式内容宽度规范：超宽屏幕下内容限制在 1280px 最大宽度（背景不限），中小屏幕统一内边距规则，所有媒体等比缩放防止溢出。通过创建全局容器工具类和逐组件审查修正来实现，确保所有现有 5 个页面和全部组件符合规范。

## Technical Context

**Language/Version**: TypeScript 5.5.0
**Primary Dependencies**: Next.js 14.2.0, React 18.3.0, Tailwind CSS 3.4.0, Framer Motion 11.0.0
**Storage**: N/A（纯前端项目）
**Testing**: 视觉回归测试（浏览器手动验证 + Lighthouse 审计）
**Target Platform**: Web（Vercel 部署，支持 320px–3840px+ 视口）
**Project Type**: frontend-only marketing website
**Performance Goals**: Lighthouse Performance 90+，CLS < 0.1
**Constraints**: 不引入新依赖，优先使用 Tailwind CSS utility classes；全局兜底防护使用 Tailwind @layer base 机制

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle                   | Status | Notes                                                                          |
| --------------------------- | ------ | ------------------------------------------------------------------------------ |
| I. Performance First        | PASS   | 纯 CSS 修改，不影响 JS bundle 大小；不涉及动画属性变更；CLS 需关注容器宽度变化 |
| II. Responsive Design       | PASS   | 本特性直接实现响应式设计规范；mobile-first CSS；确保无横向滚动条               |
| III. SEO Optimization       | PASS   | 不影响语义 HTML 结构；不修改 meta 标签或 heading 层级                          |
| IV. Content Maintainability | PASS   | 将宽度规范抽象为可复用的工具类/组件，非硬编码                                  |
| Technology Standards        | PASS   | 仅使用 Tailwind CSS utility classes；不引入新依赖                              |
| Development Workflow        | PASS   | 在 feature branch 上开发；遵循 Conventional Commits                            |

**Gate Result**: ALL PASS — 无违规项，可进入 Phase 0。

## Project Structure

### Documentation (this feature)

```text
specs/003-responsive-content-width/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── checklists/
    └── requirements.md  # Spec quality checklist
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx               # 根布局 — 无修改
│   ├── globals.css              # 全局样式 — 媒体元素溢出防护
│   ├── page.tsx                 # 首页
│   ├── about/page.tsx           # 关于页
│   ├── explore/page.tsx         # 探索页
│   ├── news/page.tsx            # 新闻页
│   └── app/page.tsx             # 应用页
├── components/
│   ├── layout/
│   │   ├── Header.tsx           # 已符合 max-w-7xl ✓
│   │   ├── Footer.tsx           # 已符合 max-w-7xl ✓
│   │   ├── DownloadCTA.tsx      # 需审查：max-w-4xl（可能为合理例外）
│   │   ├── MobileNav.tsx        # 固定宽度抽屉，不受影响 ✓
│   │   └── ClientLayout.tsx     # 无样式，不受影响 ✓
│   ├── home/
│   │   ├── HeroSection.tsx      # 需修正：max-w-[1600px] → 已记录例外
│   │   ├── AIPoweredSection.tsx # 已符合 max-w-7xl ✓
│   │   ├── ClassicModeSection.tsx   # 已符合 max-w-7xl ✓
│   │   ├── SoloPlaySection.tsx      # 已符合 max-w-7xl ✓
│   │   ├── RemoteControlSection.tsx # 已符合 max-w-7xl ✓
│   │   ├── MysteryScriptSection.tsx # 已符合 max-w-7xl ✓
│   │   └── ModeFunctionSection.tsx  # 需修正：max-w-5xl → max-w-7xl
│   ├── ui/
│   │   ├── TabSwitcher.tsx      # 需修正：max-w-[1500px] → max-w-7xl
│   │   ├── HorizontalCarousel.tsx   # 水平滚动组件，内容允许溢出 ✓
│   │   ├── Button.tsx           # 内联组件，不受影响 ✓
│   │   └── ScrollReveal.tsx     # 动画包装器，不受影响 ✓
│   ├── modals/
│   │   ├── AgeVerificationGate.tsx  # 模态框，独立定位 ✓
│   │   └── CookieConsentBanner.tsx  # 已符合 max-w-7xl ✓
│   └── icons/                   # SVG 图标，不受影响 ✓
└── tailwind.config.ts           # 无需修改（使用默认断点和 max-w-7xl）
```

**Structure Decision**: 本特性不新建目录或文件（除 globals.css 中添加少量全局防护样式），主要修改现有组件中的 Tailwind class。

## Complexity Tracking

| Violation               | Why Needed                                                                                            | Simpler Alternative Rejected Because                                                                           |
| ----------------------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| 全局 CSS（@layer base） | 需要页面级 overflow-x: hidden 和媒体元素兜底防护，Tailwind utility classes 无法在全局基础层实现此效果 | 仅依赖组件级 utility classes 无法覆盖未来新增的原生 HTML 元素，且 overflow-x: hidden 必须作用于 html/body 级别 |

# Implementation Plan: Privacy Policy Page

**Branch**: `009-privacy-policy-page` | **Date**: 2026-03-07 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/009-privacy-policy-page/spec.md`

## Summary

为 Aura 官网创建隐私协议页面，包含两个版本：官网版（`/privacy-policy`，完整布局 + 目录导航）和嵌入版（`/privacy-policy/embed`，纯内容模式，支持 WebView/iframe 嵌入）。协议正文通过共享组件实现，数据来源于单一 TypeScript 配置文件，确保统一的文档修改入口。嵌入版优先支持移动端样式，允许所有来源的 iframe 嵌入。

## Technical Context

**Language/Version**: TypeScript 5.5+ (strict mode)
**Primary Dependencies**: Next.js 16.1 (App Router), React 19.2, Tailwind CSS 3.4 (+ @tailwindcss/typography), Framer Motion 11.0
**Storage**: N/A（本地 TypeScript 配置文件）
**Testing**: 手动验证 + `tsc --noEmit` + `next build`
**Target Platform**: Web (Desktop + Mobile + WebView/iframe)
**Project Type**: Frontend-only marketing website
**Performance Goals**: FCP < 1.5s, LCP < 2.5s, CLS < 0.1 (Constitution I)
**Constraints**: SSG 静态生成, Tailwind-first 样式, 移动优先响应式
**Scale/Scope**: 2 个页面 + 1 个共享内容组件 + 1 个配置文件

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle                   | Status | Notes                                                             |
| --------------------------- | ------ | ----------------------------------------------------------------- |
| I. Performance First        | PASS   | 静态生成页面，无第三方脚本，纯文本内容，FCP/LCP 自然达标          |
| II. Responsive Design       | PASS   | Mobile-first CSS，嵌入版优先移动端，两版本均支持 320px+           |
| III. SEO Optimization       | PASS   | 官网版 SSG + 完整 metadata + 语义化 HTML；嵌入版 noindex          |
| IV. Content Maintainability | PASS   | 数据驱动：`src/config/privacy-policy.ts` 单一数据源，共享组件复用 |
| Technology Standards        | PASS   | Tailwind + Typography 插件排版，无新依赖引入                      |
| Development Workflow        | PASS   | Feature branch，Conventional Commits                              |

**Post-Phase 1 Re-check**: All gates pass. 无新依赖引入，纯前端静态页面，符合所有 Constitution 原则。

## Project Structure

### Documentation (this feature)

```text
specs/009-privacy-policy-page/
├── spec.md
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   └── routes.md        # Phase 1 output
└── tasks.md             # Phase 2 output (via /speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── types/
│   └── privacy-policy.ts              # 类型定义
├── config/
│   └── privacy-policy.ts              # 协议内容数据（统一修改入口）
├── components/
│   └── privacy-policy/
│       ├── PrivacyPolicyContent.tsx    # 共享内容渲染组件
│       └── TableOfContents.tsx         # 目录导航组件（仅官网版）
├── app/
│   └── privacy-policy/
│       ├── page.tsx                    # 官网版页面（完整布局 + TOC）
│       └── embed/
│           └── page.tsx               # 嵌入版页面（纯内容模式）
├── components/
│   └── layout/
│       └── ClientLayout.tsx           # 修改：路径检测，嵌入版不渲染 Header/Footer
└── middleware.ts                      # 新增/修改：嵌入版路由安全头配置
```

**Structure Decision**: 遵循项目现有的按功能组织模式（config → types → components → app）。组件放在 `src/components/privacy-policy/` 目录下，页面路由使用 Next.js App Router 文件系统路由。嵌入版作为子路由 `/privacy-policy/embed` 实现。

## Complexity Tracking

> No Constitution violations. No complexity justification needed.

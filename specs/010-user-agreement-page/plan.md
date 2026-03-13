# Implementation Plan: 用户协议页面

**Branch**: `010-user-agreement-page` | **Date**: 2026-03-13 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/010-user-agreement-page/spec.md`

## Summary

创建用户协议（User Agreement）页面，包含官网版（`/user-agreement`）和嵌入版（`/user-agreement/embed`）。参照隐私协议页面的架构模式，通过提取共享的法律文档页面组件来实现复用，避免代码重复。协议内容以 TypeScript 配置文件驱动，单一数据源同时供给两个版本。

## Technical Context

**Language/Version**: TypeScript 5.5+ (strict mode)
**Primary Dependencies**: Next.js 14+ (App Router), React 18+, Tailwind CSS 3.4+
**Storage**: 本地 TypeScript 配置文件（`src/config/`）
**Testing**: 手动验证 + `tsc --noEmit` + `next build`
**Target Platform**: Vercel 部署的 Web 应用（含 WebView/iframe 嵌入支持）
**Project Type**: 前端营销网站（frontend-only）
**Performance Goals**: FCP < 1.5s, LCP < 2.5s, Lighthouse 90+
**Constraints**: CLS < 0.1, 无水平滚动（320px–2560px），所有来源可 iframe 嵌入
**Scale/Scope**: 2 个新页面路由 + 1 个配置文件 + 共享组件提取

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle                   | Status | Notes                                                                |
| --------------------------- | ------ | -------------------------------------------------------------------- |
| I. Performance First        | PASS   | 静态页面，SSG 渲染，无第三方脚本，轻量组件                           |
| II. Responsive Design       | PASS   | 复用隐私协议页面的响应式布局模式（mobile-first，320px+）             |
| III. SEO Optimization       | PASS   | 官网版 SSG + 完整 meta/OG 标签，语义化 HTML，嵌入版 noindex          |
| IV. Content Maintainability | PASS   | 内容数据从 TS 配置文件驱动，与隐私协议一致的数据分离模式             |
| Technology Standards        | PASS   | Next.js App Router + TypeScript + Tailwind CSS，Framer Motion 不涉及 |
| Development Workflow        | PASS   | 功能分支，Conventional Commits                                       |

**Post-Phase 1 Re-check**: PASS — 设计方案完全遵循 Constitution，无违规项。

## Project Structure

### Documentation (this feature)

```text
specs/010-user-agreement-page/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── app/
│   └── user-agreement/
│       ├── page.tsx                 # 官网版页面（含目录导航）
│       └── embed/
│           ├── layout.tsx           # 嵌入版布局（隐藏 header/footer）
│           └── page.tsx             # 嵌入版页面（纯内容）
├── components/
│   └── legal/                       # 新增：共享法律文档组件
│       ├── LegalPageContent.tsx     # 通用内容渲染（替代 PrivacyPolicyContent）
│       ├── LegalTableOfContents.tsx # 通用目录导航（替代 TableOfContents）
│       └── ScrollToTopButton.tsx    # 移动自 privacy-policy/（已通用）
├── config/
│   └── user-agreement.ts           # 用户协议内容数据
├── types/
│   ├── legal.ts                     # 新增：共享法律文档类型
│   └── privacy-policy.ts           # 保留，改为 re-export from legal.ts
└── proxy.ts                         # 更新：增加 /user-agreement/embed 匹配
```

**Structure Decision**: 采用共享 `legal/` 组件目录，将隐私协议和用户协议的通用渲染逻辑提取为共享组件。隐私协议页面同步重构为使用共享组件，确保两类法律文档页面保持一致的外观和行为。这符合 Constitution IV（Content Maintainability）的复用要求。

## Complexity Tracking

无违规项，无需复杂度追踪。

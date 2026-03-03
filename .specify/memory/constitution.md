<!--
  === Sync Impact Report ===
  === v1.0.1 → v1.0.2 ===
  Version change: 1.0.1 → 1.0.2 (PATCH)
  Reason: Clarified Framer Motion-first animation mandate
    and added React component requirement for form/UI elements
  Modified sections:
    - Technology Standards > Animation — Framer Motion 优先
    - Technology Standards > UI Components — 新增条目
  Added sections: None
  Removed sections: None
  Templates requiring updates:
    - .specify/templates/plan-template.md — ✅ compatible
    - .specify/templates/spec-template.md — ✅ compatible
    - .specify/templates/tasks-template.md — ✅ compatible
  Follow-up TODOs: None
-->

# Aura Website Constitution

## Core Principles

### I. Performance First

All pages MUST achieve a Lighthouse Performance score of 90+
on both mobile and desktop audits. Specific mandates:

- Images MUST use next-gen formats (WebP/AVIF) with responsive
  `srcSet` and lazy loading via `next/image`
- JavaScript bundles MUST be code-split per route; no single
  chunk may exceed 200 KB gzipped
- First Contentful Paint (FCP) MUST be under 1.5 s on a 4G
  connection; Largest Contentful Paint (LCP) under 2.5 s
- Cumulative Layout Shift (CLS) MUST remain below 0.1
- Animations MUST use CSS transforms/opacity or
  `requestAnimationFrame`; layout-triggering properties
  (width, height, top, left) MUST NOT be animated
- Third-party scripts MUST be loaded asynchronously and MUST
  NOT block the critical rendering path

### II. Responsive Design

The website MUST deliver a seamless experience across mobile
(320 px+), tablet (768 px+), and desktop (1280 px+). Mandates:

- Mobile-first CSS: base styles target mobile; wider layouts
  are applied via `min-width` media queries
- Touch targets MUST be at least 44 x 44 px on mobile
- Navigation MUST collapse to a hamburger or drawer menu on
  viewports below 768 px
- Hero sections and image galleries MUST adapt layout and
  asset resolution per breakpoint
- All interactive components (tabs, carousels, modals) MUST
  be fully operable via touch gestures on mobile
- No horizontal scrollbar MUST appear at any supported
  viewport width

### III. SEO Optimization

Every public page MUST be server-rendered (SSR) or statically
generated (SSG) via Next.js to ensure search-engine
crawlability. Mandates:

- Each page MUST define unique `<title>`, `meta description`,
  and Open Graph / Twitter Card tags
- Semantic HTML elements (`<header>`, `<main>`, `<nav>`,
  `<article>`, `<section>`, `<footer>`) MUST be used
  instead of generic `<div>` wrappers for page structure
- All images MUST include descriptive `alt` attributes
- The site MUST generate a valid `sitemap.xml` and
  `robots.txt` at build time
- Heading hierarchy MUST follow a single `<h1>` per page
  with logically nested `<h2>`–`<h6>`
- URL slugs MUST be human-readable, lowercase, and
  hyphen-separated (e.g., `/news/product-launch`)

### IV. Content Maintainability

Page content MUST be data-driven and separated from
presentation logic to allow non-developer updates with
minimal code changes. Mandates:

- Static text, image paths, and link URLs MUST be extracted
  into structured data files (JSON/TS constants) rather than
  hard-coded in JSX templates
- Reusable UI patterns (cards, hero sections, CTAs) MUST be
  abstracted into shared components with props-driven content
- The News page article list MUST be sourced from a local
  data layer (JSON/MDX files) that can later be swapped for
  a remote CMS without component rewrites
- Download links (App Store / Google Play) MUST be
  centrally configured in a single constants file and
  referenced across all pages
- i18n architecture MUST be pre-wired from day one
  (next-intl or equivalent) even if launching with English
  only, to support future multi-language expansion

## Technology Standards

This project is a **frontend-only** marketing website built
with the following stack:

- **Framework**: Next.js 14+ (App Router) with React 18+
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS 是首选且唯一的样式实现方式。
  所有布局、间距、颜色、排版 MUST 优先使用 Tailwind
  utility classes 实现；仅当 Tailwind 无法表达时（如
  复杂动画关键帧、第三方组件覆写）才允许编写自定义
  CSS，且 MUST 使用 CSS Modules 限定作用域；禁止编写
  全局 CSS 除非有明确理由并经审批
- **Animation**: Framer Motion 是首选动画方案。所有
  入场/退场、滚动驱动、布局过渡动画 MUST 优先使用
  Framer Motion 实现；简单的 hover/focus 状态变化可
  使用 Tailwind `transition-*` 或纯 CSS transitions；
  禁止引入其他重型动画库（如 GSAP）除非经审批
- **UI Components**: Button、Input、Select、Dialog 等
  表单与交互组件 MUST 基于 React 组件实现（推荐使用
  Radix UI / Headless UI 等无样式基础组件库），确保
  可访问性（a11y）与键盘操作支持；禁止使用原生 HTML
  表单元素裸写而不封装为 React 组件
- **Package manager**: pnpm (lockfile MUST be committed)
- **Deployment target**: Vercel or equivalent edge-capable
  platform with automatic preview deployments per PR
- **Node version**: 20 LTS (pinned via `.nvmrc`)
- **New dependency rule**: Any new `dependencies` addition
  MUST be justified; `devDependencies` are unrestricted

## Development Workflow

- **Branching**: Feature branches off `main`; direct pushes
  to `main` are prohibited
- **Commits**: Conventional Commits format
  (`feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`)
- **Code quality**: ESLint + Prettier enforced via pre-commit
  hooks (Husky + lint-staged)
- **Component convention**: One component per file; file name
  matches exported component name in PascalCase
- **Image assets**: All static images stored under
  `public/images/` with descriptive, kebab-case filenames
- **PR checklist**: Every pull request MUST pass linting,
  type-check (`tsc --noEmit`), and build (`next build`)
  before merge

## Governance

This Constitution is the authoritative reference for all
development decisions on the Aura Website project. It
supersedes ad-hoc conventions and informal agreements.

- **Compliance**: All code contributions MUST be verified
  against these principles during review
- **Amendments**: Any change to this Constitution MUST be
  documented with a version bump, rationale, and migration
  plan if existing code is affected
- **Versioning**: Constitution versions follow Semantic
  Versioning — MAJOR for principle removals/redefinitions,
  MINOR for new principles or material expansions, PATCH
  for clarifications and wording fixes
- **Complexity justification**: Deviations from these
  principles MUST be recorded in the Complexity Tracking
  section of the relevant plan document with a clear
  rationale and rejected alternatives

**Version**: 1.0.2 | **Ratified**: 2026-02-26 | **Last Amended**: 2026-02-26

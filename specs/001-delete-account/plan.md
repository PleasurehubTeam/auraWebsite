# Implementation Plan: 账号删除申请页面

**Branch**: `001-delete-account` | **Date**: 2026-03-19 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-delete-account/spec.md`

## Summary

为 Aura 官网新增一个静态的账号删除申请页面（`/delete-account`），向用户展示删除账号的说明、不可逆操作警告，以及通过客服邮箱（`support@realaura.ai`）发起申请的方式。页面遵循现有 legal/信息类页面的架构模式，内容从 TypeScript 配置文件中读取，无需后端接口。

## Technical Context

**Language/Version**: TypeScript 5.5+ (strict mode)
**Primary Dependencies**: Next.js 16.1 (App Router), React 19.2, Tailwind CSS 3.4, Framer Motion 11.0
**Storage**: N/A（纯静态页面，数据来源为本地 TypeScript 配置文件）
**Testing**: tsc --noEmit + ESLint + next build
**Target Platform**: Web（Vercel edge platform）
**Project Type**: Web application — frontend-only marketing website
**Performance Goals**: Lighthouse 90+ (mobile & desktop); FCP < 1.5s; LCP < 2.5s; CLS < 0.1
**Constraints**: 无第三方运行时依赖；无后端 API 调用；SEO 可索引（SSG）
**Scale/Scope**: 单页静态页面，内容约 200–400 字

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle                                       | Status  | Notes                                                 |
| ----------------------------------------------- | ------- | ----------------------------------------------------- |
| I. Performance First (Lighthouse 90+, FCP<1.5s) | ✅ PASS | 纯静态 SSG 页面，无图片资源，无 JS 运行时负担         |
| I. Images: WebP/AVIF + next/image               | ✅ N/A  | 页面无图片                                            |
| I. JS bundle < 200KB gzip                       | ✅ PASS | 无额外依赖，复用已有组件                              |
| I. Animation via transforms/opacity only        | ✅ PASS | 使用 Framer Motion 的入场动画（opacity + translateY） |
| II. Responsive Design (320px+)                  | ✅ PASS | Tailwind mobile-first，touch targets ≥44px            |
| II. No horizontal scroll                        | ✅ PASS | max-w-3xl + px-4 布局保证内容不溢出                   |
| III. SEO: SSG + unique meta                     | ✅ PASS | Next.js generateMetadata / export const metadata      |
| III. Semantic HTML                              | ✅ PASS | main / h1 / section / p 等语义化标签                  |
| III. Heading hierarchy (single h1)              | ✅ PASS | 单 h1 + h2 子标题                                     |
| IV. Content in TS config files                  | ✅ PASS | 新建 src/config/delete-account.ts                     |
| IV. i18n pre-wired                              | ✅ N/A  | 现有项目暂未实装 next-intl，与其他页面保持一致        |
| Tech: Next.js App Router                        | ✅ PASS | src/app/delete-account/page.tsx                       |
| Tech: Tailwind CSS only                         | ✅ PASS | 无自定义全局 CSS                                      |
| Tech: Framer Motion for animation               | ✅ PASS | 入场动画使用 Framer Motion                            |
| New runtime dependency                          | ✅ PASS | 无新增 dependencies                                   |

**Constitution Check Result**: ✅ ALL GATES PASS — no violations

## Project Structure

### Documentation (this feature)

```text
specs/001-delete-account/
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
│   └── delete-account/
│       └── page.tsx                  # 账号删除申请页面（SSG）
├── components/
│   └── delete-account/
│       └── DeleteAccountContent.tsx  # 页面主体内容组件
└── config/
    └── delete-account.ts             # 页面文案与联系信息配置
```

**Structure Decision**: 单项目前端结构，遵循现有 privacy-policy / user-agreement 页面模式。
配置文件驱动内容，组件目录与页面路由对应。

## Complexity Tracking

> 无 Constitution 违规项，此节不适用。

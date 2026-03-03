# Implementation Plan: 内容管理页面 (Content Management Page)

**Branch**: `008-content-management` | **Date**: 2026-03-03 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/008-content-management/spec.md`

## Summary

实现内容管理页面（`/admin/content`），含前端登录校验（固定凭据 admin / aura1509）和文章增删改查功能。页面以表格展示所有文章，支持搜索和标签筛选，新增/编辑通过精简的 4 字段弹窗表单完成（图片、标签、标题、内容，基于 Radix UI Dialog），预览功能通过 `window.open` 在新标签页打开文章详情页。数据从现有 `newsArticles` 配置加载，CRUD 操作在客户端 state 中管理。纯桌面端页面，不需要响应式设计。

## Technical Context

**Language/Version**: TypeScript 5.5+ (strict mode)
**Primary Dependencies**: Next.js 14.2+ (App Router), React 18.3+, Tailwind CSS 3.4+, @radix-ui/react-dialog, lucide-react
**Storage**: N/A（纯前端项目，数据从本地 TypeScript 配置文件读取，CRUD 在客户端 state 管理）
**Testing**: `next build` + `tsc --noEmit` + ESLint
**Target Platform**: Web（桌面端 ≥1024px），不需要移动端和平板端适配
**Project Type**: Frontend-only 管理页面（Next.js App Router，client component）
**Performance Goals**: N/A（管理后台页面，不纳入 Lighthouse 审计）
**Constraints**: 不需要 SSR/SSG（client-side rendering），不需要 SEO 优化
**Scale/Scope**: 单页面（/admin/content），管理 50+ 篇文章，6 个新组件文件 + 2 个 hooks 文件 + 1 个类型文件 + 1 个配置文件

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### Pre-Phase 0 Check

| 原则                        | 要求                                | 状态    | 说明                                                       |
| --------------------------- | ----------------------------------- | ------- | ---------------------------------------------------------- |
| I. Performance First        | Lighthouse 90+                      | ⬜ N/A  | 管理后台页面，不纳入 Lighthouse 审计                       |
| I. Performance First        | JS bundle 每路由 < 200KB gzipped    | ✅ PASS | 仅使用现有依赖（Radix Dialog、Lucide icons），无新重型依赖 |
| II. Responsive Design       | Mobile-first CSS                    | ⬜ N/A  | 明确要求仅桌面端，不需要响应式设计                         |
| III. SEO Optimization       | SSR/SSG + meta 标签                 | ⬜ N/A  | 管理页面不需要 SEO 优化                                    |
| IV. Content Maintainability | 数据与展示分离                      | ✅ PASS | 复用现有 newsArticles 配置数据                             |
| Tech Standards              | Tailwind CSS 样式                   | ✅ PASS | 所有样式使用 Tailwind utilities                            |
| Tech Standards              | UI Components 使用 React + Radix UI | ✅ PASS | 模态框基于 @radix-ui/react-dialog                          |
| Dev Workflow                | 一个文件一个组件                    | ✅ PASS | 每个组件独立文件                                           |

**GATE 结果**: ✅ 适用项全部通过。管理后台页面特性（非 SEO、非响应式）已在 spec 中明确标注。

## Project Structure

### Documentation (this feature)

```text
specs/008-content-management/
├── spec.md              # 功能规格说明
├── plan.md              # 本文件（实施计划）
├── data-model.md        # 数据模型
├── tasks.md             # 实施任务
├── research.md          # 技术调研
├── quickstart.md        # 快速上手
└── checklists/
    └── requirements.md  # 需求核查清单
```

### Source Code (repository root)

```text
src/
├── app/
│   └── admin/
│       └── content/
│           └── page.tsx                     # [新建] 内容管理页面路由组件
├── components/
│   └── admin/                               # [新建] 管理页面专属组件
│       ├── AdminLoginGate.tsx                # 登录校验组件（账号密码表单）
│       ├── ArticleTable.tsx                  # 文章列表表格组件
│       ├── ArticleFormModal.tsx              # 新增/编辑文章模态框表单（4字段）
│       ├── ArticleDeleteDialog.tsx           # 删除确认对话框
│       ├── ArticleSearchBar.tsx              # 搜索栏 + 标签筛选 + 新增按钮
│       └── ArticlePagination.tsx             # 分页控件
├── config/
│   └── admin.ts                             # [新建] 管理页面配置（凭据等常量）
├── hooks/
│   ├── useAdminAuth.ts                      # [新建] 登录状态管理 hook
│   └── useArticleManager.ts                 # [新建] 文章 CRUD 状态管理 hook
└── types/
    └── admin.ts                             # [新建] 管理页面类型定义
```

**Structure Decision**: 采用 `admin/` 组件目录结构，将管理页面组件与前台组件完全隔离。新增 AdminLoginGate 组件作为访问网关，登录状态通过 sessionStorage 管理。表单仅 4 个字段（图片、标签、标题、内容），其余 NewsArticle 字段由系统自动生成。复用现有 `NewsArticle` 类型。页面使用 `"use client"` 指令，所有交互在客户端完成。

## Complexity Tracking

| Violation      | Why Needed                             | Simpler Alternative Rejected Because |
| -------------- | -------------------------------------- | ------------------------------------ |
| 不使用 SSR/SSG | 管理页面需要全客户端交互（state CRUD） | SSR 不适用于纯客户端 state 管理页面  |
| 不实现响应式   | 用户明确要求仅桌面端                   | 移动端适配增加不必要的复杂度         |
| 前端硬编码凭据 | MVP 阶段无后端认证服务                 | 仅用于基础访问控制，非安全敏感场景   |

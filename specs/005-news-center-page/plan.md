# Implementation Plan: 新闻中心页 (News Center Page)

**Branch**: `005-news-center-page` | **Date**: 2026-02-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-news-center-page/spec.md`

## Summary

实现 Aura 官网的新闻中心页，包括：全宽 Hero Banner、分类筛选标签（Breaking news / Event / About Aura）、瀑布流/网格卡片布局、新闻详情页（杂志风格）、无限滚动加载。数据层采用 React Hook 封装（`useNewsArticles`、`useNewsArticle`），内部基于 mock 数据模拟异步分页加载逻辑，后期可无缝替换为真实 API。

## Technical Context

**Language/Version**: TypeScript 5.5+ (strict mode)
**Primary Dependencies**: Next.js 14.2 (App Router), React 18.3, Tailwind CSS 3.4, Framer Motion 11.0
**Storage**: N/A（纯前端项目，数据来源为本地 mock 配置文件）
**Testing**: ESLint + `pnpm build`（含 TypeScript 类型检查），无单元测试框架
**Target Platform**: Web（Vercel 部署，SSR/SSG）
**Project Type**: 前端营销网站（frontend-only marketing website）
**Performance Goals**: Lighthouse 90+, FCP < 1.5s, LCP < 2.5s, CLS < 0.1
**Constraints**: 不引入新的 `dependencies`（使用浏览器原生 API），遵循项目现有的 config → types → components → app 数据流模式
**Scale/Scope**: 初始 8 篇 mock 文章，设计支持 50+ 篇（通过分页 Hook + 无限滚动）

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### Pre-Design Check

| 原则                        | 状态    | 说明                                                                                                                                                                      |
| --------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| I. Performance First        | ✅ PASS | 图片使用 `next/image` + WebP 格式（已有资源）；无限滚动分批渲染减少初始负载；Intersection Observer 替代 scroll 事件；无新依赖引入                                         |
| II. Responsive Design       | ✅ PASS | 桌面端 3 列网格 → 平板端 2 列 → 移动端单列垂直列表；触控目标遵循 44×44px 最低要求；分类标签支持触摸操作                                                                   |
| III. SEO Optimization       | ✅ PASS | 列表页和详情页均使用 SSG（`generateStaticParams`）；每页独立 metadata + Open Graph；语义化 HTML（`<article>`、`<section>`、`<nav>`）；URL slug 人类可读、小写、连字符分隔 |
| IV. Content Maintainability | ✅ PASS | 数据通过 React Hook 访问，底层来自 `config/news.ts` mock 数据；内容与展示完全分离；后期替换 API 只需修改 Hook 内部实现                                                    |
| V. Technology Standards     | ✅ PASS | Tailwind CSS 样式；Framer Motion 动画（ScrollReveal + AnimatePresence）；TypeScript strict；pnpm 包管理                                                                   |
| VI. Development Workflow    | ✅ PASS | 功能分支开发；组件遵循 PascalCase 一文件一组件；图片存放于 `public/images/03News/`                                                                                        |

**Gate Result**: ✅ 全部通过，无违反项

## Project Structure

### Documentation (this feature)

```text
specs/005-news-center-page/
├── plan.md              # 本文件
├── spec.md              # 功能规格说明
├── research.md          # 技术研究决策
├── data-model.md        # 数据模型定义
├── quickstart.md        # 快速开始指南
├── contracts/           # 组件接口契约
│   └── component-contracts.md
├── checklists/
│   └── requirements.md  # 质量检查清单
└── tasks.md             # 实施任务列表（由 /speckit.tasks 生成）
```

### Source Code (repository root)

```text
src/
├── types/
│   └── news.ts                    # 新闻相关类型定义（NewsArticle, NewsCategory 等）
├── config/
│   └── news.ts                    # Mock 数据 + 页面配置（文章元数据、Hero 配置、空状态配置）
├── hooks/
│   ├── useNewsArticles.ts         # 文章列表 Hook（分类筛选 + 分页加载）
│   └── useNewsArticle.ts          # 单篇文章详情 Hook
├── components/
│   └── news/
│       ├── NewsHeroBanner.tsx      # Hero Banner 区域
│       ├── NewsCategoryTabs.tsx    # 分类筛选标签（Breaking news / Event / About Aura）
│       ├── NewsGrid.tsx            # 瀑布流/网格布局容器 + Intersection Observer 哨兵
│       ├── NewsCard.tsx            # 单张新闻卡片（图片 + 标题 + 悬停效果）
│       ├── NewsListingContent.tsx   # 列表页客户端内容区域（分类筛选 + Hook 数据 + 网格）
│       ├── NewsEmptyState.tsx      # 空状态组件（品牌插图 + 提示 + 引导按钮）
│       ├── NewsArticleDetail.tsx   # 详情页杂志风格布局
│       └── ShareButton.tsx         # 复制链接分享按钮
├── app/
│   └── news/
│       ├── page.tsx               # 新闻列表页（替换现有 stub）
│       └── [slug]/
│           └── page.tsx           # 新闻详情页（动态路由）
public/
└── images/
    └── 03News/
        ├── Aura_APP_News01.png    # Hero Banner 背景图
        ├── Aura_APP_News02-01.webp  # 新闻卡片图片 1
        ├── Aura_APP_News02-02.webp  # 新闻卡片图片 2
        ├── Aura_APP_News02-03.webp  # 新闻卡片图片 3
        ├── Aura_APP_News02-04.webp  # 新闻卡片图片 4
        ├── Aura_APP_News02-05.webp  # 新闻卡片图片 5
        ├── Aura_APP_News02-06.webp  # 新闻卡片图片 6
        ├── Aura_APP_News02-07.webp  # 新闻卡片图片 7
        └── Aura_APP_News02-08.webp  # 新闻卡片图片 8
```

**Structure Decision**: 遵循项目已有的单体前端结构（`src/` 根目录）。新增 `hooks/` 目录下的数据访问 Hook，`components/news/` 目录下的新闻组件，以及 `app/news/` 下的页面文件。数据流模式与现有 `config → types → components → app` 一致，增加 `hooks` 层作为组件与配置之间的数据访问抽象。

## Data Flow Architecture

```text
config/news.ts (Mock 数据源)
       ↓
hooks/useNewsArticles.ts / useNewsArticle.ts (数据访问层 - 模拟异步 + 分页)
       ↓
components/news/* (UI 组件 - 只消费 Hook 返回的 data/loading/error)
       ↓
app/news/page.tsx / app/news/[slug]/page.tsx (页面组装)
```

**分页加载流程**:

1. `useNewsArticles(category)` 初始加载第 1 页（6 条）
2. 用户滚动至底部 → Intersection Observer 触发 → 调用 `loadMore()`
3. Hook 内部递增 page → 从 mock 数据切片取下一批 → 追加到 `articles` 数组
4. `hasMore` 为 false 时停止加载
5. 切换分类标签 → Hook 重置 page 为 1 → 重新从第一批开始加载

## Design Decisions

### 1. CSS Grid 瀑布流布局（R-002）

根据设计稿，桌面端采用 3 列 CSS Grid，卡片通过 `cardSize` 属性控制高度：

- `large` 卡片：`grid-row: span 2`（占 2 个行单位，约 400px 高度）
- `small` 卡片：`grid-row: span 1`（占 1 个行单位，约 200px 高度）

设计稿中的卡片排列模式（从 8 张图片分析）：

```
桌面端 (3 列):
┌─────────┐ ┌────┐ ┌────┐
│  large   │ │small│ │small│
│  (01)    │ │(02) │ │(03) │
│          │ ├────┤ ├────┤
├─────────┤ │small│ │small│
│  small   │ │(04) │ │(05) │
│  (06)    │ ├────┤ ├────┤
├─────────┤ │small│ │ lg  │
│  small   │ │(07) │ │(08) │
│          │ │    │ │     │
└─────────┘ └────┘ └─────┘

平板端 (2 列): 交替大小卡片
移动端 (1 列): 所有卡片全宽、等高
```

### 2. React Hook 数据层（R-001 + R-007）

两个 Hook 的核心实现策略：

**`useNewsArticles(category?)`**:

- 内部状态：`articles[]`, `loading`, `error`, `page`, `hasMore`
- `useEffect` 监听 `category` 变化 → 重置分页 → 模拟异步加载第 1 页
- `loadMore()` 方法：递增 page → 模拟异步加载 → 追加数据
- Mock 实现：`setTimeout(300-500ms)` 模拟网络延迟 → 从完整数据按 category 筛选 → 按 page 切片（每页 6 条）
- 后期替换：将 `setTimeout` + 数据切片替换为 `fetch(apiUrl)` 即可

**`useNewsArticle(slug)`**:

- 内部状态：`article | null`, `loading`, `error`
- `useEffect` 监听 `slug` 变化 → 模拟异步加载 → 返回匹配文章
- Mock 实现：`setTimeout(200ms)` → 从完整数据中查找 slug 匹配项
- 未找到时：`article` 为 null，`error` 为 null，由页面层处理 404

### 3. 分类标签切换（参照现有 TabSwitcher 模式）

参照项目中 `TabSwitcher.tsx` 的实现模式：

- 使用 Framer Motion `layoutId` 实现选中指示器的平滑滑动
- `AnimatePresence` 管理网格内容的淡入淡出过渡
- 选中状态通过 `useState` 管理，切换时触发 Hook 的 category 变化

### 4. 新闻详情页杂志布局（R-004）

```
桌面端:
┌──────────────────────────────────────────────┐
│  ┌──────────────────┐  ┌──────────────────┐  │
│  │                  │  │  文章标题（大号）  │  │
│  │   特色大图       │  │  发布日期         │  │
│  │   (60% 宽度)     │  │  分类标签         │  │
│  │                  │  │                  │  │
│  └──────────────────┘  └──────────────────┘  │
├──────────────────────────────────────────────┤
│              正文内容（居中窄栏）              │
│              max-w-3xl mx-auto               │
├──────────────────────────────────────────────┤
│  [复制链接]                    [返回新闻中心] │
└──────────────────────────────────────────────┘

移动端:
┌──────────────────┐
│    特色大图       │
│    (全宽)        │
├──────────────────┤
│  文章标题         │
│  发布日期 · 分类  │
├──────────────────┤
│  正文内容         │
├──────────────────┤
│  [复制链接]       │
│  [返回新闻中心]   │
└──────────────────┘
```

## Complexity Tracking

| Violation                        | Why Needed                                                                                                                                                                | Simpler Alternative Rejected Because                                                                                            |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Constitution IV: i18n 架构未预置 | 项目级预存问题 — 全站（Home、App、About 等）均未配置 next-intl，非本功能引入。新闻页 UI 字符串（"Copy Link"、"Back to News Center" 等）暂硬编码为英文，与全站现有做法一致 | 在本功能中单独接入 i18n 会引入项目首个 next-intl 依赖，影响范围超出新闻中心页。计划在专项 i18n 基础设施任务中统一处理全站国际化 |

## Post-Design Constitution Re-Check

| 原则                        | 状态    | 验证点                                                                                                                                       |
| --------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| I. Performance First        | ✅ PASS | `next/image` + WebP/PNG 混合；CSS Grid 原生布局无 JS 计算；Intersection Observer 替代 scroll 事件；分页加载减少初始 DOM 节点数；无新依赖     |
| II. Responsive Design       | ✅ PASS | 3 断点设计（mobile 320px+ / tablet 768px+ / desktop 1280px+）；移动端单列列表；触控目标 ≥ 44×44px；分类标签全宽可滚动                        |
| III. SEO Optimization       | ✅ PASS | 列表页 SSG + 详情页 `generateStaticParams` SSG；独立 metadata + OG 标签；语义化 `<article>`、`<section>`、`<nav>`；slug 格式 `/news/xxx-xxx` |
| IV. Content Maintainability | ✅ PASS | React Hook 数据访问层完全隔离 UI 与数据源；mock 数据集中在 `config/news.ts`；替换 API 零组件改动                                             |
| V. Technology Standards     | ✅ PASS | Tailwind 样式；Framer Motion 入场/过渡动画；TypeScript strict 类型安全；pnpm 锁文件                                                          |
| VI. Development Workflow    | ✅ PASS | 功能分支 `005-news-center-page`；PascalCase 组件文件名；图片位于 `public/images/03News/`；ESLint + build 验证                                |

**Post-Design Gate Result**: ✅ 全部通过

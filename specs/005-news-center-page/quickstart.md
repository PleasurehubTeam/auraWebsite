# Quickstart: 新闻中心页 (005)

**Branch**: `005-news-center-page`

## Prerequisites

- Node.js 20 LTS (see `.nvmrc`)
- pnpm installed globally

## Setup

```bash
git checkout 005-news-center-page
pnpm install
pnpm dev
```

Visit `http://localhost:3000/news` to view the News Center page.
Visit `http://localhost:3000/news/[slug]` to view a news article detail page.

## Key Files to Create

### Type Definitions

- `src/types/news.ts` — NewsArticle, NewsCategory, NewsCategoryItem, NewsPageData 等接口定义

### Data & Configuration

- `src/config/news.ts` — Mock 文章数据、页面配置（Hero、分类、空状态）、同步辅助函数（getAllNewsArticles、getNewsArticleBySlug）

### Custom Hooks (数据访问层)

- `src/hooks/useNewsArticles.ts` — 文章列表 Hook（分类筛选 + 分页加载 + loadMore）
- `src/hooks/useNewsArticle.ts` — 单篇文章详情 Hook

### Components

- `src/components/news/NewsHeroBanner.tsx` — Hero Banner 区域
- `src/components/news/NewsCategoryTabs.tsx` — 分类筛选标签
- `src/components/news/NewsGrid.tsx` — 瀑布流/网格布局容器 + Intersection Observer 哨兵
- `src/components/news/NewsCard.tsx` — 单张新闻卡片
- `src/components/news/NewsEmptyState.tsx` — 空状态组件
- `src/components/news/NewsArticleDetail.tsx` — 详情页杂志风格布局
- `src/components/news/ShareButton.tsx` — 复制链接分享按钮

### Pages

- `src/app/news/page.tsx` — 新闻列表页（替换现有 stub）
- `src/app/news/[slug]/page.tsx` — 新闻详情页（新建）

### Content Files

- `public/images/03News/` — 新闻相关图片资源目录（已有 9 个图片文件）

## Architecture Pattern

遵循项目已有模式，增加 Hook 数据访问层：

```
config/news.ts (Mock 数据源)
       ↓
hooks/useNewsArticles.ts / useNewsArticle.ts (数据访问层 - 模拟异步 + 分页)
       ↓
components/news/* (UI 组件 - 消费 Hook 返回的 data/loading/error)
       ↓
app/news/page.tsx / app/news/[slug]/page.tsx (页面组装)
```

Server 端函数（用于 metadata + SSG）:

```
config/news.ts → getAllNewsArticles() / getNewsArticleBySlug() → app/news/[slug]/page.tsx
```

## Development Notes

- 所有样式使用 Tailwind CSS utility classes
- 动画使用 Framer Motion（入场用 ScrollReveal，标签切换用 AnimatePresence + layoutId）
- 图片使用 `next/image` 组件，包含 `sizes` 和 `alt` 属性
- Hero 背景图使用 `priority` 属性（LCP 关键元素）
- 语义化 HTML：`<article>`, `<section>`, `<nav>` 等
- 页面必须设置 metadata（title, description, Open Graph）
- 组件文件名使用 PascalCase，一个文件一个组件
- CSS Grid 布局使用 `grid-row: span 2` 控制大卡片高度（仅桌面/平板端）
- 无限滚动使用 Intersection Observer API（浏览器原生，无依赖）
- Mock 数据使用 `setTimeout` 模拟异步延迟（~400ms）
- 分页常量：每页 6 条文章

## Mock Data Specs

初始版本包含 8 篇 mock 文章：

- Breaking news: 3 篇
- Event: 3 篇
- About Aura: 2 篇

每篇文章使用 `public/images/03News/Aura_APP_News02-0X.webp` 图片。
Hero Banner 使用 `public/images/03News/Aura_APP_News01.png`。

## Verification

```bash
pnpm lint          # ESLint 检查
pnpm build         # Next.js 构建（含类型检查）
```

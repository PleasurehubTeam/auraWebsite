# Component Contracts: 新闻中心页 (News Center Page)

**Date**: 2026-02-27
**Branch**: `005-news-center-page`

本项目为纯前端项目，无外部 API。以下定义组件间的 Props 接口契约和数据访问 Hook 契约。

## 组件 Props 接口

### NewsHeroBanner

**文件**: `src/components/news/NewsHeroBanner.tsx`
**类型**: Client Component (`"use client"`)

```typescript
interface NewsHeroBannerProps {
  title: string; // Hero 标题
  subtitle: string; // Hero 副标题
  backgroundImage: string; // 背景图路径
  backgroundAlt: string; // 背景图替代文本
}
```

**行为**: 全宽展示，深色背景图 + 白色文字。使用 `next/image` `fill` + `priority`。ScrollReveal 入场动画。

### NewsCategoryTabs

**文件**: `src/components/news/NewsCategoryTabs.tsx`
**类型**: Client Component (`"use client"`)

```typescript
interface NewsCategoryTabsProps {
  categories: NewsCategoryItem[]; // 分类列表
  activeCategory: NewsCategory; // 当前选中的分类
  onCategoryChange: (category: NewsCategory) => void; // 切换回调
}
```

**行为**: 水平标签按钮，Framer Motion `layoutId` 指示器平滑滑动。`role="tablist"` + `role="tab"` + `aria-selected`。

### NewsGrid

**文件**: `src/components/news/NewsGrid.tsx`
**类型**: Client Component (`"use client"`)

```typescript
interface NewsGridProps {
  articles: NewsArticle[]; // 当前展示的文章列表
  loading: boolean; // 是否正在加载
  hasMore: boolean; // 是否还有更多
  onLoadMore: () => void; // 加载更多回调（Intersection Observer 触发）
}
```

**行为**: CSS Grid 容器（桌面 3 列、平板 2 列、移动 1 列）。底部 Intersection Observer 哨兵元素。`AnimatePresence` 管理卡片进入动画。

### NewsCard

**文件**: `src/components/news/NewsCard.tsx`
**类型**: Client Component (`"use client"`)

```typescript
interface NewsCardProps {
  article: NewsArticle; // 文章数据（含 cardSize）
  index: number; // 在列表中的索引（用于 ScrollReveal 动画延迟）
}
```

**行为**: 可点击导航至 `/news/${article.slug}`。`next/image` `fill` + `object-cover`。标题 `truncate` 单行省略。悬停 `scale(1.05)` + 暗色遮罩。`rounded-2xl` + `overflow-hidden`。

### NewsListingContent

**文件**: `src/components/news/NewsListingContent.tsx`
**类型**: Client Component (`"use client"`)

```typescript
interface NewsListingContentProps {
  initialArticles: NewsArticle[]; // SSG 预渲染的初始文章（首屏 SEO）
  categories: NewsCategoryItem[]; // 分类列表配置
}
```

**行为**: 列表页的客户端内容区域，组装分类筛选 + 数据 Hook + 网格。内部使用 `useState` 管理 `activeCategory`，调用 `useNewsArticles(activeCategory)` 获取数据，渲染 `NewsCategoryTabs` + `NewsGrid`（或 `NewsEmptyState`）。分类切换时 Hook 自动重置分页。

### NewsEmptyState

**文件**: `src/components/news/NewsEmptyState.tsx`
**类型**: Client Component (`"use client"`)

```typescript
interface NewsEmptyStateProps {
  illustration: string; // 插图路径
  message: string; // 提示文案
  actionLabel: string; // 按钮文案
  onAction: () => void; // 按钮点击回调（切换到默认分类）
}
```

**行为**: 居中展示插图 + 文案 + 引导按钮。按钮使用 `Button` 组件 `variant="secondary"`。

### NewsArticleDetail

**文件**: `src/components/news/NewsArticleDetail.tsx`
**类型**: Client Component (`"use client"`)

```typescript
interface NewsArticleDetailProps {
  article: NewsArticle; // 完整文章数据（含 content 正文）
}
```

**行为**: 杂志风格布局。桌面端：左图 60%（`w-3/5`）+ 右侧标题/日期/分类 40%（`w-2/5`）。移动端上下堆叠。正文 `max-w-3xl mx-auto`。底部 ShareButton + 返回链接。

### ShareButton

**文件**: `src/components/news/ShareButton.tsx`
**类型**: Client Component (`"use client"`)

```typescript
interface ShareButtonProps {
  url?: string; // 要分享的 URL（默认 window.location.href）
  className?: string; // 额外样式类名
}
```

**行为**: `navigator.clipboard.writeText()` 复制链接。文字 "Copy Link" → "Copied!" 切换。2 秒后恢复。`Button` `variant="secondary"` `size="sm"`。

## 数据访问 Hook 契约

### useNewsArticles

**文件**: `src/hooks/useNewsArticles.ts`

```typescript
function useNewsArticles(category?: NewsCategory): {
  articles: NewsArticle[]; // 已加载的文章列表（累积追加）
  loading: boolean; // 加载状态
  error: string | null; // 错误信息
  hasMore: boolean; // 是否还有更多
  loadMore: () => void; // 加载下一页
};
```

**内部行为**:

- `category` 变化时重置分页，从第 1 页开始加载
- `loadMore()` 递增内部 `page` 计数器，追加下一批数据
- Mock 实现：`setTimeout(~400ms)` 模拟异步 → 按 category 筛选 → 按 page 切片（每页 6 条）
- 后期替换：将 mock 逻辑替换为 `fetch(apiUrl)` 即可

### useNewsArticle

**文件**: `src/hooks/useNewsArticle.ts`

```typescript
function useNewsArticle(slug: string): {
  article: NewsArticle | null; // 文章详情
  loading: boolean; // 加载状态
  error: string | null; // 错误信息
};
```

**内部行为**:

- `slug` 变化时重新加载
- Mock 实现：`setTimeout(~200ms)` → 从 mock 数据中按 slug 查找
- 未找到时：`article` 为 null，`error` 为 null（由页面层处理 404）

## 同步数据访问函数契约（Server 端使用）

```typescript
// src/config/news.ts 导出

/** 获取所有文章（用于 generateStaticParams） */
function getAllNewsArticles(): NewsArticle[];

/** 按 slug 获取单篇文章（用于 generateMetadata） */
function getNewsArticleBySlug(slug: string): NewsArticle | undefined;

/** 按分类获取文章（供 Hook 内部使用） */
function getNewsArticlesByCategory(category: NewsCategory): NewsArticle[];
```

## Page Metadata Contract

### 列表页 - 静态 metadata

```typescript
// src/app/news/page.tsx
export const metadata: Metadata = {
  title: "News Center | Aura",
  description: "Stay up-to-date with Aura's latest news, events, and stories.",
  openGraph: {
    title: "News Center | Aura",
    description:
      "Stay up-to-date with Aura's latest news, events, and stories.",
    type: "website",
  },
};
```

### 详情页 - 动态 metadata

```typescript
// src/app/news/[slug]/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getNewsArticleBySlug(params.slug);
  if (!article) return { title: "Article Not Found | Aura" };
  return {
    title: `${article.title} | Aura News`,
    description: article.summary,
    openGraph: {
      title: `${article.title} | Aura News`,
      description: article.summary,
      type: "article",
      publishedTime: article.publishDate,
      images: [article.featuredImage],
    },
  };
}

export function generateStaticParams() {
  return getAllNewsArticles().map((article) => ({
    slug: article.slug,
  }));
}
```

**注意**: `generateMetadata` 和 `generateStaticParams` 在 Server 端运行，使用从 `config/news.ts` 导入的同步辅助函数，而非 React Hook。

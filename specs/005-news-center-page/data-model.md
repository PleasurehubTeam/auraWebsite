# Data Model: 新闻中心页 (News Center Page)

**Date**: 2026-02-27
**Branch**: `005-news-center-page`

## 实体定义

### NewsCategory (新闻分类枚举)

固定分类集合，用于筛选和标签展示。

```typescript
type NewsCategory = "breaking-news" | "event" | "about-aura";
```

| 值                | 展示名称      | 展示顺序      |
| ----------------- | ------------- | ------------- |
| `'breaking-news'` | Breaking news | 1（默认选中） |
| `'event'`         | Event         | 2             |
| `'about-aura'`    | About Aura    | 3             |

**规则**:

- 初始版本为固定集合，不支持动态增删
- 展示顺序固定：Breaking news → Event → About Aura
- 默认选中分类：`'breaking-news'`

### NewsCategoryItem (分类标签配置)

```typescript
interface NewsCategoryItem {
  id: NewsCategory; // 分类标识符
  label: string; // 展示名称（如 "Breaking news"）
  order: number; // 展示顺序
}
```

### NewsArticle (新闻文章)

核心实体，代表一篇新闻文章。元数据和正文内容均存储在 `src/config/news.ts` 的 mock 数据中。

| Field         | Type                   | Required | Description                                                |
| ------------- | ---------------------- | -------- | ---------------------------------------------------------- |
| id            | string                 | Yes      | 唯一标识符（如 "news-001"）                                |
| slug          | string                 | Yes      | URL 路径标识，human-readable，kebab-case                   |
| title         | string                 | Yes      | 文章标题                                                   |
| category      | NewsCategory           | Yes      | 所属分类                                                   |
| featuredImage | string                 | Yes      | 特色图片路径（相对于 /public/）                            |
| imageAlt      | string                 | Yes      | 图片 alt 描述文本（SEO/无障碍）                            |
| publishDate   | string (ISO 8601)      | Yes      | 发布日期，格式如 "2026-02-20"                              |
| summary       | string                 | Yes      | 文章摘要（用于 SEO meta description）                      |
| content       | string                 | Yes      | 文章正文内容（HTML 字符串，初始版本内联于 mock 数据）      |
| cardSize      | `'large'` \| `'small'` | Yes      | 卡片在网格中的大小（large = span 2 行, small = span 1 行） |

**字段约束**:

- `slug`: 必须唯一，仅包含小写字母、数字和连字符，格式 `[a-z0-9-]+`，最大 80 字符
- `title`: 非空，卡片上限制单行显示（CSS `text-overflow: ellipsis`）
- `category`: 必须是 `NewsCategory` 枚举的有效值之一
- `featuredImage`: 路径必须指向 `/public/images/news/` 下的实际文件
- `publishDate`: 合法的 ISO 8601 日期字符串，用于排序（降序）
- `cardSize`: 控制 CSS Grid 中的 `grid-row: span` 值（仅桌面和平板端生效）

### NewsPageData (页面配置)

页面级别的静态配置数据。

```typescript
interface NewsPageData {
  hero: NewsHeroData;
  categories: NewsCategoryItem[];
  emptyState: NewsEmptyStateData;
}
```

### NewsHeroData (Hero Banner 配置)

```typescript
interface NewsHeroData {
  title: string; // "Aura News Center"
  subtitle: string; // "Stay up-to-date with Aura's latest news, events, and stories."
  backgroundImage: string; // Hero 背景图路径
  backgroundAlt: string; // 背景图替代文本
}
```

### NewsEmptyStateData (空状态配置)

```typescript
interface NewsEmptyStateData {
  illustration: string; // 插图路径（Aura Logo 简化 SVG）
  message: string; // 提示文案
  actionLabel: string; // 引导按钮文案
}
```

## Hook 返回类型

### UseNewsArticlesReturn (文章列表 Hook 返回)

```typescript
interface UseNewsArticlesReturn {
  articles: NewsArticle[]; // 当前已加载的文章列表（累积追加）
  loading: boolean; // 是否正在加载（初始加载或加载更多）
  error: string | null; // 错误信息（null 表示无错误）
  hasMore: boolean; // 是否还有更多文章可加载
  loadMore: () => void; // 加载下一页的方法
}
```

### UseNewsArticleReturn (单篇文章 Hook 返回)

```typescript
interface UseNewsArticleReturn {
  article: NewsArticle | null; // 文章详情（null 表示未找到或加载中）
  loading: boolean; // 是否正在加载
  error: string | null; // 错误信息
}
```

## 实体关系

```text
NewsPageData (1) ──── hero ────── (1) NewsHeroData
             (1) ── categories ── (*) NewsCategoryItem
             (1) ── emptyState ── (1) NewsEmptyStateData

NewsArticle (*) ── category ── (1) NewsCategory

useNewsArticles ── 返回 ── UseNewsArticlesReturn { articles: NewsArticle[] }
useNewsArticle  ── 返回 ── UseNewsArticleReturn { article: NewsArticle | null }
```

## 数据流

```text
src/config/news.ts          → Mock 文章数据 + 页面配置 + 同步辅助函数
  ↓ (Server 端)
app/news/[slug]/page.tsx    → generateMetadata + generateStaticParams（直接调用同步函数）
  ↓ (Client 端)
src/hooks/useNewsArticles.ts → 文章列表 Hook（模拟异步分页加载）
src/hooks/useNewsArticle.ts  → 单篇文章 Hook（模拟异步加载）
  ↓
src/components/news/*        → UI 组件（消费 Hook 返回的 data/loading/error）
  ↓
src/app/news/page.tsx        → 列表页组装
```

## 状态管理

本功能的状态通过 React Hook 封装在组件层级内闭环，无需全局状态：

| State          | 管理方          | Scope       | Description                                       |
| -------------- | --------------- | ----------- | ------------------------------------------------- |
| articles       | useNewsArticles | 列表页      | 当前已加载的文章列表（累积追加）                  |
| loading        | useNewsArticles | 列表页      | 是否正在加载数据                                  |
| hasMore        | useNewsArticles | 列表页      | 是否还有更多文章                                  |
| page (内部)    | useNewsArticles | Hook 内部   | 当前页码（不暴露给组件）                          |
| activeCategory | useState        | 列表页组件  | 当前选中的分类标签，默认 "breaking-news"          |
| article        | useNewsArticle  | 详情页      | 当前文章详情数据                                  |
| copied         | useState        | ShareButton | 复制链接按钮的状态反馈（"Copy Link" / "Copied!"） |

**状态转换 - 文章列表**:

```
初始化 → loading: true, articles: []
          ↓
加载成功 → loading: false, articles: [...第1页], hasMore: true/false
          ↓ (用户滚动触发 loadMore)
加载更多 → loading: true, articles: [...已有数据]（保留已有）
          ↓
追加成功 → loading: false, articles: [...已有 + 新一页], hasMore: true/false
          ↓ (切换分类)
重置     → loading: true, articles: []（清空重新加载）
```

## 分页常量

```typescript
const NEWS_PAGE_SIZE = 6; // 每页文章数量
const MOCK_DELAY_MS = 400; // Mock 请求模拟延迟（毫秒）
```

## 排序规则

- 同一分类下的文章按 `publishDate` **降序**排列（最新的在前）
- 卡片的 `cardSize` 不影响排序，仅影响视觉展示大小

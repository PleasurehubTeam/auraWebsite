# Research: News Center Page (005)

**Date**: 2026-02-27
**Branch**: `005-news-center-page`

## R-001: News Data Layer Strategy

**Decision**: 使用 React Hook 封装层（`useNewsArticles`、`useNewsArticle`）作为数据访问接口，内部管理 loading/error/data 三态。当前版本从本地 mock 数据（`src/config/news.ts`）返回，模拟异步分页加载逻辑。

**Rationale**:

- Constitution IV (Content Maintainability) 明确要求："The News page article list MUST be sourced from a local data layer (JSON/MDX files) that can later be swapped for a remote CMS without component rewrites"
- React Hook 封装提供了统一的数据访问接口，组件只关心 Hook 返回的 `{ data, loading, error }` 三态，不感知底层数据来源
- 模拟分页加载逻辑（`page` 参数 + `hasMore` 标识），确保无限滚动交互在 mock 阶段即可完整验证
- 后期替换为真实 API 只需修改 Hook 内部实现，无需改动任何组件调用方
- 文章元数据（标题、图片、分类、日期）存放在 `config/news.ts`，正文内容以字符串形式内联于 mock 数据中（初始版本不使用 MDX）

**Alternatives considered**:

- 纯配置文件 + 直接导入函数：无法模拟异步加载行为，无法体现分页逻辑 → 拒绝
- 直接硬编码在组件中：违反 Constitution IV → 拒绝
- 远程 CMS API：初始版本无需外部依赖，增加复杂度 → 延迟到后续迭代
- 独立 service 层异步函数：缺少 React 状态管理，组件仍需自行处理 loading/error → 拒绝

## R-002: Masonry/Grid Layout Implementation

**Decision**: 使用 CSS Grid 实现瀑布流/网格混合布局，通过 `grid-template-rows` 和 `grid-row: span` 控制卡片大小变化。

**Rationale**:

- 设计稿中的布局是固定模式的网格（大小卡片交替），非真正的动态瀑布流
- CSS Grid 原生支持不等高的网格项，无需引入额外库
- 符合 Constitution 的新依赖限制（"Any new `dependencies` addition MUST be justified"）
- 移动端切换为单列布局时，只需改变 `grid-template-columns` 为 `1fr`

**Alternatives considered**:

- CSS Columns (`column-count`)：卡片排列顺序为纵向而非横向，不符合设计稿 → 拒绝
- 第三方库（react-masonry-css, masonic）：增加依赖，且项目布局模式固定，不需要动态瀑布流计算 → 拒绝
- Flexbox + 手动计算：实现复杂度高于 CSS Grid → 拒绝

## R-003: Infinite Scroll Implementation

**Decision**: 使用 Intersection Observer API 实现无限滚动，在列表底部放置哨兵元素，触发 Hook 的 `loadMore()` 加载更多数据。

**Rationale**:

- Intersection Observer 是浏览器原生 API，无需引入依赖
- 与 React Hook 分页模式完美配合：哨兵元素可见时调用 `loadMore()`，Hook 内部递增 page 并追加数据
- 性能优于 scroll 事件监听（不阻塞主线程）
- 符合 Constitution I (Performance First) 要求
- 在 mock 数据场景下，全部数据一次性加载到内存，Hook 内部模拟分页切片返回

**Alternatives considered**:

- react-infinite-scroll-component：增加依赖 → 拒绝（原生 API 即可满足）
- 虚拟列表（react-window）：新闻列表规模有限（50+），无需虚拟化 → 过度设计
- Scroll event + debounce：性能不如 Intersection Observer → 拒绝

## R-004: News Detail Page Routing

**Decision**: 使用 Next.js 动态路由 `src/app/news/[slug]/page.tsx` 实现新闻详情页，URL 格式为 `/news/article-slug`。

**Rationale**:

- Constitution III (SEO) 要求 URL slugs 必须为 "human-readable, lowercase, and hyphen-separated"
- Next.js App Router 的动态路由 `[slug]` 是标准做法
- 详情页可使用 `generateStaticParams` 实现 SSG，满足 SSR/SSG 要求
- 每篇文章的 slug 在 mock 数据中定义，确保唯一性

**Alternatives considered**:

- 基于 ID 的路由 (`/news/123`)：不符合 SEO 要求（非 human-readable）→ 拒绝
- Query 参数 (`/news?id=xxx`)：不利于 SEO，不利于分享 → 拒绝

## R-005: Share Mechanism (Copy Link)

**Decision**: 使用 `navigator.clipboard.writeText()` API 实现复制链接功能，配合状态反馈（"已复制"提示）。

**Rationale**:

- 浏览器原生 API，无需引入依赖
- 零配置，无需后端支持
- 用户操作后提供即时视觉反馈（按钮文字切换为 "已复制" 并在 2 秒后恢复）

**Alternatives considered**:

- Web Share API (`navigator.share`)：移动端体验好但桌面端支持有限 → 可作为增强，但不作为唯一方案
- 第三方分享按钮库：初期仅需复制链接，引入库过度 → 拒绝

## R-006: Empty State Illustration

**Decision**: 使用 Aura Logo 的简化 SVG 变体作为空状态插图，配合品牌配色。

**Rationale**:

- 项目已有 Aura Logo SVG (`/images/home/aura-logo.svg`)
- 可基于现有 Logo 创建简化版本（如降低不透明度 + 灰色调），无需额外设计资源
- 保持品牌一致性
- SVG 格式体积小，不影响性能

**Alternatives considered**:

- 通用空状态插图（undraw.co 等）：与品牌风格不一致 → 拒绝
- 纯文字无插图：视觉效果单薄，与品牌品质不符 → 拒绝

## R-007: React Hook Data Access Pattern

**Decision**: 创建两个自定义 React Hook 封装数据访问：

- `useNewsArticles(category?, page?)` — 返回文章列表、分页状态和 `loadMore` 方法
- `useNewsArticle(slug)` — 返回单篇文章详情

**Rationale**:

- React Hook 是 React 生态中标准的状态逻辑封装方式，团队熟悉度高
- Hook 内部使用 `useState` + `useEffect` 管理异步请求生命周期（loading → data/error）
- 分页模拟：Hook 内部维护 `page` 计数器，每次 `loadMore()` 调用时从 mock 数据源切片返回下一批（每批 6 条），并计算 `hasMore` 标识
- 分类切换时自动重置分页状态，确保从第 1 页开始加载
- 模拟延迟（300-500ms `setTimeout`）使加载状态可观测，便于调试和体验验证
- 与 Intersection Observer 的无限滚动配合：哨兵元素触发 → 调用 `loadMore()` → Hook 返回更新后的数据

**Interface Design**:

```typescript
// useNewsArticles
function useNewsArticles(category?: NewsCategory): {
  articles: NewsArticle[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
};

// useNewsArticle
function useNewsArticle(slug: string): {
  article: NewsArticle | null;
  loading: boolean;
  error: string | null;
};
```

**Alternatives considered**:

- 独立 service 层 + 组件内 `useEffect`：逻辑分散，每个组件需重复 loading/error 处理 → 拒绝
- SWR / React Query：引入新依赖，当前 mock 数据场景不需要缓存/重验证机制 → 过度设计
- Zustand / Context 全局状态：新闻数据是页面级别的，不需要跨页面共享 → 拒绝

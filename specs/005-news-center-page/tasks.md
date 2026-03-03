# 任务列表：新闻中心页 (News Center Page)

**输入**: 设计文档来自 `/specs/005-news-center-page/`
**前置条件**: plan.md, spec.md, research.md, data-model.md, contracts/

**测试**: 未明确要求 — 省略测试任务。

**组织方式**: 任务按用户故事分组，支持独立实施和测试。

## 格式: `[ID] [P?] [Story] 描述`

- **[P]**: 可并行执行（不同文件，无依赖）
- **[Story]**: 所属用户故事（如 US1、US2、US3、US4）
- 所有任务描述中包含准确的文件路径

---

## 阶段 1：初始化（共享基础设施）

**目的**: 创建类型定义、Mock 数据配置和图片资源 — 所有故事的共享基础。

- [x] T001 [P] 在 `src/types/news.ts` 中创建新闻类型定义。按照 data-model.md 定义以下接口/类型并全部导出：`NewsCategory` 联合类型（`'breaking-news' | 'event' | 'about-aura'`）、`NewsCategoryItem` 接口（id, label, order）、`NewsArticle` 接口（id, slug, title, category, featuredImage, imageAlt, publishDate, summary, content, cardSize）、`NewsHeroData` 接口（title, subtitle, backgroundImage, backgroundAlt）、`NewsEmptyStateData` 接口（illustration, message, actionLabel）、`NewsPageData` 接口（hero, categories, emptyState）、`UseNewsArticlesReturn` 接口（articles, loading, error, hasMore, loadMore）、`UseNewsArticleReturn` 接口（article, loading, error）。cardSize 类型为 `'large' | 'small'`。
- [x] T002 [P] 确认 `public/images/news/` 目录下的图片资源。目录已有 9 个文件（1 张 Hero 背景 `aura-app-news-01.png`，8 张卡片图片 `aura-app-news-02-01.webp` 至 `aura-app-news-02-08.webp`）。创建一个占位兜底图 `public/images/news/news-placeholder.webp`（可用现有图片缩略版或 1x1 像素占位图）。
- [x] T003 在 `src/config/news.ts` 中创建新闻数据配置文件。从 `@/types/news` 导入所有类型。包含：(1) `NEWS_PAGE_SIZE = 6` 和 `MOCK_DELAY_MS = 400` 分页常量，(2) `newsPageData: NewsPageData` 对象（hero 配置使用 `/images/news/aura-app-news-01.png` 背景图、标题 "Aura News Center"、副标题 "Stay up-to-date with Aura's latest news, events, and stories."；emptyState 配置使用 `/images/home/aura-logo.svg` 插图、中文提示文案、"查看全部新闻" 按钮文案），(3) `newsArticles: NewsArticle[]` 数组（8 篇文章，3 篇 breaking-news + 3 篇 event + 2 篇 about-aura，每篇有唯一英文 slug、对应的 `aura-app-news-02-0X.webp` 图片、ISO 8601 日期降序排列、cardSize 交替 large/small 以匹配设计稿瀑布流布局、content 字段包含 3-5 段 HTML 格式的占位正文），(4) 同步辅助函数：`getAllNewsArticles(): NewsArticle[]`（返回全部文章）、`getNewsArticleBySlug(slug: string): NewsArticle | undefined`（按 slug 查找）、`getNewsArticlesByCategory(category: NewsCategory): NewsArticle[]`（按分类筛选 + publishDate 降序排序）。遵循 `src/config/home.ts` 的已有配置模式。

**检查点**: 类型定义、Mock 数据、同步辅助函数和图片资源就绪。

---

## 阶段 2：基础设施（阻塞性前置条件）

**目的**: 创建 React Hook 数据访问层 — 多个用户故事的共享抽象。

**⚠️ 关键**: 此阶段完成前，US1 和 US2 不可开始。

- [x] T004 [P] 在 `src/hooks/useNewsArticles.ts` 中创建文章列表 Hook。"use client" 模块。接收可选的 `category?: NewsCategory` 参数。内部实现：(1) 使用 `useState` 管理 `articles: NewsArticle[]`（初始 `[]`）、`loading: boolean`（初始 `true`）、`error: string | null`（初始 `null`）、`hasMore: boolean`（初始 `true`）、`page: number`（初始 `1`，不暴露给外部），(2) `useEffect` 监听 `category` 变化 → 重置 `page=1, articles=[], loading=true` → 调用内部 `fetchPage()` 函数，(3) `fetchPage()` 使用 `setTimeout(MOCK_DELAY_MS)` 模拟异步延迟 → 从 `config/news.ts` 调用 `getNewsArticlesByCategory()` 获取该分类全部文章 → 按 `(page - 1) * NEWS_PAGE_SIZE` 至 `page * NEWS_PAGE_SIZE` 切片 → 追加到 `articles` → 计算 `hasMore = 切片终止位置 < 总文章数`，(4) 暴露 `loadMore()` 方法：当 `!loading && hasMore` 时递增 `page` 并调用 `fetchPage()`，(5) 返回 `{ articles, loading, error, hasMore, loadMore }` 符合 `UseNewsArticlesReturn` 接口。注意 cleanup：`useEffect` 返回清理函数取消 `setTimeout`，防止组件卸载后状态更新。
- [x] T005 [P] 在 `src/hooks/useNewsArticle.ts` 中创建单篇文章 Hook。"use client" 模块。接收 `slug: string` 参数。内部实现：(1) 使用 `useState` 管理 `article: NewsArticle | null`（初始 `null`）、`loading: boolean`（初始 `true`）、`error: string | null`（初始 `null`），(2) `useEffect` 监听 `slug` 变化 → `setTimeout(200ms)` 模拟异步 → 调用 `getNewsArticleBySlug(slug)` → 设置 `article`（未找到则 `article = null, error = null`），(3) 返回 `{ article, loading, error }` 符合 `UseNewsArticleReturn` 接口。注意 cleanup：取消 setTimeout。

**检查点**: React Hook 数据访问层就绪。组件可通过 Hook 获取带 loading/error 状态的数据。

---

## 阶段 3：用户故事 1 — 浏览新闻中心（优先级: P1）🎯 MVP

**目标**: 访客进入新闻中心页，看到 Hero Banner 和以瀑布流网格展示的新闻卡片。

**独立测试**: 导航至 `/news`，验证 Hero Banner 正确渲染标题/副标题，新闻卡片以瀑布流/网格布局显示在下方。

### 用户故事 1 的实施任务

- [x] T006 [P] [US1] 在 `src/components/news/NewsHeroBanner.tsx` 中创建 NewsHeroBanner 组件。"use client" 组件。全宽区域包含：(1) 外层 `<section>` 容器，`relative w-full` + 固定高度（移动端 `h-[60vh]`，桌面端 `h-[70vh]`），`overflow-hidden rounded-b-3xl`，(2) `next/image` 展示背景图（`fill` + `object-cover` + `priority`，传入 `sizes="100vw"` 和 `alt`），(3) 深色渐变遮罩层 `bg-gradient-to-t from-black/70 via-black/30 to-transparent`，(4) 文字区域定位在左下角（`absolute bottom-0 left-0 p-8 lg:p-16`），标题 `text-4xl lg:text-6xl font-bold text-white` 使用 Montserrat，副标题 `text-lg lg:text-xl text-white/80 mt-4`，(5) 用 ScrollReveal 包裹文字区域。遵循 contracts/component-contracts.md 的 `NewsHeroBannerProps` 接口。
- [x] T007 [P] [US1] 在 `src/components/news/NewsCard.tsx` 中创建 NewsCard 组件。"use client" 组件。(1) 外层 `<article>` 包裹 Next.js `<Link href={/news/${article.slug}}>`, `relative rounded-2xl overflow-hidden`。根据 `article.cardSize`：桌面/平板端 large 卡片 `row-span-2`，small 卡片无额外 span；移动端均为标准高度（`h-[250px] md:h-auto`），(2) `next/image` `fill` + `object-cover`，传入 `sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"` 和 `alt={article.imageAlt}`，(3) 底部渐变层 `bg-gradient-to-t from-black/80 via-black/40 to-transparent`，(4) 标题 `text-white font-medium text-sm lg:text-base truncate` 定位在底部（`absolute bottom-0 left-0 right-0 p-4`）。遵循 `NewsCardProps` 接口。`index` prop 暂保留但不用于动画延迟（在阶段 6 添加）。
- [x] T008 [US1] 在 `src/components/news/NewsGrid.tsx` 中创建 NewsGrid 组件。"use client" 组件。(1) CSS Grid 容器：`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`，桌面端 `auto-rows-[200px]`（每行基准高度 200px，large 卡片通过 `row-span-2` 占 400px），`gap-4`，(2) 映射 `articles` 数组为 `<NewsCard>` 组件，传入 article 和 index，(3) 底部放置 Intersection Observer 哨兵 `<div ref={sentinelRef} className="h-4" />`，使用 `useEffect` + `new IntersectionObserver()` 监听：当哨兵可见且 `hasMore && !loading` 时调用 `onLoadMore()`，(4) `loading` 为 true 时在网格下方显示加载指示器（3 个脉冲圆点动画），(5) 使用 `<section aria-label="News articles">` 语义化包裹。遵循 `NewsGridProps` 接口。cleanup: `observer.disconnect()`。
- [x] T009 [US1] 更新新闻列表页 `src/app/news/page.tsx`。替换现有 stub 内容：(1) 服务端组件，导出静态 `metadata` 对象（`title: 'News Center | Aura'`，`description`，`openGraph`），(2) 从 `@/config/news` 导入 `newsPageData`，(3) `<main>` 包裹全部内容，(4) 渲染 `<NewsHeroBanner>` 传入 hero 配置数据，(5) Hero 下方的内容区域用 `<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">`（与全站间距节奏一致）包裹，内部放置一个临时客户端组件 `<NewsListingContent />`（暂时直接在此文件或内联定义，阶段 4 会提取为独立文件），该组件使用 `useNewsArticles()` Hook（无 category 参数，加载全部文章），将 Hook 返回的 `articles, loading, hasMore, loadMore` 传入 `<NewsGrid>`。每个区域用 `<ScrollReveal>` 包裹。

**检查点**: `/news` 页面展示 Hero Banner + 通过 Hook 加载的新闻卡片瀑布流网格 + 无限滚动加载更多。卡片链接至详情页（暂时 404）。MVP 可用。

---

## 阶段 4：用户故事 2 — 按分类筛选新闻（优先级: P2）

**目标**: 访客可通过分类标签筛选文章，带平滑过渡和空状态处理。

**独立测试**: 点击每个分类标签，验证网格仅展示匹配文章。选择无文章的分类，验证空状态出现。

### 用户故事 2 的实施任务

- [x] T010 [P] [US2] 在 `src/components/news/NewsCategoryTabs.tsx` 中创建 NewsCategoryTabs 组件。"use client" 组件。(1) `<nav role="tablist" aria-label="News categories">` 包裹，`flex items-center gap-6 lg:gap-8`，(2) 遍历 `categories` 数组渲染 `<button role="tab">` 标签，选中标签 `text-black font-bold text-xl lg:text-2xl`，未选中 `text-gray-400 font-medium text-xl lg:text-2xl hover:text-gray-600 transition-colors`，(3) 选中指示器：使用 Framer Motion `<motion.div layoutId="news-tab-indicator">` 作为下划线（`h-0.5 bg-brand-pink`），放在选中按钮下方，实现平滑滑动效果（参照 `src/components/ui/TabSwitcher.tsx` 的 `layoutId` 模式），(4) 每个按钮带 `aria-selected` 属性。点击调用 `onCategoryChange`。遵循 `NewsCategoryTabsProps` 接口。
- [x] T011 [P] [US2] 在 `src/components/news/NewsEmptyState.tsx` 中创建 NewsEmptyState 组件。(1) `flex flex-col items-center justify-center` 居中布局，`min-h-[400px] py-16`，(2) Aura Logo SVG 作为插图：`<Image src={illustration} alt="Aura" width={120} height={120} className="opacity-20 mb-8" />`，(3) 提示文案 `<p className="text-gray-500 text-lg mb-6">`，(4) 引导按钮使用项目 `<Button variant="secondary">` 组件，点击调用 `onAction`。遵循 `NewsEmptyStateProps` 接口。
- [x] T012 [US2] 将列表页内容提取为独立客户端组件 `src/components/news/NewsListingContent.tsx`。"use client" 组件。接收 `pageData: NewsPageData` prop。内部实现：(1) `activeCategory` 状态（默认 `'breaking-news'`），(2) 调用 `useNewsArticles(activeCategory)` Hook 获取 `{ articles, loading, hasMore, loadMore, error }`，(3) 渲染 `<NewsCategoryTabs>` 传入 `newsPageData.categories`、`activeCategory`、`onCategoryChange` 回调（切换分类），(4) 使用 Framer Motion `<AnimatePresence mode="wait">` 包裹内容切换区域（`<motion.div key={activeCategory}>`），(5) `articles.length === 0 && !loading` 时渲染 `<NewsEmptyState>` 传入 `pageData.emptyState`（onAction 重置为 `'breaking-news'`），否则渲染 `<NewsGrid>`，(6) 更新 `src/app/news/page.tsx` 中的临时内联代码，替换为导入并渲染 `<NewsListingContent pageData={newsPageData} />`。

**检查点**: 分类筛选正常工作，标签切换时指示器平滑滑动。网格内容通过 AnimatePresence 淡入淡出过渡。空状态正确显示。切换分类时 Hook 自动重置分页并重新加载。

---

## 阶段 5：用户故事 3 — 查看新闻文章详情（优先级: P2）

**目标**: 访客点击新闻卡片后看到完整文章详情页，采用杂志风格布局，带分享按钮和返回导航。

**独立测试**: 点击任意新闻卡片，验证导航至 `/news/[slug]` 并展示正确布局的完整文章内容。

### 用户故事 3 的实施任务

- [x] T013 [P] [US3] 在 `src/components/news/ShareButton.tsx` 中创建 ShareButton 组件。"use client" 组件。(1) `useState` 管理 `copied: boolean`（初始 false），(2) 点击处理：`navigator.clipboard.writeText(url ?? window.location.href)`，成功后 `setCopied(true)`，`setTimeout(2000)` 后恢复 `setCopied(false)`，(3) 渲染使用项目 `<Button variant="secondary" size="sm">`，文字为 `copied ? 'Copied!' : 'Copy Link'`，(4) 可选：使用 Lucide `Copy` / `Check` 图标搭配文字。遵循 `ShareButtonProps` 接口。
- [x] T014 [P] [US3] 在 `src/components/news/NewsArticleDetail.tsx` 中创建 NewsArticleDetail 组件。"use client" 组件。杂志风格布局：(1) 顶部区域 `<div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 mb-12">`，左侧图片占 3 列（`lg:col-span-3`）`<div className="relative aspect-[4/3] rounded-2xl overflow-hidden">` + `next/image fill + object-cover`，右侧信息占 2 列（`lg:col-span-2 flex flex-col justify-center`）：标题 `text-3xl lg:text-4xl font-bold mb-4`、日期 `text-gray-500 mb-2`（格式化为 `YYYY年MM月DD日` 或英文格式）、分类标签 `<span className="inline-block px-3 py-1 bg-brand-pink/10 text-brand-pink rounded-full text-sm">`，(2) 正文区域 `<div className="max-w-prose mx-auto prose prose-lg">` 使用 `dangerouslySetInnerHTML={{ __html: article.content }}`（当前 mock 数据为 HTML 字符串），(3) 底部 `<div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200">`：左侧 `<ShareButton />`，右侧 `<Link href="/news" className="text-brand-pink hover:underline">` "← Back to News Center"。各区域用 `<ScrollReveal>` 包裹。遵循 `NewsArticleDetailProps` 接口。
- [x] T015 [US3] 在 `src/app/news/[slug]/page.tsx` 中创建新闻详情页。(1) `generateStaticParams()`: 调用 `getAllNewsArticles()` 返回所有 `{ slug }` 对象（SSG），(2) `generateMetadata({ params })`: 调用 `getNewsArticleBySlug(params.slug)`，返回 `{ title: '${article.title} | Aura News', description: article.summary, openGraph: { type: 'article', publishedTime: article.publishDate, images: [article.featuredImage] } }`，未找到文章返回 `{ title: 'Article Not Found | Aura' }`，(3) 页面组件（Server Component）：从 `params` 获取 `slug` → 调用 `getNewsArticleBySlug(slug)` → 未找到调用 `notFound()` → 渲染 `<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">` 包裹 `<NewsArticleDetail article={article} />`。注意：详情页使用同步辅助函数（Server 端 SSG），不使用 React Hook。
- [x] T016 [US3] 在 `src/app/news/[slug]/not-found.tsx` 中创建新闻详情 404 页面。(1) `<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">`，(2) Aura Logo 插图（opacity-20，与空状态风格一致），(3) 标题 "Article Not Found" `text-2xl font-bold text-gray-800 mb-4`，(4) 描述 "The article you're looking for doesn't exist or has been moved." `text-gray-500 mb-8`，(5) `<Link href="/news">` 使用项目 `<Button variant="primary">` "Back to News Center"。

**检查点**: 点击新闻卡片导航至详情页，杂志布局正确。复制链接按钮可用。返回导航正常。无效 slug 显示品牌风格 404。

---

## 阶段 6：用户故事 4 — 新闻卡片悬停交互（优先级: P3）

**目标**: 桌面端新闻卡片展示平滑悬停效果（图片缩放 + 遮罩），触屏设备直接导航。

**独立测试**: 在桌面端将鼠标悬停在新闻卡片上，验证图片缩放和遮罩效果平滑出现。

### 用户故事 4 的实施任务

- [x] T017 [US4] 在 `src/components/news/NewsCard.tsx` 中添加悬停效果。修改现有组件：(1) 外层 Link 添加 `group` 类，(2) `next/image` 上添加 `transition-transform duration-300 group-hover:scale-105`，(3) 在图片上方添加半透明遮罩 `<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 z-10" />`（注意 z-index 确保遮罩在图片上方、文字下方），(4) 可选：标题区域添加 `transition-transform duration-300 group-hover:translate-y-[-4px]` 微移效果。触屏设备：Tailwind 的 `hover:` 自动通过 `@media (hover: hover)` 仅在支持悬停设备上生效，无需额外处理。

**检查点**: 全部 4 个用户故事均可独立运行。

---

## 阶段 7：打磨与跨故事优化

**目的**: 边界情况处理、响应式微调和构建验证。

- [x] T018 [P] 在 `src/components/news/NewsCard.tsx` 中添加图片加载失败兜底。(1) 添加 `useState` 管理 `imgError` 状态，(2) `next/image` 的 `onError` 回调设置 `imgError = true`，(3) `imgError` 时将 `src` 切换为 `/images/news/news-placeholder.webp`。
- [x] T019 [P] 验证列表页和详情页在所有断点的响应式布局。逐一确认：(1) 移动端（320px-767px）：新闻卡片单列全宽、详情页图片/标题堆叠、分类标签水平可见，(2) 平板端（768px-1279px）：双列网格、详情页保持堆叠或开始并排，(3) 桌面端（1280px+）：三列瀑布流、详情页左图右文 3:2 分割。确认触摸目标 ≥ 44x44px、无水平滚动条。修复发现的任何布局问题。
- [x] T020 [P] 导航链接验证。检查 `src/config/navigation.ts` 确认包含 `{ label: 'News', href: '/news' }` 项。检查 `src/components/layout/Header.tsx` 在 `/news` 或 `/news/[slug]` 路径时 "News" 导航项是否有激活高亮样式。如缺失则添加。
- [x] T021 运行 `pnpm lint` 和 `pnpm build` 验证零错误。修复所有 TypeScript 类型错误、ESLint 警告或构建失败。确保所有页面成功生成静态页面（包括所有 `news/[slug]` 详情页）。

---

## 依赖关系与执行顺序

### 阶段依赖

- **初始化（阶段 1）**: 无依赖 — 可立即开始
- **基础设施（阶段 2）**: 依赖阶段 1（T001、T003）— 阻塞 US1、US2
- **US1（阶段 3）**: 依赖阶段 2 — T004、T005 完成后可开始
- **US2（阶段 4）**: 依赖阶段 3（T009 — 列表页必须存在才能添加筛选）
- **US3（阶段 5）**: 依赖阶段 1（T003 — 同步辅助函数）— 可与 US1/US2 并行
- **US4（阶段 6）**: 依赖阶段 3 T007（NewsCard 组件必须存在才能添加悬停效果）
- **打磨（阶段 7）**: 依赖所有故事完成

### 用户故事依赖

- **US1（P1）**: 依赖 Hook 数据层（阶段 2）— 无跨故事依赖
- **US2（P2）**: 依赖 US1（在列表页基础上添加筛选功能）
- **US3（P2）**: 仅依赖 config 同步函数（阶段 1 T003）— 可与 US1/US2 并行
- **US4（P3）**: 依赖 US1 T007（NewsCard 组件必须存在）

### 各用户故事内部

- 标记 [P] 的组件可并行构建（不同文件）
- 页面组装任务依赖组件任务
- 所有组件就绪后再集成

### 并行机会

**阶段 1 并行组**:

```
T001 (types/news.ts) ‖ T002 (图片资源)
→ T003 (config/news.ts) 在 T001 之后
```

**阶段 2 并行组**:

```
T004 (useNewsArticles Hook) ‖ T005 (useNewsArticle Hook)
```

**阶段 3 (US1) 并行组**:

```
T006 (NewsHeroBanner) ‖ T007 (NewsCard)
→ T008 (NewsGrid) 在 T007 之后
→ T009 (列表页组装) 在 T006、T008 之后
```

**阶段 4 + 5 并行组**（US1 列表页存在后）:

```
T010 (NewsCategoryTabs) ‖ T011 (NewsEmptyState) ‖ T013 (ShareButton) ‖ T014 (NewsArticleDetail)
→ T012 (NewsListingContent) 在 T010、T011 之后
→ T015 (详情页) 在 T014、T013 之后
→ T016 (404 页面) 在 T015 之后
```

**阶段 7 并行组**:

```
T018 (图片兜底) ‖ T019 (响应式验证) ‖ T020 (导航链接)
→ T021 (构建验证) 在所有任务之后
```

---

## 实施策略

### MVP 优先（仅用户故事 1）

1. 完成阶段 1：初始化（T001-T003）
2. 完成阶段 2：基础设施（T004-T005）
3. 完成阶段 3：用户故事 1（T006-T009）
4. **暂停并验证**: 访问 `/news`，验证 Hero Banner + 瀑布流网格 + 无限滚动正确运行
5. 此时可部署/演示 — 基础新闻中心已可用

### 增量交付

1. 初始化 + 基础设施 → 类型 + Mock 数据 + Hook 数据层就绪
2. 添加 US1 → Hero Banner + 新闻网格 + 无限滚动（MVP！）
3. 添加 US2 → 分类筛选 + 空状态 + AnimatePresence 过渡
4. 添加 US3 → 文章详情页 + 分享 + 返回导航 + 404
5. 添加 US4 → 悬停效果打磨
6. 打磨 → 图片兜底 + 响应式验证 + 导航 + 构建检查

### 任务数量汇总

| 阶段             | 故事   | 任务数 | 可并行 |
| ---------------- | ------ | ------ | ------ |
| 阶段 1：初始化   | —      | 3      | 2      |
| 阶段 2：基础设施 | —      | 2      | 2      |
| 阶段 3：US1      | P1 MVP | 4      | 2      |
| 阶段 4：US2      | P2     | 3      | 2      |
| 阶段 5：US3      | P2     | 4      | 2      |
| 阶段 6：US4      | P3     | 1      | 0      |
| 阶段 7：打磨     | —      | 4      | 3      |
| **总计**         |        | **21** | **13** |

---

## 注意事项

- [P] 任务 = 不同文件，无依赖关系
- [Story] 标签将任务映射至特定用户故事，便于追溯
- 每个用户故事可独立完成和测试
- 每完成一个任务或逻辑组后提交
- 可在任意检查点暂停，独立验证当前故事
- **数据层架构**: React Hook 封装（`useNewsArticles` + `useNewsArticle`）→ 模拟异步分页 → 后期替换 API 零改动
- **Server 端数据**: 详情页 SSG 使用 `config/news.ts` 的同步辅助函数，不使用 Hook
- 所有样式仅使用 Tailwind CSS utility classes
- 所有动画通过 Framer Motion（区域入场用 ScrollReveal，标签切换用 AnimatePresence + layoutId）
- 所有图片通过 next/image，包含 sizes + alt 属性
- MDX 内容集成延后 — 详情页初期使用 HTML 字符串占位正文

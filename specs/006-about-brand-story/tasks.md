# Tasks: About 品牌故事页

**Input**: Design documents from `/specs/006-about-brand-story/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

**Tests**: 无自动化测试要求。使用 quickstart.md 手动验证 + Lighthouse 审计。

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 类型定义、配置文件和资源目录初始化

- [x] T001 [P] Create About page type definitions with all entities (AboutHeroData, BrandMessage, StatItem, AboutGalleryCategory, GalleryPhoto, CommunityCTAData, AboutPageData) in `src/types/about.ts`
- [x] T002 [P] Create About page data configuration with hero, brandMessage, stats, galleryCategories, galleryPhotos, cta, and emptyState in `src/config/about.ts` (import socialMediaLinks from `src/config/footer.ts`)
- [x] T003 [P] Create image assets directory `public/images/about/` and `public/images/about/gallery/`, add placeholder images for hero background and gallery photos

**Checkpoint**: Types, config data, and asset directory ready — component development can begin

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 扩展 ScrollReveal 组件以支持下滑方向，这是多个用户故事的前置条件

**⚠️ CRITICAL**: Gallery 下滑渐显动画依赖此任务

- [x] T004 Extend ScrollReveal component to add `direction="down"` option with initial state `{ opacity: 0, y: -30 }` in `src/components/ui/ScrollReveal.tsx`

**Checkpoint**: ScrollReveal 支持 up/down/left/right 四个方向 — 用户故事可以开始

---

## Phase 3: User Story 1 - 品牌故事 Hero 横幅 (Priority: P1) 🎯 MVP

**Goal**: 访客进入 `/about` 看到全宽 Hero 横幅，包含背景图、标题 "Brand Story" 和 slogan，传达品牌调性

**Independent Test**: 浏览器访问 `/about`，验证 Hero 横幅正确渲染背景图、标题、slogan，导航栏 "About" 高亮，移动端/桌面端自适应

### Implementation for User Story 1

- [x] T005 [US1] Create AboutHeroBanner component with full-width background image, centered title "Brand Story", centered slogan, dark overlay for text readability, and fallback background color in `src/components/about/AboutHeroBanner.tsx`
- [x] T006 [US1] Replace existing About page stub with full page structure: import aboutPageData from config, render AboutHeroBanner as first section, export metadata for SEO (title, description, Open Graph tags) in `src/app/about/page.tsx`

**Checkpoint**: `/about` 页面展示完整 Hero 横幅，导航栏 "About" 高亮，响应式适配正常

---

## Phase 4: User Story 2 - 品牌宣言与数据统计区 (Priority: P1)

**Goal**: Hero 下方展示品牌宣言文案，紧接着数据统计区以翻转计数器动画展示全球覆盖国家数和用户数

**Independent Test**: 向下滚动越过 Hero，验证品牌宣言文案居中显示，统计数字以翻转动画从 0 翻转到目标值（12 和 1600000+），动画仅播放一次

### Implementation for User Story 2

- [x] T007 [P] [US2] Create FlipCounter component that renders each digit as an independently animated flip card using Framer Motion rotateX transform with perspective, triggered by Intersection Observer (viewport once), supports number value + optional suffix prop, respects prefers-reduced-motion in `src/components/about/FlipCounter.tsx`
- [x] T008 [P] [US2] Create BrandMessageSection component that displays centered brand message text from config with ScrollReveal entrance animation in `src/components/about/BrandMessageSection.tsx`
- [x] T009 [US2] Create StatsSection component that renders StatItem array as a responsive flex/grid layout (side-by-side on desktop, stack on mobile), each stat uses FlipCounter for the number + suffix and a label below, with Intersection Observer to trigger animation once in `src/components/about/StatsSection.tsx`
- [x] T010 [US2] Integrate BrandMessageSection and StatsSection into the About page below the Hero section, each wrapped in ScrollReveal in `src/app/about/page.tsx`

**Checkpoint**: 品牌宣言居中显示，统计区翻转计数器动画正常触发且仅播放一次，移动端响应式正常

---

## Phase 5: User Story 3 - 分类 Tab 筛选与照片画廊 (Priority: P2)

**Goal**: Tab 标签栏展示 4 个分类（Social Contact / Share / Brand / Activity），点击切换下方不规则瀑布流画廊的照片筛选

**Independent Test**: 依次点击每个 Tab，验证画廊正确筛选，默认激活 Social Contact，过渡 ≤ 300ms，移动端降级为单/双列

### Implementation for User Story 3

- [x] T011 [US3] Create AboutGallerySection component that: manages activeCategory state, renders NewsCategoryTabs with About gallery categories and onCategoryChange handler, filters galleryPhotos by activeCategory, maps filtered photos to NewsArticle-compatible objects, renders NewsGrid with filtered data (hasMore=false, onLoadMore=noop), wraps tab content switching in AnimatePresence, shows empty state message when category has no photos, wraps gallery photos in ScrollReveal direction="down" for slide-down-fade-in entrance in `src/components/about/AboutGallerySection.tsx`
- [x] T012 [US3] Integrate AboutGallerySection into the About page below StatsSection, wrapped in ScrollReveal in `src/app/about/page.tsx`

**Checkpoint**: 4 个 Tab 切换正常，画廊按分类筛选，不规则网格布局，空状态提示，移动端响应式

---

## Phase 6: User Story 4 - 加入社区 CTA 区块 (Priority: P2)

**Goal**: 页面底部展示渐变背景 CTA 区块，标题 "You can join Aura"，说明文案，和社交媒体图标链接

**Independent Test**: 滚动到底部，验证 CTA 区块渐变背景、文案居中、社交图标链接正确跳转新标签页

### Implementation for User Story 4

- [x] T013 [US4] Create JoinCommunityCTA component with: pink-to-dark gradient background (matching design), heading "You can join Aura" animated with ScrollReveal direction="left" for slide-left-fade-in, description text animated with ScrollReveal direction="right" for slide-right-fade-in, social media icons row imported from footer.ts socialMediaLinks with target="\_blank" rel="noopener noreferrer", hide icons with empty URL, responsive layout with min 44x44px touch targets in `src/components/about/JoinCommunityCTA.tsx`
- [x] T014 [US4] Integrate JoinCommunityCTA into the About page as the last section before Footer in `src/app/about/page.tsx`

**Checkpoint**: CTA 渐变背景正确，标题左滑渐显+说明右滑渐显动画正常，社交链接新标签页跳转，移动端触控目标合规

---

## Phase 7: User Story 5 - 滚动触发入场动画 (Priority: P3)

**Goal**: 各区块采用差异化入场动画，画廊下滑渐显、统计翻转、CTA 左右滑入渐显，尊重 reduced-motion 偏好

**Independent Test**: 缓慢滚动整个页面，验证每个区块以指定动画进入视口，开启减少动效后所有动画禁用

### Implementation for User Story 5

- [x] T015 [US5] Review and refine all entrance animations across page sections: verify BrandMessageSection uses ScrollReveal direction="up", verify StatsSection flip counter triggers on viewport entry, verify AboutGallerySection photos use ScrollReveal direction="down" with staggered delays (index _ 0.05), verify JoinCommunityCTA heading uses direction="left" and description uses direction="right", ensure all animations play once and respect prefers-reduced-motion in `src/components/about/_.tsx`
- [x] T016 [US5] Add staggered delay props to gallery photo ScrollReveal wrappers to create cascading entrance effect, verify 60fps performance on throttled CPU in Chrome DevTools in `src/components/about/AboutGallerySection.tsx`

**Checkpoint**: 所有区块动画按规格执行，reduced-motion 降级正常，60fps 无卡顿

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: 性能优化、SEO 完善、最终验证

- [x] T017 [P] Verify all images use next/image with proper sizes, priority for hero image (eager loading), lazy loading for gallery images, and blur placeholder or fallback colors in `src/components/about/AboutHeroBanner.tsx` and `src/components/about/AboutGallerySection.tsx`
- [x] T018 [P] Verify semantic HTML structure: single h1 per page, logically nested h2-h6, use section/article/nav elements, all images have descriptive alt attributes in `src/app/about/page.tsx` and `src/components/about/*.tsx`
- [x] T019 Run Lighthouse Performance audit on `/about` page (mobile mode), verify score ≥ 90, LCP < 2.5s, CLS < 0.1, fix any issues
- [x] T020 Run full quickstart.md validation checklist: Hero banner, brand message + stats, tab gallery, CTA, animations, and performance checks

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS gallery animation (US3/US5)
- **User Story 1 (Phase 3)**: Depends on Setup (T001, T002, T003)
- **User Story 2 (Phase 4)**: Depends on Setup (T001, T002)
- **User Story 3 (Phase 5)**: Depends on Setup + Foundational (T004 for direction="down")
- **User Story 4 (Phase 6)**: Depends on Setup (T001, T002)
- **User Story 5 (Phase 7)**: Depends on US1-US4 all implemented (refines existing animations)
- **Polish (Phase 8)**: Depends on all user stories complete

### User Story Dependencies

- **US1 (Hero 横幅)**: Independent — only needs config + types
- **US2 (品牌宣言 + 统计)**: Independent — only needs config + types
- **US3 (Tab 画廊)**: Needs Foundational T004 (ScrollReveal direction="down")
- **US4 (CTA 区块)**: Independent — only needs config + types + footer.ts
- **US5 (入场动画)**: Depends on US1-US4 — refines and polishes existing animations

### Within Each User Story

- Config/types (Phase 1) before components
- Independent components (marked [P]) can be built in parallel
- Container/integration task last (adds to page.tsx)

### Parallel Opportunities

- **Phase 1**: T001, T002, T003 全部并行
- **Phase 3+4**: US1 和 US2 可并行开发（不同文件，无依赖）
- **Phase 4**: T007 (FlipCounter) 和 T008 (BrandMessageSection) 并行
- **Phase 5+6**: US3 和 US4 可并行开发
- **Phase 8**: T017 和 T018 并行

---

## Parallel Example: User Story 2

```bash
# Launch FlipCounter and BrandMessageSection in parallel (different files):
Task: "Create FlipCounter component in src/components/about/FlipCounter.tsx"
Task: "Create BrandMessageSection component in src/components/about/BrandMessageSection.tsx"

# Then sequentially:
Task: "Create StatsSection component in src/components/about/StatsSection.tsx" (depends on FlipCounter)
Task: "Integrate into page in src/app/about/page.tsx" (depends on all above)
```

## Parallel Example: User Stories 1+2 (can run simultaneously)

```bash
# Developer A: User Story 1
Task: "Create AboutHeroBanner in src/components/about/AboutHeroBanner.tsx"
Task: "Update page in src/app/about/page.tsx (hero section)"

# Developer B: User Story 2 (same time, different files)
Task: "Create FlipCounter in src/components/about/FlipCounter.tsx"
Task: "Create BrandMessageSection in src/components/about/BrandMessageSection.tsx"
Task: "Create StatsSection in src/components/about/StatsSection.tsx"
# Note: page.tsx integration happens after both stories merge
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T003)
2. Complete Phase 2: Foundational (T004)
3. Complete Phase 3: User Story 1 — Hero 横幅 (T005-T006)
4. **STOP and VALIDATE**: `/about` 页面展示完整 Hero 横幅
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → 基础就绪
2. Add US1 (Hero 横幅) → 验证 → 部署（MVP!）
3. Add US2 (品牌宣言 + 统计) → 验证 → 页面有社会证明
4. Add US3 (Tab 画廊) → 验证 → 页面有互动内容
5. Add US4 (CTA 区块) → 验证 → 页面有转化入口
6. Add US5 (动画打磨) → 验证 → 品质感提升
7. Polish → Lighthouse 审计 → 最终交付

### Solo Developer Strategy

按优先级顺序执行：Phase 1 → Phase 2 → Phase 3 (US1) → Phase 4 (US2) → Phase 5 (US3) → Phase 6 (US4) → Phase 7 (US5) → Phase 8

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- 复用组件：NewsCategoryTabs 和 NewsGrid 从 `src/components/news/` 导入
- 复用数据：socialMediaLinks 从 `src/config/footer.ts` 导入
- 所有动画使用 Framer Motion，遵循宪法 transform/opacity 仅动画原则

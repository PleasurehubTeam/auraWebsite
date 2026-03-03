# Tasks: APP 应用详情页

**Input**: Design documents from `/specs/004-app-detail-page/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

**Tests**: Not requested — no test tasks included.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 创建 APP 详情页的类型定义和内容数据文件

- [x] T001 [P] Define APP page TypeScript interfaces (MockupItem, AppHeroData, FeatureSectionData, AppBottomCTAData, AppPageData) in src/types/app.ts — follow data-model.md entity definitions, reference existing src/types/home.ts for style conventions
- [x] T002 Create APP page content data with hero mockups (>=4 items from /images/02App/), 6 feature sections (title, description, images per research.md R-003 mapping), sectionTitle "About Aura APP", and bottomCTA data in src/config/app.ts — import types from src/types/app.ts, follow src/config/home.ts patterns for structure

**Checkpoint**: Types and content data ready — component implementation can begin

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 扩展共享 UI 组件以支持 APP 详情页需求

**⚠️ CRITICAL**: US5 (滚动动画) 依赖此阶段完成

- [x] T003 Extend ScrollReveal component to support directional slide-in animations by adding `direction` prop ("up" | "left" | "right") in src/components/ui/ScrollReveal.tsx — default "up" for backward compatibility, "left" uses initial x:-60, "right" uses initial x:60, both with opacity:0→1, keep existing useReducedMotion behavior, do NOT modify any existing callsites

**Checkpoint**: Foundation ready — user story implementation can now begin

---

## Phase 3: User Story 1 — 首屏多机型展示与下载引导 (Priority: P1) 🎯 MVP

**Goal**: 访客打开 /app 页面，看到首屏 Hero 区域：多部手机 Mockup 无缝循环轮播 + "Download Aura APP" 标题 + App Store / Google Play 下载按钮

**Independent Test**: 打开 http://localhost:3000/app，看到 Mockup 图片从右向左持续平滑滚动（无缝循环），标题和下载按钮居中可见可点击，拖拽/滑动可控制轮播方向

### Implementation for User Story 1

- [x] T004 [P] [US1] Create MockupCarousel component implementing continuous seamless horizontal scroll in src/components/app/MockupCarousel.tsx — duplicate children for seamless loop, use Framer Motion animate for continuous rightward-to-left translation (translateX from 0 to -50%), support drag="x" with onDragEnd to resume auto-scroll, accept MockupItem[] as props, render each mockup with next/image (priority loading, blur placeholder), responsive scaling on mobile (<768px)
- [x] T005 [US1] Create AppHeroSection component in src/components/app/AppHeroSection.tsx — render GradientBackground (reuse home page's pink-warm-white radial gradient layers), MockupCarousel with hero.mockups data, centered h1 title "Download Aura APP", StoreBadgeLink buttons (appStore + googlePlay from downloadConfig, responsive heights 40px/55px/70px), max-w-7xl container with px-4 sm:px-6 lg:px-8, semantic HTML with section tag, accept AppHeroData as props
- [x] T006 [US1] Update APP page route to render AppHeroSection with hero data and export Next.js metadata (title, description, Open Graph) in src/app/app/page.tsx — import appPageData from config/app, import AppHeroSection, replace stub content, use semantic main tag with single h1, ensure page is server-renderable (AppHeroSection is client component)

**Checkpoint**: US1 complete — Hero section with Mockup carousel and download buttons fully functional and independently testable

---

## Phase 4: User Story 2 + User Story 3 — App 功能深度浏览 + 图文交替排版 (Priority: P1 + P2)

**Goal**: 访客向下滚动看到 "About Aura APP" 标题和 6 个功能模块，每个模块包含标题、描述文案和截图，桌面端采用图文左右交替排版（Z 字形阅读路径），移动端垂直堆叠

**Independent Test**: 在桌面端 (>=768px) 浏览，奇数模块图片在左/文案在右，偶数模块反之；在移动端 (<768px) 所有模块图片在上/文案在下

**Note**: US2（功能内容展示）和 US3（交替排版）在同一组件中实现，因为 AppFeatureSection 必须同时处理内容渲染和布局逻辑

### Implementation for User Story 2 + 3

- [x] T007 [P] [US2] Create AppFeatureSection component for a single feature module with alternating layout in src/components/app/AppFeatureSection.tsx — accept FeatureSectionData + index as props, use index % 2 to determine layout direction (even index=0,2,4: images left / text right; odd index=1,3,5: text left / images right), render feature title as h3, description paragraph, images via next/image with lazy loading and blur placeholder, optional productImage for "360° Precise Toy Control", white background, max-w-7xl container, mobile (<768px): vertical stack (image top, text bottom) regardless of index, tablet/desktop (>=768px): flex-row or flex-row-reverse based on index, images and text each 50% width
- [x] T008 [US2] Create AppFeatureList container component in src/components/app/AppFeatureList.tsx — accept FeatureSectionData[] and sectionTitle as props, render "About Aura APP" as h2 section title, map over features array rendering AppFeatureSection for each with index, white background section, semantic HTML with section tags
- [x] T009 [US2] Add AppFeatureList to page.tsx below AppHeroSection in src/app/app/page.tsx — import AppFeatureList, pass appPageData.features and appPageData.sectionTitle as props

**Checkpoint**: US2+US3 complete — 6 feature modules displayed with alternating layout, content-driven from config, responsive on all viewports

---

## Phase 5: User Story 4 — 底部强转化下载区 (Priority: P2)

**Goal**: 页面底部展示深色渐变背景转化区域，包含 Aura 品牌 Logo（心形图标）、引导文案和下载按钮

**Independent Test**: 滚动到页面底部，看到深色渐变背景区域、Aura Logo、引导文案和 App Store / Google Play 下载按钮，按钮可点击跳转

### Implementation for User Story 4

- [x] T010 [US4] Create AppBottomCTA component with dark gradient background in src/components/app/AppBottomCTA.tsx — accept AppBottomCTAData as props, full-width dark gradient background (black/deep-purple to pink gradient, naturally transitioning to dark Footer), centered layout with Aura brand logo (heart icon via next/image), heading text, description text, StoreBadgeLink buttons (appStore + googlePlay from downloadConfig, same responsive heights as Hero), max-w-7xl container for content, semantic HTML with section tag, responsive mobile layout (vertical centering)
- [x] T011 [US4] Add AppBottomCTA to page.tsx below AppFeatureList in src/app/app/page.tsx — import AppBottomCTA, pass appPageData.bottomCTA as props

**Checkpoint**: US4 complete — Bottom CTA with dark gradient and download buttons functional

---

## Phase 6: User Story 5 — 滚动入场动画 (Priority: P3)

**Goal**: 各功能模块在进入视口时以左右交替滑入动画出现——奇数模块从左滑入，偶数模块从右滑入，均伴随淡入

**Independent Test**: 滚动页面观察各功能模块的入场动画方向与其图片所在侧一致（左→右→左→右→左→右），每个模块只播放一次动画，在 prefers-reduced-motion 下无动画

### Implementation for User Story 5

- [x] T012 [US5] Wrap each AppFeatureSection with directional ScrollReveal in src/components/app/AppFeatureList.tsx — for even index (0,2,4) use direction="left", for odd index (1,3,5) use direction="right", pass appropriate delay values for staggered feel (e.g., 0.1s), animation duration 0.5-0.8s (controlled by ScrollReveal), verify prefers-reduced-motion bypass works
- [x] T013 [US5] Add ScrollReveal animations to Hero section and Bottom CTA in src/app/app/page.tsx — wrap AppHeroSection with ScrollReveal direction="up" for fade-in entrance, wrap AppBottomCTA with ScrollReveal direction="up" for fade-in entrance

**Checkpoint**: US5 complete — all sections animate on scroll with directional slide-in, respecting accessibility preferences

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: SEO 优化、响应式验证和构建质量检查

- [x] T014 Verify semantic HTML structure and SEO metadata in src/app/app/page.tsx — single h1 per page ("Download Aura APP" in Hero), h2 for "About Aura APP", h3 for each feature title, all images have descriptive alt text, page exports Next.js metadata (title, description, Open Graph tags, Twitter Card)
- [x] T015 Responsive testing checklist — verify all components render correctly at 320px, 375px, 768px, 1024px, 1280px, 1920px, 2560px viewports: no horizontal overflow, no element overlap, all text readable, touch targets >=44px on mobile, Mockup carousel functional on touch devices
- [x] T016 Run build validation pipeline: pnpm type-check && pnpm lint && pnpm build — fix any TypeScript errors, ESLint violations, or build failures

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately, T001 and T002 can run in parallel
- **Foundational (Phase 2)**: No dependencies on Phase 1 — can run in parallel with Setup
- **US1 Hero (Phase 3)**: Depends on Phase 1 (needs types + config data)
- **US2+US3 Features (Phase 4)**: Depends on Phase 1 (needs types + config data) and Phase 3 (page.tsx structure)
- **US4 Bottom CTA (Phase 5)**: Depends on Phase 1 (needs types + config data)
- **US5 Animations (Phase 6)**: Depends on Phase 2 (needs extended ScrollReveal) and Phase 4 (needs AppFeatureList)
- **Polish (Phase 7)**: Depends on all user story phases complete

### User Story Dependencies

- **US1 (P1)**: Depends only on Setup — **can start first, delivers MVP**
- **US2+US3 (P1+P2)**: Depends on Setup + US1 (page.tsx structure) — primary content delivery
- **US4 (P2)**: Depends on Setup — **can run in parallel with US2+US3** (different files)
- **US5 (P3)**: Depends on Foundational + US2+US3 — enhancement layer, implement last

### Within Each User Story

- Config/types before components
- Child components before parent containers
- Components before page.tsx wiring
- Story complete before moving to next priority

### Parallel Opportunities

- T001 and T002 can run in parallel (different files)
- T003 (Foundational) can run in parallel with T001+T002 (Setup)
- T004 (MockupCarousel) can run in parallel with T007 (AppFeatureSection) — both are independent components
- T010 (AppBottomCTA) can run in parallel with T007/T008 (Feature components) — different files

---

## Parallel Example: Phase 3 + Phase 5

```bash
# After Setup complete, these can run in parallel (different files):
Task T004: "Create MockupCarousel in src/components/app/MockupCarousel.tsx"
Task T010: "Create AppBottomCTA in src/components/app/AppBottomCTA.tsx"
Task T007: "Create AppFeatureSection in src/components/app/AppFeatureSection.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (types + config)
2. Complete Phase 3: US1 Hero Section
3. **STOP and VALIDATE**: Open http://localhost:3000/app — Hero with Mockup carousel + download buttons visible
4. Deploy/demo if ready — page has conversion value even without feature sections

### Incremental Delivery

1. Setup + US1 → Hero section live (MVP)
2. Add US2+US3 → 6 feature modules with alternating layout visible
3. Add US4 → Bottom CTA provides second conversion point
4. Add US5 → Scroll animations polish the experience
5. Polish → SEO, responsive audit, build validation

### Single Developer Flow

1. T001 → T002 → T003 (Setup + Foundational, ~1 hour)
2. T004 → T005 → T006 (US1 Hero, ~2 hours)
3. T007 → T008 → T009 (US2+US3 Features, ~2 hours)
4. T010 → T011 (US4 Bottom CTA, ~1 hour)
5. T012 → T013 (US5 Animations, ~30 min)
6. T014 → T015 → T016 (Polish, ~30 min)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- US2 and US3 are combined in Phase 4 because AppFeatureSection inherently implements both content display and alternating layout
- US5 animations are a pure enhancement — page is fully functional without them
- All content comes from src/config/app.ts — zero hardcoded text in components
- All images use next/image with appropriate loading strategy (priority for Hero, lazy for features)
- Commit after each task or logical group

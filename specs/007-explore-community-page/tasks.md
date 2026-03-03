# Tasks: Explore 探索/社区页 (Community Story Page)

**Input**: Design documents from `/specs/007-explore-community-page/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: 未在规格中明确要求自动化测试，不生成测试任务。验证通过 `tsc --noEmit` + `pnpm build` + `pnpm lint` + 浏览器手动测试。

**Organization**: 按用户故事分组，支持独立实现和测试。

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (类型、配置与图片资源)

**Purpose**: 创建 Explore 页面的类型定义、数据配置文件和图片资源目录

- [x] T001 [P] 创建共享画廊类型文件 `src/types/gallery.ts`（定义 MasonryPhoto 公共基础接口）和 Explore 页面类型定义文件 `src/types/explore.ts`（定义 ExploreHeroData、ExploreGalleryPhoto extends MasonryPhoto（无 category 字段，有可选 order 字段）、ExplorePageData 类型）；MasonryPhoto 作为共享基础接口供 About 和 Explore 共同使用，参照 data-model.md 中的字段定义
- [x] T002 [P] 创建 Explore 页面数据配置文件 `src/config/explore.ts`：包含 hero 数据（title: "Community Story"、subtitle、description、backgroundImage: "/images/05Explore/Aura_Explore_Banner-01.webp"、fallbackColor）、galleryPhotos 数组（11 张照片，路径格式 "/images/05Explore/Aura_Explore-{nn}.webp"，cardSize 区分 large/small，title 固定为 "My Aura stories"）、emptyState 配置，参照 `src/config/about.ts` 的结构模式
- [x] T003 [P] 确认图片资源目录 `public/images/05Explore/` 已存在且包含所有所需图片：Hero 背景图（Aura_Explore_Banner-01.webp）和 11 张画廊照片（Aura_Explore-01.webp ~ Aura_Explore-11.webp），均为 WebP 格式，无需创建新文件

**Checkpoint**: 类型、配置和图片资源就绪，可开始组件开发

---

## Phase 2: Foundational (公共组件抽离)

**Purpose**: 从 AboutGallerySection 抽离 MasonryGallery 和 ImagePreview 为公共组件，重构 About 页使用新组件

**⚠️ CRITICAL**: About 页重构完成后必须验证 About 页功能不受影响，方可开始 Explore 页面开发

- [x] T004 从 `src/components/about/AboutGallerySection.tsx` 中抽离图片预览逻辑，创建公共组件 `src/components/ui/ImagePreview.tsx`：接受 photos（MasonryPhoto[]）、currentPhoto（MasonryPhoto | null）、onClose、onNavigate 作为 props；包含全屏遮罩层、Framer Motion opacity+scale 过渡动画、上一张/下一张导航按钮、位置计数器（如 "3 / 11"）、键盘导航（Escape 关闭、ArrowLeft/ArrowRight 切换）、body 滚动锁定；首尾照片时隐藏对应方向按钮；导航按钮触摸目标 ≥44px
- [x] T005 从 `src/components/about/AboutGallerySection.tsx` 中抽离瀑布流画廊逻辑，创建公共组件 `src/components/ui/MasonryGallery.tsx`：接受 photos（MasonryPhoto[]）、emptyMessage、onPhotoClick（可选）、renderCaption（可选）、className（可选）作为 props；使用 CSS columns 实现瀑布流布局（columns-1 md:columns-2 lg:columns-4）、gap-4 间距；每张卡片使用 break-inside-avoid、rounded-2xl 圆角；图片使用 next/image 懒加载 + object-cover + 完整 alt 属性；图片加载失败时显示 fallbackColor 兜底背景色；无照片时显示 emptyMessage 空状态提示（与 T004 可并行，不同文件无依赖）
- [x] T006 重构 `src/components/about/AboutGallerySection.tsx` 使用新抽离的 MasonryGallery 和 ImagePreview 公共组件：保留 NewsCategoryTabs 分类筛选逻辑不变；将内联的 GalleryCard 渲染逻辑替换为 MasonryGallery 组件调用；将内联的 ImagePreview 渲染逻辑替换为公共 ImagePreview 组件调用；更新 `src/types/about.ts` 中 GalleryPhoto 使其 extends MasonryPhoto（从 `src/types/gallery.ts` 导入）；确保 About 页的分类筛选、画廊展示和图片预览功能与重构前完全一致（依赖 T004、T005 完成）
- [x] T007 验证 About 页重构后功能完整性：运行 `pnpm tsc --noEmit` 确保类型检查通过；运行 `pnpm build` 确保构建成功；在浏览器中访问 `/about` 页面，验证分类 Tab 切换、画廊展示、图片预览、键盘导航等功能与重构前一致（依赖 T006 完成）

**Checkpoint**: 公共组件就绪，About 页功能不受影响，可开始 Explore 页面用户故事实现

---

## Phase 3: User Story 1 - 浏览社区照片画廊 (Priority: P1) 🎯 MVP

**Goal**: 访客导航至 `/explore` 可看到沉浸式 Hero 横幅和瀑布流照片画廊

**Independent Test**: 导航至 `/explore`，验证 Hero 横幅正确渲染标题/背景图/副标题/介绍段落，向下滚动看到瀑布流画廊中照片以 4 列展示、卡片尺寸各异、每张标注 "My Aura stories"

### Implementation for User Story 1

- [x] T008 [P] [US1] 创建 Hero 横幅组件 `src/components/explore/ExploreHeroBanner.tsx`：接受 ExploreHeroData 作为 props；min-h-[80vh] 高度；使用 next/image（fill + priority + object-cover + sizes="100vw"）渲染背景图；深色半透明遮罩层（bg-black/50）确保文字可读；文字内容居中定位：标题（"Community Story"，响应式字号 text-xl→text-6xl）、副标题、介绍段落；Montserrat 字体；fallbackColor 作为图片加载前背景色；参照 `src/components/about/AboutHeroBanner.tsx` 的实现模式
- [x] T009 [P] [US1] 创建画廊区域组件 `src/components/explore/ExploreGallerySection.tsx`：接受 galleryPhotos（ExploreGalleryPhoto[]）和 emptyMessage 作为 props；白色背景（bg-white）区域；使用 MasonryGallery 公共组件渲染瀑布流画廊；内容区域限制在 max-w-7xl (1280px) 居中 + px-4 sm:px-6 lg:px-8 内边距；区域间距 py-16～py-20；每张卡片显示图片 + "My Aura stories" 说明文字；暂不集成照片预览功能（US2 处理）
- [x] T010 [US1] 更新 Explore 页面路由 `src/app/explore/page.tsx`：导入 ExploreHeroBanner、ExploreGallerySection 组件和 explorePageData 配置数据；导出 Next.js Metadata 对象（title: "Explore - Aura Community Story"、description、openGraph 标签）；页面结构为 `<main>` 包裹 ExploreHeroBanner + ExploreGallerySection，数据从配置文件传入 props；使用语义 HTML（main、section）（依赖 T008、T009 完成）

**Checkpoint**: US1 完成 — `/explore` 页面可正常访问，Hero 横幅 + 瀑布流画廊展示正确，包含空状态和图片加载失败兜底

---

## Phase 4: User Story 2 - 查看照片全屏预览 (Priority: P2)

**Goal**: 访客点击画廊照片可打开全屏预览，支持导航、键盘操作和位置计数器

**Independent Test**: 点击任意画廊照片，验证全屏预览正确显示，通过按钮/键盘在照片间导航，计数器显示正确位置，Escape 关闭预览

### Implementation for User Story 2

- [x] T011 [US2] 在 `src/components/explore/ExploreGallerySection.tsx` 中集成照片预览功能：添加 previewPhoto 状态管理（useState<ExploreGalleryPhoto | null>）；将 onPhotoClick 回调传递给 MasonryGallery 组件，点击时设置 previewPhoto；引入公共 ImagePreview 组件，传入当前照片列表、previewPhoto、onClose（设为 null）、onNavigate（更新 previewPhoto）；确保预览打开时 body 滚动锁定，关闭后恢复
- [x] T012 [US2] 验证照片预览边界情况：确认到达第一张照片时「上一张」按钮隐藏/禁用；确认到达最后一张照片时「下一张」按钮隐藏/禁用；确认快速连续点击导航按钮时无图片闪烁或延迟；确认位置计数器（如 "3 / 11"）始终正确更新；移动端滑动手势导航正常（依赖 T011 完成）

**Checkpoint**: US2 完成 — 照片全屏预览功能完整，导航、键盘、计数器均正常

---

## Phase 5: User Story 3 - 跨设备响应式布局 (Priority: P3)

**Goal**: Explore 页面在 mobile 375px、tablet 768px、desktop 1280px、large desktop 1440px+ 下均正确渲染

**Independent Test**: 在标准断点下调整浏览器窗口，验证无溢出、无水平滚动条、文字可读、画廊列数正确调整

### Implementation for User Story 3

- [x] T013 [US3] 验证并调整 `src/components/explore/ExploreHeroBanner.tsx` 的响应式布局：确认移动端文字居中、字号适当缩小（text-xl）；确认平板端 Hero 区域按比例缩放；确认大屏桌面端内容居中在 max-w-7xl 内；确认 min-h-[80vh] 在所有断点下表现正确；确认无水平滚动条出现
- [x] T014 [US3] 验证并调整 `src/components/explore/ExploreGallerySection.tsx` 和 MasonryGallery 的响应式布局：确认移动端 (<768px) 画廊以 1 列展示（columns-1）；确认平板端 (768px-1279px) 画廊以 2 列展示（md:columns-2）；确认桌面端 (≥1280px) 画廊以 4 列展示（lg:columns-4）；确认图片预览在移动端导航按钮触摸目标 ≥44px；确认大屏桌面端内容居中在 1280px 最大宽度内

**Checkpoint**: US3 完成 — 页面在所有标准断点下正确响应式渲染

---

## Phase 6: User Story 4 - 滚动动画与视觉打磨 (Priority: P4)

**Goal**: 页面各组件具有流畅的滚动进入动画和悬停交互效果

**Independent Test**: 滚动页面观察画廊卡片级联渐入效果；悬停卡片时文字变为粉色；启用 `prefers-reduced-motion` 后动画禁用

### Implementation for User Story 4

- [x] T015 [P] [US4] 在 `src/components/explore/ExploreHeroBanner.tsx` 中添加 ScrollReveal 动画：使用 ScrollReveal 组件包裹标题、副标题和介绍段落；方向为 "up"；逐个元素设置递增 delay（如 0、0.1、0.2）；确保 prefers-reduced-motion 时自动禁用（ScrollReveal 已内置支持）
- [x] T016 [P] [US4] 在 `src/components/ui/MasonryGallery.tsx` 中添加画廊卡片级联渐入动画：每张卡片使用 Framer Motion motion.div，initial={{ opacity: 0, y: 30 }}、animate={{ opacity: 1, y: 0 }}；delay 按 index × 0.05 递增实现级联效果；transition duration: 0.4；确保 prefers-reduced-motion 时跳过动画直接显示
- [x] T017 [P] [US4] 在 `src/components/ui/MasonryGallery.tsx` 的卡片说明文字上添加悬停效果：使用 Tailwind CSS `group-hover:text-brand-pink transition-colors duration-300`；卡片外层添加 `group` 类名；图片不添加任何缩放效果；使用纯 CSS transition，无需 Framer Motion

**Checkpoint**: US4 完成 — 滚动动画流畅、悬停效果正确、prefers-reduced-motion 遵守

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: 构建验证、性能优化和最终质量检查

- [x] T018 运行 `pnpm tsc --noEmit` 确保全项目类型检查通过，无 TypeScript 错误
- [x] T019 运行 `pnpm lint` 确保 ESLint 检查通过，无代码风格问题
- [x] T020 运行 `pnpm build` 确保 Next.js 生产构建成功，无编译错误
- [x] T021 在浏览器中完整验证 Explore 页面：Hero 横幅渲染（标题、背景图、副标题、介绍段落）；画廊瀑布流布局（4 列桌面端、2 列平板端、1 列移动端）；照片预览（点击打开、键盘导航、计数器、关闭）；滚动动画和悬停效果；空状态和图片加载失败兜底
- [x] T022 验证 About 页面 `/about` 功能回归：分类 Tab 筛选、画廊展示、图片预览功能与重构前一致

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: 无依赖 — 立即开始，T001/T002/T003 全部可并行
- **Phase 2 (Foundational)**: 依赖 Phase 1 完成（T001 的类型定义）— **BLOCKS 所有用户故事**
- **Phase 3 (US1)**: 依赖 Phase 2 完成 — MVP 里程碑
- **Phase 4 (US2)**: 依赖 Phase 3 完成（需要画廊组件已集成）
- **Phase 5 (US3)**: 依赖 Phase 3 完成（需要组件已存在才能验证响应式）
- **Phase 6 (US4)**: 依赖 Phase 3 完成（需要组件已存在才能添加动画）
- **Phase 7 (Polish)**: 依赖所有用户故事完成

### User Story Dependencies

- **US1 (P1)**: Phase 2 完成后即可开始 — 无其他故事依赖
- **US2 (P2)**: 依赖 US1（需要 ExploreGallerySection 已创建）
- **US3 (P3)**: 依赖 US1（需要组件存在才能验证响应式），可与 US2 并行
- **US4 (P4)**: 依赖 US1（需要组件存在才能添加动画），可与 US2/US3 并行

### Parallel Opportunities

- **Phase 1**: T001、T002、T003 全部可并行（不同文件，无依赖）
- **Phase 2**: T004、T005 可并行（不同文件），T006 依赖二者完成
- **Phase 3**: T008、T009 可并行（不同文件），T010 依赖二者完成
- **Phase 4-6**: US3 和 US4 可与 US2 并行（US4 中 T015、T016、T017 可并行）
- **Phase 7**: T018、T019 可并行

---

## Parallel Example: Phase 2 (Foundational)

```text
# 可并行 — 不同文件，无依赖：
Task T004: "抽离 ImagePreview 到 src/components/ui/ImagePreview.tsx"
Task T005: "抽离 MasonryGallery 到 src/components/ui/MasonryGallery.tsx"

# 上述完成后：
Task T006: "重构 AboutGallerySection 使用新公共组件"

# 最后验证：
Task T007: "验证 About 页功能完整性"
```

## Parallel Example: Phase 3 (US1 - MVP)

```text
# 可并行 — 不同文件，无依赖：
Task T008: "创建 ExploreHeroBanner 组件"
Task T009: "创建 ExploreGallerySection 组件"

# 上述完成后：
Task T010: "组装 Explore 页面路由"
```

## Parallel Example: US2 + US3 + US4

```text
# US2 完成后，US3 和 US4 可并行：
Developer/Agent A: T013, T014 (US3 响应式验证)
Developer/Agent B: T015, T016, T017 (US4 动画，三个任务也可并行)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup（类型 + 配置 + 图片）
2. Complete Phase 2: Foundational（公共组件抽离 + About 页重构验证）
3. Complete Phase 3: User Story 1（Hero + 画廊）
4. **STOP and VALIDATE**: 访问 `/explore` 验证 Hero 横幅和画廊展示
5. MVP 可部署

### Incremental Delivery

1. Setup + Foundational → 公共组件就绪
2. Add US1 → Hero + 画廊可用 → **MVP 部署**
3. Add US2 → 照片预览可用 → 增量部署
4. Add US3 + US4 并行 → 响应式 + 动画 → 增量部署
5. Polish → 构建验证 + 回归测试 → 最终发布

---

## Notes

- [P] 标记的任务在不同文件上操作，可安全并行
- [Story] 标签将任务映射到 spec.md 中的用户故事
- 每个用户故事可独立完成和测试
- Phase 2（公共组件抽离）是关键路径 — About 页重构验证必须通过后才能继续
- 图片资源已存在于 `public/images/05Explore/`（T003 仅需确认），命名格式为 `Aura_Explore-{nn}.webp`
- 所有动画必须尊重 prefers-reduced-motion 系统设置

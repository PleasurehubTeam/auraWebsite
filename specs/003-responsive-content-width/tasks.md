# Tasks: 响应式内容宽度规范

**Input**: Design documents from `/specs/003-responsive-content-width/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

**Tests**: Not requested — no test tasks included.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: No project-level setup required — existing project with all dependencies installed.

_(No tasks — project is already initialized)_

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 添加全局 CSS 溢出防护，作为所有用户故事的基础安全网

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T001 在 src/app/globals.css 的 `@layer base` 中添加全局溢出防护规则：(1) `html, body { overflow-x: hidden; }` 页面级横向溢出隐藏 (2) `img, video, iframe { max-width: 100%; height: auto; }` 媒体元素等比缩放 (3) `table { display: block; overflow-x: auto; }` 表格容器内滚动

**Checkpoint**: 全局溢出防护已就位 — 页面级横向滚动条已被消除，所有媒体元素不会超出容器

---

## Phase 3: User Story 1 - 超宽屏内容约束 (Priority: P1) 🎯 MVP

**Goal**: 超宽屏幕（2560px+）下所有内容区块不超过 1280px 最大宽度，背景铺满全屏，内容水平居中

**Independent Test**: 将浏览器窗口调整至 2560px+ 宽度，验证所有区块内容在 1280px 内居中，背景铺满全屏

### Implementation for User Story 1

- [x] T002 [P] [US1] 修正 src/components/home/ModeFunctionSection.tsx 中容器的 max-w-5xl 为 max-w-7xl
- [x] T003 [P] [US1] 修正 src/components/ui/TabSwitcher.tsx 中 tab bar 容器的 max-w-[1500px] 为 max-w-7xl
- [x] T004 [P] [US1] 在 src/components/home/HeroSection.tsx 的 max-w-[1600px] 容器 class 旁添加注释：`{/* 宽度规范例外：Hero 区块使用 1600px 以增强视觉冲击力 */}`
- [x] T005 [P] [US1] 在 src/components/layout/DownloadCTA.tsx 的 max-w-4xl 容器 class 旁添加注释：`{/* 宽度规范例外：CTA 区块收窄至 max-w-4xl 以聚焦行动号召 */}`

**Checkpoint**: 所有内容区块在 2560px+ 视口下不超过 1280px（例外组件已标注），背景铺满全屏

---

## Phase 4: User Story 2 - 中等屏幕统一布局 (Priority: P1)

**Goal**: 中等屏幕（768px–1279px）下所有页面使用统一的水平内边距（sm:px-6, lg:px-8）

**Independent Test**: 将浏览器窗口调整在 768px–1279px 之间，遍历所有页面验证水平内边距一致

### Implementation for User Story 2

- [x] T006 [US2] 审查 src/components/layout/Header.tsx 确认内容容器使用 px-4 sm:px-6 lg:px-8 内边距模式（已符合，仅验证）
- [x] T007 [US2] 审查 src/components/layout/Footer.tsx 确认内容容器使用 px-4 sm:px-6 lg:px-8 内边距模式（已符合，仅验证）
- [x] T008 [US2] 审查 src/components/home/AIPoweredSection.tsx 确认内容容器使用 px-4 sm:px-6 lg:px-8 内边距模式（已符合，仅验证）
- [x] T009 [US2] 审查 src/components/home/ClassicModeSection.tsx 确认两个区块（白色标题区和黑色内容区）均使用 px-4 sm:px-6 lg:px-8 内边距模式（已符合，仅验证）
- [x] T010 [US2] 审查 src/components/home/SoloPlaySection.tsx 确认内容容器使用 px-4 sm:px-6 lg:px-8 内边距模式（已符合，仅验证）
- [x] T011 [US2] 审查 src/components/home/RemoteControlSection.tsx 确认内容容器使用 px-4 sm:px-6 lg:px-8 内边距模式（已符合，仅验证）
- [x] T012 [US2] 审查 src/components/home/MysteryScriptSection.tsx 确认内容容器使用 px-4 sm:px-6 lg:px-8 内边距模式（已符合，仅验证）
- [x] T013 [US2] 审查 src/components/home/ModeFunctionSection.tsx 确认内容容器使用 px-4 sm:px-6 lg:px-8 内边距模式（已符合，仅验证）
- [x] T014 [US2] 审查 src/components/modals/CookieConsentBanner.tsx 确认内容容器使用 px-4 sm:px-6 内边距模式（已符合，仅验证）

**Checkpoint**: 所有组件在 768px–1279px 视口下使用统一的内边距模式

---

## Phase 5: User Story 3 - 小屏幕统一布局 (Priority: P1)

**Goal**: 小屏设备（767px 以下）下所有页面使用统一的水平内边距（px-4 即 16px 每侧）

**Independent Test**: 将浏览器窗口调整至 375px，遍历所有页面验证水平内边距一致

### Implementation for User Story 3

- [x] T015 [US3] 审查 src/app/page.tsx 确认首页内容容器遵循 px-4 sm:px-6 lg:px-8 + max-w-7xl mx-auto 模式，如不符合则修正
- [x] T016 [US3] 审查 src/app/about/page.tsx 确认页面内容容器遵循 px-4 sm:px-6 lg:px-8 + max-w-7xl mx-auto 模式，如不符合则修正
- [x] T017 [US3] 审查 src/app/explore/page.tsx 确认页面内容容器遵循 px-4 sm:px-6 lg:px-8 + max-w-7xl mx-auto 模式，如不符合则修正
- [x] T018 [US3] 审查 src/app/news/page.tsx 确认页面内容容器遵循 px-4 sm:px-6 lg:px-8 + max-w-7xl mx-auto 模式，如不符合则修正
- [x] T019 [US3] 审查 src/app/app/page.tsx 确认页面内容容器遵循 px-4 sm:px-6 lg:px-8 + max-w-7xl mx-auto 模式，如不符合则修正

**Checkpoint**: 所有页面在 375px 视口下使用统一的 px-4 (16px) 水平内边距

---

## Phase 6: User Story 4 - 跨页面一致性 (Priority: P2)

**Goal**: 所有 5 个页面在任意视口宽度下遵循相同的内容宽度和间距规则

**Independent Test**: 在 375px、768px、1024px、1920px、2560px 五个视口宽度下遍历所有页面，验证一致性

### Implementation for User Story 4

- [x] T020 [US4] 在 375px 视口下逐页验证首页、关于、探索、新闻、应用页面的水平内边距一致性
- [x] T021 [US4] 在 1920px 视口下逐页验证首页、关于、探索、新闻、应用页面的内容最大宽度和居中一致性
- [x] T022 [US4] 在 2560px 视口下逐页验证首页、关于、探索、新闻、应用页面的内容约束和背景铺满效果

**Checkpoint**: 所有 5 个页面在所有目标视口下表现一致

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: 构建验证和代码质量检查

- [x] T023 运行 pnpm lint 确保所有修改文件通过代码检查
- [x] T024 运行 pnpm build 确保项目构建成功无错误
- [x] T025 按 specs/003-responsive-content-width/quickstart.md 中的验证清单执行最终全量验证

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 无任务 — 项目已初始化
- **Foundational (Phase 2)**: 无依赖，立即开始 — BLOCKS 所有用户故事
- **US1 (Phase 3)**: 依赖 Phase 2 完成
- **US2 (Phase 4)**: 依赖 Phase 2 完成，可与 US1 并行
- **US3 (Phase 5)**: 依赖 Phase 2 完成，可与 US1/US2 并行
- **US4 (Phase 6)**: 依赖 Phase 3 + Phase 4 + Phase 5 全部完成（跨页面验证需要所有修正已就位）
- **Polish (Phase 7)**: 依赖所有用户故事完成

### User Story Dependencies

- **User Story 1 (P1)**: Phase 2 完成后立即可开始 — 不依赖其他故事
- **User Story 2 (P1)**: Phase 2 完成后立即可开始 — 不依赖其他故事（审查验证性质）
- **User Story 3 (P1)**: Phase 2 完成后立即可开始 — 不依赖其他故事
- **User Story 4 (P2)**: 依赖 US1 + US2 + US3 全部完成 — 跨页面一致性验证

### Parallel Opportunities

- T001 为单一文件任务（globals.css），独立执行
- T002、T003、T004、T005 可全部并行（不同文件，无依赖）
- US1、US2、US3 的实施阶段可并行启动（Phase 2 完成后）
- T023、T024 可并行执行

---

## Parallel Example: User Story 1

```bash
# T002-T005 可全部并行启动（修改不同文件）：
Task: "修正 ModeFunctionSection.tsx 的 max-w-5xl 为 max-w-7xl"
Task: "修正 TabSwitcher.tsx 的 max-w-[1500px] 为 max-w-7xl"
Task: "在 HeroSection.tsx 添加宽度规范例外注释"
Task: "在 DownloadCTA.tsx 添加宽度规范例外注释"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 2: Foundational（全局 CSS 溢出防护）
2. Complete Phase 3: User Story 1（修正不合规组件 + 标记例外）
3. **STOP and VALIDATE**: 在 2560px 视口下验证内容约束和背景铺满
4. Deploy/demo if ready

### Incremental Delivery

1. Complete Foundational → 全局防护就位
2. Add US1 → 超宽屏内容约束 → 验证 → Deploy (MVP!)
3. Add US2 → 中屏统一布局 → 验证
4. Add US3 → 小屏统一布局 → 验证
5. Add US4 → 跨页面一致性验证
6. Polish → lint + build + 全量验证

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- 本特性以 CSS class 修改为主，实际代码变更量极小
- Phase 4 (US2) 和 Phase 5 (US3) 主要是审查验证性质，大部分组件已符合规范
- 所有修改完成后务必运行 pnpm build 确保无构建错误
- Commit after each phase using Conventional Commits format (e.g., `style: add global overflow protection`)

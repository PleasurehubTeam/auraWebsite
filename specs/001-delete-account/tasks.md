# Tasks: 账号删除申请页面

**Input**: Design documents from `/specs/001-delete-account/`
**Prerequisites**: plan.md ✓, spec.md ✓, research.md ✓, data-model.md ✓, quickstart.md ✓

**Tests**: Not requested — no test tasks generated.

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 定义类型和配置文件，为所有后续任务提供数据基础

- [x] T001 Add `DeleteAccountConfig` type definitions to `src/types/delete-account.ts` (new file with `PageMetadata`, `HeroContent`, `ContentSection`, `ContactInfo` interfaces)
- [x] T002 Export `DeleteAccountConfig` and related types from `src/types/index.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 创建页面内容配置文件，所有 UI 任务均依赖此文件

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 Create `src/config/delete-account.ts` — populate with Chinese page content: hero text, 3 content sections (deletion-process, consequences, contact), and `ContactInfo` with `email: "support@realaura.ai"`

**Checkpoint**: Config file ready — all user story tasks can now proceed

---

## Phase 3: User Story 1 — 查看账号删除入口 (Priority: P1) 🎯 MVP

**Goal**: 用户访问 `/delete-account` 页面，看到账号删除说明、不可逆操作警告，以及客服邮箱联系方式

**Independent Test**: 直接访问 `http://localhost:3000/delete-account`，验证页面正常加载且展示完整内容（标题、说明文字、后果警告、邮箱地址）

### Implementation for User Story 1

- [x] T004 [US1] Create `src/components/delete-account/DeleteAccountContent.tsx` — accept `DeleteAccountConfig` as prop, render hero heading, content sections with `<h2>` titles and `<p>` body text, and contact info block; wrap with `motion.div` Framer Motion entrance animation (`opacity: 0→1, y: 20→0`)
- [x] T005 [US1] Create `src/app/delete-account/page.tsx` — export `metadata: Metadata` with title "删除账号 | Aura", description, OpenGraph and Twitter Card tags; render `<main>` with `max-w-3xl` container and `<DeleteAccountContent config={deleteAccountConfig} />`

**Checkpoint**: User Story 1 fully functional — page loads with all content visible at `/delete-account`

---

## Phase 4: User Story 2 — 发起邮件申请 (Priority: P2)

**Goal**: 用户点击页面上的邮箱链接，邮件客户端弹出并预填 `support@realaura.ai` 为收件人

**Independent Test**: 点击页面中的邮箱链接，验证浏览器唤起邮件客户端且收件人已预填；在移动设备上验证 mailto 链接可正常触发

### Implementation for User Story 2

- [x] T006 [US2] Update `src/components/delete-account/DeleteAccountContent.tsx` — replace plain text email display with `<a href="mailto:support@realaura.ai">` styled CTA button (Tailwind: `inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-white font-medium transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`); add a plain-text copy of the email address below the button as manual-copy fallback
- [x] T007 [US2] Ensure mailto `<a>` tag meets touch target requirement (min 44×44px via Tailwind `min-h-[44px]`) per Constitution §II

**Checkpoint**: User Story 1 AND 2 both fully functional — email link opens mail client on all supported devices

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: 可访问性、SEO、响应式布局验证和收尾工作

- [x] T008 [P] Verify responsive layout in `src/components/delete-account/DeleteAccountContent.tsx` — test at 320px, 768px, and 1280px viewports; ensure no horizontal overflow, no text truncation
- [x] T009 [P] Add `alt`-equivalent accessible labels: ensure `<a>` for mailto has `aria-label` describing the action ("通过邮件联系客服申请删除账号")
- [x] T010 Add `/delete-account` link to footer config in `src/config/footer.ts` under the "Support" group (label: "删除账号")
- [x] T011 Run validation per `quickstart.md`: `pnpm tsc --noEmit`, `pnpm lint`, `pnpm build`; confirm `/delete-account` appears as `○` (SSG) in build output

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on T001, T002 — BLOCKS all user story tasks
- **User Story 1 (Phase 3)**: Depends on T003 — T004 and T005 can run in parallel after T003
- **User Story 2 (Phase 4)**: Depends on T004 (same file) — T006 and T007 run sequentially within US2
- **Polish (Phase 5)**: Depends on all story phases complete

### User Story Dependencies

- **US1 (P1)**: Can start after Phase 2 — no dependency on US2
- **US2 (P2)**: Depends on T004 (modifies same component file)

### Within Each User Story

- T004 → T005 (page imports component)
- T004 → T006 (modifies same file)
- T006 → T007 (same task scope)

### Parallel Opportunities

- T001 and T002 must be sequential (T002 re-exports T001)
- T004 and T005 can run in parallel (different files)
- T008 and T009 can run in parallel (different concerns)

---

## Parallel Example: User Story 1

```bash
# After T003 completes, launch T004 and T005 simultaneously:
Task: "Create DeleteAccountContent.tsx component"   # → src/components/delete-account/DeleteAccountContent.tsx
Task: "Create delete-account page.tsx route"         # → src/app/delete-account/page.tsx
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001, T002)
2. Complete Phase 2: Foundational (T003)
3. Complete Phase 3: User Story 1 (T004, T005)
4. **STOP and VALIDATE**: Visit `http://localhost:3000/delete-account`, confirm content is visible
5. Deploy/demo if ready

### Incremental Delivery

1. Phase 1 + 2 → Config and types ready
2. Phase 3 → Page visible with all explanatory content (MVP)
3. Phase 4 → Mailto link functional (completes full user flow)
4. Phase 5 → Polish, accessibility, footer link

---

## Notes

- [P] tasks = different files, no shared state dependencies
- [Story] label maps each task to the user story it enables
- No new `dependencies` added — all libraries already in the project
- Config email `support@realaura.ai` sourced from existing `src/config/footer.ts`
- Commit after each phase checkpoint using Conventional Commits (`feat:`, `style:`)

# Tasks: Privacy Policy Page

**Input**: Design documents from `/specs/009-privacy-policy-page/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: Not requested — no test tasks included.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

**Note on US4 (Mobile Responsive)**: US4（移动端查看协议）为跨领域需求，通过 Tailwind mobile-first CSS 方法内建于所有组件实现中，不单独设置任务阶段。每个组件和页面的实现均包含移动端适配。

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup

**Purpose**: 类型定义和内容数据准备

- [x] T001 Create privacy policy type definitions (PolicyMetadata, PrivacyPolicySection, PolicySubsection, PrivacyPolicyData) in `src/types/privacy-policy.ts`, and re-export from `src/types/index.ts`
- [x] T002 Create privacy policy content data with all 10 standard sections (Introduction, Information We Collect, How We Use Your Information, Information Sharing, Your Rights and Choices, Cookies and Tracking, Data Security, Children's Privacy, Changes to This Policy, Contact Us) and metadata (effectiveDate, lastUpdated) in `src/config/privacy-policy.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 共享内容组件，所有页面版本依赖此组件

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 Create shared `PrivacyPolicyContent` component in `src/components/privacy-policy/PrivacyPolicyContent.tsx` that renders policy metadata (effective date, last updated), section headings with anchor IDs, section content paragraphs, and subsections. Use Tailwind Typography `prose` classes for text styling. Component must be responsive (mobile-first) with container pattern `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`. Props: `{ sections: PrivacyPolicySection[]; metadata: PolicyMetadata }`

**Checkpoint**: Shared content component ready — user story implementation can now begin

---

## Phase 3: User Story 1 - 官网查看隐私协议 (Priority: P1) MVP

**Goal**: 用户可以通过官网 `/privacy-policy` 访问完整的隐私协议页面，包含页头、页脚、导航和完整协议内容

**Independent Test**: 导航至 `/privacy-policy`，验证页面展示完整布局和所有协议章节

- [x] T004 [US1] Create website version page in `src/app/privacy-policy/page.tsx` with: exported Next.js `Metadata` object (title: "Privacy Policy | Aura", description, OpenGraph, Twitter Card per contracts/routes.md), import `privacyPolicyData` from config, render page title heading (h1), and `PrivacyPolicyContent` component. Use semantic HTML (`<main>`, `<article>`, `<section>`). Follow the About page pattern for layout structure

**Checkpoint**: US1 complete — website version functional with full layout, navigable from footer links

---

## Phase 4: User Story 2 - 章节内导航 (Priority: P2)

**Goal**: 官网版页面顶部展示目录，点击章节链接可平滑滚动到对应位置

**Independent Test**: 点击目录中的链接，验证平滑滚动至对应章节

- [x] T005 [US2] Create `TableOfContents` component in `src/components/privacy-policy/TableOfContents.tsx` that renders a list of section titles as anchor links (`#section-id`), supports smooth scroll behavior via `scroll-behavior: smooth` or `scrollIntoView({ behavior: 'smooth' })`, styled with Tailwind (mobile-responsive). Props: `{ sections: PrivacyPolicySection[] }`
- [x] T006 [US2] Integrate `TableOfContents` into website version page `src/app/privacy-policy/page.tsx` — place TOC between page title and `PrivacyPolicyContent` component

**Checkpoint**: US2 complete — TOC navigation functional on website version

---

## Phase 5: User Story 3 - 外部 App 嵌入查看协议 (Priority: P1)

**Goal**: 外部 App 可通过 WebView 或 iframe 加载 `/privacy-policy/embed` 查看纯内容模式的隐私协议

**Independent Test**: 在 iframe 中加载 `/privacy-policy/embed`，验证纯内容展示、无 Header/Footer、无跨域错误

- [x] T007 [P] [US3] Modify `src/components/layout/ClientLayout.tsx` to conditionally hide Header and Footer when pathname starts with `/privacy-policy/embed`. Use `usePathname()` hook to detect embed routes. Keep Age Verification and Cookie Consent behavior unchanged for embed routes (consider also hiding these for embed)
- [x] T008 [P] [US3] Create or modify `src/middleware.ts` to set response headers for `/privacy-policy/embed` route: remove `X-Frame-Options`, add `Content-Security-Policy: frame-ancestors *`. Other routes should retain default security headers
- [x] T009 [US3] Create embed version page in `src/app/privacy-policy/embed/page.tsx` with: metadata (title: "Privacy Policy | Aura", robots: "noindex, nofollow" per contracts/routes.md), import `privacyPolicyData` from config, render only `PrivacyPolicyContent` component (no TOC, no page-level hero/header). Use minimal wrapper with semantic HTML (`<main>`, `<article>`)

**Checkpoint**: US3 complete — embed version accessible in iframe/WebView without layout chrome

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 构建验证、无障碍检查和跨版本一致性确认

- [x] T010 Run `tsc --noEmit` to verify type safety across all new files
- [x] T011 Run `next build` to verify SSG generation for both `/privacy-policy` and `/privacy-policy/embed`
- [x] T012 Run quickstart.md validation checklist: verify both pages render correctly, iframe embed works, mobile viewport (320px) readable, content sync between versions

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup (T001, T002) — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Foundational (T003)
- **US2 (Phase 4)**: Depends on US1 (T004) — TOC integrates into website page
- **US3 (Phase 5)**: Depends on Foundational (T003) — independent of US1/US2
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (P1)**: Can start after Foundational — No dependencies on other stories
- **US2 (P2)**: Depends on US1 — TOC component integrates into website page created in US1
- **US3 (P1)**: Can start after Foundational — Independent of US1/US2 (parallel opportunity)
- **US4 (P1)**: Cross-cutting — built into all component implementations via Tailwind mobile-first

### Parallel Opportunities

- **T007 + T008**: ClientLayout modification and middleware creation work on different files, can run in parallel
- **US1 (Phase 3) + US3 (Phase 5)**: After Foundational completes, both can start in parallel since they work on different page files
- **T005 (TOC component)**: Can start in parallel with US3 tasks since it's a new file

---

## Parallel Example: After Foundational

```bash
# After Phase 2 completes, launch US1 and US3 in parallel:

# Stream 1 - Website version:
Task: T004 [US1] Create website page in src/app/privacy-policy/page.tsx

# Stream 2 - Embed version (all can run in parallel):
Task: T007 [US3] Modify ClientLayout in src/components/layout/ClientLayout.tsx
Task: T008 [US3] Create middleware in src/middleware.ts
# Then after T007+T008:
Task: T009 [US3] Create embed page in src/app/privacy-policy/embed/page.tsx

# Stream 3 - TOC (can start alongside):
Task: T005 [US2] Create TableOfContents in src/components/privacy-policy/TableOfContents.tsx
# Then after T004 completes:
Task: T006 [US2] Integrate TOC into website page
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001–T002)
2. Complete Phase 2: Foundational (T003)
3. Complete Phase 3: User Story 1 (T004)
4. **STOP and VALIDATE**: Visit `/privacy-policy`, verify full layout and content
5. Deploy/demo if ready — website has a functional privacy policy page

### Incremental Delivery

1. Setup + Foundational → Shared infrastructure ready
2. Add US1 → Test website version → Deploy (MVP!)
3. Add US2 → Test TOC navigation → Deploy
4. Add US3 → Test iframe embed → Deploy
5. Each story adds value without breaking previous stories

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- US4 (mobile responsive) is built into every component via Tailwind mobile-first approach
- All content comes from single source: `src/config/privacy-policy.ts`
- Policy content must be written in English (FR-012)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently

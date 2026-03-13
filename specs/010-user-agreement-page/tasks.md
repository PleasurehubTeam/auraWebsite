# Tasks: 用户协议页面

**Input**: Design documents from `/specs/010-user-agreement-page/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

**Tests**: Not requested — no test tasks included.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create shared legal document types and update existing type re-exports

- [x] T001 Create shared legal document types (LegalSection, LegalSubsection, LegalPageData, re-export PolicyMetadata) in `src/types/legal.ts`
- [x] T002 Update `src/types/privacy-policy.ts` to re-export types from `src/types/legal.ts` as aliases (PrivacyPolicySection = LegalSection, PrivacyPolicyData = LegalPageData, PolicySubsection = LegalSubsection) for backward compatibility
- [x] T003 Update `src/types/index.ts` to export types from `src/types/legal.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Extract shared legal page components from privacy-policy, create user agreement config data, update CORS middleware

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Create `src/components/legal/LegalPageContent.tsx` — extract and generalize from `src/components/privacy-policy/PrivacyPolicyContent.tsx`, accepting `LegalSection[]` and `PolicyMetadata` props
- [x] T005 [P] Create `src/components/legal/LegalTableOfContents.tsx` — extract and generalize from `src/components/privacy-policy/TableOfContents.tsx`, accepting `LegalSection[]` props
- [x] T006 [P] Move `src/components/privacy-policy/ScrollToTopButton.tsx` to `src/components/legal/ScrollToTopButton.tsx` and update imports
- [x] T007 Create barrel export `src/components/legal/index.ts` exporting LegalPageContent, LegalTableOfContents, ScrollToTopButton
- [x] T008 Refactor `src/app/privacy-policy/page.tsx` to import from `src/components/legal/` instead of `src/components/privacy-policy/`
- [x] T009 [P] Refactor `src/app/privacy-policy/embed/page.tsx` to import from `src/components/legal/` instead of `src/components/privacy-policy/`
- [x] T010 Remove old `src/components/privacy-policy/PrivacyPolicyContent.tsx`, `src/components/privacy-policy/TableOfContents.tsx`, and `src/components/privacy-policy/ScrollToTopButton.tsx` (verify no other imports remain)
- [x] T011 Create user agreement content config in `src/config/user-agreement.ts` — define `userAgreementData: LegalPageData` with all 11 sections (Introduction, Description of Service, Account Registration and Security, User Conduct and Community Standards, User Content and Intellectual Property, Third-Party Links and Services, Termination and Account Deletion, Disclaimers and Limitation of Liability, Dispute Resolution and Governing Law, Changes to This Agreement, Contact Us) with English content appropriate for a social/community app
- [x] T012 Update `src/proxy.ts` — extend middleware to also match `/user-agreement/embed` paths with same `frame-ancestors *` CORS headers, update matcher to cover both `/privacy-policy/embed/:path*` and `/user-agreement/embed/:path*`

**Checkpoint**: Foundation ready — shared components extracted, privacy policy still works, user agreement config data ready

---

## Phase 3: User Story 1 — 官网查看用户协议 (Priority: P1) 🎯 MVP

**Goal**: Users can navigate to `/user-agreement` and read the full user agreement with header, footer, navigation, and table of contents

**Independent Test**: Navigate to `/user-agreement`, verify all 11 sections render with correct headings, metadata dates display, page has SEO meta tags, TOC links work

### Implementation for User Story 1

- [x] T013 [US1] Create `src/app/user-agreement/page.tsx` — server component with Metadata export (title, description, openGraph, twitter), import `userAgreementData` from config, render h1 + LegalTableOfContents + LegalPageContent + ScrollToTopButton, matching layout structure of `src/app/privacy-policy/page.tsx`

**Checkpoint**: User Story 1 complete — official user agreement page is functional with TOC navigation

---

## Phase 4: User Story 2 — 章节内导航 (Priority: P2)

**Goal**: Users can click TOC links to smoothly scroll to specific sections

**Independent Test**: On `/user-agreement`, click each TOC link and verify smooth scroll to the corresponding section with URL hash update

### Implementation for User Story 2

- [x] T014 [US2] Verify LegalTableOfContents smooth scroll behavior works on `/user-agreement` — ensure all 11 section anchors are reachable via TOC clicks, `scroll-mt-24` on sections provides correct offset (no implementation needed if T004/T005/T013 are correct, mark complete after manual verification)

**Checkpoint**: User Story 2 complete — section navigation works independently

---

## Phase 5: User Story 3 — 外部 App 嵌入查看协议 (Priority: P1)

**Goal**: External apps can embed `/user-agreement/embed` in WebView/iframe, showing only title and content without site chrome

**Independent Test**: Load `/user-agreement/embed` in an iframe, verify no header/footer/navigation visible, content renders cleanly, CORS allows embedding from any origin

### Implementation for User Story 3

- [x] T015 [P] [US3] Create `src/app/user-agreement/embed/layout.tsx` — copy structure from `src/app/privacy-policy/embed/layout.tsx`, CSS hides header/footer/age-gate/noscript
- [x] T016 [US3] Create `src/app/user-agreement/embed/page.tsx` — server component with noindex/nofollow Metadata, import `userAgreementData` from config, render h1 + LegalPageContent + ScrollToTopButton (no TOC), matching structure of `src/app/privacy-policy/embed/page.tsx`

**Checkpoint**: User Story 3 complete — embed page works in iframe/WebView

---

## Phase 6: User Story 4 — 移动端查看协议 (Priority: P1)

**Goal**: Both versions are fully readable on mobile and tablet devices with no horizontal scrolling

**Independent Test**: View `/user-agreement` and `/user-agreement/embed` at 320px, 768px, and 1280px viewports — verify text size, paragraph width, no overflow

### Implementation for User Story 4

- [x] T017 [US4] Verify responsive behavior on both `/user-agreement` and `/user-agreement/embed` at mobile (320px), tablet (768px), and desktop (1280px) viewports — confirm no horizontal scroll, readable text, comfortable paragraph widths (no implementation needed if shared components handle responsiveness correctly, mark complete after manual verification)

**Checkpoint**: User Story 4 complete — responsive design verified across viewports

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Build validation, cleanup, and final checks

- [x] T018 Run `pnpm tsc --noEmit` to verify no TypeScript errors across the project
- [x] T019 Run `pnpm build` to verify successful production build with new pages
- [x] T020 Verify footer "User Agreement" links in both Company and Support sections navigate correctly to `/user-agreement`
- [x] T021 Verify privacy policy pages (`/privacy-policy` and `/privacy-policy/embed`) still work correctly after component extraction refactor
- [x] T022 Clean up empty `src/components/privacy-policy/` directory if all components have been moved to `src/components/legal/`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Stories (Phase 3–6)**: All depend on Foundational phase completion
  - US1 (Phase 3): Can start after Phase 2
  - US2 (Phase 4): Depends on US1 (TOC is part of the main page)
  - US3 (Phase 5): Can start after Phase 2, independent of US1
  - US4 (Phase 6): Depends on US1 and US3 (verifies both versions)
- **Polish (Phase 7)**: Depends on all user stories being complete

### Within Each Phase

- Tasks marked [P] within the same phase can run in parallel
- Non-[P] tasks must run sequentially in listed order

### Parallel Opportunities

- T004, T005, T006 can run in parallel (different component files)
- T008, T009 can run in parallel (different page files)
- T013 and T015 can run in parallel after Phase 2 (US1 and US3 are independent)
- T018, T019 should run sequentially (build depends on type check passing)

---

## Parallel Example: Foundational Phase

```bash
# Launch shared component extraction in parallel:
Task: "Create LegalPageContent.tsx in src/components/legal/LegalPageContent.tsx"
Task: "Create LegalTableOfContents.tsx in src/components/legal/LegalTableOfContents.tsx"
Task: "Move ScrollToTopButton.tsx to src/components/legal/ScrollToTopButton.tsx"
```

## Parallel Example: User Stories 1 & 3

```bash
# After Phase 2, launch US1 and US3 in parallel:
Task: "Create user-agreement/page.tsx (US1)"
Task: "Create user-agreement/embed/layout.tsx (US3)"
Task: "Create user-agreement/embed/page.tsx (US3)"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (types)
2. Complete Phase 2: Foundational (shared components, config, proxy)
3. Complete Phase 3: User Story 1 (main page)
4. **STOP and VALIDATE**: Navigate to `/user-agreement`, verify content renders correctly
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready, privacy policy still works
2. Add User Story 1 → Main page live → Deploy/Demo (MVP!)
3. Add User Story 3 → Embed page live → Deploy/Demo
4. Verify US2 (TOC) + US4 (responsive) → Full feature complete
5. Polish → Production ready

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- US2 and US4 are verification-only phases — their functionality is built into the shared components created in Phase 2 and used in US1/US3
- The biggest risk is Phase 2 (foundational refactor) — ensure privacy policy pages still work after component extraction
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently

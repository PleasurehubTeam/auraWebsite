# Tasks: 内容管理页面 (Content Management Page)

**Input**: Design documents from `/specs/008-content-management/`
**Prerequisites**: plan.md, spec.md, data-model.md

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US0, US1, US2)

---

## Phase 1: Setup (基础设施)

**Purpose**: 创建项目结构、类型定义、配置和核心逻辑

- [ ] T001 [P] 创建管理页面类型定义文件 `src/types/admin.ts` — 包含 LoginFormData、UseAdminAuthReturn、ArticleFormData（4 字段：image/category/title/content）、ArticleFormErrors、FormMode、ArticleFilters、PaginationState、ArticleFormModalState、DeleteDialogState、UseArticleManagerReturn
- [ ] T002 [P] 创建管理页面配置文件 `src/config/admin.ts` — 包含 ADMIN_CREDENTIALS（admin/aura1509）、AUTH_STORAGE_KEY、ADMIN_PAGE_SIZE、ALLOWED_IMAGE_EXTENSIONS、IMAGE_ACCEPT
- [ ] T003 [P] 创建页面路由 `src/app/admin/content/page.tsx` — 基础页面骨架（"use client"），设置页面标题和最小宽度容器
- [ ] T004 创建登录状态管理 hook `src/hooks/useAdminAuth.ts` — 从 sessionStorage 读取登录状态，实现 login（校验固定凭据）和 logout 方法，登录成功写入 sessionStorage
- [ ] T005 创建文章 CRUD 状态管理 hook `src/hooks/useArticleManager.ts` — 从 newsArticles 初始化 state，实现搜索/筛选/分页逻辑，CRUD 方法（addArticle 接收 4 字段自动生成衍生字段、updateArticle、deleteArticle），slug 自动生成

**Checkpoint**: 类型系统、配置和核心状态逻辑就绪

---

## Phase 2: User Story 0 - 管理员登录校验 (Priority: P0)

**Goal**: 未授权用户无法看到管理页面内容，需输入正确凭据方可进入

**Independent Test**: 访问 `/admin/content`，首先看到登录表单。输入错误凭据显示错误，输入 admin/aura1509 后进入管理页面

### Implementation for User Story 0

- [ ] T006 [US0] 创建登录校验组件 `src/components/admin/AdminLoginGate.tsx` — 全屏居中登录表单（账号输入框 + 密码输入框 + 登录按钮），错误提示「账号或密码错误」，使用 useAdminAuth hook
- [ ] T007 [US0] 在页面 `src/app/admin/content/page.tsx` 中接入 AdminLoginGate — 未登录时显示登录组件，已登录时显示管理页面内容

**Checkpoint**: 登录校验功能可用，未授权无法看到管理页面

---

## Phase 3: User Story 1 - 浏览文章列表与搜索筛选 (Priority: P1) 🎯 MVP

**Goal**: 运营人员可以查看所有文章的表格列表，并通过搜索和标签筛选快速找到目标文章

**Independent Test**: 登录后访问 `/admin/content`，验证表格展示所有文章，搜索和筛选功能正常工作

### Implementation for User Story 1

- [ ] T008 [P] [US1] 创建搜索栏组件 `src/components/admin/ArticleSearchBar.tsx` — 包含搜索输入框（实时过滤）、标签下拉筛选（all + 3 个分类）、文章总数统计显示、「新增文章」按钮
- [ ] T009 [P] [US1] 创建文章表格组件 `src/components/admin/ArticleTable.tsx` — 列：序号、标题、标签（Badge 样式）、图片路径、操作按钮（编辑/预览/删除）；空状态提示
- [ ] T010 [P] [US1] 创建分页组件 `src/components/admin/ArticlePagination.tsx` — 上一页/下一页按钮、页码显示、总页数、当前页高亮
- [ ] T011 [US1] 在页面 `src/app/admin/content/page.tsx` 中组装 ArticleSearchBar + ArticleTable + ArticlePagination，接入 useArticleManager hook，完成列表展示、搜索筛选和分页的完整交互

**Checkpoint**: 文章列表页可用，搜索和筛选功能正常

---

## Phase 4: User Story 2 & 3 - 新增与编辑文章 (Priority: P1)

**Goal**: 运营人员可以通过精简的 4 字段弹窗表单新增和编辑文章

**Independent Test**: 点击「新增文章」填写 4 个字段保存，验证新文章出现在列表；点击「编辑」修改后保存，验证列表更新

### Implementation for User Story 2 & 3

- [ ] T012 [US2/US3] 创建文章表单模态框组件 `src/components/admin/ArticleFormModal.tsx` — 基于 Radix UI Dialog 实现，包含以下功能：
  - 支持 create 和 edit 两种模式（FormMode）
  - 4 个表单字段：image（图片路径输入，accept 限制 webp/png/jpg）、category（标签下拉三选一）、title（文本输入）、content（textarea 多行输入）
  - 表单验证：4 个必填字段校验 + 图片格式校验
  - 验证错误信息的行内展示
  - 保存和取消按钮
  - edit 模式下自动预填充文章的 image/category/title/content 字段
- [ ] T013 [US2/US3] 在页面中接入 ArticleFormModal 组件 — 将 formModal state 和 CRUD 方法传入组件，连接 ArticleSearchBar 的「新增文章」按钮和 ArticleTable 的「编辑」按钮

**Checkpoint**: 新增和编辑文章功能完整可用

---

## Phase 5: User Story 4 - 删除文章 (Priority: P2)

**Goal**: 运营人员可以通过确认对话框安全删除文章

**Independent Test**: 点击「删除」按钮，确认对话框出现，点击确认后验证文章从列表消失

### Implementation for User Story 4

- [ ] T014 [US4] 创建删除确认对话框组件 `src/components/admin/ArticleDeleteDialog.tsx` — 基于 Radix UI AlertDialog 实现，显示即将删除的文章标题，包含「确认删除」和「取消」按钮
- [ ] T015 [US4] 在页面中接入 ArticleDeleteDialog 组件 — 连接 ArticleTable 的「删除」按钮和 deleteDialog state

**Checkpoint**: 删除文章功能完整，含确认机制

---

## Phase 6: User Story 5 - 预览文章 (Priority: P2)

**Goal**: 运营人员可以在新标签页中预览文章的前台展示效果

**Independent Test**: 点击「预览」按钮，验证新标签页打开对应 `/news/{slug}` 页面

### Implementation for User Story 5

- [ ] T016 [US5] 在 ArticleTable 组件的「预览」按钮中实现 `window.open('/news/${slug}', '_blank')` 逻辑（已在 T009 中预留按钮，此处补充具体实现和事件处理）

**Checkpoint**: 预览功能可用

---

## Phase 7: Polish & 收尾

**Purpose**: 样式打磨、交互优化和类型检查

- [ ] T017 [P] 样式打磨 — 确保登录表单、文章表格、弹窗、按钮在桌面端 (1280px+) 的视觉效果美观对齐
- [ ] T018 [P] 操作提示 — 新增/编辑/删除操作成功后显示简短的操作成功提示
- [ ] T019 运行 `tsc --noEmit` 和 ESLint 检查，确保无类型错误和代码规范问题
- [ ] T020 运行 `next build` 确保构建成功

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: 无依赖。T001/T002/T003 可并行，T004 依赖 T001+T002，T005 依赖 T001+T002
- **Phase 2 (US0 登录)**: 依赖 Phase 1（T004）完成
- **Phase 3 (US1 列表)**: 依赖 Phase 1（T005）和 Phase 2 完成。T008/T009/T010 可并行，T011 依赖全部
- **Phase 4 (US2/US3 新增/编辑)**: 依赖 Phase 3 完成
- **Phase 5 (US4 删除)**: 依赖 Phase 3 完成。可与 Phase 4 并行
- **Phase 6 (US5 预览)**: 依赖 Phase 3 完成（T009）。可与 Phase 4/5 并行
- **Phase 7 (Polish)**: 依赖 Phase 2-6 全部完成

### Parallel Opportunities

```
Phase 1: T001 ─┬─ T002 ─┬─ T003   (parallel)
               └────────┤
                T004 ◄──┤          (depends on T001+T002)
                T005 ◄──┘          (depends on T001+T002)

Phase 2: T006 → T007              (sequential)

Phase 3: T008 ─┬─ T009 ─┬─ T010  (parallel)
               └────────└─ T011  (depends on all)

Phase 4-6: T012/T013 ─┬─ T014/T015 ─┬─ T016  (can be parallel after Phase 3)
                      └─────────────┘

Phase 7: T017 ─┬─ T018  (parallel)
              T019 → T020  (sequential)
```

## Implementation Strategy

### MVP First (Phase 1 + Phase 2 + Phase 3)

1. 完成类型、配置和 hooks → 核心逻辑就绪
2. 完成登录校验 → 页面受保护
3. 完成文章列表表格 + 搜索 + 分页 → 可展示数据
4. **STOP and VALIDATE**: 验证登录和列表功能独立可用

### Incremental Delivery

1. Phase 1+2 → 登录校验 MVP
2. - Phase 3 → 文章列表
3. - Phase 4 → 完整 CRUD（新增/编辑，4 字段表单）
4. - Phase 5 → 删除功能
5. - Phase 6 → 预览功能
6. - Phase 7 → 样式打磨和质量检查

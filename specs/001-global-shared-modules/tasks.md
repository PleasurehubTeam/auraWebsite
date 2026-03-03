# 任务清单：全局公共模块

**输入**: 设计文档来自 `/specs/001-global-shared-modules/`
**前置条件**: plan.md (必需), spec.md (必需), research.md, data-model.md, quickstart.md

**测试**: 规格中未明确要求测试，本清单不包含测试任务。

**组织方式**: 任务按用户故事分组，确保每个故事可独立实施和测试。

## 格式: `[ID] [P?] [Story] 描述`

- **[P]**: 可并行执行（不同文件，无依赖）
- **[Story]**: 所属用户故事（US1, US2, US3 等）
- 描述中包含精确文件路径

---

## Phase 1: 项目初始化

**目标**: 创建 Next.js 项目结构，安装依赖，配置开发工具链

- [x] T001 使用 `create-next-app` 初始化 Next.js 14+ 项目（App Router、TypeScript、Tailwind CSS、ESLint），项目根目录即仓库根目录，源码放在 `src/` 下
- [x] T002 安装项目依赖：framer-motion, @radix-ui/react-dialog, lucide-react, next-intl；配置 `pnpm` 为包管理器
- [x] T003 [P] 创建 `.nvmrc` 文件指定 Node 20 LTS 版本
- [x] T004 [P] 配置 Prettier（`.prettierrc`）和 ESLint（`eslint.config.mjs`），确保与 Tailwind CSS 插件兼容
- [x] T005 [P] 配置 Husky + lint-staged 实现 pre-commit 钩子（运行 ESLint + Prettier）

**检查点**: 运行 `pnpm dev` 可以启动开发服务器，访问 `http://localhost:3000` 看到默认页面

---

## Phase 2: 基础设施（阻塞性前置任务）

**目标**: 建立共享类型、配置数据层、工具函数和页面路由骨架

**⚠️ 关键**: 所有用户故事的实施必须等待本阶段完成

- [x] T006 定义共享 TypeScript 类型（NavigationItem, FooterLinkGroup, FooterLink, SocialMediaLink, DownloadConfig, SiteConfig）在 `src/types/index.ts`
- [x] T007 [P] 创建全站配置常量（brandName, copyrightYearStart, ageVerificationRedirectUrl, privacyPolicyUrl）在 `src/config/site.ts`
- [x] T008 [P] 创建导航项配置数据（5 个导航链接：Home, APP, News, About, Explore）在 `src/config/navigation.ts`
- [x] T009 [P] 创建 Footer 链接组配置数据（Company/Support/Contact 三组 + 社交媒体链接数组）在 `src/config/footer.ts`
- [x] T010 [P] 创建下载配置数据（App Store URL, Google Play URL, 标题, 描述文案）在 `src/config/download.ts`
- [x] T011 [P] 实现 localStorage 安全封装工具（带 SSR typeof window 检查 + 泛型读写）在 `src/lib/storage.ts`
- [x] T012 创建 5 个占位页面路由：`src/app/page.tsx`（Home）、`src/app/app/page.tsx`（APP）、`src/app/news/page.tsx`（News）、`src/app/about/page.tsx`（About）、`src/app/explore/page.tsx`（Explore），每个页面仅包含页面标题文字
- [x] T013 创建通用 Button 组件（React 封装，支持 variant/size/asChild props）在 `src/components/ui/Button.tsx`
- [x] T014 配置 next-intl 基础路由结构（仅英文语言包），创建 `src/i18n/` 目录和 `messages/en.json`

**检查点**: 所有配置文件可导入、类型检查通过（`pnpm tsc --noEmit`）、5 个占位页面可访问

---

## Phase 3: 用户故事 1 — 站点导航 (P1) 🎯 MVP

**目标**: 访客可在所有页面通过顶部导航栏浏览切换，移动端使用汉堡菜单

**独立测试**: 在任意页面看到 Logo + 5 个导航链接，当前页面粉色高亮，点击跳转正确，移动端汉堡菜单正常展开/收起

### 实现

- [x] T015 [US1] 实现 Header 组件：品牌 Logo（左侧，链接到首页）、5 个桌面端导航链接（右侧，当前路由粉色高亮）、深色半透明背景、sticky 定位、预留 i18n 语言切换位置，在 `src/components/layout/Header.tsx`
- [x] T016 [US1] 实现 MobileNav 组件：汉堡菜单图标触发、Framer Motion AnimatePresence 侧边抽屉滑入动画、Radix Dialog 焦点陷阱和 ESC 关闭、完整导航链接列表、遮罩层背景，在 `src/components/layout/MobileNav.tsx`
- [x] T017 [US1] 在根布局 `src/app/layout.tsx` 中引入 Header 组件，确保所有页面都包含导航栏；设置 `<html lang="en">`、全局字体、`<body>` 结构
- [x] T018 [US1] 响应式适配：Header 在 768px 以下隐藏桌面导航显示汉堡图标，触摸目标 ≥ 44x44 px，使用语义化 `<header>` 和 `<nav>` 标签

**检查点**: 在各页面间点击导航切换，当前页面高亮正确；移动端汉堡菜单展开/收起顺畅，ESC 可关闭

---

## Phase 4: 用户故事 2 — 应用下载转化 (P1) 🎯 MVP

**目标**: 访客在 Download CTA 区域看到商店下载按钮，点击可跳转到正确的应用商店

**独立测试**: 在包含 CTA 的页面看到粉色渐变区域、标题、描述、品牌图标和两个商店按钮，按钮链接正确

### 实现

- [x] T019 [P] [US2] 创建社交媒体品牌 SVG 图标组件（Instagram、X、Facebook、YouTube）在 `src/components/icons/SocialIcons.tsx`，以及 App Store / Google Play 徽章 SVG 在 `src/components/icons/StoreBadges.tsx`
- [x] T020 [US2] 实现 DownloadCTA 组件：粉色渐变至深色背景、居中标题 + 描述文案 + Aura 品牌图标（粉色心形）+ App Store 和 Google Play 按钮、数据从 `src/config/download.ts` 读取、移动端唤起原生商店（使用标准 HTTPS 深链接），在 `src/components/layout/DownloadCTA.tsx`
- [x] T021 [US2] 在首页 `src/app/page.tsx` 底部引入 DownloadCTA 组件验证显示效果
- [x] T022 [US2] 响应式适配：DownloadCTA 在移动端按钮垂直堆叠、文案居中、按钮尺寸满足 44x44 px 触摸目标

**检查点**: 首页底部显示完整 Download CTA 区域，点击按钮跳转到正确商店页面，修改 `src/config/download.ts` 中的 URL 后刷新页面立即生效

---

## Phase 5: 用户故事 3 — 底部信息访问 (P2)

**目标**: 所有页面底部显示 Footer，包含三组链接、社交媒体图标和版权信息

**独立测试**: 滚动到任意页面底部，看到三列链接组、Follow Us 社交图标（新标签页打开）、版权文字；移动端单列堆叠

### 实现

- [x] T023 [US3] 实现 Footer 组件：深色/黑色背景、三列链接组（Company/Support/Contact）、"Follow Us" 社交媒体图标区域（使用 T019 的 SVG 图标，`target="_blank" rel="noopener noreferrer"`）、版权文字（动态年份范围）、数据从 `src/config/footer.ts` 和 `src/config/site.ts` 读取、使用语义化 `<footer>` 标签，在 `src/components/layout/Footer.tsx`
- [x] T024 [US3] 在根布局 `src/app/layout.tsx` 中引入 Footer 组件（置于 `{children}` 之后），确保所有页面都包含底部信息栏
- [x] T025 [US3] 响应式适配：Footer 三列布局在 768px 以下重排为单列堆叠，链接文字可读，社交图标间距适中，触摸目标满足 44x44 px

**检查点**: 所有 5 个页面底部显示 Footer，社交图标新标签页打开正确 URL，版权年份正确

---

## Phase 6: 用户故事 4 — 年龄验证门禁 (P2)

**目标**: 首次访客在看到任何页面内容之前遇到年龄验证全屏遮罩，确认后记住选择

**独立测试**: 清除 localStorage 后刷新任意页面，全屏遮罩出现；确认后遮罩消失且再次刷新不出现；拒绝后重定向到外部页面

### 实现

- [x] T026 [US4] 实现 useAgeVerification hook：读取/写入 localStorage `aura_age_verified` 键、提供 isVerified 状态和 verify/decline 方法、SSR 安全（使用 `src/lib/storage.ts`），在 `src/hooks/useAgeVerification.ts`
- [x] T027 [US4] 实现 AgeVerificationGate 组件：全屏遮罩（`position: fixed, inset: 0, z-index: 50`）、品牌调性的视觉设计（深色背景 + 品牌色按钮）、"Are you 18 or older?" 提问文字、确认按钮（调用 verify，关闭遮罩）和拒绝按钮（调用 decline，重定向到 `siteConfig.ageVerificationRedirectUrl`）、Framer Motion 淡入/淡出动画、阻止背景滚动（`overflow: hidden` on body）、焦点陷阱，在 `src/components/modals/AgeVerificationGate.tsx`
- [x] T028 [US4] 在根布局 `src/app/layout.tsx` 中引入 AgeVerificationGate 组件，放在 `{children}` 之前确保优先渲染；使用 `"use client"` 包装或客户端组件方式加载

**检查点**: 清除 `aura_age_verified` 后刷新页面，遮罩出现且无法滚动背景；确认后遮罩消失，再次刷新不出现；拒绝后跳转到 Google.com

---

## Phase 7: 用户故事 5 — Cookie 同意通知 (P3)

**目标**: 首次访客（年龄验证通过后）看到底部 Cookie 同意横幅，接受后消失

**独立测试**: 清除 `aura_cookie_consent` 后刷新（确保已年龄验证），底部横幅出现；点击接受后消失且再次刷新不出现

### 实现

- [x] T029 [US5] 实现 useCookieConsent hook：读取/写入 localStorage `aura_cookie_consent` 键、提供 isConsented 状态和 accept 方法、SSR 安全（使用 `src/lib/storage.ts`），在 `src/hooks/useCookieConsent.ts`
- [x] T030 [US5] 实现 CookieConsentBanner 组件：固定在视口底部（`position: fixed, bottom: 0`）、简短隐私说明文案 + 隐私政策链接 + "Accept" 按钮、非侵入式设计（不阻止页面滚动和导航）、Framer Motion 从底部滑入动画、z-index 低于年龄门禁，在 `src/components/modals/CookieConsentBanner.tsx`
- [x] T031 [US5] 在根布局 `src/app/layout.tsx` 中引入 CookieConsentBanner 组件，使用条件渲染 `{isAgeVerified && <CookieConsentBanner />}` 确保仅在年龄验证通过后显示

**检查点**: 年龄验证通过后，底部横幅出现；接受后横幅消失且不再出现；横幅显示期间页面可正常滚动和导航

---

## Phase 8: 收尾与跨模块优化

**目标**: 全站统一细节打磨、响应式全面验证、构建检查

- [x] T032 [P] 添加 `<noscript>` 提示信息到 `src/app/layout.tsx`，告知用户需要启用 JavaScript
- [x] T033 [P] 确保所有图片使用 `next/image` 组件，包含描述性 `alt` 属性
- [x] T034 [P] 检查所有页面的语义化 HTML 结构：`<header>`, `<nav>`, `<main>`, `<footer>` 正确嵌套，每页单一 `<h1>`
- [x] T035 在 320px / 768px / 1280px / 2560px 四个宽度下全面检查所有公共模块的响应式表现，修复任何水平溢出、重叠或文字不可读问题
- [x] T036 运行 `pnpm lint` 和 `pnpm tsc --noEmit` 确保无 lint 错误和类型错误
- [x] T037 运行 `pnpm build`（即 `next build`）确保生产构建成功，无构建错误
- [x] T038 运行 quickstart.md 中的验证清单，确认所有模块功能符合预期

---

## 依赖关系与执行顺序

### 阶段依赖

- **Phase 1（项目初始化）**: 无依赖 — 立即开始
- **Phase 2（基础设施）**: 依赖 Phase 1 — **阻塞所有用户故事**
- **Phase 3（US1 站点导航）**: 依赖 Phase 2 — 依赖 T006/T008/T013 类型和配置
- **Phase 4（US2 下载转化）**: 依赖 Phase 2 — 依赖 T006/T010/T013 类型和配置
- **Phase 5（US3 Footer）**: 依赖 Phase 2 + T019（SVG 图标来自 US2）
- **Phase 6（US4 年龄门禁）**: 依赖 Phase 2 — 依赖 T006/T007/T011
- **Phase 7（US5 Cookie 横幅）**: 依赖 Phase 2 + Phase 6（需要年龄验证状态的条件渲染）
- **Phase 8（收尾）**: 依赖所有用户故事完成

### 用户故事间依赖

- **US1（导航）** 和 **US2（下载）**: 无互相依赖，可并行
- **US3（Footer）**: 依赖 US2 的 SVG 图标组件（T019），但可提前实施 T019 解除阻塞
- **US4（年龄门禁）**: 无依赖其他故事，可与 US1/US2 并行
- **US5（Cookie 横幅）**: 依赖 US4 的 useAgeVerification hook，必须在 US4 之后

### 各故事内部执行顺序

- 配置数据/Hook → 组件实现 → 布局集成 → 响应式适配

### 并行机会

- Phase 1 中 T003/T004/T005 可并行
- Phase 2 中 T007/T008/T009/T010/T011 可并行
- Phase 3 和 Phase 4 可并行（US1 和 US2 无互相依赖）
- Phase 4 和 Phase 6 可并行（US2 和 US4 无互相依赖）
- Phase 8 中 T032/T033/T034 可并行

---

## 并行执行示例

### Phase 2 基础设施（可并行的 5 个任务）

```bash
# 以下任务修改不同文件，可同时进行：
T007: src/config/site.ts
T008: src/config/navigation.ts
T009: src/config/footer.ts
T010: src/config/download.ts
T011: src/lib/storage.ts
```

### US1 + US2 并行（Phase 2 完成后）

```bash
# 开发者 A：US1 站点导航
T015: src/components/layout/Header.tsx
T016: src/components/layout/MobileNav.tsx
T017: src/app/layout.tsx（Header 部分）
T018: 响应式适配

# 开发者 B：US2 下载转化
T019: src/components/icons/SocialIcons.tsx + StoreBadges.tsx
T020: src/components/layout/DownloadCTA.tsx
T021: src/app/page.tsx（引入 CTA）
T022: 响应式适配
```

---

## 实施策略

### MVP 优先（US1 + US2）

1. 完成 Phase 1：项目初始化
2. 完成 Phase 2：基础设施
3. 完成 Phase 3：US1 站点导航
4. 完成 Phase 4：US2 下载转化
5. **暂停并验证**：测试导航和下载功能独立可用
6. 可部署/演示

### 增量交付

1. Phase 1 + 2 → 基础就绪
2. - US1 → 可导航的网站骨架（MVP #1）
3. - US2 → 带下载转化的网站（MVP #2）
4. - US3 → 完整 Footer 信息
5. - US4 → 年龄合规门禁
6. - US5 → Cookie 合规横幅
7. - Phase 8 → 全面打磨，准备上线

---

## 备注

- [P] 任务 = 不同文件、无依赖，可并行执行
- [Story] 标签将任务映射到具体用户故事，便于追溯
- 每个用户故事可独立完成和测试
- 每个任务或逻辑分组完成后提交 commit
- 在任何检查点都可暂停验证故事的独立性

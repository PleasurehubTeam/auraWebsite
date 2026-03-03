# 研究报告：全局公共模块

**功能分支**: `001-global-shared-modules`
**日期**: 2026-02-26

## 决策记录

### R-001: Header 固定定位策略

**决策**: 桌面端使用 `position: sticky; top: 0` 固定 Header；移动端同样使用 sticky 保持一致行为。

**理由**:

- `sticky` 比 `fixed` 更适合 Next.js App Router 布局，不需要额外的 padding 补偿
- 不影响文档流，CLS 更低
- 所有现代浏览器（iOS Safari 15+、Chrome 91+）均支持

**备选方案**:

- `position: fixed` — 需要为 body 添加 padding-top 补偿，在 SSR 时可能导致 CLS 闪烁，已拒绝
- 移动端隐藏 Header（向下滚动隐藏/向上滚动显示）— 增加实现复杂度，且首次上线不需要，推迟到后续优化

### R-002: 移动端导航菜单实现方式

**决策**: 使用 Framer Motion 的 `AnimatePresence` + `motion.div` 实现侧边抽屉滑入动画，配合 Radix Dialog 原语确保无障碍性。

**理由**:

- Framer Motion 是宪法规定的首选动画方案
- Radix Dialog 提供焦点陷阱（focus trap）、ESC 关闭、aria 属性等无障碍能力
- 组合使用可同时满足动画流畅性和 a11y 要求

**备选方案**:

- 纯 CSS transition + 手写焦点管理 — 无障碍实现复杂且易出错，已拒绝
- Headless UI Dialog — 功能等价但 Radix 生态更活跃，社区方案更丰富，已拒绝

### R-003: 年龄验证模态的渲染时机

**决策**: 在根布局 `layout.tsx` 中以客户端组件渲染 AgeVerificationGate。组件在 mount 时检查 localStorage，若未验证则阻止页面内容显示。

**理由**:

- 年龄门禁必须在所有页面内容之前出现（FR-011）
- localStorage 仅在客户端可用，因此年龄门禁必须是客户端组件（`"use client"`）
- 放在 layout.tsx 中确保所有路由都受保护

**备选方案**:

- 使用 middleware 做服务端检查 — localStorage 在服务端不可用，cookie 方案增加复杂度，首次上线不需要，已拒绝
- 每个页面单独添加门禁组件 — 违反 DRY 原则且容易遗漏，已拒绝

### R-004: localStorage 封装策略

**决策**: 创建 `lib/storage.ts` 工具模块，封装 localStorage 读写操作，内置 SSR 安全检查（`typeof window !== 'undefined'`）。

**理由**:

- Next.js SSR 环境中 `window` 不存在，直接调用 localStorage 会导致构建错误
- 统一封装避免每个 hook 重复实现安全检查
- 支持泛型类型安全的读写

**备选方案**:

- 每个 hook 内部单独做 typeof window 检查 — 重复代码，已拒绝
- 使用 cookies 代替 localStorage — 增加服务端复杂度且本功能无需服务端读取这些状态，已拒绝

### R-005: 下载按钮唤起原生应用商店

**决策**: 使用标准的 App Store / Google Play 深链接 URL scheme。iOS 使用 `https://apps.apple.com/app/...`，Android 使用 `https://play.google.com/store/apps/details?id=...`。移动浏览器会自动处理跳转到原生商店。

**理由**:

- 现代移动浏览器（iOS Safari、Chrome for Android）会自动将官方商店链接重定向到原生商店应用
- 无需额外的 JavaScript 检测逻辑
- 若商店应用不可用，URL 自动降级为网页版商店

**备选方案**:

- 使用自定义 URL scheme（`itms-apps://`、`market://`）— 浏览器兼容性差，桌面端无法使用，已拒绝
- 使用第三方 smart banner 库 — 增加依赖且不在首次上线范围内，已拒绝

### R-006: Cookie 同意横幅与年龄门禁的交互顺序

**决策**: 年龄验证门禁优先级最高。Cookie 横幅仅在年龄验证通过后才渲染。实现方式为条件渲染：`{isAgeVerified && <CookieConsentBanner />}`。

**理由**:

- 年龄门禁是全屏模态，同时显示 Cookie 横幅会造成 UI 混乱
- 规格中明确要求年龄门禁在所有内容之前出现
- 条件渲染逻辑简单直观

**备选方案**:

- 使用队列系统管理多个弹窗 — 过度工程化，仅有两个弹窗不需要队列，已拒绝

### R-007: i18n 预置方案

**决策**: 安装 `next-intl` 并配置基础路由结构，但首次上线仅包含英文语言包。Header 预留语言切换按钮的 DOM 位置但不渲染。

**理由**:

- 宪法要求 i18n 从第一天起预置
- next-intl 是 Next.js App Router 生态中最成熟的 i18n 方案
- 预置路由结构避免后续添加多语言时大规模重构

**备选方案**:

- react-i18next — 更通用但与 App Router 集成不如 next-intl 原生，已拒绝
- 暂不安装，仅预留文件结构 — 无法验证 i18n 管道是否正常工作，已拒绝

### R-008: 图标方案

**决策**: 使用 `lucide-react` 作为图标库，社交媒体图标（Instagram、X、Facebook、YouTube）使用自定义 SVG 组件。

**理由**:

- lucide-react 体积小（tree-shakable）、图标丰富，适合汉堡菜单、关闭按钮等通用图标
- 社交媒体品牌图标有商标使用要求，使用官方 SVG 更合规
- 自定义 SVG 组件可以精确控制颜色和尺寸

**备选方案**:

- react-icons — 包体积大，包含过多未使用图标，已拒绝
- 全部使用自定义 SVG — 通用图标（hamburger、close）不值得手动维护，已拒绝

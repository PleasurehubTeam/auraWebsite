# Quickstart: 账号删除申请页面

**Branch**: `001-delete-account` | **Date**: 2026-03-19

## Prerequisites

- Node 20 LTS (check `.nvmrc`)
- pnpm installed globally
- Working on branch `001-delete-account`

## Development Setup

```bash
# Install dependencies (already done if working in the repo)
pnpm install

# Start dev server
pnpm dev

# Navigate to the new page
open http://localhost:3000/delete-account
```

## Files to Create/Modify

### 1. 新增配置文件

```
src/config/delete-account.ts
```

定义页面所有文案。参考 `src/config/user-agreement.ts` 的结构，但使用本特性的数据模型（见 [data-model.md](./data-model.md)）。

### 2. 新增页面组件

```
src/components/delete-account/DeleteAccountContent.tsx
```

接收配置数据作为 props，渲染页面主体内容。使用 Framer Motion 入场动画、Tailwind CSS 布局。

### 3. 新增路由页面

```
src/app/delete-account/page.tsx
```

- 导入配置文件
- 导出 `metadata: Metadata`（Next.js SEO）
- 渲染 `<main>` + `<DeleteAccountContent />`

## Key Patterns to Follow

### 参考页面

- [src/app/user-agreement/page.tsx](../../src/app/user-agreement/page.tsx) — metadata 导出模式
- [src/config/user-agreement.ts](../../src/config/user-agreement.ts) — 配置文件结构参考

### mailto 链接实现

```tsx
<a
  href={`mailto:${contact.email}`}
  className="bg-primary hover:bg-primary/90 focus:ring-primary inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
>
  {contact.email}
</a>
```

### Framer Motion 入场动画

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>
  {/* page content */}
</motion.div>
```

## Verification Commands

```bash
# Type check
pnpm tsc --noEmit

# Lint
pnpm lint

# Build (ensures SSG works)
pnpm build

# After build, verify the page was statically generated
# Should see: ○ /delete-account (in build output)
```

## Definition of Done

- [ ] `src/config/delete-account.ts` 创建，包含中文文案和 `support@realaura.ai` 邮箱
- [ ] `src/components/delete-account/DeleteAccountContent.tsx` 创建，通过 props 渲染内容
- [ ] `src/app/delete-account/page.tsx` 创建，包含 SEO metadata 和页面渲染
- [ ] `pnpm tsc --noEmit` 通过
- [ ] `pnpm lint` 通过
- [ ] `pnpm build` 通过且 `/delete-account` 显示为 SSG (○) 路由
- [ ] 移动端（320px）和桌面端（1280px）布局无错位
- [ ] 邮箱链接点击后唤起邮件客户端

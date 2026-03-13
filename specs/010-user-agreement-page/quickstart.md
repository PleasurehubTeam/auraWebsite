# Quickstart: 用户协议页面

**Branch**: `010-user-agreement-page` | **Date**: 2026-03-13

## Prerequisites

- Node.js 20 LTS (check `.nvmrc`)
- pnpm installed

## Setup

```bash
git checkout 010-user-agreement-page
pnpm install
pnpm dev
```

## Key URLs

| Page   | URL                                        | Description                        |
| ------ | ------------------------------------------ | ---------------------------------- |
| 官网版 | http://localhost:3000/user-agreement       | 完整页面（含导航、目录、页头页脚） |
| 嵌入版 | http://localhost:3000/user-agreement/embed | 纯内容模式（供 WebView/iframe）    |

## Key Files

| File                                            | Purpose                        |
| ----------------------------------------------- | ------------------------------ |
| `src/config/user-agreement.ts`                  | 用户协议内容数据（单一数据源） |
| `src/app/user-agreement/page.tsx`               | 官网版页面路由                 |
| `src/app/user-agreement/embed/page.tsx`         | 嵌入版页面路由                 |
| `src/app/user-agreement/embed/layout.tsx`       | 嵌入版布局（隐藏 chrome）      |
| `src/components/legal/LegalPageContent.tsx`     | 共享内容渲染组件               |
| `src/components/legal/LegalTableOfContents.tsx` | 共享目录导航组件               |
| `src/components/legal/ScrollToTopButton.tsx`    | 共享回到顶部按钮               |
| `src/types/legal.ts`                            | 共享法律文档类型定义           |
| `src/proxy.ts`                                  | 嵌入版 CORS middleware         |

## Verification

```bash
# Type check
pnpm tsc --noEmit

# Build
pnpm build

# Test iframe embedding
# Open browser console and run:
# document.body.innerHTML = '<iframe src="http://localhost:3000/user-agreement/embed" style="width:100%;height:600px;border:1px solid #ccc"></iframe>'
```

## Content Updates

编辑 `src/config/user-agreement.ts` 即可同时更新官网版和嵌入版内容。数据结构与 `src/config/privacy-policy.ts` 一致。

# Quickstart: 响应式内容宽度规范

**Branch**: `003-responsive-content-width` | **Date**: 2026-02-27

## Prerequisites

- Node.js 20 LTS (see `.nvmrc`)
- pnpm installed
- Project dependencies installed (`pnpm install`)

## Implementation Steps Overview

### Step 1: 添加全局溢出防护（globals.css）

在 `src/app/globals.css` 的 `@layer base` 中添加：

- 页面级 `overflow-x: hidden`
- 媒体元素 `max-width: 100%; height: auto`
- 表格 `overflow-x: auto` 容器内滚动

### Step 2: 修正不符合规范的组件

1. **ModeFunctionSection.tsx**: `max-w-5xl` → `max-w-7xl`
2. **TabSwitcher.tsx**: `max-w-[1500px]` → `max-w-7xl`

### Step 3: 标记已记录例外

在以下组件的容器 class 旁添加注释，标记为宽度规范例外：

1. **HeroSection.tsx**: `max-w-[1600px]` — Hero 区块例外
2. **DownloadCTA.tsx**: `max-w-4xl` — CTA 区块聚焦例外

### Step 4: 视觉验证

在以下视口宽度下验证所有 5 个页面：

- 375px（手机）
- 768px（平板）
- 1024px（笔记本）
- 1920px（桌面）
- 2560px（超宽屏）

验证清单：

- [ ] 内容不超过 1280px（例外组件除外）
- [ ] 背景铺满全屏
- [ ] 内容水平居中
- [ ] 无横向滚动条
- [ ] 内边距在各页面间一致
- [ ] 图片不溢出内容区域

## Development Commands

```bash
# 启动开发服务器
pnpm dev

# 类型检查
pnpm tsc --noEmit

# 代码检查
pnpm lint

# 构建验证
pnpm build
```

## Affected Files

| File                                        | Change Type | Description                |
| ------------------------------------------- | ----------- | -------------------------- |
| src/app/globals.css                         | 修改        | 添加全局溢出防护样式       |
| src/components/home/ModeFunctionSection.tsx | 修改        | max-w-5xl → max-w-7xl      |
| src/components/ui/TabSwitcher.tsx           | 修改        | max-w-[1500px] → max-w-7xl |
| src/components/home/HeroSection.tsx         | 修改        | 添加例外注释               |
| src/components/layout/DownloadCTA.tsx       | 修改        | 添加例外注释               |

# Quickstart: Explore 探索/社区页

**Feature**: 007-explore-community-page
**Date**: 2026-02-28

## Prerequisites

- Node.js 20 LTS（通过 `.nvmrc` 锁定）
- pnpm 已安装
- 已切换到 `007-explore-community-page` 分支

## Setup

```bash
# 切换分支
git checkout 007-explore-community-page

# 安装依赖（不需要新增依赖）
pnpm install

# 启动开发服务器
pnpm dev
```

## Key Files to Create/Modify

### 新建文件（按实现顺序）

| 文件                                               | 说明                                            |
| -------------------------------------------------- | ----------------------------------------------- |
| `src/types/gallery.ts`                             | MasonryPhoto 公共基础接口（About/Explore 共享） |
| `src/types/explore.ts`                             | Explore 页面类型定义                            |
| `src/config/explore.ts`                            | Explore 页面数据配置                            |
| `src/components/ui/ImagePreview.tsx`               | 公共图片预览灯箱组件                            |
| `src/components/ui/MasonryGallery.tsx`             | 公共瀑布流画廊组件                              |
| `src/components/explore/ExploreHeroBanner.tsx`     | Hero 横幅组件                                   |
| `src/components/explore/ExploreGallerySection.tsx` | 画廊区域组件                                    |

### 修改文件

| 文件                                           | 说明                         |
| ---------------------------------------------- | ---------------------------- |
| `src/app/explore/page.tsx`                     | 页面路由组件（已存在占位符） |
| `src/components/about/AboutGallerySection.tsx` | 重构使用公共组件             |

### 图片资源（已存在）

```bash
# 图片目录（已存在，无需创建）
public/images/05Explore/
├── Aura_Explore_Banner-01.webp        # Hero 背景图
└── Aura_Explore-01.webp ~ Aura_Explore-11.webp  # 画廊照片（11 张）
```

## Verification

```bash
# 类型检查
pnpm tsc --noEmit

# Lint 检查
pnpm lint

# 构建验证
pnpm build

# 启动后访问
open http://localhost:3000/explore
```

## Key Patterns Reference

| 模式              | 参考文件                                       |
| ----------------- | ---------------------------------------------- |
| 页面组合模式      | `src/app/about/page.tsx`                       |
| Hero 横幅         | `src/components/about/AboutHeroBanner.tsx`     |
| 画廊+预览         | `src/components/about/AboutGallerySection.tsx` |
| ScrollReveal 动画 | `src/components/ui/ScrollReveal.tsx`           |
| 数据配置结构      | `src/config/about.ts`                          |
| 类型定义          | `src/types/about.ts`                           |

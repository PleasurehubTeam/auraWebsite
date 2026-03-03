# Quickstart: APP 应用详情页

**Feature**: 004-app-detail-page | **Date**: 2026-02-27

## Prerequisites

- Node.js 20 LTS（通过 `.nvmrc` 固定）
- pnpm（项目包管理器）
- 已安装项目依赖：`pnpm install`

## Development

```bash
# 切换到功能分支
git checkout 004-app-detail-page

# 启动开发服务器
pnpm dev

# 访问 APP 详情页
open http://localhost:3000/app
```

## Key Files to Create/Modify

### New Files

| File                                       | Purpose                                               |
| ------------------------------------------ | ----------------------------------------------------- |
| `src/types/app.ts`                         | APP 页面类型定义（MockupItem, FeatureSectionData 等） |
| `src/config/app.ts`                        | APP 页面内容数据（hero, features, bottomCTA）         |
| `src/components/app/MockupCarousel.tsx`    | 无缝循环 Mockup 轮播组件                              |
| `src/components/app/AppHeroSection.tsx`    | 首屏 Hero（渐变背景 + 轮播 + 下载按钮）               |
| `src/components/app/AppFeatureSection.tsx` | 单个图文交替功能模块                                  |
| `src/components/app/AppFeatureList.tsx`    | 功能模块列表容器                                      |
| `src/components/app/AppBottomCTA.tsx`      | 底部深色渐变转化区                                    |

### Modified Files

| File                                 | Change                                 |
| ------------------------------------ | -------------------------------------- |
| `src/app/app/page.tsx`               | 从 stub 替换为完整页面组合             |
| `src/components/ui/ScrollReveal.tsx` | 新增 `direction` prop（left/right/up） |

## Quality Checks

```bash
# TypeScript 类型检查
pnpm type-check

# ESLint 检查
pnpm lint

# 构建验证
pnpm build
```

## Reused Components Reference

| Component          | Import Path                          | Usage                         |
| ------------------ | ------------------------------------ | ----------------------------- |
| GradientBackground | `@/components/ui/GradientBackground` | Hero 区域渐变背景             |
| StoreBadgeLink     | `@/components/icons/StoreBadges`     | 下载按钮（Hero + Bottom CTA） |
| ScrollReveal       | `@/components/ui/ScrollReveal`       | 功能模块左右交替滑入动画      |
| downloadConfig     | `@/config/download`                  | 下载 URL 配置                 |

## Image Assets

所有素材位于 `public/images/app/`：

- `aura-app-banner-01.png` ~ `aura-app-banner-07.png`

素材路径在 `src/config/app.ts` 中配置，组件通过 props 接收。

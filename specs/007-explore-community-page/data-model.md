# Data Model: Explore 探索/社区页

**Feature**: 007-explore-community-page
**Date**: 2026-02-28

## Entities

### ExploreHeroData

Hero 横幅区域的配置数据。

| 字段            | 类型   | 必填 | 说明                                                                   |
| --------------- | ------ | ---- | ---------------------------------------------------------------------- |
| title           | string | ✅   | 标题文字，如 "Community Story"                                         |
| subtitle        | string | ✅   | 副标题，如 "Connect, share, and explore in a space free from judgment" |
| description     | string | ✅   | 介绍段落文字，描述 Aura 社区价值观                                     |
| backgroundImage | string | ✅   | 背景图路径，如 "/images/explore/aura-explore-banner-01.webp"           |
| backgroundAlt   | string | ✅   | 背景图替代文字                                                         |
| fallbackColor   | string | ✅   | 图片加载前的兜底背景色                                                 |

**验证规则**: 所有字段非空字符串；backgroundImage 路径必须以 "/" 开头

### ExploreGalleryPhoto

画廊中单张照片的数据。复用并扩展 About 页的 GalleryPhoto 接口。

| 字段          | 类型               | 必填 | 说明                                     |
| ------------- | ------------------ | ---- | ---------------------------------------- |
| id            | string             | ✅   | 唯一标识符                               |
| title         | string             | ✅   | 说明文字，固定值 "My Aura stories"       |
| featuredImage | string             | ✅   | 图片路径                                 |
| imageAlt      | string             | ✅   | 图片替代文字                             |
| cardSize      | "large" \| "small" | ✅   | 展示尺寸：large=精选大图，small=标准尺寸 |
| order         | number             | ❌   | 可选排序权重，数字越小越靠前             |

**验证规则**: id 在画廊内唯一；featuredImage 路径以 "/" 开头；cardSize 仅允许 "large" 或 "small"

**与 About 页 GalleryPhoto 的差异**: 移除 `category` 字段（Explore 无分类筛选），新增可选 `order` 字段

### ExplorePageData

Explore 页面完整数据结构，聚合所有子实体。

| 字段          | 类型                  | 必填 | 说明                 |
| ------------- | --------------------- | ---- | -------------------- |
| hero          | ExploreHeroData       | ✅   | Hero 横幅配置        |
| galleryPhotos | ExploreGalleryPhoto[] | ✅   | 画廊照片列表         |
| emptyState    | { message: string }   | ✅   | 照片为空时的提示文字 |

### ExplorePageMetadata

SEO 和 Open Graph 元数据（在 page.tsx 中作为 Next.js Metadata 导出）。

| 字段                  | 类型     | 必填 | 说明                                          |
| --------------------- | -------- | ---- | --------------------------------------------- |
| title                 | string   | ✅   | 页面标题，如 "Explore - Aura Community Story" |
| description           | string   | ✅   | Meta 描述                                     |
| openGraph.title       | string   | ✅   | OG 标题                                       |
| openGraph.description | string   | ✅   | OG 描述                                       |
| openGraph.images      | string[] | ✅   | OG 分享图                                     |

## Shared Component Interfaces (新增公共组件)

### MasonryGalleryProps

抽离自 AboutGallerySection 的瀑布流画廊组件接口。

| Prop          | 类型                               | 必填 | 说明                       |
| ------------- | ---------------------------------- | ---- | -------------------------- |
| photos        | MasonryPhoto[]                     | ✅   | 照片数据列表               |
| emptyMessage  | string                             | ✅   | 照片为空时的提示文字       |
| onPhotoClick  | (photo: MasonryPhoto) => void      | ❌   | 照片点击回调，用于触发预览 |
| renderCaption | (photo: MasonryPhoto) => ReactNode | ❌   | 自定义说明文字渲染         |
| className     | string                             | ❌   | 额外 CSS 类名              |

### MasonryPhoto (Base Interface)

公共画廊照片基础接口，About 和 Explore 的照片类型均扩展此接口。

| 字段          | 类型               | 必填 | 说明         |
| ------------- | ------------------ | ---- | ------------ |
| id            | string             | ✅   | 唯一标识符   |
| title         | string             | ✅   | 说明文字     |
| featuredImage | string             | ✅   | 图片路径     |
| imageAlt      | string             | ✅   | 图片替代文字 |
| cardSize      | "large" \| "small" | ✅   | 展示尺寸     |

### ImagePreviewProps

抽离自 AboutGallerySection 的全屏预览组件接口。

| Prop         | 类型                          | 必填 | 说明                          |
| ------------ | ----------------------------- | ---- | ----------------------------- |
| photos       | MasonryPhoto[]                | ✅   | 可浏览的照片列表              |
| currentPhoto | MasonryPhoto \| null          | ✅   | 当前预览的照片，null 时不显示 |
| onClose      | () => void                    | ✅   | 关闭预览的回调                |
| onNavigate   | (photo: MasonryPhoto) => void | ✅   | 导航到指定照片的回调          |

## Entity Relationships

```text
ExplorePageData
├── hero: ExploreHeroData (1:1)
├── galleryPhotos: ExploreGalleryPhoto[] (1:N)
└── emptyState (1:1)

MasonryGallery ← uses → MasonryPhoto (base)
ImagePreview ← uses → MasonryPhoto (base)

ExploreGalleryPhoto extends MasonryPhoto (无 category)
GalleryPhoto (About) extends MasonryPhoto (有 category)
```

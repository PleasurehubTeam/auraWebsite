# Data Model: About 品牌故事页

**Branch**: `006-about-brand-story` | **Date**: 2026-02-27

## 实体定义

### AboutHeroData

表示 Hero 横幅的内容配置。

| 字段            | 类型   | 必填 | 说明                                                          |
| --------------- | ------ | ---- | ------------------------------------------------------------- |
| title           | string | 是   | 横幅标题，如 "Brand Story"                                    |
| slogan          | string | 是   | 品牌口号，如 "Bringing Happy to everyone. Let love run wild." |
| backgroundImage | string | 是   | 背景图路径，如 "/images/about/hero-bg.webp"                   |
| backgroundAlt   | string | 是   | 背景图无障碍描述                                              |
| fallbackColor   | string | 是   | 背景图加载失败时的兜底背景色，如 "#1a1a2e"                    |

**数据来源**: `src/config/about.ts`
**数量**: 固定 1 条

---

### BrandMessage

表示品牌宣言文案区的内容配置。

| 字段 | 类型   | 必填 | 说明                                                                      |
| ---- | ------ | ---- | ------------------------------------------------------------------------- |
| text | string | 是   | 品牌宣言文案，如 "Connect, share, and explore in an open and free space." |

**数据来源**: `src/config/about.ts`
**数量**: 固定 1 条

---

### StatItem

表示单项统计数据。

| 字段   | 类型   | 必填 | 说明                                       |
| ------ | ------ | ---- | ------------------------------------------ |
| id     | string | 是   | 唯一标识符，如 "country"、"global-users"   |
| value  | number | 是   | 数值，如 12、1600000                       |
| suffix | string | 否   | 数值后缀，如 "+"（显示为 "1600000+"）      |
| label  | string | 是   | 数值下方标签，如 "Country"、"Global Users" |

**数据来源**: `src/config/about.ts`
**数量**: 固定 2 条（可扩展）

---

### AboutGalleryCategory

表示画廊的 Tab 分类。复用 News 的 `NewsCategoryItem` 接口。

| 字段  | 类型   | 必填 | 说明                                                              |
| ----- | ------ | ---- | ----------------------------------------------------------------- |
| id    | string | 是   | 分类唯一标识符，如 "social-contact"、"share"、"brand"、"activity" |
| label | string | 是   | 显示标签，如 "Social Contact"、"Share"、"Brand"、"Activity"       |
| order | number | 是   | 排序序号，决定 Tab 显示顺序                                       |

**数据来源**: `src/config/about.ts`
**数量**: 固定 4 个分类
**兼容类型**: 与 `NewsCategoryItem` 接口一致（id 类型需适配为 string union）

---

### GalleryPhoto

表示画廊中的一张照片。数据需适配 `NewsArticle` 接口以复用 `NewsGrid` 组件。

| 字段          | 类型               | 必填 | 说明                                                |
| ------------- | ------------------ | ---- | --------------------------------------------------- |
| id            | string             | 是   | 照片唯一标识符                                      |
| title         | string             | 是   | 照片标题/标签，如 "My Aura stories"                 |
| featuredImage | string             | 是   | 图片路径，如 "/images/about/gallery/social-01.webp" |
| imageAlt      | string             | 是   | 图片无障碍描述                                      |
| category      | string             | 是   | 所属分类 ID，对应 AboutGalleryCategory.id           |
| cardSize      | "large" \| "small" | 是   | 卡片尺寸变体，large 为双行高度 (row-span-2)         |

**数据来源**: `src/config/about.ts`
**数量**: 每分类 5-8 张，总计约 20-32 张
**兼容类型**: 适配 `NewsArticle` 接口（仅使用 id、title、featuredImage、imageAlt、category、cardSize 字段）

---

### CommunityCTAData

表示加入社区 CTA 区块的内容配置。

| 字段        | 类型   | 必填 | 说明                                                                                             |
| ----------- | ------ | ---- | ------------------------------------------------------------------------------------------------ |
| heading     | string | 是   | CTA 标题，如 "You can join Aura"                                                                 |
| description | string | 是   | 说明文案，如 "Become a member of a supportive community that values equality and open dialogue." |

**数据来源**: `src/config/about.ts`
**数量**: 固定 1 条
**社交媒体链接**: 直接导入 `src/config/footer.ts` 的 `socialMediaLinks`，不在此实体中重复定义

---

### AboutPageData

表示 About 页面的完整数据配置，聚合所有子实体。

| 字段              | 类型                   | 必填 | 说明                                               |
| ----------------- | ---------------------- | ---- | -------------------------------------------------- |
| hero              | AboutHeroData          | 是   | Hero 横幅数据                                      |
| brandMessage      | BrandMessage           | 是   | 品牌宣言数据                                       |
| stats             | StatItem[]             | 是   | 统计数据列表                                       |
| galleryCategories | AboutGalleryCategory[] | 是   | 画廊分类列表                                       |
| galleryPhotos     | GalleryPhoto[]         | 是   | 画廊照片列表（所有分类混合，按 category 字段筛选） |
| cta               | CommunityCTAData       | 是   | CTA 区块数据                                       |
| emptyState        | { message: string }    | 是   | 画廊分类无内容时的空状态提示                       |

**数据来源**: `src/config/about.ts`（导出为 `aboutPageData`）

## 实体关系

```text
AboutPageData (顶层聚合)
├── hero: AboutHeroData (1:1)
├── brandMessage: BrandMessage (1:1)
├── stats: StatItem[] (1:N, N=2)
├── galleryCategories: AboutGalleryCategory[] (1:N, N=4)
├── galleryPhotos: GalleryPhoto[] (1:N, N=20~32)
│   └── category → AboutGalleryCategory.id (多对一)
├── cta: CommunityCTAData (1:1)
│   └── socialMediaLinks → 从 footer.ts 导入 (外部引用)
└── emptyState (1:1)
```

**组件消费关系**:

- `AboutHeroBanner` ← `AboutPageData.hero`
- `BrandMessageSection` ← `AboutPageData.brandMessage`
- `StatsSection` → `FlipCounter` ← `AboutPageData.stats`
- `AboutGallerySection` → `NewsCategoryTabs` ← `AboutPageData.galleryCategories`
- `AboutGallerySection` → `NewsGrid` ← `AboutPageData.galleryPhotos` (按 activeCategory 筛选)
- `JoinCommunityCTA` ← `AboutPageData.cta` + `socialMediaLinks` (from footer.ts)

## 配置文件结构

```text
src/config/about.ts
├── aboutPageData: AboutPageData
│   ├── hero: AboutHeroData
│   ├── brandMessage: BrandMessage
│   ├── stats: StatItem[]
│   ├── galleryCategories: AboutGalleryCategory[]
│   ├── galleryPhotos: GalleryPhoto[]
│   ├── cta: CommunityCTAData
│   └── emptyState: { message: string }
```

## 素材映射

| 实体字段                      | 资源路径                                          | 说明                     |
| ----------------------------- | ------------------------------------------------- | ------------------------ |
| AboutHeroData.backgroundImage | /public/images/about/hero-bg.webp                 | Hero 背景图              |
| GalleryPhoto.featuredImage    | /public/images/about/gallery/{category}-{nn}.webp | 画廊照片，按分类前缀组织 |

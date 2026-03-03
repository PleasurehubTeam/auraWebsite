# Data Model: APP 应用详情页

**Feature**: 004-app-detail-page | **Date**: 2026-02-27

## Entities

### MockupItem（Mockup 轮播项）

表示首屏 Hero 区域无缝轮播中的单个手机截图。

| Field | Type   | Required | Description                               |
| ----- | ------ | -------- | ----------------------------------------- |
| id    | string | Yes      | 唯一标识符                                |
| image | string | Yes      | 手机 Mockup 图片路径（`/images/app/...`） |
| alt   | string | Yes      | 图片描述文字（SEO + a11y）                |

### AppHeroData（首屏数据）

表示 APP 详情页首屏 Hero 区域的完整数据。

| Field   | Type         | Required | Description                      |
| ------- | ------------ | -------- | -------------------------------- |
| title   | string       | Yes      | 首屏标题，如 "Download Aura APP" |
| mockups | MockupItem[] | Yes      | Mockup 轮播图片列表（>=4 项）    |

**Note**: 下载按钮数据来自 `downloadConfig`（`src/config/download.ts`），不在此实体中重复定义。

### FeatureSectionData（功能模块数据）

表示一个图文交替功能展示模块的数据。

| Field           | Type     | Required | Description                                                    |
| --------------- | -------- | -------- | -------------------------------------------------------------- |
| id              | string   | Yes      | 唯一标识符（如 "ai-companion"）                                |
| title           | string   | Yes      | 功能标题（如 "Customized AI Digital Companion"）               |
| description     | string   | Yes      | 功能描述文案                                                   |
| images          | string[] | Yes      | App 界面手机截图路径列表（1-3 张）                             |
| imagesAlt       | string[] | Yes      | 对应图片的 alt 描述列表                                        |
| productImage    | string   | No       | 可选的产品硬件实物图路径（仅 "360° Precise Toy Control" 使用） |
| productImageAlt | string   | No       | 产品图 alt 描述                                                |

**Validation rules**:

- `images` 至少 1 张
- `images.length === imagesAlt.length`
- `productImage` 和 `productImageAlt` 同时存在或同时缺省

**Derived behavior**:

- 奇数序号模块（index 0, 2, 4）→ 图片在左 / 文案在右，动画从左滑入
- 偶数序号模块（index 1, 3, 5）→ 文案在左 / 图片在右，动画从右滑入

### AppBottomCTAData（底部转化区数据）

表示底部强转化下载区域的数据。

| Field       | Type   | Required | Description                    |
| ----------- | ------ | -------- | ------------------------------ |
| heading     | string | Yes      | 引导标题（如 "Download"）      |
| description | string | Yes      | 引导文案                       |
| logoImage   | string | Yes      | Aura 品牌 Logo（心形图标）路径 |
| logoAlt     | string | Yes      | Logo alt 描述                  |

**Note**: 下载按钮数据同样来自 `downloadConfig`。

### AppPageData（页面聚合数据）

顶层聚合实体，在 `src/config/app.ts` 中导出。

| Field        | Type                 | Required | Description                  |
| ------------ | -------------------- | -------- | ---------------------------- |
| hero         | AppHeroData          | Yes      | 首屏 Hero 数据               |
| sectionTitle | string               | Yes      | "About Aura APP" 引导标题    |
| features     | FeatureSectionData[] | Yes      | 6 个功能模块数据列表（有序） |
| bottomCTA    | AppBottomCTAData     | Yes      | 底部转化区数据               |

**Validation rules**:

- `features` 恰好 6 项
- `features` 的顺序即为页面展示顺序

## Relationships

```text
AppPageData
  ├── hero: AppHeroData
  │     └── mockups: MockupItem[] (1:N)
  ├── sectionTitle: string
  ├── features: FeatureSectionData[] (1:6, ordered)
  └── bottomCTA: AppBottomCTAData
```

## Existing Dependencies

以下为本功能复用的现有数据/类型/组件：

| Artifact           | Path                                            | Usage                                 |
| ------------------ | ----------------------------------------------- | ------------------------------------- |
| DownloadConfig     | `src/types/index.ts` + `src/config/download.ts` | Hero 和 Bottom CTA 的下载按钮 URL     |
| StoreBadgeLink     | `src/components/icons/StoreBadges.tsx`          | 渲染 App Store / Google Play 按钮     |
| GradientBackground | `src/components/ui/GradientBackground.tsx`      | Hero 区域背景渐变                     |
| ScrollReveal       | `src/components/ui/ScrollReveal.tsx`            | 滚动动画入口（需扩展 direction prop） |

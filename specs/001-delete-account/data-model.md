# Data Model: 账号删除申请页面

**Branch**: `001-delete-account` | **Date**: 2026-03-19

## Overview

本页面为纯静态内容展示页，无动态数据、无数据库、无 API 调用。
唯一的数据来源是本地 TypeScript 配置文件 `src/config/delete-account.ts`。

## Configuration Data Shape

### DeleteAccountConfig

页面所有文案和配置的根类型：

```typescript
interface DeleteAccountConfig {
  metadata: PageMetadata; // SEO 元数据
  hero: HeroContent; // 页面标题区域
  sections: ContentSection[]; // 内容区块列表
  contact: ContactInfo; // 联系方式
}
```

### PageMetadata

```typescript
interface PageMetadata {
  title: string; // 页面 <title> 和 h1 标题
  description: string; // meta description / OpenGraph description
}
```

### HeroContent

```typescript
interface HeroContent {
  heading: string; // 页面主标题（h1）
  subheading: string; // 副标题/引导语
}
```

### ContentSection

```typescript
interface ContentSection {
  id: string; // 区块标识符（用于未来锚点或测试 id）
  title: string; // 区块标题（h2）
  content: string; // 区块正文（纯文本段落）
}
```

### ContactInfo

```typescript
interface ContactInfo {
  label: string; // 联系方式引导文字，如"请通过以下邮箱联系我们申请删除账号："
  email: string; // 邮箱地址，如"support@realaura.ai"
  note: string; // 补充说明，如"我们将在 3–5 个工作日内处理您的申请"
}
```

## Content Sections (初始内容规划)

| Section ID         | Title    | 说明                                    |
| ------------------ | -------- | --------------------------------------- |
| `deletion-process` | 删除流程 | 说明用户需通过邮件申请，客服人工处理    |
| `consequences`     | 删除后果 | 警告账号删除为不可逆操作，数据将被清除  |
| `contact`          | 联系我们 | 展示 support@realaura.ai 的 mailto 链接 |

## Data Flow

```text
src/config/delete-account.ts
        ↓  (import)
src/app/delete-account/page.tsx  (SSG, Next.js metadata export)
        ↓  (props)
src/components/delete-account/DeleteAccountContent.tsx  (render)
        ↓
User browser (no runtime data fetching)
```

## Validation Rules

- `contact.email` MUST be a valid email format (validated at type level / lint)
- 所有字段为必填（TypeScript 严格模式保证）
- 配置文件导出为 `const`（只读），不允许运行时修改

# Route Contracts: Privacy Policy Page

## Routes

### GET /privacy-policy

**Purpose**: 官网版隐私协议页面
**Rendering**: SSG (Static Site Generation)
**Layout**: 完整网站布局（Header + Footer + Navigation）

**Response Headers**:

- Standard Next.js SSG headers
- `X-Frame-Options: DENY`（禁止 iframe 嵌入）

**Metadata**:

```
title: "Privacy Policy | Aura"
description: "Read Aura's privacy policy to learn how we collect, use, and protect your personal data."
og:title: "Privacy Policy | Aura"
og:description: "Read Aura's privacy policy..."
og:type: "website"
twitter:card: "summary"
```

### GET /privacy-policy/embed

**Purpose**: 嵌入版隐私协议页面（WebView / iframe）
**Rendering**: SSG (Static Site Generation)
**Layout**: 纯内容模式（无 Header、Footer、Navigation）

**Response Headers**:

- `X-Frame-Options`: 不设置（允许嵌入）
- `Content-Security-Policy`: `frame-ancestors *`（允许所有来源嵌入）

**Metadata**:

```
title: "Privacy Policy | Aura"
description: "Aura Privacy Policy"
robots: "noindex, nofollow" (嵌入版不需要搜索引擎索引)
```

## UI Contracts

### PrivacyPolicyContent Component

**Purpose**: 共享的协议正文渲染组件
**Consumers**: 官网版页面、嵌入版页面

**Props**:

```typescript
interface PrivacyPolicyContentProps {
  sections: PrivacyPolicySection[];
  metadata: PolicyMetadata;
}
```

**Renders**: 协议生效日期 + 所有章节内容（标题 + 段落 + 子章节）

### TableOfContents Component

**Purpose**: 章节目录导航（仅官网版使用）
**Consumers**: 官网版页面

**Props**:

```typescript
interface TableOfContentsProps {
  sections: PrivacyPolicySection[];
}
```

**Behavior**: 渲染章节标题列表，点击平滑滚动至对应锚点

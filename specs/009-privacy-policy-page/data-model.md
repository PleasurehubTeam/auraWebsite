# Data Model: Privacy Policy Page

**Feature**: 009-privacy-policy-page
**Date**: 2026-03-07

## Entities

### PolicyMetadata

协议的元信息。

| Field         | Type   | Required | Description                   |
| ------------- | ------ | -------- | ----------------------------- |
| title         | string | Yes      | 协议标题，如 "Privacy Policy" |
| effectiveDate | string | Yes      | 生效日期，如 "2026-03-01"     |
| lastUpdated   | string | Yes      | 最后更新日期，如 "2026-03-07" |
| version       | string | No       | 版本号，如 "1.0"              |

### PrivacyPolicySection

协议的一个主要章节。

| Field       | Type               | Required | Description                                 |
| ----------- | ------------------ | -------- | ------------------------------------------- |
| id          | string             | Yes      | 锚点 ID，用于目录跳转，如 "data-collection" |
| title       | string             | Yes      | 章节标题，如 "Information We Collect"       |
| content     | string[]           | Yes      | 段落内容数组，每项为一个段落文本            |
| subsections | PolicySubsection[] | No       | 子章节列表                                  |

### PolicySubsection

章节内的子章节。

| Field   | Type     | Required | Description  |
| ------- | -------- | -------- | ------------ |
| id      | string   | Yes      | 锚点 ID      |
| title   | string   | Yes      | 子章节标题   |
| content | string[] | Yes      | 段落内容数组 |

### PrivacyPolicyData

页面级聚合数据（顶层导出）。

| Field    | Type                   | Required | Description              |
| -------- | ---------------------- | -------- | ------------------------ |
| metadata | PolicyMetadata         | Yes      | 协议元信息               |
| sections | PrivacyPolicySection[] | Yes      | 章节列表，按展示顺序排列 |

## Relationships

```
PrivacyPolicyData
  ├── metadata: PolicyMetadata (1:1)
  └── sections: PrivacyPolicySection[] (1:N)
        └── subsections?: PolicySubsection[] (1:N, optional)
```

## Standard Sections

根据社交/社区应用的隐私协议惯例，`sections` 数组应包含以下章节（按顺序）：

1. **Introduction** — 简介与适用范围
2. **Information We Collect** — 收集的信息类型
3. **How We Use Your Information** — 信息使用方式
4. **Information Sharing** — 信息共享与披露
5. **Your Rights and Choices** — 用户权利与选择
6. **Cookies and Tracking** — Cookie 与追踪技术
7. **Data Security** — 数据安全措施
8. **Children's Privacy** — 儿童隐私保护
9. **Changes to This Policy** — 协议变更通知
10. **Contact Us** — 联系方式

## Data Location

- **Type definitions**: `src/types/privacy-policy.ts`
- **Content data**: `src/config/privacy-policy.ts`
- **Single source of truth**: 修改 `src/config/privacy-policy.ts` 即可同时更新官网版和嵌入版

# Data Model: 用户协议页面

**Date**: 2026-03-13 | **Plan**: [plan.md](plan.md)

## Shared Legal Document Types (`src/types/legal.ts`)

### PolicyMetadata (复用现有)

| Field         | Type   | Required | Description                      |
| ------------- | ------ | -------- | -------------------------------- |
| title         | string | Yes      | 文档标题（如 "User Agreement"）  |
| effectiveDate | string | Yes      | 生效日期（格式：YYYY-MM-DD）     |
| lastUpdated   | string | Yes      | 最后更新日期（格式：YYYY-MM-DD） |
| version       | string | No       | 版本号（如 "1.0"）               |

### LegalSubsection (泛化自 PolicySubsection)

| Field   | Type     | Required | Description             |
| ------- | -------- | -------- | ----------------------- |
| id      | string   | Yes      | 锚点 ID，用于章节内导航 |
| title   | string   | Yes      | 子章节标题              |
| content | string[] | Yes      | 段落内容数组            |

### LegalSection (泛化自 PrivacyPolicySection)

| Field       | Type              | Required | Description               |
| ----------- | ----------------- | -------- | ------------------------- |
| id          | string            | Yes      | 锚点 ID，用于目录导航跳转 |
| title       | string            | Yes      | 章节标题                  |
| content     | string[]          | Yes      | 段落内容数组              |
| subsections | LegalSubsection[] | No       | 子章节列表                |

### LegalPageData (泛化自 PrivacyPolicyData)

| Field    | Type           | Required | Description |
| -------- | -------------- | -------- | ----------- |
| metadata | PolicyMetadata | Yes      | 文档元数据  |
| sections | LegalSection[] | Yes      | 章节列表    |

## Type Compatibility

`privacy-policy.ts` 将保留现有类型名作为别名 re-export：

```
PrivacyPolicySection = LegalSection
PrivacyPolicyData = LegalPageData
PolicySubsection = LegalSubsection
PolicyMetadata = PolicyMetadata (unchanged)
```

## User Agreement Data (`src/config/user-agreement.ts`)

数据结构与 `src/config/privacy-policy.ts` 完全一致，仅内容不同。

导出：`userAgreementData: LegalPageData`

### Sections

| #   | id                     | title                                   |
| --- | ---------------------- | --------------------------------------- |
| 1   | introduction           | Introduction                            |
| 2   | description-of-service | Description of Service                  |
| 3   | account-registration   | Account Registration and Security       |
| 4   | user-conduct           | User Conduct and Community Standards    |
| 5   | user-content           | User Content and Intellectual Property  |
| 6   | third-party            | Third-Party Links and Services          |
| 7   | termination            | Termination and Account Deletion        |
| 8   | disclaimers            | Disclaimers and Limitation of Liability |
| 9   | dispute-resolution     | Dispute Resolution and Governing Law    |
| 10  | changes                | Changes to This Agreement               |
| 11  | contact-us             | Contact Us                              |

## Relationships

```
LegalPageData
├── PolicyMetadata (1:1)
└── LegalSection[] (1:N)
    └── LegalSubsection[] (0:N)
```

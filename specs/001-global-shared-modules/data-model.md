# 数据模型：全局公共模块

**功能分支**: `001-global-shared-modules`
**日期**: 2026-02-26

## 实体定义

本功能无后端数据库，所有数据以 TypeScript 类型 + 常量文件形式存在于前端代码中。以下定义实体的类型结构和数据来源。

### NavigationItem（导航项）

表示 Header 导航菜单中的一个链接。

| 字段  | 类型   | 必填 | 说明                         |
| ----- | ------ | ---- | ---------------------------- |
| label | string | 是   | 显示文字（如 "Home"、"APP"） |
| href  | string | 是   | 目标路径（如 "/"、"/app"）   |

**数据来源**: `src/config/navigation.ts` 静态常量数组
**活跃状态**: 由组件运行时通过 `usePathname()` 与 `href` 匹配计算，不存储在数据中

### FooterLinkGroup（Footer 链接组）

表示 Footer 中的一个链接分类。

| 字段  | 类型         | 必填 | 说明                                           |
| ----- | ------------ | ---- | ---------------------------------------------- |
| title | string       | 是   | 分组标题（如 "Company"、"Support"、"Contact"） |
| links | FooterLink[] | 是   | 该分组下的链接列表                             |

### FooterLink（Footer 链接）

| 字段     | 类型    | 必填 | 说明                                                   |
| -------- | ------- | ---- | ------------------------------------------------------ |
| label    | string  | 是   | 显示文字（如 "Privacy Policy"）                        |
| href     | string  | 是   | 目标路径或外部 URL                                     |
| external | boolean | 否   | 是否为外部链接（默认 false），为 true 时在新标签页打开 |

**数据来源**: `src/config/footer.ts` 静态常量数组

### SocialMediaLink（社交媒体链接）

| 字段     | 类型                                          | 必填 | 说明                                      |
| -------- | --------------------------------------------- | ---- | ----------------------------------------- |
| platform | "instagram" \| "x" \| "facebook" \| "youtube" | 是   | 平台标识                                  |
| url      | string                                        | 是   | 品牌官方主页 URL（外部链接）              |
| label    | string                                        | 是   | 无障碍标签（如 "Follow us on Instagram"） |

**数据来源**: `src/config/footer.ts` 中的独立常量数组

### DownloadConfig（下载配置）

| 字段          | 类型   | 必填 | 说明                          |
| ------------- | ------ | ---- | ----------------------------- |
| appStoreUrl   | string | 是   | Apple App Store 链接          |
| googlePlayUrl | string | 是   | Google Play 商店链接          |
| heading       | string | 是   | CTA 区域标题（如 "Download"） |
| description   | string | 是   | CTA 区域描述文案              |

**数据来源**: `src/config/download.ts` 静态常量对象

### SiteConfig（全站配置）

| 字段                       | 类型   | 必填 | 说明                           |
| -------------------------- | ------ | ---- | ------------------------------ |
| brandName                  | string | 是   | 品牌名称（"Aura"）             |
| copyrightYearStart         | number | 是   | 版权起始年份（2025）           |
| ageVerificationRedirectUrl | string | 是   | 年龄验证拒绝后重定向的外部 URL |
| privacyPolicyUrl           | string | 是   | 隐私政策页面路径               |

**数据来源**: `src/config/site.ts` 静态常量对象

## 客户端持久化状态

以下状态通过 localStorage 持久化，不属于配置数据。

### AgeVerificationState（年龄验证状态）

| 存储键名            | 类型           | 说明                                 |
| ------------------- | -------------- | ------------------------------------ |
| `aura_age_verified` | "true" \| null | 存在且为 "true" 表示已验证年满 18 岁 |

**读写**: `src/hooks/useAgeVerification.ts`
**状态转换**: `未验证 → 已验证`（单向，不可回退；清除浏览器存储可重置）

### CookieConsentState（Cookie 同意状态）

| 存储键名              | 类型               | 说明                                       |
| --------------------- | ------------------ | ------------------------------------------ |
| `aura_cookie_consent` | "accepted" \| null | 存在且为 "accepted" 表示已接受 Cookie 政策 |

**读写**: `src/hooks/useCookieConsent.ts`
**状态转换**: `未选择 → 已接受`（单向；后续迭代可能增加"管理偏好"能力）

## 实体关系

```text
SiteConfig (1)
├── 被 Header 引用（brandName）
├── 被 Footer 引用（copyrightYearStart）
├── 被 AgeVerificationGate 引用（ageVerificationRedirectUrl）
└── 被 CookieConsentBanner 引用（privacyPolicyUrl）

NavigationItem[] (5)
└── 被 Header / MobileNav 消费

FooterLinkGroup[] (3)
├── 包含 FooterLink[]
└── 被 Footer 消费

SocialMediaLink[] (4)
└── 被 Footer 消费

DownloadConfig (1)
└── 被 DownloadCTA 消费

AgeVerificationState
└── 被 useAgeVerification hook 管理，AgeVerificationGate 消费

CookieConsentState
└── 被 useCookieConsent hook 管理，CookieConsentBanner 消费
```

# Data Model: 响应式内容宽度规范

**Branch**: `003-responsive-content-width` | **Date**: 2026-02-27

## Overview

本特性为纯 CSS 布局规范，不涉及数据实体或状态管理。以下记录布局规范的核心参数模型。

## Layout Parameters

### Breakpoints（使用 Tailwind 默认值）

| Token     | Width   | 用途           |
| --------- | ------- | -------------- |
| (default) | 0–639px | 小屏（手机）   |
| sm        | 640px+  | 中小屏         |
| md        | 768px+  | 中屏（平板）   |
| lg        | 1024px+ | 大屏（笔记本） |
| xl        | 1280px+ | 超大屏（桌面） |
| 2xl       | 1536px+ | 超宽屏         |

### Content Width Constraints

| Parameter        | Value  | Tailwind Class | 适用范围              |
| ---------------- | ------ | -------------- | --------------------- |
| 标准最大内容宽度 | 1280px | max-w-7xl      | 绝大多数内容区块      |
| Hero 例外宽度    | 1600px | max-w-[1600px] | 仅 HeroSection        |
| CTA 例外宽度     | 896px  | max-w-4xl      | 仅 DownloadCTA 内容区 |

### Responsive Padding

| Breakpoint        | Padding       | Tailwind Class |
| ----------------- | ------------- | -------------- |
| default (0–639px) | 16px per side | px-4           |
| sm (640px+)       | 24px per side | sm:px-6        |
| lg (1024px+)      | 32px per side | lg:px-8        |

### Media Overflow Rules

| Content Type | Handling   | CSS Rule                         |
| ------------ | ---------- | -------------------------------- |
| img          | 等比缩放   | max-width: 100%; height: auto    |
| video        | 等比缩放   | max-width: 100%; height: auto    |
| iframe       | 等比缩放   | max-width: 100%; height: auto    |
| table        | 容器内滚动 | display: block; overflow-x: auto |

## Component Compliance Map

| Component            | Current                              | Target       | Status        |
| -------------------- | ------------------------------------ | ------------ | ------------- |
| Header               | max-w-7xl, px-4 sm:px-6 lg:px-8      | —            | ✅ 已符合     |
| Footer               | max-w-7xl, px-4 sm:px-6 lg:px-8      | —            | ✅ 已符合     |
| HeroSection          | max-w-[1600px], px-4 sm:px-6 lg:px-8 | 保留（例外） | ✅ 已记录例外 |
| AIPoweredSection     | max-w-7xl, px-4 sm:px-6 lg:px-8      | —            | ✅ 已符合     |
| ClassicModeSection   | max-w-7xl, px-4 sm:px-6 lg:px-8      | —            | ✅ 已符合     |
| SoloPlaySection      | max-w-7xl, px-4 sm:px-6 lg:px-8      | —            | ✅ 已符合     |
| RemoteControlSection | max-w-7xl, px-4 sm:px-6 lg:px-8      | —            | ✅ 已符合     |
| MysteryScriptSection | max-w-7xl, px-4 sm:px-6 lg:px-8      | —            | ✅ 已符合     |
| ModeFunctionSection  | max-w-5xl, px-4 sm:px-6 lg:px-8      | max-w-7xl    | ❌ 需修正     |
| TabSwitcher          | max-w-[1500px]                       | max-w-7xl    | ❌ 需修正     |
| DownloadCTA          | max-w-4xl, px-4 sm:px-6 lg:px-8      | 保留（例外） | ✅ 已记录例外 |
| CookieConsentBanner  | max-w-7xl, px-4 sm:px-6              | —            | ✅ 已符合     |
| HorizontalCarousel   | 无限制（水平滚动）                   | 保留         | ✅ 设计意图   |

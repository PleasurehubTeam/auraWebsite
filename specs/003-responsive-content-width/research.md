# Research: 响应式内容宽度规范

**Branch**: `003-responsive-content-width` | **Date**: 2026-02-27

## Decision 1: 最大内容宽度值

**Decision**: 1280px (Tailwind `max-w-7xl`)

**Rationale**: 项目中大多数组件已使用 `max-w-7xl`（Header、Footer、AIPoweredSection、ClassicModeSection、SoloPlaySection、RemoteControlSection、MysteryScriptSection、CookieConsentBanner）。1280px 是行业标准的桌面端最大内容宽度，兼顾可读性和空间利用。

**Alternatives considered**:

- `max-w-6xl` (1152px): 过窄，浪费桌面端空间
- `max-w-screen-xl` (1280px): 与 `max-w-7xl` 等值但语义不同
- 1440px 自定义值: 过宽，超宽屏下阅读行长度超出最佳实践（65-75字符/行）

## Decision 2: 响应式内边距方案

**Decision**: `px-4 sm:px-6 lg:px-8`（即 16px / 24px / 32px 三级递进）

**Rationale**: 项目中所有现有组件已统一使用此模式。这是 Tailwind CSS 社区推荐的标准响应式内边距方案，与 mobile-first 设计原则一致。

**Alternatives considered**:

- 统一 px-4 (16px): 大屏下内容过于贴边
- px-6 sm:px-8 lg:px-12: 小屏下占用过多空间
- 百分比 padding (5%): 不同视口下视觉不一致，且不符合 Tailwind utility-first 理念

## Decision 3: 超尺寸媒体处理方式

**Decision**: 全局 CSS 防护 + Tailwind utility classes

**Rationale**: 在 `globals.css` 中对 `img`、`video`、`iframe` 设置 `max-width: 100%; height: auto;` 作为全局兜底。各组件内的 Next.js `<Image>` 组件已通过 `fill` 或固定尺寸处理得当，但需要全局防护以覆盖未来可能引入的原生 HTML 媒体元素。

**Alternatives considered**:

- 仅在组件级别处理: 无法覆盖所有场景，容易遗漏
- 使用 Tailwind `@layer base` 覆盖: 与全局 CSS 等效但更符合项目 Tailwind-first 风格（采纳此方式）

## Decision 4: 需修正的组件清单

**Decision**: 基于全量审计，以下组件需修正：

| 组件                    | 当前值         | 目标值                      | 处理方式                                 |
| ----------------------- | -------------- | --------------------------- | ---------------------------------------- |
| ModeFunctionSection.tsx | max-w-5xl      | max-w-7xl                   | 修改 class                               |
| TabSwitcher.tsx         | max-w-[1500px] | max-w-7xl                   | 修改 class                               |
| HeroSection.tsx         | max-w-[1600px] | 保留（已记录例外）          | 在代码中添加注释标记为例外               |
| DownloadCTA.tsx         | max-w-4xl      | 保留（已记录例外）          | 内容区域故意收窄以聚焦 CTA，属于设计意图 |
| globals.css             | 无媒体防护     | 添加全局媒体 max-width 防护 | 在 `@layer base` 中添加                  |

**Rationale**: 全量审计 17 个组件文件，其中 13 个已符合规范，2 个需修正，2 个为合理例外。

**Alternatives considered**:

- 仅添加全局容器而不修正各组件: 可能与组件内部已有 max-width 冲突
- 创建统一的 `<ContentContainer>` 包装组件: 过度工程化，每个组件已有容器结构，直接统一 class 即可

## Decision 5: 全局溢出防护策略

**Decision**: 在 `globals.css` 的 `@layer base` 中添加溢出防护规则

**Rationale**: 作为安全网兜底，确保即使个别组件遗漏处理，页面级别也不会出现横向滚动条。

**实施内容**:

1. `html, body { overflow-x: hidden; }` — 页面级横向溢出隐藏
2. `img, video, iframe { max-width: 100%; height: auto; }` — 媒体元素等比缩放
3. `table { display: block; overflow-x: auto; }` — 表格容器内滚动

**Alternatives considered**:

- 不添加全局防护，仅依赖组件级: 风险高，未来新增内容可能遗漏
- 在 layout.tsx 添加 `overflow-x-hidden`: 效果相同但不如 CSS 层清晰

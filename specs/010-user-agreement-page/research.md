# Research: 用户协议页面

**Date**: 2026-03-13 | **Plan**: [plan.md](plan.md)

## R1: 组件复用策略

**Decision**: 提取共享 `legal/` 组件，隐私协议和用户协议共同使用。

**Rationale**:

- 现有 `PrivacyPolicyContent` 和 `TableOfContents` 组件的渲染逻辑完全通用，仅类型名称绑定了隐私协议
- `PolicyMetadata`、`PolicySubsection` 类型已是通用命名，`PrivacyPolicySection` 仅需重命名/泛化
- `ScrollToTopButton` 已完全通用，仅需移动目录位置
- 共享组件可避免 2 套几乎相同的组件代码

**Alternatives considered**:

- 方案 A：创建并行的 `user-agreement/` 组件目录（复制粘贴） → 违反 DRY，维护成本翻倍
- 方案 B：用户协议直接 import 隐私协议组件 → 语义混乱，隐私协议不应被用户协议依赖

## R2: URL 路径选择

**Decision**: 使用 `/user-agreement`（官网版）和 `/user-agreement/embed`（嵌入版）。

**Rationale**:

- 页脚配置 `src/config/footer.ts` 已定义 `{ label: "User Agreement", href: "/user-agreement" }`（Company 和 Support 两处）
- 与现有 `/privacy-policy` / `/privacy-policy/embed` 命名模式一致

**Alternatives considered**:

- `/terms-of-service` → 页脚已使用 `/user-agreement`，改动成本高且不一致

## R3: 类型泛化策略

**Decision**: 创建 `src/types/legal.ts` 定义通用法律文档类型，`privacy-policy.ts` 改为 re-export 保持向后兼容。

**Rationale**:

- `PolicyMetadata` 和 `PolicySubsection` 已是通用名称，可直接复用
- `PrivacyPolicySection` → `LegalSection`，`PrivacyPolicyData` → `LegalPageData`
- `privacy-policy.ts` 保留类型别名 re-export，避免破坏现有导入

**Alternatives considered**:

- 直接修改 `privacy-policy.ts` 重命名类型 → 需要更新所有导入，风险较大
- 完全独立的 `user-agreement.ts` 类型 → 重复定义，不利于未来扩展（如社区准则页面）

## R4: 嵌入版 CORS 配置

**Decision**: 扩展 `src/proxy.ts` 的 middleware 匹配规则，同时覆盖 `/user-agreement/embed`。

**Rationale**:

- 现有 `proxy.ts` 已为 `/privacy-policy/embed` 配置了 `frame-ancestors *`
- 同样的 CORS 策略适用于用户协议嵌入版
- middleware matcher 需更新为同时匹配两个路径

**Alternatives considered**:

- 新建独立 middleware 文件 → 不必要的文件分散，Next.js 推荐单一 middleware

## R5: 用户协议内容章节结构

**Decision**: 采用社交/社区应用的标准用户协议章节。

**Rationale**:

- Aura 是社交/社区应用，协议需涵盖用户生成内容、行为规范、知识产权等
- 章节结构参考行业标准，与隐私协议的章节划分粒度保持一致

**章节清单**:

1. Introduction / Acceptance of Terms
2. Description of Service
3. Account Registration and Security
4. User Conduct and Community Standards
5. User Content and Intellectual Property
6. Third-Party Links and Services
7. Termination and Account Deletion
8. Disclaimers and Limitation of Liability
9. Dispute Resolution and Governing Law
10. Changes to This Agreement
11. Contact Us

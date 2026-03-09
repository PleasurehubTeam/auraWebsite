# Quickstart: Privacy Policy Page

**Feature**: 009-privacy-policy-page

## File Map

```
src/
├── types/
│   └── privacy-policy.ts          # 类型定义
├── config/
│   └── privacy-policy.ts          # 协议内容数据（统一修改入口）
├── components/
│   └── privacy-policy/
│       ├── PrivacyPolicyContent.tsx  # 共享内容渲染组件
│       └── TableOfContents.tsx       # 目录导航组件（仅官网版）
├── app/
│   └── privacy-policy/
│       ├── page.tsx                 # 官网版页面
│       └── embed/
│           └── page.tsx             # 嵌入版页面
└── middleware.ts                    # 嵌入版路由的安全头配置（新增或修改）
```

## Key Decisions

1. **内容共享**: `PrivacyPolicyContent` 组件被两个页面共同引用，数据来源于 `src/config/privacy-policy.ts`
2. **布局隔离**: 在 `ClientLayout` 中通过路径检测，嵌入版路径下不渲染 Header/Footer
3. **iframe 安全**: 通过 middleware 为 `/privacy-policy/embed` 设置允许嵌入的响应头
4. **排版**: 使用 Tailwind Typography 插件 (`prose`) 渲染长文本
5. **SEO**: 官网版完整 SEO 元数据，嵌入版设置 `noindex, nofollow`

## Local Development

```bash
pnpm dev
# 官网版: http://localhost:3000/privacy-policy
# 嵌入版: http://localhost:3000/privacy-policy/embed
```

## Verification

- [ ] 官网版 `/privacy-policy` 展示完整布局（Header + Footer + 目录 + 内容）
- [ ] 嵌入版 `/privacy-policy/embed` 仅展示标题和正文内容
- [ ] 在 iframe 中加载嵌入版无报错
- [ ] 移动端（320px）两个版本均可正常阅读
- [ ] 修改 `src/config/privacy-policy.ts` 后两个页面同步更新

# Technical Research: 内容管理页面 (Content Management Page)

**Spec**: [spec.md](./spec.md) | **Date**: 2026-03-03

## 1. 现有代码库分析

### 1.1 可复用的数据层

- **`src/types/news.ts`**: 已有完整的 `NewsArticle` 接口定义（id、slug、title、category、featuredImage、imageAlt、publishDate、summary、content、cardSize），可直接复用，无需创建新的数据实体
- **`src/config/news.ts`**: 已有 50 篇 mock 文章数据（`newsArticles`），包含 `getAllNewsArticles()`、`getNewsArticleBySlug()` 等辅助函数，可作为管理页面的初始数据源
- **`src/types/news.ts` 的 `NewsCategoryItem`**: 分类数据已在 `newsPageData.categories` 中配置，可直接用于筛选下拉菜单

### 1.2 可复用的 UI 组件和模式

- **`@radix-ui/react-dialog`**: 项目已安装（package.json 中有依赖），用于 AgeVerificationGate。可直接用于文章表单模态框和删除确认对话框
- **`lucide-react`**: 项目已安装，可用于表格操作按钮图标（Edit、Trash2、Eye、Plus、Search 等）
- **Header/Footer 组件**: 可复用全局导航组件保持一致性
- **Tailwind CSS 设计语言**: 品牌色 `brand-pink (#FF4D8D)`、字体 Montserrat、圆角 `rounded-2xl`

### 1.3 现有管理/交互模式参考

- **`src/components/news/NewsCategoryTabs.tsx`**: 分类筛选 Tab 的交互模式可参考
- **`src/hooks/useNewsArticles.ts`**: 文章过滤和分页逻辑可参考
- **`src/components/modals/AgeVerificationGate.tsx`**: Radix UI Dialog 的使用模式可参考

## 2. 技术方案决策

### 2.0 登录校验方案

**选择**: 前端固定凭据 + sessionStorage 状态管理

**方案**:

- 固定凭据硬编码在配置文件中：admin / aura1509
- 登录状态存储在 sessionStorage（关闭标签页后失效）
- AdminLoginGate 组件包裹管理页面，未登录时渲染登录表单
- 自定义 `useAdminAuth` hook 封装认证逻辑

**理由**:

- MVP 阶段无后端认证服务，前端校验满足基础访问控制需求
- sessionStorage 的生命周期（标签页级别）适合管理页面的安全要求
- 组件化方案（LoginGate pattern）清晰解耦认证逻辑和业务逻辑

**被拒绝的方案**:

- Next.js middleware: 需要服务端逻辑，过度设计
- Cookie + httpOnly: 需要后端 API 设置 cookie，MVP 不需要
- localStorage: 持久化时间过长，不适合认证场景

### 2.1 状态管理方案

**选择**: React useState + useCallback（自定义 hook）

**理由**:

- 管理页面的状态复杂度适中（文章列表 + 筛选 + 分页 + 模态框），useState 足以管理
- 项目不使用全局状态管理库（如 Redux/Zustand），保持一致性
- 将全部状态逻辑封装到 `useArticleManager` hook 中，组件层保持简洁

**被拒绝的方案**:

- useReducer: 虽然适合复杂状态，但本功能的状态交互相对直观，useState 更简单
- 全局状态库: 项目中未使用，引入新依赖违反 Constitution

### 2.2 模态框方案

**选择**: Radix UI Dialog（已有依赖）

**理由**:

- 项目 package.json 中已有 `@radix-ui/react-dialog`
- Radix UI 提供开箱即用的无障碍支持（键盘导航、焦点管理、Escape 关闭）
- 样式完全自定义（Tailwind CSS）

### 2.3 表格方案

**选择**: 原生 HTML table + Tailwind CSS 样式

**理由**:

- 文章管理表格功能简单（展示 + 操作按钮），不需要排序、拖拽等复杂交互
- 语义化 HTML（`<table>`、`<thead>`、`<tbody>`、`<tr>`、`<td>`）
- 避免引入重型表格库（如 TanStack Table）

### 2.4 表单字段精简策略

**选择**: 仅暴露 4 个用户字段，其余衍生字段自动生成

**用户字段**:

1. image — 图片路径（支持 webp/png/jpg）
2. category — 标签（固定三选一）
3. title — 标题
4. content — 内容

**自动生成的衍生字段**:

- id: `"news-" + Date.now()`
- slug: 从 title 生成
- featuredImage: = image
- imageAlt: = title
- publishDate: 当前日期
- summary: content 前 150 字符
- cardSize: 默认 "small"

**理由**: 用户只需关注核心内容字段，技术字段（slug、alt 等）不暴露给运营人员，降低操作复杂度。

### 2.5 图片路径处理

**选择**: 文本输入保存图片路径（string），accept 属性限制格式

**方案**:

- 表单中图片字段为文本输入框，运营人员输入图片文件路径
- 前端通过文件扩展名校验格式（.webp / .png / .jpg / .jpeg）
- MVP 阶段不涉及实际文件上传到服务器

## 3. 不需要的功能（MVP 边界）

- ❌ 富文本编辑器（使用纯 textarea 输入）
- ❌ 实际图片文件上传到服务器（仅保存路径）
- ❌ 数据持久化（刷新后恢复初始数据）
- ❌ 后端认证 API（前端固定凭据校验）
- ❌ 后端 CRUD API（纯前端 state 管理）
- ❌ 移动端/平板端适配
- ❌ SEO 和 SSR/SSG
- ❌ 批量操作（批量删除等）
- ❌ 文章排序（拖拽排序等）
- ❌ 登录失败次数限制

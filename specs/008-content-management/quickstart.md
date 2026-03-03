# Quick Start: 内容管理页面 (Content Management Page)

**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

## 快速验证

### 1. 启动开发服务器

```bash
pnpm dev
```

### 2. 访问内容管理页面

在桌面端浏览器中打开：

```
http://localhost:3000/admin/content
```

### 3. 功能验证清单

#### 登录校验 (US0)

- [ ] 访问页面首先显示登录表单（账号 + 密码）
- [ ] 输入错误凭据显示「账号或密码错误」
- [ ] 输入 admin / aura1509 后进入管理页面
- [ ] 刷新页面保持登录状态（sessionStorage）
- [ ] 关闭标签页后重新访问需重新登录

#### 文章列表 (US1)

- [ ] 登录后显示所有文章的表格列表
- [ ] 搜索框输入关键词后列表实时过滤
- [ ] 标签下拉选择后列表按标签筛选
- [ ] 分页控件正常工作（上一页/下一页）
- [ ] 页面顶部显示文章总数

#### 新增文章 (US2)

- [ ] 点击「新增文章」按钮弹出模态框表单
- [ ] 表单仅包含 4 个字段：图片、标签、标题、内容
- [ ] 图片字段限制 webp/png/jpg 格式
- [ ] 填写所有字段后保存，新文章出现在列表
- [ ] 未填写必填字段时显示验证错误
- [ ] 点击「取消」关闭弹窗不保存

#### 编辑文章 (US3)

- [ ] 点击「编辑」按钮弹出表单，预填充图片/标签/标题/内容
- [ ] 修改字段后保存，列表中文章信息更新
- [ ] 点击「取消」不保存修改

#### 删除文章 (US4)

- [ ] 点击「删除」按钮弹出确认对话框
- [ ] 对话框显示即将删除的文章标题
- [ ] 确认删除后文章从列表消失
- [ ] 取消则不删除

#### 预览文章 (US5)

- [ ] 点击「预览」按钮在新标签页中打开 `/news/{slug}`
- [ ] 文章详情页内容与管理后台数据一致

### 4. 类型和构建检查

```bash
# TypeScript 类型检查
pnpm type-check

# ESLint 检查
pnpm lint

# 生产构建
pnpm build
```

## 关键文件

| 文件                                           | 用途                   |
| ---------------------------------------------- | ---------------------- |
| `src/app/admin/content/page.tsx`               | 页面路由入口           |
| `src/components/admin/AdminLoginGate.tsx`      | 登录校验组件           |
| `src/components/admin/ArticleTable.tsx`        | 文章表格组件           |
| `src/components/admin/ArticleFormModal.tsx`    | 新增/编辑弹窗（4字段） |
| `src/components/admin/ArticleDeleteDialog.tsx` | 删除确认框             |
| `src/components/admin/ArticleSearchBar.tsx`    | 搜索栏+筛选            |
| `src/components/admin/ArticlePagination.tsx`   | 分页控件               |
| `src/config/admin.ts`                          | 管理页面配置（凭据等） |
| `src/hooks/useAdminAuth.ts`                    | 登录状态管理           |
| `src/hooks/useArticleManager.ts`               | CRUD 状态管理          |
| `src/types/admin.ts`                           | 管理页面类型           |

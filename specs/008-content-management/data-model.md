# Data Model: 内容管理页面 (Content Management Page)

**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

## 复用的现有类型

### NewsArticle（来源：`src/types/news.ts`）

```typescript
export type NewsCategory = "breaking-news" | "event" | "about-aura";

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  category: NewsCategory;
  featuredImage: string;
  imageAlt: string;
  publishDate: string; // ISO 8601 格式 "YYYY-MM-DD"
  summary: string;
  content: string;
  cardSize: "large" | "small";
}
```

### NewsCategoryItem（来源：`src/types/news.ts`）

```typescript
export interface NewsCategoryItem {
  id: NewsCategory;
  label: string;
  order: number;
}
```

## 新增类型

### 文件：`src/types/admin.ts`

```typescript
import type { NewsArticle, NewsCategory } from "./news";

// ─── Auth ─────────────────────────────────────────────────────
/** 登录表单数据 */
export interface LoginFormData {
  username: string;
  password: string;
}

/** useAdminAuth hook 返回类型 */
export interface UseAdminAuthReturn {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

// ─── Article Form（精简 4 字段）──────────────────────────────
/** 新增/编辑文章表单数据 — 仅用户输入的 4 个字段 */
export interface ArticleFormData {
  image: string; // 图片路径（支持 webp/png/jpg）
  category: NewsCategory; // 标签（固定三选一）
  title: string; // 标题
  content: string; // 内容
}

/** 表单字段验证错误 */
export type ArticleFormErrors = Partial<Record<keyof ArticleFormData, string>>;

/** 表单模式：新增 or 编辑 */
export type FormMode = "create" | "edit";

// ─── Table & Filters ─────────────────────────────────────────
/** 搜索与筛选状态 */
export interface ArticleFilters {
  search: string;
  category: NewsCategory | "all";
}

/** 分页状态 */
export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

// ─── Modal State ──────────────────────────────────────────────
/** 文章表单模态框状态 */
export interface ArticleFormModalState {
  isOpen: boolean;
  mode: FormMode;
  editingArticle: NewsArticle | null;
}

/** 删除确认对话框状态 */
export interface DeleteDialogState {
  isOpen: boolean;
  article: NewsArticle | null;
}

// ─── Hook Return Type ─────────────────────────────────────────
/** useArticleManager hook 返回类型 */
export interface UseArticleManagerReturn {
  // 文章数据
  articles: NewsArticle[];
  filteredArticles: NewsArticle[];
  paginatedArticles: NewsArticle[];
  totalCount: number;

  // 筛选
  filters: ArticleFilters;
  setSearch: (search: string) => void;
  setCategoryFilter: (category: NewsCategory | "all") => void;

  // 分页
  pagination: PaginationState;
  goToPage: (page: number) => void;

  // CRUD 操作
  addArticle: (data: ArticleFormData) => void;
  updateArticle: (id: string, data: ArticleFormData) => void;
  deleteArticle: (id: string) => void;

  // 模态框状态
  formModal: ArticleFormModalState;
  openCreateModal: () => void;
  openEditModal: (article: NewsArticle) => void;
  closeFormModal: () => void;

  // 删除对话框状态
  deleteDialog: DeleteDialogState;
  openDeleteDialog: (article: NewsArticle) => void;
  closeDeleteDialog: () => void;

  // 工具函数
  generateSlug: (title: string) => string;
}
```

### 文件：`src/config/admin.ts`

```typescript
/** 管理员固定凭据 */
export const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "aura1509",
} as const;

/** sessionStorage key */
export const AUTH_STORAGE_KEY = "aura_admin_auth";

/** 分页配置 */
export const ADMIN_PAGE_SIZE = 10;

/** 支持的图片格式 */
export const ALLOWED_IMAGE_EXTENSIONS = [".webp", ".png", ".jpg", ".jpeg"];

/** 图片文件 accept 属性值 */
export const IMAGE_ACCEPT = "image/webp,image/png,image/jpeg";
```

## 数据流

```
                      ┌─────────────────────────┐
                      │   AdminLoginGate         │
                      │  (useAdminAuth hook)     │
                      │  sessionStorage 校验     │
                      └──────────┬──────────────┘
                                 │ 登录通过
                                 ▼
newsArticles (config/news.ts) ──▶ useArticleManager (hook)
                                 │
                    ┌────────────┼────────────────────┐
                    ▼            ▼                    ▼
            ArticleSearchBar  ArticleTable     ArticlePagination
            (搜索+筛选+新增)  (列表+操作按钮)   (分页)
                    │            │
                    ▼            ├──▶ ArticleFormModal (新增/编辑弹窗, 4字段)
                                └──▶ ArticleDeleteDialog (删除确认)
```

## 衍生字段自动生成规则

新增文章时，用户仅填写 4 个字段，系统自动生成其余 NewsArticle 字段：

| 衍生字段      | 生成规则                                                           |
| ------------- | ------------------------------------------------------------------ |
| id            | `"news-" + Date.now()` 唯一标识                                    |
| slug          | 从 title 生成：小写 → 非字母数字替换为连字符 → 去除连续/首尾连字符 |
| featuredImage | = image 字段值                                                     |
| imageAlt      | = title 字段值                                                     |
| publishDate   | = 当前日期 `new Date().toISOString().split("T")[0]`                |
| summary       | = content 前 150 字符（去除 HTML 标签后截取）                      |
| cardSize      | = "small"（默认值）                                                |

编辑文章时，仅更新 4 个用户字段及其关联的衍生字段（featuredImage、imageAlt），保留原有的 id、slug、publishDate、cardSize 不变。

## 字段验证规则

| 字段     | 必填 | 验证规则                                               |
| -------- | ---- | ------------------------------------------------------ |
| image    | ✅   | 非空，文件路径扩展名必须为 .webp / .png / .jpg / .jpeg |
| category | ✅   | 必须是 NewsCategory 有效值之一                         |
| title    | ✅   | 非空，最大长度 200 字符                                |
| content  | ✅   | 非空                                                   |

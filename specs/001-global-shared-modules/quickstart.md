# 快速启动：全局公共模块

**功能分支**: `001-global-shared-modules`
**日期**: 2026-02-26

## 前置条件

- Node.js 20 LTS
- pnpm（通过 `corepack enable` 启用）
- Git

## 项目初始化

```bash
# 1. 切换到功能分支
git checkout 001-global-shared-modules

# 2. 安装依赖
pnpm install

# 3. 启动开发服务器
pnpm dev
```

开发服务器启动后访问 `http://localhost:3000`。

## 验证公共模块

### Header 导航栏

1. 打开 `http://localhost:3000`
2. 确认顶部显示 "AURA" Logo（左侧）和 5 个导航链接（右侧）
3. 点击各导航链接，确认跳转正确且当前页面高亮为粉色
4. 点击 Logo 确认返回首页
5. 将浏览器窗口缩小到 768px 以下，确认导航折叠为汉堡菜单
6. 点击汉堡菜单确认抽屉展开/收起正常

### Download CTA 下载引导区

1. 在首页滚动到 Download 区域
2. 确认显示粉色渐变背景、标题、描述、品牌图标和两个商店按钮
3. 点击 App Store / Google Play 按钮确认跳转到正确的商店页面

### Footer 底部信息栏

1. 滚动到页面底部
2. 确认显示三组链接（Company / Support / Contact）
3. 确认社交媒体图标（Instagram / X / Facebook / YouTube）可点击并在新标签页打开
4. 确认版权文字显示正确年份
5. 缩小窗口确认移动端单列堆叠布局

### 年龄验证门禁

1. 清除浏览器 localStorage（DevTools → Application → Local Storage → 删除 `aura_age_verified`）
2. 刷新页面，确认全屏模态遮罩出现
3. 点击"确认"按钮，确认遮罩消失并能看到页面内容
4. 刷新页面，确认遮罩不再出现
5. 再次清除 localStorage，刷新页面，点击"拒绝"按钮，确认被重定向到外部页面

### Cookie 同意横幅

1. 清除 `aura_cookie_consent` 并确保 `aura_age_verified` 已设置
2. 刷新页面，确认底部出现 Cookie 横幅
3. 点击"接受"按钮，确认横幅消失
4. 刷新页面，确认横幅不再出现

## 配置文件位置

| 文件                       | 用途                   | 修改场景                         |
| -------------------------- | ---------------------- | -------------------------------- |
| `src/config/navigation.ts` | 导航菜单项             | 增删改导航链接                   |
| `src/config/footer.ts`     | Footer 链接 + 社交媒体 | 更新公司信息或社交账号           |
| `src/config/download.ts`   | 商店下载链接           | App Store / Google Play URL 变更 |
| `src/config/site.ts`       | 全站元数据             | 品牌名、版权年份、重定向 URL 等  |

## 关键命令

```bash
pnpm dev          # 启动开发服务器
pnpm build        # 生产构建
pnpm lint         # ESLint 检查
pnpm type-check   # TypeScript 类型检查 (tsc --noEmit)
```

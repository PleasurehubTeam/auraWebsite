# Quick Start: About 品牌故事页

**Branch**: `006-about-brand-story` | **Date**: 2026-02-27

## 前置条件

- Node.js 20 LTS（通过 `.nvmrc` 固定）
- pnpm 包管理器
- 项目依赖已安装（`pnpm install`）
- 开发服务器可正常启动（`pnpm dev`）
- `001-global-shared-modules` 和 `003-responsive-content-width` 功能已合并到当前分支

## 验证步骤

### 1. Hero 横幅

1. 启动开发服务器 `pnpm dev`
2. 浏览器访问 `http://localhost:3000/about`
3. **预期结果**: 全宽背景图展示，标题 "Brand Story" 和 slogan 居中显示
4. 检查导航栏中 "About" 菜单项处于高亮状态
5. 缩小浏览器窗口至 375px 宽度
6. **预期结果**: 标题和 slogan 自适应缩放，无水平溢出

### 2. 品牌宣言与数据统计

1. 向下滚动越过 Hero 横幅
2. **预期结果**: 品牌宣言 "Connect, share, and explore in an open and free space." 居中显示
3. 继续滚动至统计区进入视口
4. **预期结果**: 数字以翻转计数器动画从 0 翻转到目标值（12 和 1600000+）
5. 滚动离开再滚回
6. **预期结果**: 数字保持最终值，动画不重复

### 3. 分类 Tab 与画廊

1. 滚动至 Tab 标签栏区域
2. **预期结果**: "Social Contact" Tab 默认激活，粉色下划线指示器在其下方
3. 点击 "Share" Tab
4. **预期结果**: 指示器平滑滑动至 "Share"，画廊照片切换为 Share 分类内容，过渡 ≤ 300ms
5. 依次点击 "Brand" 和 "Activity"
6. **预期结果**: 每次切换画廊正确筛选，布局为不规则网格（大小卡片混搭）
7. 缩小窗口至移动端宽度
8. **预期结果**: 画廊降级为单列或双列布局

### 4. 加入社区 CTA

1. 滚动至页面底部（Footer 上方）
2. **预期结果**: 渐变背景（粉色到深色调）CTA 区块可见
3. 检查标题 "You can join Aura" 和说明文案居中显示
4. 检查 4 个社交媒体图标（Instagram、X、Facebook、YouTube）
5. 点击任一社交图标
6. **预期结果**: 对应社交平台在新标签页打开

### 5. 入场动画

1. 刷新页面，缓慢滚动
2. **预期结果**: 画廊图片以下滑渐显方式出现
3. **预期结果**: 统计区数字以翻转动画出现
4. **预期结果**: CTA 标题从左滑入+渐显，说明文案从右滑入+渐显
5. 开启系统减少动效设置后刷新页面
6. **预期结果**: 所有动画被禁用，内容立即显示

### 6. 性能检查

1. 在 Chrome DevTools 中打开 Lighthouse
2. 运行 Performance 审计（移动端模式）
3. **预期结果**: Performance 得分 ≥ 90
4. 检查 LCP < 2.5s，CLS < 0.1

## 配置文件位置

| 文件路径               | 用途                                            |
| ---------------------- | ----------------------------------------------- |
| src/config/about.ts    | About 页面所有内容数据（Hero、统计、画廊、CTA） |
| src/types/about.ts     | About 页面类型定义                              |
| src/app/about/page.tsx | About 页面主组件                                |
| src/components/about/  | About 页面专属组件目录                          |
| public/images/about/   | About 页面图片资源                              |
| src/config/footer.ts   | 社交媒体链接（CTA 复用）                        |

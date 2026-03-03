# 快速验证指南：Home 首页

**功能分支**: `002-home-page`
**日期**: 2026-02-26

## 前置条件

- `001-global-shared-modules` 已实现（Header、Footer、Download CTA、AgeGate、CookieBanner 可用）
- 开发服务器已启动: `pnpm dev`
- 图片素材已存放在 `/images/01Home/` 目录下

## 验证步骤

### 1. Hero 轮播区域

1. 打开首页 `http://localhost:3000`
2. **首屏渲染**: 确认 Hero 区域占满视口，可见主标题 Slogan、产品硬件渲染图、手机截图和下载按钮
3. **自动轮播**: 等待 5 秒，确认两版内容（女性版/男性版）以 crossfade 动画自动切换
4. **手动切换**: 点击轮播指示器，确认立即切换到对应版本并重置计时器
5. **下载按钮**: 点击 App Store / Google Play 按钮，确认跳转到正确的应用商店
6. **图片加载**: 刷新页面，确认 blur placeholder 先出现，然后图片淡入显示
7. **移动端**: 使用 DevTools 切换到 375px 视口，确认布局自适应重排

### 2. AI-Powered 标签切换模块

1. 滚动到 AI-Powered 区域
2. **默认状态**: 确认 "AI Customization" 标签默认选中，下方显示对应场景图和文案
3. **标签切换**: 点击 "Multimodal Chat Interaction" 标签
   - 确认标签指示器以滑动动画移动到新位置
   - 确认下方内容以 fade-in 动画替换
   - 确认切换在 300ms 内完成
4. **视觉区分**: 确认当前选中标签有明显视觉区分（加粗/下划线/色彩变化）
5. **移动端**: 375px 视口下标签可点击，图片自适应缩放

### 3. Classic Mode 展示模块

1. 滚动到 Classic Mode 区域
2. **视觉**: 确认深色/黑色背景，展示 App 经典遥控器界面截图
3. **模式标签**: 确认 "Thrusting / Shock / Heating" 三种模式标签可见
4. **图标网格**: 确认功能图标网格（静态展示），每个图标有名称标签
5. **移动端**: 375px 视口下图标网格自适应重排

### 4. Solo Play 标签切换模块

1. 滚动到 Solo Play 区域
2. **四标签**: 确认四个标签可见（Slide Model、Voice Control Model、Video Sync、Music Sync）
3. **默认选中**: 确认第一个标签（Slide Model）默认选中
4. **逐一切换**: 依次点击每个标签
   - 确认标签指示器滑动动画
   - 确认内容 fade-in 切换
   - 确认每个标签下的描述文案不同且准确
5. **移动端**: 375px 视口下四个标签仍可操作

### 5. Remote Control 展示模块

1. 滚动到 Remote Control Model 区域
2. **内容**: 确认标题、描述文案（异地伴侣互动场景）和场景图片可见
3. **移动端**: 375px 视口下布局正常

### 6. 剧本杀横向卡片组

1. 滚动到 "Immersive Erotic Murder Mystery Script" 区域
2. **标题和文案**: 确认标题和描述文案可见
3. **卡片展示**: 确认角色卡片横向排列，至少 4 张可见
4. **桌面端操作**:
   - 点击左/右箭头按钮，确认卡片组平滑横向滚动
   - 拖拽卡片区域，确认跟随手势
5. **悬停效果**: 鼠标悬停在卡片上，确认微缩放或遮罩效果
6. **移动端**: 375px 视口下手指左右滑动，确认卡片跟随手势滑动
7. **流畅度**: 滑动过程无卡顿（DevTools Performance 面板确认 60fps）

### 7. Mode Function 图标网格

1. 滚动到 Mode Function 区域
2. **图标**: 确认 8 个模式图标卡片可见（Default、Classic、AI Lover、Creation、Sound、Video、Musical、Remote）
3. **布局**: 桌面端确认两行四列（4×2）网格排列
4. **移动端**: 375px 视口下网格自适应重排，图标和文字可读

### 8. 滚动入场动画

1. 刷新页面，从顶部开始
2. **入场动画**: 缓慢向下滚动，确认每个功能模块在首次进入视口时播放 fade-in-up 动画（约 0.5-0.8 秒）
3. **只播放一次**: 回滚再向下滚动，确认已播放过动画的模块不再重复
4. **减弱动画**: 在系统设置中开启 "Reduce motion"（macOS: System Settings → Accessibility → Display → Reduce motion），刷新页面，确认所有动画被跳过

### 9. 响应式验证

在 DevTools 中依次测试以下视口：

| 视口宽度 | 验证项                                             |
| -------- | -------------------------------------------------- |
| 320px    | 最窄移动端：无水平溢出，所有文字可读，图片等比缩放 |
| 375px    | iPhone 标准：布局正常，按钮可点击                  |
| 768px    | 平板端：布局从单列切换到多列                       |
| 1280px   | 桌面端：完整布局，图标网格 4×2                     |
| 2560px   | 超宽屏：内容居中，无拉伸变形                       |

### 10. 性能验证

1. 运行 `pnpm build && pnpm start`（生产环境构建）
2. Chrome DevTools → Lighthouse → Performance 审计
   - 确认 Performance 分数 ≥ 90
   - 确认 LCP < 2.5s
   - 确认 CLS < 0.1
3. Network 面板确认 Hero 首屏图片使用 `preload` 加载

## 配置文件位置

| 文件                                       | 用途                             |
| ------------------------------------------ | -------------------------------- |
| `src/config/home.ts`                       | 首页所有文案、图片路径、标签数据 |
| `src/types/home.ts`                        | 首页 TypeScript 类型定义         |
| `src/components/home/*.tsx`                | 首页各区域模块组件               |
| `src/components/ui/TabSwitcher.tsx`        | 可复用标签切换组件               |
| `src/components/ui/HorizontalCarousel.tsx` | 可复用横向滑动卡片组件           |
| `src/components/ui/ScrollReveal.tsx`       | 滚动入场动画包装组件             |

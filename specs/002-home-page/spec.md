# 功能规格说明：Home 首页

**功能分支**: `002-home-page`
**创建日期**: 2026-02-26
**状态**: 草稿
**输入**: 用户描述："按照设计稿（图1 女性版、图2 男性版）构建 Aura 官网 Home 首页"
**依赖**: `001-global-shared-modules`（Header、Footer、Download CTA 已在公共模块中定义）

## 用户场景与测试 _(必填)_

### 用户故事 1 - 首屏品牌冲击与下载引导 (优先级: P1)

访客首次进入 Aura 官网首页，看到一个视觉冲击力强的 Hero 区域，展示产品硬件渲染图、App 界面手机截图、核心 Slogan 和下载按钮，快速理解品牌定位并产生下载兴趣。

**优先级理由**: Hero 区域是访客的第一印象，直接影响跳出率和转化率。首屏必须在 3 秒内传达品牌价值主张。

**独立测试**: 访客打开首页，看到大标题 Slogan、产品图和手机截图、App Store / Google Play 下载按钮，无需滚动即可理解"这是一个 AI 智能情趣产品品牌"并可立即下载。

**验收场景**:

1. **假设**访客首次打开首页，**当**页面加载完成，**则**看到占满视口的 Hero 区域，包含：主标题 Slogan（"AI-Powered Intelligent Sensory Technology Redefines Intimacy."）、产品硬件渲染图、App 界面手机截图、App Store 和 Google Play 下载按钮
2. **假设**首页存在两版 Hero 内容（女性受众版/图1 和男性受众版/图2），**当**页面加载时，**则**默认显示其中一版，可通过轮播/切换机制查看另一版
3. **假设**访客在 Hero 区域，**当**他们点击 App Store 或 Google Play 按钮，**则**跳转到对应应用商店（同公共模块 Download CTA 行为）
4. **假设**访客在移动设备上查看 Hero 区域，**当**视口 < 768 px，**则**布局自适应重排，图片和按钮保持可见可点击

---

### 用户故事 2 - AI 功能亮点浏览 (优先级: P1)

访客向下滚动，看到 "AI-Powered" 功能模块，通过标签卡（Tab）在 "AI Customization" 和 "Multimodal Chat Interaction" 之间切换，查看不同 AI 功能的场景图和描述文案。

**优先级理由**: AI 功能是产品核心差异化卖点，直接影响访客对产品智能化的感知，是转化决策的关键因素。

**独立测试**: 访客看到 "AI-Powered" 标题，两个可切换的标签（AI Customization / Multimodal Chat Interaction），点击不同标签下方内容（图片 + 文案）随之切换。

**验收场景**:

1. **假设**访客滚动到 AI-Powered 区域，**当**他们查看该模块，**则**看到 "AI-Powered" 标题和两个标签（"AI Customization" 和 "Multimodal Chat Interaction"），默认选中第一个标签
2. **假设**当前选中 "AI Customization" 标签，**当**访客点击 "Multimodal Chat Interaction" 标签，**则**标签指示器以滑动动画移动到新标签位置，下方的场景图和描述文案以渐现（fade-in）动画覆盖替换为对应内容
3. **假设**访客在移动端，**当**他们查看 AI-Powered 模块，**则**标签可点击，图片自适应缩放，文案可读

---

### 用户故事 3 - 产品模式概览 (优先级: P2)

访客继续滚动，依次浏览 Classic Mode（经典模式）、Solo Play（单人模式）、Remote Control Model（远程控制）三个功能展示区域，了解产品的多种使用场景。

**优先级理由**: 这些模块展示产品的核心使用场景，帮助访客建立完整的产品认知，是 Hero 之后的深度信息层。

**独立测试**: 访客可以看到三个功能模块的独立展示区域，Solo Play 区域的四个标签（Slide Model / Voice Control Model / Video Sync / Music Sync）可切换，每个模块有对应的图片和描述文字。

**验收场景**:

1. **假设**访客滚动到 Classic Mode 区域，**当**他们查看该模块，**则**看到 "Classic Mode" 标题、深色/黑色背景、App 经典遥控器界面截图，以及 "Thrusting / Shock / Heating" 三种模式的功能图标网格
2. **假设**访客滚动到 Solo Play 区域，**当**他们查看该模块，**则**看到 "Solo Play" 标题和四个标签（Slide Model、Voice Control Model、Video Sync、Music Sync），默认选中第一个标签，下方显示对应的场景图和描述文案
3. **假设**访客点击 Solo Play 的 "Video Sync" 标签，**当**标签被激活，**则**标签指示器以滑动动画移动到新位置，下方图片和文案以渐现（fade-in）动画覆盖替换为 Video Sync 对应内容，当前标签加粗/高亮
4. **假设**访客滚动到 Remote Control Model 区域，**当**他们查看该模块，**则**看到 "Remote Control Model" 标题、描述文案和伴侣互动场景图

---

### 用户故事 4 - 剧本杀内容探索 (优先级: P2)

访客滚动到 "Immersive Erotic Murder Mystery Script" 区域，通过横向滑动浏览多张剧本角色卡片，了解沉浸式剧本互动功能。

**优先级理由**: 剧本杀功能是产品的创新特色之一，需要通过视觉吸引力强的卡片组呈现，是差异化体验的重要组成部分。

**独立测试**: 访客看到剧本杀区域的标题和描述文案，以及一排可横向滑动的角色卡片，在桌面端可拖拽或使用箭头翻页，在移动端可手指滑动。

**验收场景**:

1. **假设**访客滚动到剧本杀区域，**当**他们查看该模块，**则**看到 "Immersive Erotic Murder Mystery Script" 标题、描述文案和一组横向排列的角色/剧本封面卡片
2. **假设**卡片数量超过可视区域宽度，**当**访客在桌面端拖拽或点击箭头，**则**卡片组平滑横向滚动展示更多卡片
3. **假设**访客在移动端，**当**他们用手指左右滑动卡片区域，**则**卡片组跟随手势平滑滑动
4. **假设**卡片可见，**当**鼠标悬停在某张卡片上（桌面端），**则**卡片出现微缩放或遮罩等悬停效果

---

### 用户故事 5 - Mode Function 功能一览 (优先级: P3)

访客滚动到 "Mode Function" 区域，看到一个图标网格展示所有可用模式（Default、Classic、AI Lover、Creation、Sound、Video、Musical、Remote），快速了解产品功能丰富度。

**优先级理由**: 作为功能汇总模块，为访客提供产品功能的完整概览，优先级低于详细功能展示模块。

**独立测试**: 访客看到 "Mode Function" 标题和 8 个模式图标（每个含图标和标签文字），网格布局整齐。

**验收场景**:

1. **假设**访客滚动到 Mode Function 区域，**当**他们查看该模块，**则**看到 "Mode Function" 标题和 8 个模式图标卡片，每张卡片包含一个圆形/方形产品图标和底部标签文字（Default、Classic、AI Lover、Creation、Sound、Video、Musical、Remote）
2. **假设**访客在桌面端，**当**他们查看图标网格，**则**图标以两行四列（4×2）网格排列
3. **假设**访客在移动端，**当**他们查看图标网格，**则**网格自适应重排（如两行四列或多行排列），保持图标和文字可读

---

### 用户故事 6 - 滚动视觉体验 (优先级: P3)

访客从上到下滚动整个首页时，各功能模块在进入视口时具有渐显动画效果（如从下往上淡入），提升网站的高端质感。

**优先级理由**: 动画效果增强品牌质感但不影响功能使用，属于体验增强层。

**独立测试**: 访客滚动页面，各模块在首次进入视口时播放一次入场动画（如 fade-in-up），不影响内容可读性。

**验收场景**:

1. **假设**访客开始向下滚动页面，**当**某个功能模块首次进入视口可见区域，**则**该模块以渐显动画（如从下方淡入上移）出现，动画时长约 0.5-0.8 秒
2. **假设**模块已完成入场动画，**当**访客继续滚动或回滚，**则**该模块保持可见状态，不再重复播放动画
3. **假设**访客禁用了系统动画偏好（`prefers-reduced-motion`），**当**页面加载时，**则**所有滚动动画被跳过，内容直接显示

---

### 边界情况

- 首页 Hero 区域的两版内容（图1/图2）如何切换？默认采用自动轮播（5 秒间隔），同时支持手动切换指示器。
- 标签卡切换时图片尚未加载怎么办？显示占位骨架屏（skeleton），图片加载完成后淡入替换。
- 横向卡片组（剧本杀）在没有足够卡片时怎么办？至少展示 4 张卡片；不足则居中显示，隐藏滑动箭头。
- 在极窄视口（< 320 px）上怎么办？各模块垂直堆叠，图片等比缩放，无水平溢出。
- Hero 区域大图加载慢怎么办？使用 blur placeholder 占位，首屏图片以高优先级加载（`priority` 属性）。
- 所有动画是否影响性能？动画仅使用 CSS transforms 和 opacity，不触发布局重排。

## 需求 _(必填)_

### 功能需求

**Hero 区域**

- **FR-001**: 首页顶部必须展示一个全宽 Hero 区域，包含主标题 Slogan、产品硬件渲染图、App 界面手机截图和 App Store / Google Play 下载按钮
- **FR-002**: Hero 区域必须支持两版内容的展示（女性受众版和男性受众版），通过自动轮播（5 秒间隔）和手动切换指示器进行切换
- **FR-003**: Hero 区域的下载按钮行为必须与公共模块 Download CTA 一致，URL 来自集中配置

**AI-Powered 模块**

- **FR-004**: 必须展示 "AI-Powered" 标题和两个可切换标签（"AI Customization" / "Multimodal Chat Interaction"）
- **FR-005**: 点击标签时，标签指示器必须以滑动动画（sliding）移动到新标签位置，下方的场景图和描述文案必须以渐现（fade-in）动画覆盖替换旧内容；当前选中标签必须有视觉区分（加粗/下划线/色彩变化）

**Classic Mode 模块**

- **FR-006**: 必须展示 "Classic Mode" 标题、深色/黑色背景区域、App 经典遥控器界面截图和 "Thrusting / Shock / Heating" 三种模式标签
- **FR-007**: 模式标签下方必须展示功能图标网格（如 AI Control Unique Experience、A audible Fingerprint Audible 等），每个图标有名称标签

**Solo Play 模块**

- **FR-008**: 必须展示 "Solo Play" 标题和四个可切换标签（Slide Model、Voice Control Model、Video Sync、Music Sync）
- **FR-009**: 点击标签时，标签指示器必须以滑动动画（sliding）移动到新标签位置，下方的场景图和描述文案必须以渐现（fade-in）动画覆盖替换旧内容；当前选中标签必须加粗显示
- **FR-010**: 每个标签下的描述文案必须独立，准确对应该模式的功能说明

**Remote Control Model 模块**

- **FR-011**: 必须展示 "Remote Control Model" 标题、描述文案（强调异地伴侣互动场景）和对应的场景图片

**剧本杀模块**

- **FR-012**: 必须展示 "Immersive Erotic Murder Mystery Script" 标题、描述文案和一组横向滑动的角色/剧本封面卡片
- **FR-013**: 卡片组必须支持横向滑动/拖拽浏览，桌面端支持拖拽或箭头控制，移动端支持手势滑动
- **FR-014**: 卡片必须展示角色封面图，鼠标悬停时有微缩放或遮罩效果

**Mode Function 模块**

- **FR-015**: 必须展示 "Mode Function" 标题和 8 个模式图标卡片（Default、Classic、AI Lover、Creation、Sound、Video、Musical、Remote），每张卡片包含产品图标和底部标签文字
- **FR-016**: 图标网格在桌面端必须以两行四列排列，移动端自适应重排

**滚动动画**

- **FR-017**: 各功能模块在首次进入视口时必须播放渐显入场动画（如 fade-in-up），动画时长 0.5-0.8 秒
- **FR-018**: 入场动画只播放一次，后续滚动不再重复
- **FR-019**: 当用户系统启用了 `prefers-reduced-motion` 时，所有动画必须被跳过

**通用**

- **FR-020**: 首页所有模块必须在移动端（320 px+）、平板端（768 px+）和桌面端（1280 px+）完全响应式适配
- **FR-021**: 首页所有文案和图片路径必须从配置数据文件读取（内容与展示分离），不得在模板中硬编码
- **FR-022**: 首页 Hero 区域的首屏图片必须以高优先级加载，并使用 blur 占位符防止布局偏移

### 关键实体

- **HeroSlide（首屏轮播项）**: 代表 Hero 区域的一版内容——主标题、副标题/Slogan、产品硬件图、手机截图图、背景图、受众标识（female/male）
- **TabSection（标签切换模块）**: 代表一个可切换标签的功能展示区域——模块标题、标签列表，每个标签包含标签名、描述文案、场景图片
- **CarouselCard（轮播卡片）**: 代表剧本杀横向卡片组中的一张卡片——封面图片、可选标题
- **ModeItem（模式图标）**: 代表 Mode Function 网格中的一个图标——图标图片、标签文字

## 素材清单

图片素材目录: `/images/home/`

| 文件名                     | 格式 | 对应模块       | 说明                    |
| -------------------------- | ---- | -------------- | ----------------------- |
| aura-logo.svg              | SVG  | Hero / 通用    | 品牌 Logo               |
| aura-index-banner-01a.webp | WebP | Hero 女性版    | 首屏背景/人物图 a       |
| aura-index-banner-01a.png  | PNG  | Hero 女性版    | 同上（PNG 备用）        |
| aura-index-banner-01b.webp | WebP | Hero 女性版    | 首屏背景/人物图 b       |
| aura-index-banner-02.png   | PNG  | Hero 男性版    | 首屏背景/产品图         |
| aura-index-banner-02a.webp | WebP | AI-Powered     | AI Customization 场景图 |
| aura-index-banner-02b.webp | WebP | AI-Powered     | Multimodal Chat 场景图  |
| aura-index-banner-02c.webp | WebP | Solo Play      | 场景图 c                |
| aura-index-banner-02d.webp | WebP | Solo Play      | 场景图 d                |
| aura-index-banner-03.webp  | WebP | Classic Mode   | 经典模式 App 界面       |
| aura-index-banner-03a.png  | PNG  | Solo Play      | Slide Model 场景图      |
| aura-index-banner-03b.png  | PNG  | Solo Play      | Voice Control 场景图    |
| aura-index-banner-03c.png  | PNG  | Solo Play      | Video Sync 场景图       |
| aura-index-banner-03d.png  | PNG  | Solo Play      | Music Sync 场景图       |
| aura-index-banner-04.png   | PNG  | 剧本杀         | 剧本角色卡片素材        |
| aura-index-product-01.png  | PNG  | Hero 女性版    | 产品硬件渲染图          |
| aura-index-product-02.png  | PNG  | Hero 男性版    | 产品硬件渲染图          |
| aura-index-icon.png        | PNG  | Mode Function  | 模式图标素材            |
| aura-index-icon-01.svg     | SVG  | Classic Mode   | 功能图标                |
| aura-index-icon-02.png     | PNG  | Remote Control | 远程控制场景图          |
| aura-index-icon-01.png     | PNG  | Mode Function  | 模式图标 01             |
| aura-index-icon-02.png     | PNG  | Mode Function  | 模式图标 02             |
| aura-index-icon-07.svg     | SVG  | Classic Mode   | 功能图标 07             |
| aura-index-icon-08.svg     | SVG  | Classic Mode   | 功能图标 08             |
| aura-index-icon-09.svg     | SVG  | Classic Mode   | 功能图标 09             |
| aura-index-icon-10.svg     | SVG  | Classic Mode   | 功能图标 10             |

## 成功标准 _(必填)_

### 可量化成果

- **SC-001**: 首页 Hero 区域在标准宽带连接下 2.5 秒内完成首屏渲染（包含主图和下载按钮可见）
- **SC-002**: 所有标签切换交互（AI-Powered、Solo Play）在点击后 300 毫秒内完成内容切换，用户感知为即时响应
- **SC-003**: 剧本杀卡片横向滑动流畅度达到 60 fps，无卡顿或跳帧
- **SC-004**: 首页所有模块在 320 px 至 2560 px 宽的视口范围内正确渲染（无水平溢出、无元素重叠、所有文字可读）
- **SC-005**: 首页从顶部到底部的完整内容结构一致性：访客能清晰识别 7 个独立模块（Hero → AI-Powered → Classic Mode → Solo Play → Remote Control → 剧本杀 → Mode Function），信息层次分明
- **SC-006**: Hero 区域两版内容自动轮播正常运行，5 秒切换一次，手动切换立即响应

## Clarifications

### Session 2026-02-26

- Q: Tab 切换的动画效果是什么？ → A: 标签指示器使用滑动（sliding）动画移动到新标签位置，内容区域使用渐现（fade-in）动画覆盖替换旧内容

## 假设条件

- Hero 区域的两版内容（女性版/男性版）通过自动轮播实现，不做基于用户来源的动态 A/B 分流（后续迭代可增加）
- 首页底部的 Download CTA 区域和 Footer 由公共模块（001-global-shared-modules）提供，本功能不重复实现
- 所有产品图片素材已存放在 `/images/home/` 目录下，开发时直接引用
- Classic Mode 区域的功能图标网格为静态展示（不可交互），仅展示图标和标签
- 标签切换（AI-Powered、Solo Play）使用客户端交互，无需请求服务端数据
- 首页不包含视频播放功能（设计稿中无视频元素），所有展示内容为图片和文字
- 滚动动画使用 Intersection Observer 触发（或等效机制），不依赖滚动位置精确计算

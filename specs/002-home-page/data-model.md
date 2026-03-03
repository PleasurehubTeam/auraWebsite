# 数据模型：Home 首页

**功能分支**: `002-home-page`
**日期**: 2026-02-26

## 实体定义

本功能无后端数据库，所有数据以 TypeScript 类型 + 常量文件形式存在于前端代码中。以下定义实体的类型结构和数据来源。

### HeroSlide（首屏轮播项）

表示 Hero 区域的一版内容（女性受众版或男性受众版）。

| 字段            | 类型              | 必填 | 说明                                                                                |
| --------------- | ----------------- | ---- | ----------------------------------------------------------------------------------- |
| id              | string            | 是   | 唯一标识（如 "female"、"male"）                                                     |
| audience        | "female"\| "male" | 是   | 受众标识，决定轮播顺序和指示器                                                      |
| slogan          | string            | 是   | 主标题 Slogan（如 "AI-Powered Intelligent Sensory Technology Redefines Intimacy."） |
| subtitle        | string            | 否   | 副标题/补充文案                                                                     |
| productImage    | string            | 是   | 产品硬件渲染图路径                                                                  |
| phoneScreenshot | string            | 是   | App 界面手机截图路径                                                                |
| backgroundImage | string            | 是   | 全屏背景图路径                                                                      |

**数据来源**: `src/config/home.ts` 静态常量数组 `heroSlides`
**数量**: 固定 2 项（女性版、男性版）

**素材映射**:

| 字段            | 女性版 (female)           | 男性版 (male)            |
| --------------- | ------------------------- | ------------------------ |
| productImage    | Aura_index_product01.png  | Aura_index_product02.png |
| backgroundImage | Aura_index_banner01a.webp | Aura_index_banner02.png  |
| phoneScreenshot | Aura_index_banner01b.webp | （同背景图组合）         |

### TabItem（标签项）

表示 TabSwitcher 组件中的一个标签及其对应内容。

| 字段        | 类型   | 必填 | 说明                                             |
| ----------- | ------ | ---- | ------------------------------------------------ |
| id          | string | 是   | 唯一标识（如 "ai-customization"、"slide-model"） |
| label       | string | 是   | 标签显示文字（如 "AI Customization"）            |
| description | string | 是   | 该标签下的描述文案                               |
| image       | string | 是   | 该标签下的场景图片路径                           |

**数据来源**: 嵌套在 `TabSectionData` 中

### TabSectionData（标签切换模块数据）

表示一个完整的标签切换功能展示区域。

| 字段     | 类型      | 必填 | 说明                                         |
| -------- | --------- | ---- | -------------------------------------------- |
| id       | string    | 是   | 模块唯一标识（如 "ai-powered"、"solo-play"） |
| title    | string    | 是   | 模块主标题（如 "AI-Powered"、"Solo Play"）   |
| subtitle | string    | 否   | 模块副标题或补充说明                         |
| tabs     | TabItem[] | 是   | 该模块的标签列表                             |

**数据来源**: `src/config/home.ts` 静态常量对象
**实例**:

- AI-Powered 模块: 2 个标签（AI Customization、Multimodal Chat Interaction）
- Solo Play 模块: 4 个标签（Slide Model、Voice Control Model、Video Sync、Music Sync）

**素材映射（AI-Powered）**:

| TabItem.id       | image                     |
| ---------------- | ------------------------- |
| ai-customization | Aura_index_banner02a.webp |
| multimodal-chat  | Aura_index_banner02b.webp |

**素材映射（Solo Play）**:

| TabItem.id    | image                    |
| ------------- | ------------------------ |
| slide-model   | Aura_index_banner03a.png |
| voice-control | Aura_index_banner03b.png |
| video-sync    | Aura_index_banner03c.png |
| music-sync    | Aura_index_banner03d.png |

### ClassicModeData（经典模式模块数据）

表示 Classic Mode 区域的展示内容。

| 字段          | 类型                 | 必填 | 说明                                              |
| ------------- | -------------------- | ---- | ------------------------------------------------- |
| title         | string               | 是   | 模块标题（"Classic Mode"）                        |
| subtitle      | string               | 否   | 补充文案                                          |
| appScreenshot | string               | 是   | App 经典遥控器界面截图路径                        |
| modeLabels    | string[]             | 是   | 模式标签列表（["Thrusting", "Shock", "Heating"]） |
| features      | ClassicModeFeature[] | 是   | 功能图标网格数据                                  |

**数据来源**: `src/config/home.ts` 静态常量对象

### ClassicModeFeature（经典模式功能图标）

表示 Classic Mode 功能图标网格中的一个图标项。

| 字段  | 类型   | 必填 | 说明                                              |
| ----- | ------ | ---- | ------------------------------------------------- |
| id    | string | 是   | 唯一标识                                          |
| label | string | 是   | 图标名称标签（如 "AI Control Unique Experience"） |
| icon  | string | 是   | 图标图片路径（SVG/PNG）                           |

**数据来源**: 嵌套在 `ClassicModeData.features` 中

**素材映射**:

| 图标        | 文件                  |
| ----------- | --------------------- |
| 功能图标 01 | Aura_index_icon01.svg |
| 功能图标 07 | Aura_index_Icon07.svg |
| 功能图标 08 | Aura_index_Icon08.svg |
| 功能图标 09 | Aura_index_Icon09.svg |
| 功能图标 10 | Aura_index_Icon10.svg |

### RemoteControlData（远程控制模块数据）

表示 Remote Control Model 区域的展示内容。

| 字段        | 类型   | 必填 | 说明                               |
| ----------- | ------ | ---- | ---------------------------------- |
| title       | string | 是   | 模块标题（"Remote Control Model"） |
| description | string | 是   | 描述文案（强调异地伴侣互动场景）   |
| image       | string | 是   | 场景图片路径                       |

**数据来源**: `src/config/home.ts` 静态常量对象

**素材映射**: `Aura_index_icon02.png`

### CarouselCard（剧本杀轮播卡片）

表示剧本杀横向卡片组中的一张卡片。

| 字段  | 类型   | 必填 | 说明          |
| ----- | ------ | ---- | ------------- |
| id    | string | 是   | 唯一标识      |
| title | string | 否   | 角色/剧本名称 |
| image | string | 是   | 封面图片路径  |

**数据来源**: `src/config/home.ts` 静态常量数组 `mysteryCards`
**数量**: 至少 4 张卡片（规格边界条件要求）

**素材映射**: `Aura_index_banner04.png`（包含多角色卡片素材，开发时按角色裁切或使用多张图片）

### ModeItem（模式图标项）

表示 Mode Function 网格中的一个模式图标。

| 字段  | 类型   | 必填 | 说明                                            |
| ----- | ------ | ---- | ----------------------------------------------- |
| id    | string | 是   | 唯一标识                                        |
| label | string | 是   | 模式名称（如 "Default"、"Classic"、"AI Lover"） |
| icon  | string | 是   | 图标图片路径                                    |

**数据来源**: `src/config/home.ts` 静态常量数组 `modeItems`
**数量**: 固定 8 项（Default、Classic、AI Lover、Creation、Sound、Video、Musical、Remote）

**素材映射**:

| 用途             | 文件                   |
| ---------------- | ---------------------- |
| 模式图标通用素材 | Aura_index_icon.png    |
| 模式图标 01      | Aura_index_icon_01.png |
| 模式图标 02      | Aura_index_icon_02.png |

## 实体关系

```text
HomePageData (1)
├── heroSlides: HeroSlide[] (2)
│   └── 被 HeroSection 消费，支持 crossfade 轮播
│
├── aiPowered: TabSectionData (1)
│   ├── tabs: TabItem[] (2)
│   └── 被 AIPoweredSection → TabSwitcher 消费
│
├── classicMode: ClassicModeData (1)
│   ├── features: ClassicModeFeature[] (5+)
│   └── 被 ClassicModeSection 消费
│
├── soloPlay: TabSectionData (1)
│   ├── tabs: TabItem[] (4)
│   └── 被 SoloPlaySection → TabSwitcher 消费
│
├── remoteControl: RemoteControlData (1)
│   └── 被 RemoteControlSection 消费
│
├── mysteryCards: CarouselCard[] (4+)
│   └── 被 MysteryScriptSection → HorizontalCarousel 消费
│
└── modeItems: ModeItem[] (8)
    └── 被 ModeFunctionSection 消费

可复用组件关系:
TabSwitcher ← AI-Powered (2 tabs) + Solo Play (4 tabs)
HorizontalCarousel ← 剧本杀卡片组
ScrollReveal ← 所有 Section 组件的入场动画包装
```

## 配置文件结构

所有首页内容数据集中在一个配置文件中：

```text
src/config/home.ts
├── heroSlides: HeroSlide[]           # 2 项
├── aiPoweredSection: TabSectionData  # 含 2 个 TabItem
├── classicModeSection: ClassicModeData # 含 features[]
├── soloPlaySection: TabSectionData   # 含 4 个 TabItem
├── remoteControlSection: RemoteControlData
├── mysteryCards: CarouselCard[]      # 4+ 项
├── modeItems: ModeItem[]             # 8 项
└── mysteryScriptSection: { title, description } # 剧本杀区域标题和描述
```

类型定义集中在：`src/types/home.ts`

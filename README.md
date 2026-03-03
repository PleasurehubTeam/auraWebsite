这是一个云漪产品的官网信息
一、 全局公共模块 (Global Modules)
这是贯穿整个网站所有页面的基础模块。

顶部导航栏 (Header):

品牌 Logo: 点击返回首页。

主导航菜单: Home (首页), APP (应用详情), News (新闻动态), About (关于品牌), Explore (探索社区)。支持当前页面状态高亮显示。

底部信息栏 (Footer):

分类链接组:

Company (关于我们, 下载APP, 隐私政策, 用户协议, 社区准则等)

Support (常见问题, 联系我们等)

联系方式: 地址、客服邮箱。

社交媒体矩阵 (Follow Us): Instagram, X (Twitter), Facebook, YouTube 图标及外链跳转。

版权信息 (Copyright): 底部居中或靠左显示。

全局转化组件 (CTA - Call to Action):

多处分布的 Download (下载应用) 模块：包含 App Store 和 Google Play 的下载按钮（支持点击跳转对应商店，移动端支持唤起商店，PC端可考虑hover展示二维码）。

响应式布局 (Responsive Design): 需适配 PC端、平板端以及移动端 (Mobile) 的浏览体验。

二、 核心页面功能梳理 (Core Pages)

1. Home 首页 (图1、图2)
   注：图1和图2排版一致，但展示的产品和受众画像（女性/男性）不同。这表明首页可能需要支持首屏轮播，或者网站有男女受众版本的切换功能。

首屏 Hero Section: 大标题 + 产品硬件渲染图 + App界面手机图 + 核心Slogan + 下载按钮。

功能模块展示卡片 (需具备滚动视差或渐显动画):

AI Powered: 包含标签卡切换功能 (Tab Switch)。例如点击 "AI Customization" 或 "Multimodal Chat Interaction" 切换下方对应的场景图和文案。

Classic Mode: 展示App的经典遥控器界面图（震动、脉冲等模式）。

Solo Play (单人模式): 包含多个子标签卡 (Slide Mode, Voice Control Mode, Video Sync, Music Sync)。点击不同标签，下方图片（展示模特与App使用场景）跟随切换。

Remote Control Mode (异地遥控): 伴侣互动场景图文介绍。

Immersive Erotic Murder Mystery Script (沉浸式剧本): 横向滑动的卡片组 (Carousel / Slider)，展示不同的角色扮演/剧本封面图。

Music Function: 音乐/白噪音功能界面展示。

2. APP 应用详情页 (图3)
   此页面侧重于深度解析App的软件功能。

首屏展示: 多部手机Mockup组合图，展示App内丰富界面 + 居中下载按钮。

功能特性列表 (垂直图文穿插排版，建议加入滚动监听动画):

Customized AI Digital Companion: AI数字伴侣定制图文。

Multimodal chat interaction: 多模态聊天（文字、语音、视频）图文。

360° Precise Toy Control: 360度精准控制图文。

Precise behavior recognition...: 行为识别与玩具联动图文。

A community for like-minded...: 社区功能图文。

Immersive Erotic Murder Mystery...: 剧本杀功能复用图文。

底部强转化区: 大面积沉浸式渐变背景 + 品牌Logo + 醒目下载按钮。

3. News 新闻中心页 (图4)
   品牌动态、公关稿件和活动发布阵地。

首屏 Banner: 视觉冲击力强的背景图 + 标题 "Aura News Center" + 副标题。

新闻分类 Tab (分类筛选): Breaking news, Event, About Aura。点击不同Tab异步加载或过滤下方的新闻列表。

新闻列表瀑布流/网格 (Grid/Masonry Layout):

以图文卡片形式展示文章 ("My Aura stories")。

具备鼠标悬停效果 (Hover effects，如图片微缩放、遮罩等)。

隐藏功能: 点击卡片需跳转至【新闻详情页】（虽然设计图未给出，但必须有详情页模板，包含大图、正文排版、社交分享按钮）。

4. About 品牌故事页 (图5)
   传递品牌价值观和用户数据。

首屏 Banner: 情感化的大图/视频背景 + "Brand Story" 标题 + Slogan。

数据统计模块 (Stats Section):

展示覆盖国家数 ("12 Country") 和全球用户数 ("1600000+ Global Users")。建议开发数字动态递增动画 (Number Counter)。

品牌动态/分类展示区:

分类 Tab: Social Contact, Share, Brand, Activity。

下方为不规则的瀑布流图片展示区。

加入社区 CTA: 引导用户加入品牌的号召文案。

5. Explore 探索/社区页 (图6)
   强调UGC（用户生成内容）或品牌精选的生活方式图片墙。

首屏 Banner: "Community Story" 标题 + 温暖色调背景图 + 社区介绍段落。

照片墙/画廊模块 (Gallery/Masonry):

大面积的瀑布流图片展示（"My Aura stories"）。

此模块如果是真实UGC，需要后台有审核机制；如果是官方发布的Lookbook/宣传图，需要后台支持批量上传和排版配置。

三、 后台管理系统 (CMS) 需求建议
为了让运营团队能够日常维护这个网站，前端展示的背后需要以下后台功能：

Banner/首屏管理: 能够更换各个页面的首屏背景图/视频、主标题文案以及下载按钮的链接。

App 下载链接管理: 统一管理 App Store 和 Google Play 的跳转链接，便于链接变更时全局生效。

内容发布系统 (CMS for News):

文章发布器（支持富文本编辑、上传图片/视频）。

分类管理（添加/删除 Breaking news, Event 等标签）。

SEO 设置（可为每篇文章自定义 Title, Keyword, Description）。

图库/画廊管理 (Gallery Management):

针对 About 和 Explore 页面的瀑布流照片墙进行批量上传、排序、设置外链。

四、 交互与体验优化建议 (UX/UI Enhancements)
从一名资深官网设计师的角度，你的设计图底子非常好，但要把它变成一个 "WOW" 的官网，可以考虑在开发时加入以下几点：

平滑滚动 (Smooth Scrolling): 很多模块都是长图展示（如APP页），采用平滑滚动或滚动监听动画（如图片从下向上渐显Fade-In Up）会让网站质感倍增。

手机模型联动: 在展示 App 界面和玩具硬件联动时，如果用户的鼠标滚动，手机内的 UI 可以有一点微小的动效（如进度条滚动、波纹扩散等）。

多语言架构准备: 既然宣传有 "12 Country"，那网站架构在搭建初期就必须考虑到多语言（i18n），在顶部导航栏预留语言切换按钮（例如 EN/JP/KR 等）。

年龄确认弹窗 (Age Verification Gate): 考虑到产品属性，建议在访客首次进入网站时，设计一个符合品牌调性的年龄确认弹窗（例如 "Are you 18 or older?"）。

隐私保护提示: 由于涉及AI陪伴和私密健康产品，页面下方应有明显的 Cookies 接受弹窗和详尽的隐私声明链接。

A/B Test 或动态内容 (针对首页男女受众): 图1和图2展现了两种不同的主推产品和风格。可以在入口处让用户选择 "For Him / For Her / For Couples"，或者根据用户的来源渠道动态展示图1或图2的首页。

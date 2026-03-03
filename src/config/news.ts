import type {
  NewsArticle,
  NewsCategory,
  NewsCategoryItem,
  NewsPageData,
} from "@/types/news";

// ─── Pagination Constants ──────────────────────────────────────
export const NEWS_PAGE_SIZE = 12;
export const MOCK_DELAY_MS = 400;

// ─── Page Configuration ────────────────────────────────────────
export const newsPageData: NewsPageData = {
  hero: {
    title: "Aura News Center",
    subtitle: "Stay up-to-date with Aura's latest news, events, and stories.",
    backgroundImage: "/images/news/aura-app-news-01.png",
    backgroundAlt: "Aura News Center hero background",
  },
  categories: [
    { id: "breaking-news", label: "Breaking news", order: 1 },
    { id: "event", label: "Event", order: 2 },
    { id: "about-aura", label: "About Aura", order: 3 },
  ] satisfies NewsCategoryItem[],
  emptyState: {
    illustration: "/images/home/aura-logo.svg",
    message: "暂无相关新闻，请稍后再来查看",
    actionLabel: "查看全部新闻",
  },
};

// ─── Mock Articles ─────────────────────────────────────────────
export const newsArticles: NewsArticle[] = [
  {
    id: "news-001",
    slug: "aura-launches-next-gen-ai-companion",
    title: "Aura Launches Next-Gen AI Companion Device",
    category: "breaking-news",
    featuredImage: "/images/news/aura-app-news-02-01.webp",
    imageAlt: "Aura next-generation AI companion device showcase",
    publishDate: "2026-02-25",
    summary:
      "Aura unveils its latest AI-powered companion device with revolutionary sensory technology and intelligent interaction capabilities.",
    content: `<p>Aura is proud to announce the launch of our next-generation AI companion device, marking a significant milestone in intelligent sensory technology. The new device features advanced AI algorithms that adapt to user preferences in real-time.</p>
<p>Built with cutting-edge materials and precision engineering, the device delivers an unprecedented level of responsiveness. Our proprietary AI engine learns from each interaction, continuously refining its understanding of individual preferences.</p>
<p>The companion app has been completely redesigned with an intuitive interface that makes customization effortless. Users can fine-tune every aspect of their experience through simple, elegant controls.</p>
<p>"This launch represents years of research and development," said our CEO. "We've combined the latest advances in AI with premium hardware to create something truly remarkable."</p>
<p>The device is available for pre-order starting today, with worldwide shipping beginning in March 2026.</p>`,
    cardSize: "large",
  },
  {
    id: "news-002",
    slug: "aura-partnership-global-wellness-brands",
    title: "Aura Partners with Global Wellness Brands",
    category: "breaking-news",
    featuredImage: "/images/news/aura-app-news-02-02.webp",
    imageAlt: "Aura partnership announcement with wellness brands",
    publishDate: "2026-02-20",
    summary:
      "Strategic partnerships with leading wellness brands expand Aura's ecosystem and bring new collaborative experiences to users.",
    content: `<p>Aura has announced strategic partnerships with several leading global wellness brands, expanding our ecosystem and bringing innovative collaborative experiences to our growing user base.</p>
<p>These partnerships will introduce exclusive content, guided experiences, and integrated wellness programs directly through the Aura app. Users will benefit from curated recommendations tailored to their personal wellness journey.</p>
<p>The collaboration brings together expertise from diverse fields including mindfulness, physical wellness, and sensory science to create holistic experiences that go beyond traditional boundaries.</p>
<p>Partner brands will gain access to Aura's advanced AI platform, enabling them to deliver personalized content that adapts to each user's preferences and habits over time.</p>`,
    cardSize: "small",
  },
  {
    id: "news-003",
    slug: "aura-app-update-3-0-release",
    title: "Aura App 3.0: A Complete Redesign",
    category: "breaking-news",
    featuredImage: "/images/news/aura-app-news-02-03.webp",
    imageAlt: "Aura App 3.0 redesigned user interface",
    publishDate: "2026-02-15",
    summary:
      "The all-new Aura App 3.0 brings a completely redesigned interface, new AI features, and enhanced personalization options.",
    content: `<p>We're excited to introduce Aura App 3.0, featuring a ground-up redesign that puts user experience at the forefront. The new interface is cleaner, more intuitive, and packed with powerful new features.</p>
<p>Key highlights include an AI-powered recommendation engine that suggests personalized settings based on your usage patterns, a revamped dashboard with real-time device status, and seamless multi-device management.</p>
<p>The new "Scenes" feature allows users to create and save custom configurations for different moods and occasions, making it easier than ever to switch between preferred settings.</p>
<p>Performance improvements deliver up to 40% faster app launch times and smoother animations throughout the experience. Battery optimization ensures the app uses minimal background resources.</p>`,
    cardSize: "small",
  },
  {
    id: "news-004",
    slug: "aura-wellness-expo-2026-highlights",
    title: "Highlights from Aura Wellness Expo 2026",
    category: "event",
    featuredImage: "/images/news/aura-app-news-02-04.webp",
    imageAlt: "Aura Wellness Expo 2026 event highlights",
    publishDate: "2026-02-18",
    summary:
      "Recap of the Aura Wellness Expo 2026 featuring product demos, wellness workshops, and exclusive previews of upcoming innovations.",
    content: `<p>The Aura Wellness Expo 2026 brought together thousands of enthusiasts, industry professionals, and wellness advocates for three days of immersive experiences and groundbreaking reveals.</p>
<p>Attendees had the opportunity to experience hands-on demos of our latest products, participate in guided wellness workshops led by renowned experts, and get exclusive previews of upcoming innovations still in development.</p>
<p>The keynote presentation showcased our vision for the future of AI-powered wellness technology, highlighting several upcoming features that generated significant excitement among attendees.</p>
<p>Community meetups and networking sessions fostered connections between users, developers, and wellness practitioners, reinforcing the growing Aura community's collaborative spirit.</p>`,
    cardSize: "small",
  },
  {
    id: "news-005",
    slug: "aura-community-meetup-series-2026",
    title: "Join the Aura Community Meetup Series",
    category: "event",
    featuredImage: "/images/news/aura-app-news-02-05.webp",
    imageAlt: "Aura community meetup event series",
    publishDate: "2026-02-12",
    summary:
      "Connect with fellow Aura users at our global community meetup series happening throughout 2026 in major cities worldwide.",
    content: `<p>We're thrilled to announce the Aura Community Meetup Series for 2026! Join us as we bring together Aura enthusiasts in major cities across the globe for intimate gatherings focused on sharing, learning, and connecting.</p>
<p>Each meetup features product demonstrations, Q&A sessions with our development team, and opportunities to provide direct feedback that shapes future product development.</p>
<p>Special guests including wellness experts, technology thought leaders, and Aura ambassadors will share insights and lead interactive sessions at select events.</p>
<p>Registration is free and open to all Aura users. Visit our events page for the full schedule and to RSVP for a meetup near you.</p>`,
    cardSize: "small",
  },
  {
    id: "news-006",
    slug: "aura-design-awards-recognition",
    title: "Aura Receives International Design Awards",
    category: "event",
    featuredImage: "/images/news/aura-app-news-02-06.webp",
    imageAlt: "Aura international design awards ceremony",
    publishDate: "2026-02-08",
    summary:
      "Aura has been recognized with multiple international design awards for outstanding product design and innovative user experience.",
    content: `<p>We are honored to announce that Aura has received multiple prestigious international design awards, recognizing our commitment to exceptional product design and innovative user experience.</p>
<p>The awards highlight our team's dedication to creating products that seamlessly blend form and function, delivering beautiful devices that are as pleasurable to use as they are to look at.</p>
<p>The judging panels praised Aura's attention to material quality, ergonomic design, and the sophisticated integration of technology within an elegant form factor.</p>
<p>These recognitions inspire us to continue pushing the boundaries of design excellence as we develop the next generation of products.</p>`,
    cardSize: "small",
  },
  {
    id: "news-007",
    slug: "my-aura-stories-user-testimonials",
    title: "My Aura Stories: Real User Testimonials",
    category: "about-aura",
    featuredImage: "/images/news/aura-app-news-02-07.webp",
    imageAlt: "Aura user stories and testimonials collection",
    publishDate: "2026-02-22",
    summary:
      "Real stories from Aura users sharing how the product has enhanced their daily lives and personal wellness routines.",
    content: `<p>In our ongoing "My Aura Stories" series, we're sharing real testimonials from users around the world who have integrated Aura into their daily wellness routines.</p>
<p>From busy professionals finding moments of relaxation to couples discovering new ways to connect, these stories showcase the diverse ways people are benefiting from Aura's intelligent technology.</p>
<p>"Aura has completely transformed my evening routine," shares one user from Tokyo. "The AI learns exactly what I need after a long day, and the experience gets better with every use."</p>
<p>We believe the best endorsement comes from the people who use our products every day. If you have an Aura story to share, we'd love to hear from you.</p>`,
    cardSize: "small",
  },
  {
    id: "news-008",
    slug: "behind-the-scenes-aura-rd-lab",
    title: "Behind the Scenes: Inside Aura's R&D Lab",
    category: "about-aura",
    featuredImage: "/images/news/aura-app-news-02-08.webp",
    imageAlt: "Inside Aura research and development laboratory",
    publishDate: "2026-02-05",
    summary:
      "Take an exclusive look inside Aura's state-of-the-art R&D laboratory where the next generation of intelligent sensory technology is being developed.",
    content: `<p>For the first time, we're opening the doors to our state-of-the-art R&D laboratory to give you an exclusive behind-the-scenes look at where the magic happens.</p>
<p>Our research facility houses cutting-edge testing equipment, rapid prototyping stations, and dedicated spaces for our AI and materials science teams to collaborate on breakthrough innovations.</p>
<p>The lab is where ideas transform into products — from initial concept sketches to working prototypes, every Aura device goes through rigorous development and testing cycles to ensure the highest quality.</p>
<p>Our team of engineers, designers, and AI researchers work together in an open, collaborative environment that encourages creative thinking and cross-disciplinary innovation.</p>
<p>Stay tuned for more behind-the-scenes content as we continue our mission to redefine intelligent sensory technology.</p>`,
    cardSize: "large",
  },

  // ─── Extended Mock Data (reusing images) ────────────────────────
  {
    id: "news-009",
    slug: "aura-ai-engine-upgrade-v2",
    title: "Aura AI Engine Upgrade: Smarter Than Ever",
    category: "breaking-news",
    featuredImage: "/images/news/aura-app-news-02-03.webp",
    imageAlt: "Aura AI engine upgrade announcement",
    publishDate: "2026-02-10",
    summary:
      "Major AI engine upgrade brings faster response times and deeper personalization to all Aura devices.",
    content: `<p>Our latest AI engine upgrade delivers smarter, more responsive interactions across all Aura devices.</p>`,
    cardSize: "small",
  },
  {
    id: "news-010",
    slug: "aura-expands-to-european-market",
    title: "Aura Expands to the European Market",
    category: "breaking-news",
    featuredImage: "/images/news/aura-app-news-02-01.webp",
    imageAlt: "Aura European market expansion",
    publishDate: "2026-02-03",
    summary:
      "Aura announces official expansion into key European markets with localized experiences and regional partnerships.",
    content: `<p>Aura is expanding into Europe with localized experiences and regional partnerships.</p>`,
    cardSize: "large",
  },
  {
    id: "news-011",
    slug: "aura-sustainability-initiative-2026",
    title: "Aura Launches Sustainability Initiative",
    category: "breaking-news",
    featuredImage: "/images/news/aura-app-news-02-02.webp",
    imageAlt: "Aura sustainability initiative announcement",
    publishDate: "2026-01-28",
    summary:
      "Committed to a greener future, Aura introduces eco-friendly packaging and carbon-neutral shipping.",
    content: `<p>Aura introduces eco-friendly packaging and carbon-neutral shipping as part of our sustainability commitment.</p>`,
    cardSize: "small",
  },
  {
    id: "news-012",
    slug: "aura-firmware-update-march-2026",
    title: "Firmware Update: New Modes & Improvements",
    category: "breaking-news",
    featuredImage: "/images/news/aura-app-news-02-04.webp",
    imageAlt: "Aura firmware update details",
    publishDate: "2026-01-22",
    summary:
      "The latest firmware update adds three new interaction modes and improves battery efficiency by 25%.",
    content: `<p>The latest firmware update adds new modes and significant battery improvements.</p>`,
    cardSize: "small",
  },
  {
    id: "news-013",
    slug: "aura-smart-home-integration",
    title: "Aura Now Integrates with Smart Home Systems",
    category: "breaking-news",
    featuredImage: "/images/news/aura-app-news-02-05.webp",
    imageAlt: "Aura smart home integration showcase",
    publishDate: "2026-01-15",
    summary:
      "Seamlessly connect Aura with your smart home ecosystem for automated wellness routines.",
    content: `<p>Connect Aura with your smart home ecosystem for automated wellness routines.</p>`,
    cardSize: "small",
  },
  {
    id: "news-014",
    slug: "aura-tokyo-pop-up-experience",
    title: "Aura Pop-Up Experience Comes to Tokyo",
    category: "event",
    featuredImage: "/images/news/aura-app-news-02-01.webp",
    imageAlt: "Aura Tokyo pop-up experience event",
    publishDate: "2026-02-06",
    summary:
      "Experience Aura's immersive pop-up installation in Tokyo's Shibuya district this February.",
    content: `<p>Visit our immersive pop-up installation in Tokyo's Shibuya district.</p>`,
    cardSize: "large",
  },
  {
    id: "news-015",
    slug: "aura-developer-hackathon-2026",
    title: "Aura Developer Hackathon: Build the Future",
    category: "event",
    featuredImage: "/images/news/aura-app-news-02-03.webp",
    imageAlt: "Aura developer hackathon event",
    publishDate: "2026-01-30",
    summary:
      "Join developers worldwide in our first hackathon to build innovative integrations on the Aura platform.",
    content: `<p>Join our first hackathon to build innovative integrations on the Aura platform.</p>`,
    cardSize: "small",
  },
  {
    id: "news-016",
    slug: "aura-wellness-workshop-series",
    title: "Free Wellness Workshop Series by Aura",
    category: "event",
    featuredImage: "/images/news/aura-app-news-02-07.webp",
    imageAlt: "Aura wellness workshop series",
    publishDate: "2026-01-25",
    summary:
      "Aura hosts a free online wellness workshop series featuring expert speakers and guided sessions.",
    content: `<p>Free online wellness workshop series featuring expert speakers and guided sessions.</p>`,
    cardSize: "small",
  },
  {
    id: "news-017",
    slug: "aura-ces-2026-showcase",
    title: "Aura at CES 2026: Full Showcase Recap",
    category: "event",
    featuredImage: "/images/news/aura-app-news-02-02.webp",
    imageAlt: "Aura CES 2026 showcase recap",
    publishDate: "2026-01-18",
    summary:
      "A complete recap of Aura's standout presence at CES 2026 including product reveals and live demos.",
    content: `<p>A complete recap of Aura's standout presence at CES 2026.</p>`,
    cardSize: "small",
  },
  {
    id: "news-018",
    slug: "aura-charity-gala-evening",
    title: "Aura Charity Gala: An Evening of Giving",
    category: "event",
    featuredImage: "/images/news/aura-app-news-02-08.webp",
    imageAlt: "Aura charity gala evening event",
    publishDate: "2026-01-10",
    summary:
      "Aura hosts its annual charity gala, raising funds for mental health awareness programs worldwide.",
    content: `<p>Annual charity gala raising funds for mental health awareness programs.</p>`,
    cardSize: "small",
  },
  {
    id: "news-019",
    slug: "aura-brand-philosophy-deep-dive",
    title: "The Philosophy Behind Aura's Design Language",
    category: "about-aura",
    featuredImage: "/images/news/aura-app-news-02-06.webp",
    imageAlt: "Aura design philosophy exploration",
    publishDate: "2026-02-01",
    summary:
      "An in-depth look at the design philosophy that drives every Aura product — where technology meets emotion.",
    content: `<p>An in-depth look at the design philosophy behind every Aura product.</p>`,
    cardSize: "small",
  },
  {
    id: "news-020",
    slug: "aura-team-spotlight-ai-engineers",
    title: "Team Spotlight: Meet Our AI Engineers",
    category: "about-aura",
    featuredImage: "/images/news/aura-app-news-02-04.webp",
    imageAlt: "Aura AI engineering team spotlight",
    publishDate: "2026-01-26",
    summary:
      "Get to know the brilliant minds behind Aura's AI engine in this team spotlight feature.",
    content: `<p>Get to know the brilliant minds behind Aura's AI engine.</p>`,
    cardSize: "small",
  },
  {
    id: "news-021",
    slug: "aura-user-community-reaches-1-million",
    title: "Aura Community Reaches 1 Million Users",
    category: "about-aura",
    featuredImage: "/images/news/aura-app-news-02-01.webp",
    imageAlt: "Aura one million users celebration",
    publishDate: "2026-01-20",
    summary:
      "Celebrating a major milestone — the Aura community has officially surpassed one million active users worldwide.",
    content: `<p>The Aura community has officially surpassed one million active users worldwide.</p>`,
    cardSize: "large",
  },
  {
    id: "news-022",
    slug: "aura-materials-science-breakthrough",
    title: "Breakthrough in Aura's Materials Science Lab",
    category: "about-aura",
    featuredImage: "/images/news/aura-app-news-02-05.webp",
    imageAlt: "Aura materials science lab breakthrough",
    publishDate: "2026-01-14",
    summary:
      "Our materials science team has developed a new silicone compound that is softer, more durable, and hypoallergenic.",
    content: `<p>New silicone compound developed — softer, more durable, and hypoallergenic.</p>`,
    cardSize: "small",
  },
  {
    id: "news-023",
    slug: "aura-privacy-security-commitment",
    title: "Our Commitment to User Privacy & Security",
    category: "about-aura",
    featuredImage: "/images/news/aura-app-news-02-03.webp",
    imageAlt: "Aura privacy and security commitment",
    publishDate: "2026-01-08",
    summary:
      "Aura reaffirms its commitment to user privacy with end-to-end encryption and transparent data practices.",
    content: `<p>End-to-end encryption and transparent data practices for all users.</p>`,
    cardSize: "small",
  },
  {
    id: "news-024",
    slug: "aura-roadmap-2026-preview",
    title: "2026 Roadmap Preview: What's Coming Next",
    category: "about-aura",
    featuredImage: "/images/news/aura-app-news-02-02.webp",
    imageAlt: "Aura 2026 product roadmap preview",
    publishDate: "2026-01-02",
    summary:
      "A sneak peek at Aura's 2026 product roadmap — new devices, app features, and ecosystem expansion.",
    content: `<p>Sneak peek at the 2026 roadmap — new devices, app features, and ecosystem expansion.</p>`,
    cardSize: "small",
  },
  {
    id: "news-025",
    slug: "aura-voice-control-feature",
    title: "Aura Introduces Voice Control Feature",
    category: "breaking-news",
    featuredImage: "/images/news/aura-app-news-02-06.webp",
    imageAlt: "Aura voice control feature",
    publishDate: "2026-01-10",
    summary:
      "Hands-free control comes to Aura with our new voice command integration.",
    content: `<p>Hands-free control comes to Aura with voice command integration.</p>`,
    cardSize: "small",
  },
  {
    id: "news-026",
    slug: "aura-limited-edition-spring-2026",
    title: "Limited Edition Spring 2026 Collection",
    category: "breaking-news",
    featuredImage: "/images/news/aura-app-news-02-07.webp",
    imageAlt: "Aura limited edition spring collection",
    publishDate: "2026-01-05",
    summary:
      "Introducing three exclusive colorways for the Spring 2026 limited edition release.",
    content: `<p>Three exclusive colorways for Spring 2026.</p>`,
    cardSize: "small",
  },
  {
    id: "news-027",
    slug: "aura-battery-tech-breakthrough",
    title: "Battery Technology Breakthrough at Aura",
    category: "breaking-news",
    featuredImage: "/images/news/aura-app-news-02-08.webp",
    imageAlt: "Aura battery technology breakthrough",
    publishDate: "2025-12-28",
    summary:
      "New battery tech extends device runtime by 50% while reducing charge time.",
    content: `<p>New battery tech extends runtime by 50%.</p>`,
    cardSize: "large",
  },
  {
    id: "news-028",
    slug: "aura-accessibility-update",
    title: "Aura Accessibility Update: Inclusive by Design",
    category: "breaking-news",
    featuredImage: "/images/news/aura-app-news-02-01.webp",
    imageAlt: "Aura accessibility update",
    publishDate: "2025-12-20",
    summary:
      "Major accessibility improvements make Aura more inclusive for all users.",
    content: `<p>Major accessibility improvements for all users.</p>`,
    cardSize: "small",
  },
  {
    id: "news-029",
    slug: "aura-multi-device-sync",
    title: "Seamless Multi-Device Sync Now Available",
    category: "breaking-news",
    featuredImage: "/images/news/aura-app-news-02-03.webp",
    imageAlt: "Aura multi-device sync feature",
    publishDate: "2025-12-15",
    summary:
      "Sync preferences and settings across all your Aura devices instantly.",
    content: `<p>Sync preferences across all Aura devices instantly.</p>`,
    cardSize: "small",
  },
  {
    id: "news-030",
    slug: "aura-sleep-mode-innovation",
    title: "Aura Sleep Mode: Science-Backed Relaxation",
    category: "breaking-news",
    featuredImage: "/images/news/aura-app-news-02-05.webp",
    imageAlt: "Aura sleep mode feature",
    publishDate: "2025-12-10",
    summary:
      "New sleep mode leverages clinical research to optimize relaxation routines.",
    content: `<p>Sleep mode leverages clinical research for optimal relaxation.</p>`,
    cardSize: "small",
  },
  {
    id: "news-031",
    slug: "aura-shanghai-launch-event",
    title: "Aura Launch Event in Shanghai",
    category: "event",
    featuredImage: "/images/news/aura-app-news-02-04.webp",
    imageAlt: "Aura Shanghai launch event",
    publishDate: "2026-01-05",
    summary:
      "Aura hosts an exclusive launch event in Shanghai featuring live product demos.",
    content: `<p>Exclusive launch event in Shanghai with live demos.</p>`,
    cardSize: "small",
  },
  {
    id: "news-032",
    slug: "aura-new-york-wellness-summit",
    title: "Aura at New York Wellness Summit 2026",
    category: "event",
    featuredImage: "/images/news/aura-app-news-02-06.webp",
    imageAlt: "Aura New York wellness summit",
    publishDate: "2025-12-28",
    summary:
      "Aura presents at the New York Wellness Summit with keynote and interactive booths.",
    content: `<p>Aura presents at the New York Wellness Summit.</p>`,
    cardSize: "small",
  },
  {
    id: "news-033",
    slug: "aura-creator-program-launch",
    title: "Aura Creator Program: Join Our Community",
    category: "event",
    featuredImage: "/images/news/aura-app-news-02-01.webp",
    imageAlt: "Aura creator program launch",
    publishDate: "2025-12-22",
    summary:
      "Apply to become an Aura Creator and share your unique wellness experiences.",
    content: `<p>Apply to become an Aura Creator.</p>`,
    cardSize: "large",
  },
  {
    id: "news-034",
    slug: "aura-holiday-special-event",
    title: "Aura Holiday Special: Celebrate with Us",
    category: "event",
    featuredImage: "/images/news/aura-app-news-02-05.webp",
    imageAlt: "Aura holiday special event",
    publishDate: "2025-12-18",
    summary:
      "Join Aura's holiday celebration with exclusive offers and festive experiences.",
    content: `<p>Holiday celebration with exclusive offers and festive experiences.</p>`,
    cardSize: "small",
  },
  {
    id: "news-035",
    slug: "aura-paris-design-week",
    title: "Aura Featured at Paris Design Week",
    category: "event",
    featuredImage: "/images/news/aura-app-news-02-02.webp",
    imageAlt: "Aura Paris Design Week exhibition",
    publishDate: "2025-12-12",
    summary: "Aura showcases its award-winning design at Paris Design Week.",
    content: `<p>Aura showcases award-winning design at Paris Design Week.</p>`,
    cardSize: "small",
  },
  {
    id: "news-036",
    slug: "aura-user-conference-2025",
    title: "Aura Annual User Conference Highlights",
    category: "event",
    featuredImage: "/images/news/aura-app-news-02-07.webp",
    imageAlt: "Aura annual user conference",
    publishDate: "2025-12-05",
    summary:
      "Key takeaways and announcements from the Aura Annual User Conference.",
    content: `<p>Key takeaways from the Annual User Conference.</p>`,
    cardSize: "small",
  },
  {
    id: "news-037",
    slug: "aura-london-experience-center",
    title: "Aura Opens London Experience Center",
    category: "event",
    featuredImage: "/images/news/aura-app-news-02-08.webp",
    imageAlt: "Aura London experience center opening",
    publishDate: "2025-11-28",
    summary:
      "A permanent Aura experience center opens its doors in central London.",
    content: `<p>Permanent Aura experience center opens in central London.</p>`,
    cardSize: "small",
  },
  {
    id: "news-038",
    slug: "aura-founding-story",
    title: "The Founding Story of Aura",
    category: "about-aura",
    featuredImage: "/images/news/aura-app-news-02-08.webp",
    imageAlt: "Aura founding story",
    publishDate: "2025-12-25",
    summary:
      "From a small idea to a global brand — the story of how Aura was born.",
    content: `<p>The story of how Aura was born.</p>`,
    cardSize: "large",
  },
  {
    id: "news-039",
    slug: "aura-quality-assurance-process",
    title: "Inside Aura's Quality Assurance Process",
    category: "about-aura",
    featuredImage: "/images/news/aura-app-news-02-04.webp",
    imageAlt: "Aura quality assurance process",
    publishDate: "2025-12-20",
    summary:
      "Every Aura device undergoes 200+ quality checks before reaching customers.",
    content: `<p>200+ quality checks before reaching customers.</p>`,
    cardSize: "small",
  },
  {
    id: "news-040",
    slug: "aura-global-team-culture",
    title: "Our Global Team: Culture & Values at Aura",
    category: "about-aura",
    featuredImage: "/images/news/aura-app-news-02-07.webp",
    imageAlt: "Aura global team culture",
    publishDate: "2025-12-15",
    summary: "A look at the diverse, passionate team that makes Aura possible.",
    content: `<p>A look at the diverse team behind Aura.</p>`,
    cardSize: "small",
  },
  {
    id: "news-041",
    slug: "aura-customer-support-excellence",
    title: "Aura Customer Support: Always Here for You",
    category: "about-aura",
    featuredImage: "/images/news/aura-app-news-02-02.webp",
    imageAlt: "Aura customer support team",
    publishDate: "2025-12-10",
    summary:
      "How Aura's customer support team delivers world-class service 24/7.",
    content: `<p>World-class customer support service 24/7.</p>`,
    cardSize: "small",
  },
  {
    id: "news-042",
    slug: "aura-packaging-design-story",
    title: "The Art of Aura's Packaging Design",
    category: "about-aura",
    featuredImage: "/images/news/aura-app-news-02-06.webp",
    imageAlt: "Aura packaging design",
    publishDate: "2025-12-05",
    summary:
      "Every detail of Aura's packaging is crafted to create a memorable unboxing experience.",
    content: `<p>Crafted for a memorable unboxing experience.</p>`,
    cardSize: "small",
  },
  {
    id: "news-043",
    slug: "aura-color-science-research",
    title: "Color Science: How Aura Chooses Its Palette",
    category: "about-aura",
    featuredImage: "/images/news/aura-app-news-02-03.webp",
    imageAlt: "Aura color science research",
    publishDate: "2025-11-30",
    summary:
      "The science and psychology behind Aura's signature color choices.",
    content: `<p>The science behind Aura's signature colors.</p>`,
    cardSize: "small",
  },
  {
    id: "news-044",
    slug: "aura-partnership-universities",
    title: "Aura Partners with Top Universities for Research",
    category: "about-aura",
    featuredImage: "/images/news/aura-app-news-02-01.webp",
    imageAlt: "Aura university research partnerships",
    publishDate: "2025-11-25",
    summary:
      "Collaborative research programs with leading universities advance sensory technology.",
    content: `<p>Collaborative research with leading universities.</p>`,
    cardSize: "small",
  },
  {
    id: "news-045",
    slug: "aura-wearable-companion-teaser",
    title: "Teaser: Aura Wearable Companion Coming Soon",
    category: "breaking-news",
    featuredImage: "/images/news/aura-app-news-02-04.webp",
    imageAlt: "Aura wearable companion teaser",
    publishDate: "2025-12-01",
    summary: "A sneak peek at Aura's upcoming wearable companion device.",
    content: `<p>Sneak peek at the upcoming wearable companion.</p>`,
    cardSize: "small",
  },
  {
    id: "news-046",
    slug: "aura-cloud-sync-launch",
    title: "Aura Cloud Sync: Your Data, Everywhere",
    category: "breaking-news",
    featuredImage: "/images/news/aura-app-news-02-02.webp",
    imageAlt: "Aura cloud sync launch",
    publishDate: "2025-11-25",
    summary:
      "Securely sync your Aura data across devices with end-to-end encrypted cloud sync.",
    content: `<p>End-to-end encrypted cloud sync across devices.</p>`,
    cardSize: "small",
  },
  {
    id: "news-047",
    slug: "aura-kids-mode-announcement",
    title: "Introducing Aura Kids Mode",
    category: "breaking-news",
    featuredImage: "/images/news/aura-app-news-02-06.webp",
    imageAlt: "Aura kids mode announcement",
    publishDate: "2025-11-20",
    summary:
      "A safe, fun mode designed specifically for younger family members.",
    content: `<p>Safe and fun mode for younger family members.</p>`,
    cardSize: "large",
  },
  {
    id: "news-048",
    slug: "aura-milan-expo-recap",
    title: "Aura at Milan Tech Expo: Full Recap",
    category: "event",
    featuredImage: "/images/news/aura-app-news-02-03.webp",
    imageAlt: "Aura Milan tech expo recap",
    publishDate: "2025-11-20",
    summary:
      "Highlights from Aura's impressive showing at the Milan Tech Expo.",
    content: `<p>Highlights from the Milan Tech Expo.</p>`,
    cardSize: "small",
  },
  {
    id: "news-049",
    slug: "aura-community-awards-2025",
    title: "Aura Community Awards: Celebrating Our Users",
    category: "event",
    featuredImage: "/images/news/aura-app-news-02-04.webp",
    imageAlt: "Aura community awards ceremony",
    publishDate: "2025-11-15",
    summary:
      "Recognizing outstanding community members at the first Aura Community Awards.",
    content: `<p>First Aura Community Awards ceremony.</p>`,
    cardSize: "small",
  },
  {
    id: "news-050",
    slug: "aura-sensory-lab-open-day",
    title: "Aura Sensory Lab Open Day: Come Explore",
    category: "event",
    featuredImage: "/images/news/aura-app-news-02-05.webp",
    imageAlt: "Aura sensory lab open day",
    publishDate: "2025-11-10",
    summary:
      "Our sensory research lab opens its doors to the public for a special one-day event.",
    content: `<p>Sensory research lab opens to the public.</p>`,
    cardSize: "small",
  },
];

// ─── Sync Helper Functions (Server-side use) ───────────────────

/** Get all news articles (for generateStaticParams) */
export function getAllNewsArticles(): NewsArticle[] {
  return newsArticles;
}

/** Get a single article by slug (for generateMetadata) */
export function getNewsArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((article) => article.slug === slug);
}

/** Get articles by category, sorted by publishDate descending */
export function getNewsArticlesByCategory(
  category: NewsCategory,
): NewsArticle[] {
  return newsArticles
    .filter((article) => article.category === category)
    .sort(
      (a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
    );
}

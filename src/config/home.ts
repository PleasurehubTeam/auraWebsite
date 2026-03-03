import type {
  HeroSlide,
  TabSectionData,
  ClassicModeData,
  RemoteControlData,
  CarouselCard,
  ModeItem,
} from "@/types/home";

// ─── Hero Slides ──────────────────────────────────────────────
export const heroSlides: HeroSlide[] = [
  {
    id: "female",
    audience: "female",
    slogan: `Ai-Powered Intelligent Sensory
    Technology Redefines Intimacy.`,
    subtitle: `Connect to the device
      to set your modethrough the Aura APP`,
    productImage: "/images/home/aura-index-product-01.png",
    phoneScreenshot: "/images/home/aura-index-banner-01a.png",
    backgroundImage: "/images/home/aura-index-banner-01a.webp",
  },
  {
    id: "male",
    audience: "male",
    slogan: `Ai-Powered Intelligent Sensory
    Technology Redefines Intimacy.`,
    // subtitle: "Experience the future of intimate technology",
    productImage: "/images/home/aura-index-product-02.png",
    phoneScreenshot: "/images/home/aura-index-banner-01b.png",
    backgroundImage: "/images/home/aura-index-banner-02.png",
  },
];

// ─── AI-Powered Section ───────────────────────────────────────
export const aiPoweredSection: TabSectionData = {
  id: "ai-powered",
  title: "Ai-Powered",
  // subtitle: "Experience intelligent intimacy powered by advanced AI",
  tabs: [
    {
      id: "ai-customization",
      label: "Ai Customization",
      description:
        "Personalize your experience with AI-driven customization that learns and adapts to your preferences over time, creating a truly unique journey.",
      image: "/images/home/aura-index-banner-01a.webp",
      // phoneScreenshot: "/images/home/aura-index-banner-02a-phone.png",
    },
    {
      id: "multimodal-chat",
      label: "Multimodal Chat Interaction",
      description:
        "Engage in immersive conversations through text, voice, and visual interactions. Our multimodal AI understands context and responds naturally.",
      image: "/images/home/aura-index-banner-01b.webp",
      // phoneScreenshot: "/images/home/aura-index-banner-02b-phone.png",
    },
  ],
};

// ─── Classic Mode Section ─────────────────────────────────────
export const classicModeSection: ClassicModeData = {
  title: "Classic Mode",
  subtitle: "Traditional control at your fingertips",
  appScreenshot: "/images/home/aura-index-banner-02.png",
  modeLabels: ["Thrusting", "Shock", "Heating"],
  features: [
    {
      id: "ai-control",
      label: "AI Control Unique Experience",
      icon: "/images/home/aura-index-icon-01.svg",
    },
    {
      id: "feature-07",
      label: "Fingerprint Audible",
      icon: "/images/home/aura-index-icon-07.svg",
    },
    {
      id: "feature-08",
      label: "Smart Sensor",
      icon: "/images/home/aura-index-icon-08.svg",
    },
    {
      id: "feature-09",
      label: "Rhythm Sync",
      icon: "/images/home/aura-index-icon-09.svg",
    },
    {
      id: "feature-10",
      label: "Temperature Control",
      icon: "/images/home/aura-index-icon-10.svg",
    },
  ],
};

// ─── Solo Play Section ────────────────────────────────────────
export const soloPlaySection: TabSectionData = {
  id: "solo-play",
  title: "Solo Play",
  // subtitle: "Multiple modes for your personal enjoyment",
  tabs: [
    {
      id: "slide-model",
      label: "Slide Model",
      description:
        "Intuitive slide controls for seamless intensity adjustment. Glide your finger to find the perfect rhythm that matches your mood.",
      image: "/images/home/aura-index-banner-02a.webp",
      phoneScreenshot: "/images/home/aura-index-banner-03a.png",
    },
    {
      id: "voice-control",
      label: "Voice Control Model",
      description:
        "Hands-free operation through intelligent voice recognition. Simply speak your desires and let the AI respond to your commands.",
      image: "/images/home/aura-index-banner-02b.webp",
      phoneScreenshot: "/images/home/aura-index-banner-03b.png",
    },
    {
      id: "video-sync",
      label: "Video Sync",
      description:
        "Synchronize your experience with video content for an immersive sensory journey that responds in real-time to what you watch.",
      image: "/images/home/aura-index-banner-02c.webp",
      phoneScreenshot: "/images/home/aura-index-banner-03c.png",
    },
    {
      id: "music-sync",
      label: "Music Sync",
      description:
        "Let the rhythm guide your experience. Music Sync analyzes beats and melodies to create perfectly timed sensory patterns.",
      image: "/images/home/aura-index-banner-02d.webp",
      phoneScreenshot: "/images/home/aura-index-banner-03d.png",
    },
  ],
};

// ─── Remote Control Section ───────────────────────────────────
export const remoteControlSection: RemoteControlData = {
  title: "Remote Control Model",
  description:
    "Stay connected with your partner no matter the distance. Remote Control Mode enables real-time interaction between partners, allowing you to share intimate moments across any distance with responsive, synchronized experiences.",
  image: "/images/home/aura-index-banner-03.webp",
};

// ─── Mystery Script Section ───────────────────────────────────
export const mysteryScriptSection = {
  title: "Immersive Erotic Murder Mystery Script",
  description:
    "Dive into captivating storylines where every choice matters. Experience interactive scenarios with rich characters and unexpected plot twists.",
};

export const mysteryCards: CarouselCard[] = [
  { id: "card-1", title: "The Secret Garden", image: "/images/home/001.png" },
  {
    id: "card-2",
    title: "Midnight Masquerade",
    image: "/images/home/002.png",
  },
  { id: "card-3", title: "Crimson Letters", image: "/images/home/003.png" },
  { id: "card-4", title: "Velvet Shadows", image: "/images/home/004.png" },
  { id: "card-5", title: "The Last Dance", image: "/images/home/005.png" },
  { id: "card-6", title: "The Secret Garden", image: "/images/home/001.png" },
  {
    id: "card-7",
    title: "Midnight Masquerade",
    image: "/images/home/002.png",
  },
  { id: "card-8", title: "Crimson Letters", image: "/images/home/003.png" },
  { id: "card-9", title: "Velvet Shadows", image: "/images/home/004.png" },
  { id: "card-10", title: "The Last Dance", image: "/images/home/005.png" },
];

// ─── Mode Function Section ────────────────────────────────────
export const modeItems: ModeItem[] = [
  { id: "default", label: "Default", icon: "/images/home/web-design-07.png" },
  { id: "classic", label: "Classic", icon: "/images/home/web-design-08.png" },
  {
    id: "ai-lover",
    label: "AI Lover",
    icon: "/images/home/web-design-09.png",
  },
  {
    id: "creation",
    label: "Creation",
    icon: "/images/home/web-design-10.png",
  },
  { id: "sound", label: "Sound", icon: "/images/home/web-design-11.png" },
  { id: "video", label: "Video", icon: "/images/home/web-design-12.png" },
  { id: "musical", label: "Musical", icon: "/images/home/web-design-13.png" },
  { id: "remote", label: "Remote", icon: "/images/home/web-design-14.png" },
];

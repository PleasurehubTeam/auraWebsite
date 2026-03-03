export interface HeroSlide {
  id: string;
  audience: "female" | "male";
  slogan: string;
  subtitle?: string;
  productImage: string;
  phoneScreenshot: string;
  backgroundImage: string;
}

export interface TabItem {
  id: string;
  label: string;
  description: string;
  image: string;
  phoneScreenshot?: string;
}

export interface TabSectionData {
  id: string;
  title: string;
  subtitle?: string;
  tabs: TabItem[];
}

export interface ClassicModeFeature {
  id: string;
  label: string;
  icon: string;
}

export interface ClassicModeData {
  title: string;
  subtitle?: string;
  appScreenshot: string;
  modeLabels: string[];
  features: ClassicModeFeature[];
}

export interface RemoteControlData {
  title: string;
  description: string;
  image: string;
}

export interface CarouselCard {
  id: string;
  title?: string;
  image: string;
}

export interface ModeItem {
  id: string;
  label: string;
  icon: string;
}

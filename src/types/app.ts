export interface MockupItem {
  id: string;
  image: string;
  alt: string;
}

export interface AppHeroData {
  title: string;
  mockups: MockupItem[];
}

export interface FeatureSectionData {
  id: string;
  title: string;
  description: string;
  images: string[];
  imagesAlt: string[];
  productImage?: string;
  productImageAlt?: string;
  /** PC 端图片绝对定位参数 */
  imagePosition?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  /** 文字模块宽度 calc 中减去的图片占位宽度，如 "400px" */
  imageWidth?: string;
}

export interface AppBottomCTAData {
  heading: string;
  description: string;
  logoImage: string;
  logoAlt: string;
}

export interface AppPageData {
  hero: AppHeroData;
  sectionTitle: string;
  features: FeatureSectionData[];
  bottomCTA: AppBottomCTAData;
}

// Privacy Policy
export type {
  PolicyMetadata,
  PolicySubsection,
  PrivacyPolicySection,
  PrivacyPolicyData,
} from "./privacy-policy";

// Navigation
export interface NavigationItem {
  label: string;
  href: string;
}

// Footer
export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export interface SocialMediaLink {
  platform: "instagram" | "x" | "facebook" | "youtube";
  url: string;
  label: string;
}

// Download
export interface DownloadConfig {
  appStoreUrl: string;
  googlePlayUrl: string;
  heading: string;
  description: string;
}

// Site
export interface SiteConfig {
  brandName: string;
  copyrightYearStart: number;
  ageVerificationRedirectUrl: string;
  privacyPolicyUrl: string;
}

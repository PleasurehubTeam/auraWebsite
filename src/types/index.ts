// Delete Account
export type {
  DeleteAccountConfig,
  DeleteAccountPageMetadata,
  DeleteAccountHero,
  DeleteAccountSection,
  DeleteAccountContact,
} from "./delete-account";

// Shared Legal Document Types
export type {
  PolicyMetadata,
  LegalSubsection,
  LegalSection,
  LegalPageData,
} from "./legal";

// Privacy Policy (backward-compatible aliases)
export type {
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
  supportEmail: string;
}

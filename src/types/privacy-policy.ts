// Re-export shared legal types with privacy-policy-specific aliases
// for backward compatibility with existing imports.
export type { PolicyMetadata } from "./legal";
export type { LegalSubsection as PolicySubsection } from "./legal";
export type { LegalSection as PrivacyPolicySection } from "./legal";
export type { LegalPageData as PrivacyPolicyData } from "./legal";

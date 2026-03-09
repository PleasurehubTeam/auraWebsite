// ─── Privacy Policy ──────────────────────────────────────────

export interface PolicyMetadata {
  title: string;
  effectiveDate: string;
  lastUpdated: string;
  version?: string;
}

export interface PolicySubsection {
  id: string;
  title: string;
  content: string[];
}

export interface PrivacyPolicySection {
  id: string;
  title: string;
  content: string[];
  subsections?: PolicySubsection[];
}

// ─── Page Data (Top-Level Aggregate) ──────────────────────────
export interface PrivacyPolicyData {
  metadata: PolicyMetadata;
  sections: PrivacyPolicySection[];
}

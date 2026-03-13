// ─── Shared Legal Document Types ─────────────────────────────

export interface PolicyMetadata {
  title: string;
  effectiveDate: string;
  lastUpdated: string;
  version?: string;
}

export interface LegalSubsection {
  id: string;
  title: string;
  content: string[];
}

export interface LegalSection {
  id: string;
  title: string;
  content: string[];
  subsections?: LegalSubsection[];
}

// ─── Page Data (Top-Level Aggregate) ─────────────────────────
export interface LegalPageData {
  metadata: PolicyMetadata;
  sections: LegalSection[];
}

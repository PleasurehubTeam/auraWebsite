export interface DeleteAccountPageMetadata {
  title: string;
  description: string;
}

export interface DeleteAccountHero {
  heading: string;
  subheading: string;
}

export interface DeleteAccountSection {
  id: string;
  title: string;
  content: string;
}

export interface DeleteAccountContact {
  label: string;
  email: string;
  note: string;
}

export interface DeleteAccountConfig {
  metadata: DeleteAccountPageMetadata;
  hero: DeleteAccountHero;
  sections: DeleteAccountSection[];
  contact: DeleteAccountContact;
}

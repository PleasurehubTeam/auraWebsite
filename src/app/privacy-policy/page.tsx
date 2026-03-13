import type { Metadata } from "next";
import { privacyPolicyData } from "@/config/privacy-policy";
import {
  LegalPageContent,
  LegalTableOfContents,
  ScrollToTopButton,
} from "@/components/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read Aura's privacy policy to learn how we collect, use, and protect your personal data.",
  openGraph: {
    title: "Privacy Policy | Aura",
    description:
      "Read Aura's privacy policy to learn how we collect, use, and protect your personal data.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | Aura",
    description:
      "Read Aura's privacy policy to learn how we collect, use, and protect your personal data.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="py-12 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900 sm:text-4xl">
          {privacyPolicyData.metadata.title}
        </h1>

        <LegalTableOfContents sections={privacyPolicyData.sections} />

        <LegalPageContent
          sections={privacyPolicyData.sections}
          metadata={privacyPolicyData.metadata}
        />
      </div>

      <ScrollToTopButton />
    </main>
  );
}

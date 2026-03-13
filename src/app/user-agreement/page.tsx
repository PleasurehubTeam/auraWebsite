import type { Metadata } from "next";
import { userAgreementData } from "@/config/user-agreement";
import {
  LegalPageContent,
  LegalTableOfContents,
  ScrollToTopButton,
} from "@/components/legal";

export const metadata: Metadata = {
  title: "User Agreement",
  description:
    "Read Aura's user agreement to understand the terms and conditions of using our service.",
  openGraph: {
    title: "User Agreement | Aura",
    description:
      "Read Aura's user agreement to understand the terms and conditions of using our service.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "User Agreement | Aura",
    description:
      "Read Aura's user agreement to understand the terms and conditions of using our service.",
  },
};

export default function UserAgreementPage() {
  return (
    <main className="py-12 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900 sm:text-4xl">
          {userAgreementData.metadata.title}
        </h1>

        <LegalTableOfContents sections={userAgreementData.sections} />

        <LegalPageContent
          sections={userAgreementData.sections}
          metadata={userAgreementData.metadata}
        />
      </div>

      <ScrollToTopButton />
    </main>
  );
}

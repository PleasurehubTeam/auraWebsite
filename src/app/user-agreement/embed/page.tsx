import type { Metadata } from "next";
import { userAgreementData } from "@/config/user-agreement";
import { LegalPageContent, ScrollToTopButton } from "@/components/legal";

export const metadata: Metadata = {
  title: "User Agreement",
  description: "Aura User Agreement",
  robots: {
    index: false,
    follow: false,
  },
};

export default function UserAgreementEmbedPage() {
  return (
    <main className="px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
          {userAgreementData.metadata.title}
        </h1>

        <LegalPageContent
          sections={userAgreementData.sections}
          metadata={userAgreementData.metadata}
        />
      </div>

      <ScrollToTopButton />
    </main>
  );
}

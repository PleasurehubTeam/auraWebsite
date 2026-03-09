import type { Metadata } from "next";
import { privacyPolicyData } from "@/config/privacy-policy";
import { PrivacyPolicyContent } from "@/components/privacy-policy/PrivacyPolicyContent";
import { ScrollToTopButton } from "@/components/privacy-policy/ScrollToTopButton";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Aura Privacy Policy",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrivacyPolicyEmbedPage() {
  return (
    <main className="px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
          {privacyPolicyData.metadata.title}
        </h1>

        <PrivacyPolicyContent
          sections={privacyPolicyData.sections}
          metadata={privacyPolicyData.metadata}
        />
      </div>

      <ScrollToTopButton />
    </main>
  );
}

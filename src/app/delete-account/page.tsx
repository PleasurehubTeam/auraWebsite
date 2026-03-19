import type { Metadata } from "next";
import { deleteAccountConfig } from "@/config/delete-account";
import { DeleteAccountContent } from "@/components/delete-account/DeleteAccountContent";

export const metadata: Metadata = {
  title: deleteAccountConfig.metadata.title,
  description: deleteAccountConfig.metadata.description,
  openGraph: {
    title: `${deleteAccountConfig.metadata.title} | Aura`,
    description: deleteAccountConfig.metadata.description,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${deleteAccountConfig.metadata.title} | Aura`,
    description: deleteAccountConfig.metadata.description,
  },
};

export default function DeleteAccountPage() {
  return (
    <main className="py-12 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900 sm:text-4xl">
          {deleteAccountConfig.hero.heading}
        </h1>

        <DeleteAccountContent config={deleteAccountConfig} />
      </div>
    </main>
  );
}

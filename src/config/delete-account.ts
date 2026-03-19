import type { DeleteAccountConfig } from "@/types/delete-account";
import { siteConfig } from "@/config/site";

export const deleteAccountConfig: DeleteAccountConfig = {
  metadata: {
    title: "Delete Account",
    description:
      "Learn how to request account deletion for your Aura account and contact our support team by email.",
  },
  hero: {
    heading: "Delete Account",
    subheading:
      "We respect your right to control your personal data. Please read the following information carefully before submitting a deletion request.",
  },
  sections: [
    {
      id: "deletion-process",
      title: "How to Request Account Deletion",
      content:
        "Account deletion requests must be submitted by email. Please send a message to our support email address with your registered email address and, optionally, the reason for your request. Our support team will process your request within 3–5 business days and notify you of the outcome by email.",
    },
    {
      id: "consequences",
      title: "What Happens When You Delete Your Account",
      content:
        "Account deletion is permanent and cannot be undone. All your personal data, conversation history, and associated content will be removed.",
    },
  ],
  contact: {
    label: "To request account deletion, please contact us at:",
    email: siteConfig.supportEmail,
    note: "We will process your request and send a confirmation email within 3–5 business days.",
  },
};

import type { PrivacyPolicyData } from "@/types/privacy-policy";

export const privacyPolicyData: PrivacyPolicyData = {
  metadata: {
    title: "Privacy Policy",
    effectiveDate: "2026-03-01",
    lastUpdated: "2026-03-07",
    version: "1.0",
  },

  sections: [
    {
      id: "introduction",
      title: "Introduction",
      content: [
        'Welcome to Aura ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience when using our platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website (collectively, the "Service").',
        "By accessing or using the Service, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access or use the Service.",
      ],
    },
    {
      id: "information-we-collect",
      title: "Information We Collect",
      content: [
        "We collect information that you provide directly to us, information we obtain automatically when you use the Service, and information from third-party sources.",
      ],
      subsections: [
        {
          id: "information-you-provide",
          title: "Information You Provide",
          content: [
            "When you create an account, you provide us with personal information such as your name, email address, date of birth, and profile photo. You may also provide additional information such as your bio, interests, and location to enhance your profile.",
            "When you use our Service, you may share content including photos, messages, comments, and other materials. We collect and store this content along with related metadata.",
          ],
        },
        {
          id: "information-collected-automatically",
          title: "Information Collected Automatically",
          content: [
            "When you access or use our Service, we automatically collect certain information, including your IP address, device type, operating system, browser type, unique device identifiers, and mobile network information.",
            "We also collect information about your usage of the Service, such as the pages you visit, the features you use, the actions you take, the time, frequency, and duration of your activities.",
          ],
        },
        {
          id: "information-from-third-parties",
          title: "Information from Third Parties",
          content: [
            "We may receive information about you from third-party services if you choose to connect your Aura account with those services. This may include your name, profile picture, and friend list from social media platforms.",
          ],
        },
      ],
    },
    {
      id: "how-we-use-your-information",
      title: "How We Use Your Information",
      content: [
        "We use the information we collect to provide, maintain, and improve our Service, and to develop new features and functionality. Specifically, we use your information to:",
        "• Create and manage your account, and provide you with customer support.\n• Personalize your experience and deliver content and features that match your interests.\n• Process and complete transactions, and send you related information.\n• Send you technical notices, updates, security alerts, and support and administrative messages.\n• Communicate with you about products, services, offers, promotions, and events.\n• Monitor and analyze trends, usage, and activities in connection with our Service.\n• Detect, investigate, and prevent fraudulent transactions and other illegal activities.\n• Comply with legal obligations and enforce our terms and policies.",
      ],
    },
    {
      id: "information-sharing",
      title: "Information Sharing",
      content: [
        "We do not sell your personal information to third parties. We may share your information in the following circumstances:",
        "• With other users: When you share content or interact with other users on the Service, your profile information and content may be visible to them.\n• With service providers: We share information with third-party vendors, consultants, and service providers who perform services on our behalf, such as hosting, analytics, and customer support.\n• For legal reasons: We may disclose your information if required to do so by law or in response to valid requests by public authorities.\n• Business transfers: If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.\n• With your consent: We may share your information with third parties when you give us explicit consent to do so.",
      ],
    },
    {
      id: "your-rights-and-choices",
      title: "Your Rights and Choices",
      content: [
        "You have certain rights regarding your personal information:",
        "• Access and update: You can access and update your account information at any time through the app settings.\n• Delete your account: You can request deletion of your account and associated data by contacting us at support@realaura.ai.\n• Opt out of communications: You can opt out of receiving promotional emails by following the unsubscribe instructions in those emails.\n• Data portability: You have the right to request a copy of your personal data in a structured, machine-readable format.\n• Withdraw consent: Where we rely on your consent to process your personal information, you have the right to withdraw that consent at any time.",
      ],
    },
    {
      id: "cookies-and-tracking",
      title: "Cookies and Tracking Technologies",
      content: [
        "We use cookies and similar tracking technologies to collect and track information about your use of the Service and to improve and analyze our Service.",
        "Cookies are small data files stored on your device. We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device until deleted) for various purposes including authentication, preferences, analytics, and advertising.",
        "You can set your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some features of the Service may not function properly.",
      ],
    },
    {
      id: "data-security",
      title: "Data Security",
      content: [
        "We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. We implement appropriate technical and organizational safeguards to protect the security of your data.",
        "However, no method of transmission over the Internet or method of electronic storage is completely secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.",
      ],
    },
    {
      id: "childrens-privacy",
      title: "Children's Privacy",
      content: [
        "The Service is not intended for use by anyone under the age of 18. We do not knowingly collect personal information from children under 18. If we learn that we have collected personal information from a child under 18, we will take steps to delete that information as soon as possible.",
        "If you are a parent or guardian and you believe that your child has provided us with personal information, please contact us at support@realaura.ai so that we can take appropriate action.",
      ],
    },
    {
      id: "changes-to-this-policy",
      title: "Changes to This Policy",
      content: [
        'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top.',
        "We encourage you to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page. Your continued use of the Service after any changes constitutes your acceptance of the updated Privacy Policy.",
      ],
    },
    {
      id: "contact-us",
      title: "Contact Us",
      content: [
        "If you have any questions about this Privacy Policy, please contact us:",
        "• Email: support@realaura.ai\n• Website: https://realaura.ai",
      ],
    },
  ],
};

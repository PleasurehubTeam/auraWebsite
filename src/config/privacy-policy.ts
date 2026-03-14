import type { PrivacyPolicyData } from "@/types/privacy-policy";

export const privacyPolicyData: PrivacyPolicyData = {
  metadata: {
    title: "Privacy Policy",
    effectiveDate: "2026-03-13",
    lastUpdated: "2026-03-13",
    version: "2.0",
  },

  sections: [
    {
      id: "scope",
      title: "1. Scope",
      content: [
        'Welcome to Aura. EchoAI Digital Limited ("we," "us," or "our") values your privacy. This Privacy Policy explains how we collect, use, store, share, and protect your personal information, and the rights available to you.',
        'This Policy applies to Aura websites, apps, and related services (collectively, the "Services"), for both registered and unregistered users.',
      ],
    },
    {
      id: "age-and-content-notice",
      title: "2. Age and Content Notice",
      content: [
        "The Services are for users who are at least 18 years old, or the age of majority in their jurisdiction.",
        "The Services may include adult/sexual content. If you do not meet the age requirement, or such content is unlawful where you are located, stop using the Services immediately.",
      ],
    },
    {
      id: "information-we-collect",
      title: "3. Information We Collect",
      content: [],
      subsections: [
        {
          id: "information-you-provide",
          title: "3.1 Information You Provide",
          content: [
            "• Account information: email, nickname, password, login credentials.\n• Profile and preferences: character settings, voice preferences, interaction settings.\n• User content: chat text, prompts, uploads, feedback, customer support communications.\n• Transaction information: order details, payment status, billing records (payment card data is processed by third-party payment providers).",
          ],
        },
        {
          id: "information-collected-automatically",
          title: "3.2 Information Collected Automatically",
          content: [
            "• Device and network data: device model, OS version, IP address, device identifiers, logs.\n• Usage data: access time, clicks, session duration, crash/performance data.\n• Control and sync data: remote-control commands, connection status, sync metadata.",
          ],
        },
        {
          id: "sensitive-information",
          title: "3.3 Sensitive Information",
          content: [
            "Given the nature of the Services, you may provide or generate information related to sex life, sexual preferences, or sexual orientation. We process such data in accordance with applicable law and obtain required consent where legally necessary.",
          ],
        },
      ],
    },
    {
      id: "how-we-use-information",
      title: "4. How We Use Information",
      content: [
        "We may use personal information to:",
        "• Provide and maintain the Services (accounts, AI interaction, device control, support);\n• Protect safety and security (anti-fraud, abuse prevention, auditing);\n• Improve products and user experience (debugging, quality analysis, optimization);\n• Conduct analytics and operations (aggregated or de-identified where appropriate);\n• Meet legal obligations and handle disputes;\n• Send service and marketing communications (you may opt out of marketing at any time).",
      ],
    },
    {
      id: "ai-and-third-party-capabilities",
      title: "5. AI and Third-Party Capabilities",
      content: [
        "We may use proprietary and third-party AI/cloud services to provide reply generation, content generation, moderation, safety, and optimization features.",
        "Where permitted by law, related data may be used for service quality improvement, model capability optimization, and safety governance. Where required by law, we will provide additional notice and obtain consent.",
      ],
    },
    {
      id: "sharing-and-disclosure",
      title: "6. Sharing and Disclosure",
      content: [
        "We do not sell your personal information.",
        "We may share information:",
        "• At your direction (for example, remote connection features);\n• With service providers (cloud, AI, payment, analytics, support);\n• In corporate transactions (merger, acquisition, restructuring, asset sale);\n• To comply with law or to protect legal rights, safety, and security.",
      ],
    },
    {
      id: "international-data-transfers",
      title: "7. International Data Transfers",
      content: [
        "Your information may be transferred to and stored outside your country/region. We implement reasonable safeguards as required by applicable law.",
      ],
    },
    {
      id: "data-retention",
      title: "8. Data Retention",
      content: [
        "We retain information based on business need and legal obligations, generally:",
        "• Account data: during account life and up to 180 days after closure;\n• Conversation/user content: up to 12 months (deletion requests enter cleanup workflow);\n• Security logs: up to 12 months;\n• Support records: up to 5 years;\n• Transaction/financial records: up to 10 years, or longer if legally required;\n• Risk-control records: up to 2 years, or longer if legally required.",
      ],
    },
    {
      id: "your-rights",
      title: "9. Your Rights",
      content: [
        "Subject to applicable law, you may request access, correction, deletion, restriction, portability, objection, withdrawal of consent, and account closure.",
        "Request channel: support@realaura.ai",
      ],
    },
    {
      id: "california-notice",
      title: "10. California Notice (CCPA/CPRA)",
      content: [
        "• We may collect categories of personal information, including sensitive personal information as defined by law.\n• Purposes include service delivery, security/risk control, improvement, support, and legal compliance.\n• We do not sell or share personal information for cross-context behavioral advertising.\n• California residents may exercise rights to know, access, correct, delete, data portability, and non-discrimination.\n• Request channel: support@realaura.ai",
      ],
    },
    {
      id: "eea-uk-switzerland",
      title: "11. EEA/UK/Switzerland Users",
      content: [
        "Where applicable, you may exercise GDPR rights and lodge a complaint with your local data protection authority.",
      ],
    },
    {
      id: "security",
      title: "12. Security",
      content: [
        "We use reasonable technical and organizational safeguards, including encryption in transit, access controls, least-privilege controls, and security monitoring. No system can be guaranteed absolutely secure.",
      ],
    },
    {
      id: "updates-and-contact",
      title: "13. Updates and Contact",
      content: [
        "We may update this Policy from time to time. Material changes will be notified by in-app notice, email, or other reasonable means.",
        "Contact: support@realaura.ai",
      ],
    },
  ],
};

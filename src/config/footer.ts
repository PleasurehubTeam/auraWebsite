import type { FooterLinkGroup, SocialMediaLink } from "@/types";

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Download APP", href: "/download" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "User Agreement", href: "/user-agreement" },
      { label: "Community Guidelines", href: "/community-guidelines" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Frequently Questions", href: "/faq" },
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "User Agreement", href: "/user-agreement" },
      { label: "Community Guidelines", href: "/community-guidelines" },
    ],
  },
  {
    title: "Contact",
    links: [
      {
        label: "E-mail: support@realaura.ai",
        href: "mailto:support@realaura.ai",
      },
      { label: "Online:", href: "#" },
    ],
  },
];

export const socialMediaLinks: SocialMediaLink[] = [
  {
    platform: "instagram",
    url: "https://www.instagram.com/aura",
    label: "Follow us on Instagram",
  },
  {
    platform: "x",
    url: "https://x.com/aura",
    label: "Follow us on X",
  },
  {
    platform: "facebook",
    url: "https://www.facebook.com/aura",
    label: "Follow us on Facebook",
  },
  {
    platform: "youtube",
    url: "https://www.youtube.com/@aura",
    label: "Subscribe on YouTube",
  },
];

"use client";

import Link from "next/link";
import { footerLinkGroups, socialMediaLinks } from "@/config/footer";
import { siteConfig } from "@/config/site";
import {
  InstagramIcon,
  XIcon,
  FacebookIcon,
  YouTubeIcon,
} from "@/components/icons/SocialIcons";

const socialIconMap = {
  instagram: InstagramIcon,
  x: XIcon,
  facebook: FacebookIcon,
  youtube: YouTubeIcon,
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const yearRange =
    currentYear > siteConfig.copyrightYearStart
      ? `${siteConfig.copyrightYearStart}–${currentYear}`
      : `${siteConfig.copyrightYearStart}`;

  return (
    <footer className="bg-black px-4 py-[30px] sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* 移动端: 仅显示 Follow 模块 */}
        <div className="flex flex-col items-center gap-3 pb-5 sm:hidden">
          <span className="text-sm text-white">Follow Us</span>
          <div className="flex items-center gap-3">
            {socialMediaLinks.map((social) => {
              const IconComponent = socialIconMap[social.platform];
              return (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:text-brand-pink"
                >
                  <IconComponent className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* 桌面端: 链接分组 */}
        <div className="hidden gap-8 sm:grid sm:grid-cols-2 md:grid-cols-3">
          {footerLinkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white transition-colors hover:text-brand-pink"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-white transition-colors hover:text-brand-pink"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              {/* 社交媒体图标 — 跟在 Contact 列下方 */}
              {group.title === "Contact" && (
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-sm text-white">Follow Us</span>
                  {socialMediaLinks.map((social) => {
                    const IconComponent = socialIconMap[social.platform];
                    return (
                      <a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:text-brand-pink"
                      >
                        <IconComponent className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 分割线 */}
        <div className="my-8 hidden border-t border-white/10 sm:block" />

        {/* 版权信息 */}
        <p className="text-center text-sm text-gray-500">
          &copy; {yearRange} {siteConfig.brandName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

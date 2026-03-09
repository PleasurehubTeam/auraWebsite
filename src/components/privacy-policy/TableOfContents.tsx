"use client";

import type { PrivacyPolicySection } from "@/types/privacy-policy";

interface TableOfContentsProps {
  sections: PrivacyPolicySection[];
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <nav
      aria-label="Table of contents"
      className="mb-10 rounded-lg bg-gray-50 p-6"
    >
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Table of Contents
      </h2>
      <ol className="list-inside list-decimal space-y-2">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              onClick={(e) => handleClick(e, section.id)}
              className="text-brand-pink transition-colors hover:text-brand-pink-dark"
            >
              {section.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

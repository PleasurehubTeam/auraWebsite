"use client";

import { motion } from "framer-motion";
import type { DeleteAccountConfig } from "@/types/delete-account";

interface DeleteAccountContentProps {
  config: DeleteAccountConfig;
}

export function DeleteAccountContent({ config }: DeleteAccountContentProps) {
  const { hero, sections, contact } = config;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <p className="mb-10 text-lg text-gray-600">{hero.subheading}</p>

      {sections.map((section) => (
        <section key={section.id} className="mb-8">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            {section.title}
          </h2>
          <p className="leading-relaxed text-gray-600">{section.content}</p>
        </section>
      ))}

      <div className="mt-10 rounded-xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Contact Us</h2>
        <p className="mb-4 text-gray-600">{contact.label}</p>
        <a
          href={`mailto:${contact.email}`}
          aria-label="Contact support to request account deletion"
          className="inline-flex min-h-[44px] items-center rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          {contact.email}
        </a>
        <p className="mt-3 text-sm text-gray-500">{contact.note}</p>
      </div>
    </motion.div>
  );
}

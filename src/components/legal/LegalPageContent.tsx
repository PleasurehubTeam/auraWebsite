import type {
  PolicyMetadata,
  LegalSection,
  LegalSubsection,
} from "@/types/legal";

interface LegalPageContentProps {
  sections: LegalSection[];
  metadata: PolicyMetadata;
}

function Subsection({ subsection }: { subsection: LegalSubsection }) {
  return (
    <div id={subsection.id} className="mt-6">
      <h3 className="text-lg font-semibold text-gray-900">
        {subsection.title}
      </h3>
      {subsection.content.map((paragraph, i) => (
        <p
          key={i}
          className="mt-3 whitespace-pre-line text-base leading-relaxed text-gray-700"
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function Section({ section }: { section: LegalSection }) {
  return (
    <section id={section.id} className="scroll-mt-24">
      <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
        {section.title}
      </h2>
      {section.content.map((paragraph, i) => (
        <p
          key={i}
          className="mt-4 whitespace-pre-line text-base leading-relaxed text-gray-700"
        >
          {paragraph}
        </p>
      ))}
      {section.subsections?.map((sub) => (
        <Subsection key={sub.id} subsection={sub} />
      ))}
    </section>
  );
}

export function LegalPageContent({
  sections,
  metadata,
}: LegalPageContentProps) {
  return (
    <article className="space-y-10">
      <p className="text-sm text-gray-500">
        Effective Date: {metadata.effectiveDate} · Last Updated:{" "}
        {metadata.lastUpdated}
      </p>

      {sections.map((section) => (
        <Section key={section.id} section={section} />
      ))}
    </article>
  );
}

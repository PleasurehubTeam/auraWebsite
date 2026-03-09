/**
 * Embed layout: hides the global Header, Footer, age verification gate,
 * and cookie banner so the page renders in pure content mode for
 * WebView/iframe usage.
 *
 * Uses CSS to hide layout chrome since the root layout (server component)
 * always renders Header/Footer and cannot conditionally exclude them.
 */
export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            header, footer, #age-gate-overlay, noscript {
              display: none !important;
            }
            body > div[style*="blur"] {
              filter: none !important;
              pointer-events: auto !important;
              user-select: auto !important;
            }
          `,
        }}
      />
      {children}
    </>
  );
}

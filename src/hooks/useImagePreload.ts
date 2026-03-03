import { useEffect } from "react";

/**
 * Preload images in the background after the page becomes idle.
 * Uses `requestIdleCallback` (with `setTimeout` fallback) so preloading
 * does not compete with critical rendering work.
 */
export function useImagePreload(srcs: string[]) {
  useEffect(() => {
    if (srcs.length === 0) return;

    const schedule =
      typeof requestIdleCallback === "function"
        ? requestIdleCallback
        : (cb: () => void) => setTimeout(cb, 200);

    const cancel =
      typeof cancelIdleCallback === "function"
        ? cancelIdleCallback
        : clearTimeout;

    const id = schedule(() => {
      srcs.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    });

    return () => cancel(id as number);
  }, [srcs]);
}

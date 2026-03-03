"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/config/site";

interface AgeVerificationGateProps {
  isVerified: boolean;
  isLoaded: boolean;
  verify: () => void;
  decline: (url: string) => void;
}

export function AgeVerificationGate({
  isVerified,
  isLoaded,
  verify,
  decline,
}: AgeVerificationGateProps) {
  const [mounted, setMounted] = useState(false);
  const gateRef = useRef<HTMLDivElement>(null);
  const [removedCount, setRemovedCount] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scrolling when gate is visible
  useEffect(() => {
    if (isLoaded && !isVerified) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isLoaded, isVerified]);

  // Monitor DOM removal — if someone deletes the gate node via DevTools, force re-render
  useEffect(() => {
    if (!isLoaded || isVerified || !mounted) return;

    const observer = new MutationObserver(() => {
      const gateExists = document.getElementById("age-gate-overlay");
      if (!gateExists) {
        document.body.style.overflow = "hidden";
        setRemovedCount((c) => c + 1);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [isLoaded, isVerified, mounted]);

  // Periodically check localStorage tampering
  useEffect(() => {
    if (!isLoaded || isVerified) return;

    const interval = setInterval(() => {
      const stored = localStorage.getItem("aura_age_verified");
      if (stored === "true") {
        localStorage.removeItem("aura_age_verified");
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isLoaded, isVerified]);

  // Block Escape key
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isVerified && e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    [isVerified],
  );

  const showGate = isLoaded && !isVerified;

  const gate = (
    <AnimatePresence>
      {showGate && (
        <motion.div
          key={`gate-${removedCount}`}
          id="age-gate-overlay"
          ref={gateRef}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="age-verification-title"
          onKeyDown={handleKeyDown}
        >
          <motion.div
            className="w-full max-w-md rounded-2xl bg-gray-900 p-8 text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h2
              id="age-verification-title"
              className="mb-2 text-2xl font-bold text-white"
            >
              Age Verification
            </h2>
            <p className="mb-8 text-gray-400">Are you 18 or older?</p>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={verify}
                className="min-h-[44px] rounded-lg bg-brand-pink px-8 py-3 font-medium text-white transition-colors hover:bg-brand-pink-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                autoFocus
              >
                Yes, I am 18+
              </button>
              <button
                onClick={() => decline(siteConfig.ageVerificationRedirectUrl)}
                className="min-h-[44px] rounded-lg border border-gray-600 px-8 py-3 font-medium text-gray-300 transition-colors hover:border-gray-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
              >
                No, I am under 18
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;
  return createPortal(gate, document.body);
}

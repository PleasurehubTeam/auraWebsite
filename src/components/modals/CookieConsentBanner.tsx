"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { siteConfig } from "@/config/site";

export function CookieConsentBanner() {
  const { isConsented, isLoaded, accept } = useCookieConsent();

  return (
    <AnimatePresence>
      {isLoaded && !isConsented && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-[100] border-t border-white/10 bg-gray-900/95 px-4 py-4 backdrop-blur-sm sm:px-6"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          role="alert"
        >
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-center text-sm text-gray-300 sm:text-left">
              We use cookies to enhance your browsing experience. By continuing
              to use this site, you agree to our use of cookies.{" "}
              <Link
                href={siteConfig.privacyPolicyUrl}
                className="text-brand-pink underline hover:text-brand-pink-light"
              >
                Privacy Policy
              </Link>
            </p>
            <button
              onClick={accept}
              className="min-h-[44px] shrink-0 rounded-lg bg-brand-pink px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-pink-dark"
            >
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

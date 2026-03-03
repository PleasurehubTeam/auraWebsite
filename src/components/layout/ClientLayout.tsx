"use client";

import { useAgeVerification } from "@/hooks/useAgeVerification";
import { AgeVerificationGate } from "@/components/modals/AgeVerificationGate";
import { CookieConsentBanner } from "@/components/modals/CookieConsentBanner";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { isVerified, isLoaded, verify, decline } = useAgeVerification();

  return (
    <>
      <AgeVerificationGate
        isVerified={isVerified}
        isLoaded={isLoaded}
        verify={verify}
        decline={decline}
      />
      <div
        style={
          isLoaded && !isVerified
            ? {
                filter: "blur(20px)",
                pointerEvents: "none",
                userSelect: "none",
              }
            : undefined
        }
      >
        {children}
      </div>
      {isVerified && <CookieConsentBanner />}
    </>
  );
}

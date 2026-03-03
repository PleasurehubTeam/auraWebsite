"use client";

import { useState, useEffect, useCallback } from "react";
import { getStorageItem, setStorageItem } from "@/lib/storage";

const STORAGE_KEY = "aura_age_verified";

export function useAgeVerification() {
  const [isVerified, setIsVerified] = useState(true); // default true to avoid flash
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = getStorageItem(STORAGE_KEY);
    setIsVerified(stored === "true");
    setIsLoaded(true);
  }, []);

  const verify = useCallback(() => {
    setStorageItem(STORAGE_KEY, "true");
    setIsVerified(true);
  }, []);

  const decline = useCallback((redirectUrl: string) => {
    window.location.href = redirectUrl;
  }, []);

  return { isVerified, isLoaded, verify, decline };
}

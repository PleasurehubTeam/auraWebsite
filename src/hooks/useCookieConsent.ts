"use client";

import { useState, useEffect, useCallback } from "react";
import { getStorageItem, setStorageItem } from "@/lib/storage";

const STORAGE_KEY = "aura_cookie_consent";

export function useCookieConsent() {
  const [isConsented, setIsConsented] = useState(true); // default true to avoid flash
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = getStorageItem(STORAGE_KEY);
    setIsConsented(stored === "accepted");
    setIsLoaded(true);
  }, []);

  const accept = useCallback(() => {
    setStorageItem(STORAGE_KEY, "accepted");
    setIsConsented(true);
  }, []);

  return { isConsented, isLoaded, accept };
}

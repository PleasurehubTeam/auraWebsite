"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/Button";

interface ShareButtonProps {
  url?: string;
  className?: string;
}

export function ShareButton({ url, className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      const shareUrl = url ?? window.location.href;
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available — fail silently
    }
  }, [url]);

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={handleCopy}
      className={className}
    >
      {copied ? "Copied!" : "Copy Link"}
    </Button>
  );
}

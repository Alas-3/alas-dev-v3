"use client";

import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete?: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let removeTimer: number | undefined;
    const finish = () => {
      setIsExiting(true);
      onComplete?.();
      removeTimer = window.setTimeout(() => setIsVisible(false), 450);
    };

    const fallbackTimer = window.setTimeout(() => {
      finish();
    }, 14000);

    const handleMessage = (event: MessageEvent) => {
      if (
        event.origin !== window.location.origin ||
        event.source !== document.querySelector<HTMLIFrameElement>("[data-ace-splash]")
          ?.contentWindow ||
        event.data?.type !== "ace-splash-complete"
      ) {
        return;
      }

      finish();
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.clearTimeout(fallbackTimer);
      if (removeTimer) window.clearTimeout(removeTimer);
      window.removeEventListener("message", handleMessage);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <iframe
      data-ace-splash
      className={`ace-splash-frame${isExiting ? " ace-splash-frame--exiting" : ""}`}
      src="/ace-splash.html"
      title="Ace Labador splash animation"
      aria-label="Loading Ace Labador portfolio"
      onError={() => {
        setIsExiting(true);
        onComplete?.();
        window.setTimeout(() => setIsVisible(false), 450);
      }}
    />
  );
}

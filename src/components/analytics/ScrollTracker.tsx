"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    gtag: (command: string, action: string, params?: Record<string, unknown>) => void;
  }
}

const SCROLL_THRESHOLDS = [25, 50, 75, 90];

export default function ScrollTracker() {
  const trackedThresholds = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      SCROLL_THRESHOLDS.forEach((threshold) => {
        if (scrollPercent >= threshold && !trackedThresholds.current.has(threshold)) {
          trackedThresholds.current.add(threshold);

          // Invia evento a GA4
          if (typeof window.gtag === "function") {
            window.gtag("event", "scroll_depth", {
              percent_scrolled: threshold,
              page_path: window.location.pathname,
            });
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
}

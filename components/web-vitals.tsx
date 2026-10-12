"use client";

import { useReportWebVitals } from "next/web-vitals";

/**
 * Lightweight client-side Core Web Vitals telemetry collector.
 * Automatically tracks FCP, LCP, CLS, FID, INP, and TTFB.
 * Logs in non-production environments and dispatches custom events for automated synthetic benchmarking.
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    // Dispatch a local DOM custom event so synthetic benchmarks and tests can inspect live web vitals
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("learncraft:web-vitals", {
          detail: {
            id: metric.id,
            name: metric.name,
            value: metric.value,
            rating: metric.rating,
          },
        })
      );

      // In non-production or when explicit performance debugging is enabled, log structured summary
      if (
        process.env.NODE_ENV !== "production" ||
        (typeof window !== "undefined" && window.localStorage?.getItem("learncraft_debug_perf") === "true")
      ) {
        // Safe logging without user tokens or sensitive data
        console.debug(`[Web-Vitals] ${metric.name}: ${Math.round(metric.value)}ms (${metric.rating})`);
      }
    }
  });

  return null;
}

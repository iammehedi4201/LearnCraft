/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * QUERY CLIENT CONFIGURATION
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * This file creates and exports a singleton QueryClient instance with configured
 * defaults. The client manages all queries, mutations, and their caches globally.
 * 
 * DEFAULT CONFIGURATIONS:
 * • staleTime: 0ms — data is immediately considered "stale" (fresh from server only once)
 * • gcTime: 5m — garbage collected data persists in memory for 5 minutes
 * • retry: 1 — failed requests retry once before showing error
 * • refetchOnWindowFocus: true — refetch data when user returns to the window
 * 
 * These defaults are inherited by all queries unless overridden at query time.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { QueryClient, DefaultOptions } from "@tanstack/react-query";

const queryConfig: DefaultOptions = {
  queries: {
    staleTime: 0, // Data is fresh only once initially fetched
    gcTime: 1000 * 60 * 5, // Keep unused queries in cache for 5 minutes
    retry: 1, // Retry failed requests once
    refetchOnWindowFocus: true, // Refetch when user returns to window
  },
  mutations: {
    retry: 1,
  },
};

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

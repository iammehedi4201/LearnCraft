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
    staleTime: 1000 * 60 * 2, // Data remains fresh for 2 minutes — instant navigation from cache
    gcTime: 1000 * 60 * 10, // Keep unused queries in cache for 10 minutes
    retry: 1, // Retry failed requests once
    refetchOnWindowFocus: false, // Prevent distracting network requests on window/tab switch
    refetchOnReconnect: true, // Auto-refetch when user regains internet connectivity
  },
  mutations: {
    retry: 1,
  },
};

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

import { clearProgressCache } from "./progress-sync";
import { clearGamificationCache } from "./gamification";
import { clearNotesCache, clearBookmarksCache } from "./notes-bookmarks";

/**
 * Completely purges all client-side memory caches (QueryClient, Progress, Gamification, Notes, Bookmarks).
 * Must be executed upon sign-out, session expiration, or account switching to prevent cross-user data leakage.
 */
export function clearAllClientCaches(): void {
  try {
    queryClient.clear();
  } catch {}
  clearProgressCache();
  clearGamificationCache();
  clearNotesCache();
  clearBookmarksCache();
}


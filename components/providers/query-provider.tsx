"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { queryClient, clearAllClientCaches } from "@/lib/query-client";

export function QueryProvider({ children }: { children: React.ReactNode }) {
    // We use a state to ensure the QueryClient is only created once on the client
    const [client] = useState(() => queryClient);
    const { data: session, status } = useSession();
    const previousUserIdRef = useRef<string | null | undefined>(undefined);

    useEffect(() => {
        if (status === "loading") return;

        const currentUserId = session?.user?.id || session?.user?.email || null;

        if (previousUserIdRef.current !== undefined && previousUserIdRef.current !== currentUserId) {
            // User switched accounts or signed out -> clear all caches to prevent leakage
            clearAllClientCaches();
        }

        previousUserIdRef.current = currentUserId;
    }, [session, status]);

    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    );
}

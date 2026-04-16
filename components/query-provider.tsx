"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { queryClient } from "@/lib/query-client";

export function QueryProvider({ children }: { children: React.ReactNode }) {
    // We use a state to ensure the QueryClient is only created once on the client
    const [client] = useState(() => queryClient);

    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    );
}

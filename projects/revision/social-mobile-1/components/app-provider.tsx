// components/app-provider.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import { AppContext } from "./app-context";

export default function AppProvider({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());
    const [auth, setAuth] = useState(undefined);

    useEffect(() => {
        //API calling
    }, []);

    return (
        <AppContext.Provider value={{ auth, setAuth }}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </AppContext.Provider>
    );
}

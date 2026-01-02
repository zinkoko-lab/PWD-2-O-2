// components/app-provider.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import { AppContext } from "./app-context";

export default function AppProvider({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());
    const [auth, setAuth] = useState(undefined);
    const [api] = useState(() => "http://192.168.10.101:8800");
    // ipconfig getifaddr en0 // to findout ip address

    useEffect(() => {
        const restoreLogin = async () => {
            const token = await AsyncStorage.getItem("token");
            if (token) {
                const res = await fetch(`${api}/users/verify`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!res.ok) {
                    await AsyncStorage.removeItem("token");
                }
                const user = await res.json();
                setAuth(user);
            }
        };
        restoreLogin();
    }, []);

    return (
        <AppContext.Provider value={{ auth, setAuth, api }}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </AppContext.Provider>
    );
}

import { createContext, useContext, useMemo, useState } from "react";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { CssBaseline } from "@mui/material";

export const AppContext = createContext();
export function useApp() {
    return useContext(AppContext);
}

export default function AppProvider({ children }) {
    const [mode, setMode] = useState("dark");
    const [openDrawer, setOpenDrawer] = useState(false);
    const [auth, setAuth] = useState();
    const theme = useMemo(() => {
        return createTheme({
            palette: {
                mode,
            },
        });
    }, [mode]);

    return (
        <AppContext.Provider
            value={{ mode, setMode, openDrawer, setOpenDrawer, auth, setAuth }}
        >
            <ThemeProvider theme={theme}>
                {children} <CssBaseline />
            </ThemeProvider>
        </AppContext.Provider>
    );
}

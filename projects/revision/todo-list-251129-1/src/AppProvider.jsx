import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import { createContext, useContext, useMemo, useState } from "react";

const AppContext = createContext();

export const AppUse = () => useContext(AppContext);

export default function AppProvider({ children }) {
    const [mode, setMode] = useState("dark");

    const theme = useMemo(() => {
        return createTheme({
            palette: {
                mode: mode,
            },
        });
    }, [mode]);

    return (
        <AppContext.Provider value={{ mode, setMode }}>
            <ThemeProvider theme={theme}>
                {children}
                <CssBaseline />
            </ThemeProvider>
        </AppContext.Provider>
    );
}

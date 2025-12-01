import { createContext, useMemo, useState, useContext } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

export const AppContext = createContext();

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

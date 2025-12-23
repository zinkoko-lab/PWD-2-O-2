import { createContext, useState, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

export const AppContext = createContext();

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

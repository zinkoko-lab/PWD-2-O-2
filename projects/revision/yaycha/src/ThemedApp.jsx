import { createContext, useContext, useState } from "react";
import App from "./App.jsx";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        mode: "dark",
    },
});

export const AppContext = createContext();

export function useApp() {
    return useContext(AppContext);
}

function ThemedApp() {
    const [showForm, setShowForm] = useState(false);

    return (
        <ThemeProvider theme={theme}>
            <AppContext.Provider value={{ showForm, setShowForm }}>
                <App />
                <CssBaseline />
            </AppContext.Provider>
        </ThemeProvider>
    );
}

export default ThemedApp;

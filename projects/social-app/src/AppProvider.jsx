// src/AppProvider.jsx
import { useMemo, useState, useEffect } from "react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { AppContext } from "./AppContext";

export default function AppProvider({ children }) {
    const [mode, setMode] = useState("dark");
    const [openDrawer, setOpenDrawer] = useState(false);
    const [auth, setAuth] = useState(null);

    const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

    useEffect(() => {
        const api = "http://localhost:8800";
        const token = localStorage.getItem("token");
        if (token) {
            fetch(`${api}/users/verify`, {
                headers: { Authorization: `Bearer ${token}` },
            }).then(async (res) => {
                if (res.ok) setAuth(await res.json());
                else localStorage.removeItem("token");
            });
        }
    }, []);

    return (
        <AppContext.Provider
            value={{ mode, setMode, openDrawer, setOpenDrawer, auth, setAuth }}
        >
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </AppContext.Provider>
    );
}

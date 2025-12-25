import { createContext, useContext, useMemo, useState } from "react";

import {
    CssBaseline,
    ThemeProvider,
    createTheme,
    Snackbar,
    IconButton,
} from "@mui/material";

import App from "./App";
import { deepPurple, grey } from "@mui/material/colors";
import { createBrowserRouter } from "react-router-dom";
import Template from "./Template";
import Home from "./pages/Home";

export const AppContext = createContext();

export function useApp() {
    return useContext(AppContext);
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Template />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
        ],
    },
]);

export default function ThemeApp() {
    const [showForm, setShowForm] = useState(false);
    const [mode, setMode] = useState("dark");
    const [showDrawer, setShowDrawer] = useState(false);
    const [globalMsg, setGlobalMsg] = useState(null);
    const [auth, setAuth] = useState(null);

    const theme = useMemo(() => {
        return createTheme({
            palette: {
                mode: mode,
                primary: deepPurple,
                banner: mode === "dark" ? grey[800] : grey[200],
                text: {
                    fade: grey[500],
                },
            },
        });
    }, [mode]);
    return (
        <ThemeProvider theme={theme}>
            <AppContext.Provider
                value={{
                    showDrawer,
                    setShowDrawer,
                    showForm,
                    setShowForm,
                    globalMsg,
                    setGlobalMsg,
                    auth,
                    setAuth,
                    mode,
                    setMode,
                }}
            >
                <App />

                <CssBaseline />
            </AppContext.Provider>
        </ThemeProvider>
    );
}

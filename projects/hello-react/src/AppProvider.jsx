import { createContext, useContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const AppContext = createContext();

export function useApp() {
    return useContext(AppContext);
}

export default function AppProvider({ children }) {
    const [mode, setMode] = useState("dark");

    /*
    Without useMemo = Bad Performace
    const theme = createTheme({
        palette: { mode },
    });

    With useMemo = Better Performance
    modeの値を常に監視していて、変更があれば creatThemeを実行する、
    なければ実行せずに既存の modeの値を使用することで
    performanceを担保する
    */

    const theme = useMemo(() => {
        return createTheme({
            palette: { mode },
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

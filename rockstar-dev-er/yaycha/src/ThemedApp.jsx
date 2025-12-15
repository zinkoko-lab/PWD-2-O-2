import { createContext } from "react";

import App from "./App";
import { useState } from "react";

export const AppContext = createContext();

export default function ThemeApp() {
    const [mode, setMode] = useState("dark");
    return (
        <AppContext.Provider value={{ mode, setMode }}>
            <App />
        </AppContext.Provider>
    );
}

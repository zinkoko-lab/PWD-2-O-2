import { createContext, useContext } from "react";

export const AppContext = createContext();
export const AppUse = () => useContext(AppContext);

export default function AppProvider({ children }) {
    const count = 12;
    return <AppContext.Provider value={count}>{children}</AppContext.Provider>;
}

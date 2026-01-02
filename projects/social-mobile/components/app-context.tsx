// components/app-context.jsx
import { UserType } from "@/types/global";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export const AppContext = createContext<{
    auth: UserType | undefined;
    setAuth: Dispatch<SetStateAction<undefined>>;
    api: string;
}>({ auth: undefined, setAuth: () => {}, api: "" });

export function useApp() {
    return useContext(AppContext);
}

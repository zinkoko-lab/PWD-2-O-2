import { AppContext } from "./AppProvider";
import { useContext } from "react";

export function Title() {
    const { count } = useContext(AppContext);
    return <h1>Title count={count}</h1>;
}

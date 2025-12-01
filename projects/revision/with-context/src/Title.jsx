import { AppUse } from "./AppProvider";

export default function Title() {
    const value = AppUse();
    return <h1>{`With Context (count = ${value})`}</h1>;
}

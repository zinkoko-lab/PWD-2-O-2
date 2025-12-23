import { useContext, useEffect, useMemo } from "react";
import Header from "./Header";
import { AppContext } from "./AppProvider";

function someFun() {
    console.log("Calling Some Function...");
    return "some_val";
}

function App() {
    const { count, setCount } = useContext(AppContext);
    useEffect(() => {
        console.log("Rendering App Component...");
    }, []);

    const value = useMemo(() => {
        return someFun();
    }, []);
    return (
        <>
            <Header />
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
                placeat dolores illum natus dolorum sint facilis officiis vitae
                repudiandae! Ad, et? Ipsam natus officia saepe inventore
                aperiam, quibusdam ex at!
            </p>
            <button
                onClick={(e) => {
                    setCount(count + 1);
                }}
            >
                Count
            </button>
        </>
    );
}

export default App;

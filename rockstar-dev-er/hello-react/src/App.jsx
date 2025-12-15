import { useState } from "react";

function App() {
    const [state, setState] = useState("green");

    return (
        <>
            <div
                style={{
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    backgroundColor: state,
                }}
            >
                <button onClick={() => setState("red")}>Red</button>
                <button onClick={() => setState("green")}>Green</button>
            </div>
        </>
    );
}

export default App;

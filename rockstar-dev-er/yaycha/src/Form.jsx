import { useContext } from "react";
import { useRef } from "react";
import { AppContext } from "./ThemedApp";

export default function Form({ add }) {
    const contentRef = useRef();
    const nameRef = useRef();

    const value = useContext(AppContext);

    return (
        // form( content-input, name-input, button)
        <form
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                padding: 10,
                borderRadius: 8,
                marginBottom: 20,
                background: value.mode === "dark" ? "#555" : "#def",
            }}
            onSubmit={(e) => {
                e.preventDefault();
                const content = contentRef.current.value.trim();
                const name = nameRef.current.value.trim();
                add(content, name);
                e.currentTarget.reset();
            }}
        >
            <input
                style={{
                    padding: 5,
                }}
                ref={contentRef}
                type="text"
                placeholder="Content"
            />
            <input
                style={{
                    padding: 5,
                }}
                ref={nameRef}
                type="text"
                placeholder="Name"
            />
            <button
                style={{
                    padding: 8,
                    background: "#0d6efd",
                    color: "white",
                    border: "0 none",
                }}
                type="submit"
            >
                Post
            </button>
        </form>
    );
}

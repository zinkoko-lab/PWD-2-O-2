import { useRef } from "react";

export default function Form({ add }) {
    const inputRef = useRef();

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                add();
                e.currentTarget.reset();
            }}
        >
            <input type="text" ref={inputRef} />
            <button type="submit">add</button>
        </form>
    );
}

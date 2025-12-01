import { useState, useRef } from "react";
import List from "./List";
import Item from "./Item";
import "./App.css";

function App() {
    const [data, setdata] = useState([
        { id: 3, name: "apple", done: false },
        { id: 2, name: "orange", done: true },
        { id: 1, name: "egg", done: false },
    ]);

    const inputRef = useRef();

    function add() {
        const id = data[0].id + 1;
        const name = inputRef.current.value;
        if (name == "") {
            return false;
        }
        setdata([{ id, name, done: false }, ...data]);
    }

    return (
        <div>
            <h1>Hello, React!</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    add();
                    e.currentTarget.reset();
                }}
            >
                <input type="text" ref={inputRef} />
                <button type="submit">Add</button>
            </form>
            <List>
                {data.map((item) => (
                    <Item key={item.id} name={item.name} done={item.done} />
                ))}
            </List>
        </div>
    );
}

export default App;

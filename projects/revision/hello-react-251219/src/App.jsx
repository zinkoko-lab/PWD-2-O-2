import { useRef, useState } from "react";
import Item from "./Item";
import Header from "./Header";
import { Container } from "@mui/material";
import Form from "./Form";

function App() {
    const inputRef = useRef();
    const [data, setData] = useState([
        { id: 3, name: "Apple", done: false },
        { id: 2, name: "Orange", done: true },
        { id: 1, name: "Egg", done: false },
    ]);

    const add = () => {
        const id = data[0].id + 1;
        const name = inputRef.current.value.trim();
        if (name === "") return false;
        setData([{ id, name, done: false }, ...data]);
    };

    const remove = (id) => {
        setData(data.filter((item) => item.id !== id));
    };

    const toggle = (id) => {
        setData(
            data.map((item) => {
                if (item.id === id) item.done = !item.done;
                return item;
            })
        );
    };

    return (
        <>
            <Header />
            <Container
                maxWidth="sm"
                sx={{
                    mt: 4,
                }}
            >
                <Form add={add} />
                <ul>
                    {data
                        .filter((item) => !item.done)
                        .map((item) => (
                            <Item
                                key={item.id}
                                item={item}
                                remove={remove}
                                toggle={toggle}
                            />
                        ))}
                </ul>
                {data.length ? <hr /> : ""}
                <ul>
                    {data
                        .filter((item) => item.done)
                        .map((item) => (
                            <Item
                                key={item.id}
                                item={item}
                                remove={remove}
                                toggle={toggle}
                            />
                        ))}
                </ul>
            </Container>
        </>
    );
}

export default App;

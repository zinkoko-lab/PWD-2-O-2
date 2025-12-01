import { useState } from "react";
import Form from "./Form";
import Item from "./Item";
import Header from "./Header";
import { Container, Divider, List, Typography } from "@mui/material";

function App() {
    const [data, setData] = useState([
        { id: 3, content: "To Study JavaScript", done: false },
        { id: 2, content: "To Study CSS", done: false },
        { id: 1, content: "To Study HTML", done: true },
    ]);

    // const [data, setData] = useState([]);

    const add = (content) => {
        const id = data[0] ? data[0].id + 1 : 1;
        if (content == "") {
            return false;
        }
        setData([{ id, content, done: false }, ...data]);
        console.log(data);
    };

    const del = (id) => {
        setData(data.filter((item) => item.id !== id));
    };

    const toggle = (id) => {
        setData(
            data.map((item) => {
                if (item.id === id) {
                    item.done = !item.done;
                }
                return item;
            })
        );
    };

    return (
        <>
            <Header count={data.filter((item) => !item.done).length} />
            <Container sx={{ mt: 4 }} maxWidth="sm">
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ textAlign: "center" }}
                >
                    Road Map to Study React🚀
                </Typography>
                <Form add={add} />
                <List>
                    {data
                        .filter((item) => !item.done)
                        .map((item) => (
                            <Item
                                key={item.id}
                                item={item}
                                del={del}
                                toggle={toggle}
                            />
                        ))}
                </List>
                {data[0] ? <Divider /> : ""}
                <List>
                    {data
                        .filter((item) => item.done)
                        .map((item) => (
                            <Item
                                key={item.id}
                                item={item}
                                del={del}
                                toggle={toggle}
                            />
                        ))}
                </List>
            </Container>
        </>
    );
}

export default App;

import { useState } from "react";
import Item from "./Item";
import Form from "./Form";
import Header from "./Header";
import { Typography, List, Container, Divider } from "@mui/material";

function App() {
    const [data, setData] = useState([
        { id: 3, task: "To Study JavaScript.", done: false },
        { id: 2, task: "To Study CSS.", done: false },
        { id: 1, task: "To Study HTML.", done: true },
    ]);

    const add = (task) => {
        const id = data[0] ? data[0].id + 1 : 1;
        if (task === "") {
            return false;
        }
        setData([{ id, task, done: false }, ...data]);
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

            <Container maxWidth="sm">
                <Typography
                    variant="h4"
                    sx={{ flexGrow: 1, my: 3, textAlign: "center" }}
                >
                    Roadmap to Study React 🚀
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
                <Divider />
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

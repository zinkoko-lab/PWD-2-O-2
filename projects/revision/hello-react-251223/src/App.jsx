import { useMemo, useState, useEffect } from "react";
import { Divider, List } from "@mui/material";
import Item from "./Item";
import Form from "./Form";
import Header from "./Header";
import { Container, Box, Typography, CircularProgress } from "@mui/material";
import SyncProblemIcon from "@mui/icons-material/SyncProblem";

function App() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const api = "http://localhost:8800/tasks";

    useEffect(() => {
        setIsLoading(true);
        fetch(api)
            .then(async (res) => {
                const tasks = await res.json();
                setData(tasks);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
                setError("Unable to fetch!");
            });
    }, []);

    const add = async (name) => {
        if (name === "") return false;
        const res = await fetch(api, {
            method: "POST",
            body: JSON.stringify({ name }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const task = await res.json();
        setData([task, ...data]);
    };

    const remove = (id) => {
        fetch(`${api}/${id}`, { method: "DELETE" });
        setData(data.filter((item) => item.id !== id));
    };

    const toggle = (id) => {
        fetch(`${api}/${id}/toggle`, { method: "PUT" });
        setData(
            data.map((item) => {
                if (item.id === id) {
                    item.done = !item.done;
                }
                return item;
            })
        );
    };

    const count = useMemo(() => {
        return data.filter((item) => !item.done).length;
    }, [data]);

    return (
        <>
            <Header count={count} />
            <Container maxWidth="sm" sx={{ mt: 5 }}>
                <Form add={add} />
                {isLoading && (
                    <Box
                        sx={{
                            mt: 5,
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Typography>
                            Loading...
                            <CircularProgress />
                        </Typography>
                    </Box>
                )}
                {error && (
                    <Box
                        sx={{
                            mt: 5,
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Typography color="error" sx={{ mr: 2 }}>
                            {error}
                        </Typography>
                        <SyncProblemIcon color="error" />
                    </Box>
                )}
                <List>
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
                </List>
                {data[0] ? <Divider /> : ""}
                <List>
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
                </List>
            </Container>
        </>
    );
}

export default App;

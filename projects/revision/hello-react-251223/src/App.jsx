import { Divider, List } from "@mui/material";
import Item from "./Item";
import Form from "./Form";
import Header from "./Header";
import { Container, Box, Typography, CircularProgress } from "@mui/material";
import SyncProblemIcon from "@mui/icons-material/SyncProblem";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const api = "http://localhost:8800/tasks";

function App() {
    const queryClient = useQueryClient();
    const { data, isLoading, error } = useQuery({
        queryKey: ["tasks"],
        queryFn: async () => {
            const res = await fetch(api);
            return res.json();
        },
    });

    const add = async (name) => {
        if (name === "") return false;
        const res = await fetch(api, {
            method: "POST",
            body: JSON.stringify({ name }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        await queryClient.invalidateQueries(["tasks"]);
    };

    const remove = async (id) => {
        await fetch(`${api}/${id}`, { method: "DELETE" });
        await queryClient.invalidateQueries(["tasks"]);
    };

    const toggle = async (id) => {
        await fetch(`${api}/${id}/toggle`, { method: "PUT" });
        await queryClient.invalidateQueries(["tasks"]);
    };

    if (isLoading) {
        return (
            <Box
                sx={{
                    mt: 10,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Typography>
                    Loading...
                    <CircularProgress />
                </Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                sx={{
                    mt: 10,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Typography color="error" sx={{ mr: 2 }}>
                    {error.message}
                </Typography>
                <SyncProblemIcon color="error" />
            </Box>
        );
    }

    return (
        <>
            <Header count={data.filter((item) => !item.done).length} />
            <Container maxWidth="sm" sx={{ mt: 5 }}>
                <Form add={add} />
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

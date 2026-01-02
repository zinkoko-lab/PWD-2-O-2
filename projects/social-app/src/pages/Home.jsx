import { Box, CircularProgress, Typography } from "@mui/material";
import Post from "../components/Post";
import { useQuery } from "@tanstack/react-query";
import SyncProblemIcon from "@mui/icons-material/SyncProblem";

const api = "http://localhost:8800";

export default function Home() {
    const {
        data: posts,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const res = await fetch(`${api}/posts`);
            return res.json();
        },
    });

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
        <Box>
            {posts.map((post) => {
                return <Post key={post.id} post={post} />;
            })}
        </Box>
    );
}

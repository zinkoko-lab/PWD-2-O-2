import {
    Box,
    CircularProgress,
    IconButton,
    OutlinedInput,
    Typography,
} from "@mui/material";
import Post from "../components/Post";
import Comment from "../components/Comment";
import { Send } from "@mui/icons-material";
import SyncProblemIcon from "@mui/icons-material/SyncProblem";
import { useParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
const api = "http://localhost:8800";

export default function Show() {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const {
        data: post,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["posts", id],
        queryFn: async () => {
            const res = await fetch(`${api}/posts/${id}`);
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
            <Post post={post} />
            <Box sx={{ mb: 2 }}>
                <form>
                    <OutlinedInput
                        type="text"
                        placeholder="Your comment..."
                        fullWidth
                        endAdornment={
                            <IconButton type="submit">
                                <Send />
                            </IconButton>
                        }
                    />
                </form>
            </Box>
            {post.comments.map((comment) => {
                return <Comment key={comment.id} comment={comment} />;
            })}
        </Box>
    );
}

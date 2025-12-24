import { Box, IconButton, OutlinedInput, Typography } from "@mui/material";
import Post from "../components/Post";
import Comment from "../components/Comment";
import { Send } from "@mui/icons-material";

export default function Show() {
    return (
        <Box>
            <Post />
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
            <Comment />
            <Comment />
        </Box>
    );
}

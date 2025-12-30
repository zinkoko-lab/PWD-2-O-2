import { Avatar, Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function Comment({ comment }) {
    return (
        <Box sx={{ p: 2, border: "1px solid #66666680" }}>
            <Box sx={{ display: "flex", gap: 2 }}>
                <Avatar
                    sx={{
                        width: 64,
                        height: 64,
                        background: grey[500],
                    }}
                />
                <Box>
                    <Typography>{comment.user.name}</Typography>
                    <Typography color="success">
                        {new Date(comment.createdAt).toLocaleString()}
                    </Typography>
                    <Typography sx={{ mt: 1 }}>{comment.content}</Typography>
                </Box>
            </Box>
        </Box>
    );
}

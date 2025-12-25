import {
    CommentOutlined as CommentIcon,
    FavoriteBorderOutlined as LikeIcon,
} from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    IconButton,
    Typography,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { useNavigate } from "react-router";

export default function Post({ post }) {
    const navigate = useNavigate();

    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Avatar
                        sx={{
                            width: 64,
                            height: 64,
                            background: green[500],
                        }}
                    />
                    <Box>
                        <Typography>{post.user.name}</Typography>
                        <Typography color="success">
                            {post.createdAt}
                        </Typography>
                        <Typography
                            sx={{ mt: 1, cursor: "pointer" }}
                            onClick={() => navigate(`/show/${post.id}`)}
                        >
                            {post.content}
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        mt: 2,
                        display: "flex",
                        justifyContent: "space-around",
                    }}
                >
                    <ButtonGroup>
                        <IconButton color="error">
                            <LikeIcon />
                        </IconButton>
                        <Button variant="text" size="small">
                            0
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <IconButton>
                            <CommentIcon />
                        </IconButton>
                        <Button variant="text" size="small">
                            {post.comments ? post.comments.length : 0}
                        </Button>
                    </ButtonGroup>
                </Box>
            </CardContent>
        </Card>
    );
}

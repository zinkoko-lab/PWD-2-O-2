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

export default function Post() {
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
                        <Typography>Alice</Typography>
                        <Typography color="success">
                            A few second ago
                        </Typography>
                        <Typography
                            sx={{ mt: 1, cursor: "pointer" }}
                            onClick={() => navigate("/show")}
                        >
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Nobis voluptatem quis sequi enim alias,
                            incidunt, earum accusamus commodi aliquam
                            consequuntur corrupti quam culpa id similique dicta
                            quidem ipsa sint amet?
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
                            10
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <IconButton>
                            <CommentIcon />
                        </IconButton>
                        <Button variant="text" size="small">
                            10
                        </Button>
                    </ButtonGroup>
                </Box>
            </CardContent>
        </Card>
    );
}

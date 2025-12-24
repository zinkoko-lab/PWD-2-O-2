import { Avatar, Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function Comment() {
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
                    <Typography>Bob</Typography>
                    <Typography color="success">A few second ago</Typography>
                    <Typography sx={{ mt: 1 }}>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Nobis voluptatem quis sequi enim alias, incidunt,
                        earum accusamus commodi aliquam consequuntur corrupti
                        quam culpa id similique dicta quidem ipsa sint amet?
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

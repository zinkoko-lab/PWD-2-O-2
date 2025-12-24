import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Badge,
    IconButton,
} from "@mui/material";
import { AppUse } from "./AppProvider";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function Header({ count }) {
    const { mode, setMode } = AppUse();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        <Badge badgeContent={count} color="error">
                            Todo
                        </Badge>
                    </Typography>
                    {mode === "dark" ? (
                        <IconButton onClick={() => setMode("light")}>
                            <LightModeIcon />
                        </IconButton>
                    ) : (
                        <IconButton onClick={() => setMode("dark")}>
                            <DarkModeIcon />
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

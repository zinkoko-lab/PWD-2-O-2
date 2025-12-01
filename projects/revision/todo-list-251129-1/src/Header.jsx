import { AppBar, Toolbar, Typography, Badge, IconButton } from "@mui/material";
import { AppUse } from "./AppProvider";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function Header({ count }) {
    const { mode, setMode } = AppUse();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography sx={{ flexGrow: 1 }}>
                    <Badge badgeContent={count} color="error">
                        ToDo
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
    );
}

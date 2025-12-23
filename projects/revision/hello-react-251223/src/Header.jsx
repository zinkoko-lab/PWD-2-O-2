import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
    DarkMode as DarkModeIcon,
    LightMode as LightModeIcon,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "./AppProvider";
import { Badge } from "@mui/material";

export default function Header({ count }) {
    const { mode, setMode } = useContext(AppContext);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Badge badgeContent={count} color="error">
                        Todo
                    </Badge>
                </Typography>

                {mode === "dark" ? (
                    <IconButton
                        color="inherit"
                        onClick={() => setMode("light")}
                    >
                        <LightModeIcon />
                    </IconButton>
                ) : (
                    <IconButton color="inherit" onClick={() => setMode("dark")}>
                        <DarkModeIcon />
                    </IconButton>
                )}
            </Toolbar>
        </AppBar>
    );
}

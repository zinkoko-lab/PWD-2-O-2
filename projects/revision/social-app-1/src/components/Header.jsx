import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import {
    DarkMode as DarkModeIcon,
    LightMode as LightModeIcon,
    Menu as MenuIcon,
} from "@mui/icons-material";
import { useApp } from "../AppProvider";

export default function Header() {
    const { mode, setMode, setOpenDrawer } = useApp();

    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton onClick={() => setOpenDrawer(true)}>
                    <MenuIcon />
                </IconButton>
                <Typography sx={{ flexGrow: 1, ml: 2 }}>SocailApp</Typography>
                {/* LightMode or DarkMode IconButton */}
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

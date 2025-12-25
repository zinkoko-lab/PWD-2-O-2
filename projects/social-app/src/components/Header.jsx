import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import {
    DarkMode as DarkModeIcon,
    LightMode as LightModeIcon,
    Menu as MenuIcon,
    ArrowBack as BackIcon,
} from "@mui/icons-material";
import { useApp } from "../AppProvider";
import { useLocation, useNavigate } from "react-router";

export default function Header() {
    const { mode, setMode, setOpenDrawer } = useApp();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <AppBar position="sticky">
            <Toolbar>
                {pathname === "/" ? (
                    <IconButton onClick={() => setOpenDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                ) : (
                    <IconButton onClick={() => navigate("/")}>
                        <BackIcon />
                    </IconButton>
                )}

                <Typography sx={{ flexGrow: 1, ml: 2 }}>SocialApp</Typography>
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

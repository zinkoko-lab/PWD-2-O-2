import {
    Box,
    Divider,
    Drawer,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useApp } from "../AppContext";
import {
    Home as HomeIcon,
    Login as LoginIcon,
    Logout as LogoutIcon,
    PersonAdd as RegisterIcon,
    Person as ProfileIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router";

export default function AppDrawer() {
    const { openDrawer, setOpenDrawer, auth, setAuth } = useApp();
    const navigate = useNavigate();

    return (
        <>
            <Drawer
                open={openDrawer}
                onClick={() => setOpenDrawer(false)}
                onClose={() => setOpenDrawer(false)}
            >
                <Box
                    sx={{ width: 250, height: 180, background: grey[500] }}
                ></Box>

                <ListItem>
                    <ListItemButton onClick={() => navigate("/")}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
                <Divider />

                {auth && (
                    <>
                        <ListItem>
                            <ListItemButton
                                onClick={() => navigate("/profile")}
                            >
                                <ListItemIcon>
                                    <ProfileIcon />
                                </ListItemIcon>
                                <ListItemText primary="Profile" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton
                                onClick={() => {
                                    setAuth(false);
                                    navigate("/login");
                                    localStorage.removeItem("token");
                                }}
                            >
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        </ListItem>
                    </>
                )}

                {!auth && (
                    <>
                        <ListItem>
                            <ListItemButton onClick={() => navigate("/login")}>
                                <ListItemIcon>
                                    <LoginIcon />
                                </ListItemIcon>
                                <ListItemText primary="Login" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem>
                            <ListItemButton
                                onClick={() => navigate("/register")}
                            >
                                <ListItemIcon>
                                    <RegisterIcon />
                                </ListItemIcon>
                                <ListItemText primary="Register" />
                            </ListItemButton>
                        </ListItem>
                    </>
                )}
            </Drawer>
        </>
    );
}

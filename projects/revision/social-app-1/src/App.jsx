import { Container } from "@mui/material";
import AppDrawer from "./components/AppDrawer";
import Header from "./components/Header";
import { Outlet } from "react-router";

function App() {
    return (
        <>
            <Header />
            <AppDrawer />
            <Container maxWidth="sm" sx={{ justifyContent: "center", py: 4 }}>
                <Outlet />
            </Container>
        </>
    );
}

export default App;

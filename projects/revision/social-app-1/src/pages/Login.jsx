import { Alert, Box, Button, OutlinedInput, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useApp } from "../AppProvider";

export default function Login() {
    const api = "http://localhost:8800";
    const [loginError, setLoginError] = useState();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const { setAuth } = useApp();

    const login = async (data) => {
        const res = await fetch(`${api}/users/login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            setLoginError(true);
            return false;
        }

        const { user, token } = await res.json();
        setAuth(user);
        localStorage.setItem("token", token);
        navigate("/");
    };

    return (
        <Box>
            <Typography variant="h3">Login</Typography>
            {loginError && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                    Something went wrong.
                </Alert>
            )}
            <form onSubmit={handleSubmit(login)}>
                <OutlinedInput
                    type="text"
                    fullWidth
                    placeholder="username"
                    autoFocus="true"
                    sx={{ mt: 2 }}
                    {...register("username", {
                        setValueAs: (value) => value.trim(),
                        required: true,
                    })}
                />
                {errors.username && (
                    <Typography color="error">username is required.</Typography>
                )}
                <OutlinedInput
                    type="password"
                    fullWidth
                    placeholder="password"
                    sx={{ mt: 2 }}
                    {...register("password", { required: true })}
                />
                {errors.password && (
                    <Typography color="error">password is required.</Typography>
                )}
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2 }}
                    type="submit"
                >
                    Login
                </Button>
            </form>
        </Box>
    );
}

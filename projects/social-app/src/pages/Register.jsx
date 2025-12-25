import { Alert, Box, Button, OutlinedInput, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
    const api = "http://localhost:8800";
    const [registerError, setRegisterError] = useState();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const create = async (data) => {
        const res = await fetch(`${api}/users`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            setRegisterError(true);
            return false;
        }

        navigate("/login");
    };

    return (
        <Box>
            <Typography variant="h3">Register</Typography>
            {registerError && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                    Something went wrong.
                </Alert>
            )}
            <form onSubmit={handleSubmit(create)}>
                <OutlinedInput
                    type="text"
                    fullWidth
                    placeholder="name"
                    autoFocus="true"
                    sx={{ mt: 2 }}
                    {...register("name", {
                        setValueAs: (value) => value.trim(),
                        required: true,
                    })}
                />
                {errors.name && (
                    <Typography color="error">name is required.</Typography>
                )}
                <OutlinedInput
                    type="text"
                    fullWidth
                    placeholder="username"
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
                    type="text"
                    fullWidth
                    placeholder="bio"
                    sx={{ mt: 2 }}
                    {...register("bio", {
                        setValueAs: (value) => value.trim(),
                        required: true,
                    })}
                />
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
                    Register
                </Button>
            </form>
        </Box>
    );
}

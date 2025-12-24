import { Alert, Box, Button, OutlinedInput, Typography } from "@mui/material";

export default function Login() {
    return (
        <Box>
            <Typography variant="h3">Register</Typography>
            <Alert severity="warning" sx={{ mt: 2 }}>
                Something went wrong.
            </Alert>
            <form>
                <OutlinedInput
                    type="text"
                    fullWidth
                    placeholder="name"
                    autoFocus="true"
                    sx={{ mt: 2 }}
                ></OutlinedInput>
                <OutlinedInput
                    type="text"
                    fullWidth
                    placeholder="username"
                    sx={{ mt: 2 }}
                ></OutlinedInput>
                <OutlinedInput
                    type="text"
                    fullWidth
                    placeholder="bio"
                    sx={{ mt: 2 }}
                ></OutlinedInput>
                <OutlinedInput
                    type="password"
                    fullWidth
                    placeholder="password"
                    sx={{ mt: 2 }}
                ></OutlinedInput>
                <Button fullWidth variant="contained" sx={{ mt: 2 }}>
                    Register
                </Button>
            </form>
        </Box>
    );
}

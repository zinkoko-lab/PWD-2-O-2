import { useContext } from "react";
import { useRef } from "react";
import { AppContext } from "../ThemedApp";
import { Box, Button, TextField } from "@mui/material";

export default function Form({ add }) {
    const contentRef = useRef();
    const nameRef = useRef();

    const value = useContext(AppContext);

    return (
        // form( content-input, name-input, button)
        <form
            onSubmit={(e) => {
                e.preventDefault();
                const content = contentRef.current.value.trim();
                add(content, "Alice");
                e.currentTarget.reset();
            }}
        >
            <Box sx={{ mb: 4, textAlign: "right" }}>
                <TextField
                    inputRef={contentRef}
                    type="text"
                    placeholder="Content"
                    fullWidth
                    multiline
                    focused
                    sx={{ mb: 1 }}
                ></TextField>
                <Button variant="contained" type="submit">
                    Post
                </Button>
            </Box>
        </form>
    );
}

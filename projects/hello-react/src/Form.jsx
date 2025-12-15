// Form.jsx
import { useRef } from "react";

import { OutlinedInput, IconButton } from "@mui/material";

import { Add as AddIcon } from "@mui/icons-material";

export default function Form({ add }) {
    const inputRef = useRef();

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                add(inputRef.current.value.trim());
                e.currentTarget.reset();
            }}
        >
            <OutlinedInput
                inputRef={inputRef}
                fullWidth
                autoFocus="true"
                endAdornment={
                    <IconButton type="submit">
                        <AddIcon />
                    </IconButton>
                }
            />
        </form>
    );
}

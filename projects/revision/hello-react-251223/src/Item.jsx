import { ListItem, ListItemText, IconButton } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function Item({ item, remove, toggle }) {
    return (
        <ListItem>
            <IconButton onClick={() => toggle(item.id)}>
                {item.done ? (
                    <CheckBoxIcon color="success" />
                ) : (
                    <CheckBoxOutlineBlankIcon />
                )}
            </IconButton>
            <ListItemText>{item.name}</ListItemText>
            <IconButton onClick={() => remove(item.id)}>
                <DeleteForeverIcon color="error" />
            </IconButton>
        </ListItem>
    );
}

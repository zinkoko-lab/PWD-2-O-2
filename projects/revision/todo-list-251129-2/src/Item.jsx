import { ListItem, IconButton, ListItemText } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Item({ item, del, toggle }) {
    return (
        <ListItem>
            <IconButton onClick={() => toggle(item.id)}>
                {item.done ? (
                    <CheckBoxIcon color="primary" />
                ) : (
                    <CheckBoxOutlineBlankIcon color="primary" />
                )}
            </IconButton>
            <ListItemText>{item.task}</ListItemText>
            <IconButton onClick={() => del(item.id)}>
                <DeleteIcon color="error" />
            </IconButton>
        </ListItem>
    );
}

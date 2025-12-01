// importing ListItem, IconButton, ListItemText from mui/material
import { ListItem, IconButton, ListItemText } from "@mui/material";

// importing Icons(checkBox, cheched, trashBin)
import { Delete as Del } from "@mui/icons-material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

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
            <ListItemText>{item.content}</ListItemText>
            <IconButton>
                <Del onClick={() => del(item.id)} color="error" />
            </IconButton>
        </ListItem>
    );
}

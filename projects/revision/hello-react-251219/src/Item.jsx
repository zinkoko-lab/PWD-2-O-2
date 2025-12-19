export default function Item({ item, remove, toggle }) {
    return (
        <li>
            <button onClick={() => toggle(item.id)}>
                {item.done ? "undo" : "check"}
            </button>
            {item.name}
            <button onClick={() => remove(item.id)}>Del</button>
        </li>
    );
}

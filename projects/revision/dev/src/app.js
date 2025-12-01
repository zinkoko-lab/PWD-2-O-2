function Element(props) {
    return (
        <div>
            <p>{props.content}</p>
            <ul>
                <li>Item-One</li>
                <li>Item-Two</li>
                <li>Item-Three</li>
                <li>Item-Four</li>
            </ul>
        </div>
    );
}

ReactDOM.render(
    <Element content="A React Component" />,
    document.getElementById("app")
);

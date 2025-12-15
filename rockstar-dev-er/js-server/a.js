// const { createServer } = require("node:http"); // "type": "commonjs"
import { createServer } from "node:http"; // "type": "module"

const server = createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");

    const today = new Date();
    const content = `
<h1>Server Side</h1>
<p>${today.toISOString()}</p>
    `;
    res.end(content);
});

server.listen(3000, "localhost", () => {
    console.log("Server is running at 3000, Press Ctrl+C to stop.");
});

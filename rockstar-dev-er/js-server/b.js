// const { createServer } = require("node:http"); // "type": "commonjs"
import { createServer } from "node:http"; // "type": "module"

const server = createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");

    // const today = new Date();
    const content = `
<h1>Client Side</h1>
<p>
    <script>
        const today = new Date();
        document.write(today.toISOString());
    </script>
</p>
    `;
    res.end(content);
});

server.listen(3001, "localhost", () => {
    console.log("Server is running at 3001, Press Ctrl+C to stop.");
});

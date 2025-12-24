import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

import postsRoute from "./routes/posts";
app.use("/posts", postsRoute);

app.get("/", (req, res) => {
    res.json({ msg: "Social API up and running..." });
});

app.listen(8800, () => {
    console.log("Social API is running at 8800...");
});

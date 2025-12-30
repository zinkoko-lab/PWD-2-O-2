import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
    res.json({ msg: "Social API up and running..." });
});

// users route
import usersRoute from "./routes/users";
app.use("/users", usersRoute);

// posts route
import postsRoute from "./routes/posts";
app.use("/posts", postsRoute);

app.listen(8800, () => {
    console.log("Social API is running at 8800...");
});

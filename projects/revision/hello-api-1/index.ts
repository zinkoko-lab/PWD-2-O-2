import express, { urlencoded } from "express";
import { prisma } from "./libs/prisma";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get("/", (req, res) => {
    res.json({ msg: "Hello API is running..." });
});

app.get("/tasks", async (req, res) => {
    const tasks = await prisma.todo.findMany();
    res.json(tasks);
});

app.post("/tasks", async (req, res) => {
    const name = req.body?.name;
    if (!name) {
        return res.status(400).json({ msg: "name is required." });
    }
    const task = await prisma.todo.create({
        data: { name },
    });
    res.status(201).json(task);
});

app.put("/tasks/:id/toggle", async (req, res) => {
    const id = Number(req.params?.id);
    const taskBefore = await prisma.todo.findFirst({
        where: { id },
    });
    const taskAfter = await prisma.todo.update({
        where: { id: id },
        data: { done: !taskBefore?.done },
    });
    res.json(taskAfter);
});

app.delete("/tasks/:id", async (req, res) => {
    const id = Number(req.params?.id);
    const task = await prisma.todo.delete({
        where: { id },
    });
    res.json(task);
});

app.listen(8800, () => {
    console.log("Hello API at localhost 8800...");
});

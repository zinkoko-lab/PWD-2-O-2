import { Router } from "express";
import { prisma } from "../libs/prisma";
import { auth } from "../middlewares/auth";

const router = Router();

router.get("/", async (req, res) => {
    const posts = await prisma.post.findMany({
        orderBy: {
            id: "desc",
        },
        take: 20,
        include: {
            user: true,
            comments: true,
            likes: true,
        },
    });
    res.json(posts);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
        where: { id: Number(id) },
        include: {
            user: true,
            comments: {
                include: { user: true },
            },
            likes: true,
        },
    });

    if (!post) {
        return res.status(404).json({ msg: "Post not found." });
    }

    res.json(post);
});

router.post("/", auth, async (req, res) => {
    const user = (req as any).user;
    const content = req.body?.content;

    if (!content) {
        res.status(400).json({ msg: "content is required." });
    }

    const post = await prisma.post.create({
        data: {
            content: content,
            userId: user.id,
        },
        include: {
            user: true,
        },
    });

    res.json(post);
});

export default router;

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
    return res.json(posts);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
        where: { id: Number(id) },
        include: {
            user: true,
            comments: {
                include: {
                    user: true,
                },
            },
            likes: true,
        },
    });

    if (!post) {
        return res.status(404).json({ msg: "Post not found." });
    } else {
        return res.json(post);
    }
});

// Creat a new post by a user.
router.post("/", auth, async (req, res) => {
    const user = (req as any).user;
    const content = req.body?.content;

    if (!content) {
        return res.status(400).json("content is required.");
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

    return res.json(post);
});

export default router;

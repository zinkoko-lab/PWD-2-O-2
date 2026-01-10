import { Router } from "express";
import { prisma } from "../libs/prisma";
import { auth } from "../middlewares/auth";

const router = Router();

// 最新の Post 20個を表示するroute
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

// ある特定の id のPostを表示するroute
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
        where: { id: Number(id) },
        include: {
            user: true,
            comments: {
                orderBy: { id: "desc" },
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

// Post 作成するroute
router.post("/", auth, async (req, res) => {
    const user = (req as any).user;
    const content = req.body?.content.trim();

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

// ある特定の id のPostを削除するroute
// auth check
router.delete("/:id", auth, async (req, res) => {
    // user id check
    const { id: userId } = (req as any).user;
    const postId = Number(req.params.id);

    if (Number.isNaN(postId)) {
        return res.status(400).json({ msg: "Invalid post id." });
    }

    // post search
    const post = await prisma.post.findUnique({
        where: { id: postId },
        include: {
            user: true,
        },
    });

    // user id !== post.user.id => 削除を不可！
    if (!post) {
        return res.status(404).json({ msg: "Post not found." });
    }

    if (post.user.id !== userId) {
        return res.status(403).json({ msg: "You cannot delete this post." });
    }
    await prisma.comment.deleteMany({ where: { postId: postId } });
    await prisma.like.deleteMany({ where: { postId: postId } });
    await prisma.post.delete({ where: { id: postId } });
    return res.json({ msg: "Post deleted successfully." });
});

// Comment 作成するroute
router.post("/:id/comment", auth, async (req, res) => {
    const postId = Number(req.params.id);
    const { id: userId } = (req as any).user;
    const content = req.body?.content?.trim();

    if (Number.isNaN(postId)) {
        return res.status(400).json({ msg: "Invalid post id." });
    }

    if (!content) {
        res.status(400).json({ msg: "content is required." });
    }

    // Post があるかどうか
    // post search
    const post = await prisma.post.findUnique({
        where: { id: postId },
        select: {
            id: true,
        },
    });

    // user id !== post.user.id => 削除を不可！
    if (!post) {
        return res.status(404).json({ msg: "Post not found." });
    }

    // commentを作る処理
    const comment = await prisma.comment.create({
        data: {
            content,
            userId,
            postId,
        },
        include: {
            user: true,
        },
    });

    return res.status(201).json(comment);
});

// Comment 削除するroute

// like & unlike を実現するroute
router.post("/:id/like", auth, async (req, res) => {
    const { id: userId } = (req as any).user;
    const postId = Number(req.params.id);

    const existing = await prisma.like.findUnique({
        where: {
            userId_postId: {
                userId,
                postId,
            },
        },
    });

    if (existing) {
        await prisma.like.delete({
            where: { id: existing.id },
        });
        return res.json({ liked: false });
    }

    const like = await prisma.like.create({
        data: { userId, postId },
    });

    return res.json({ liked: true, like });
});

export default router;

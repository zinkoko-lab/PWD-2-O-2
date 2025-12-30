import { Router } from "express";
import { prisma } from "../libs/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { auth } from "../middlewares/auth";

const router = Router();

// user create
router.post("/", async (req, res) => {
    const name = req.body?.name;
    const username = req.body?.username;
    const bio = req.body?.bio;
    const password = req.body?.password;

    if (!name || !username || !password) {
        return res
            .status(400)
            .json({ msg: "name, username and password are required." });
    }

    const user = await prisma.user.create({
        data: {
            name,
            username,
            bio,
            password: await bcrypt.hash(password, 10),
        },
    });

    res.json(user);
});

// user login
router.post("/login", async (req, res) => {
    // client -> username & password
    const username = req.body?.username;
    const password = req.body?.password;

    if (!username || !password) {
        return res
            .status(400)
            .json({ msg: "username and password are required." });
    }

    // api find -> user @ username === username
    const user = await prisma.user.findUnique({
        where: { username: username },
        select: {
            id: true,
            name: true,
            username: true,
            bio: true,
            password: true,
        },
    });

    // api check -> user.password === password -> if ok, calculate token
    if (user) {
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET as string
            );

            // if ok above steps -> res.json(user data, token)
            return res.json({
                user: {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    bio: user.bio,
                },
                token: token,
            });
        }
    }

    // else -> res.status(401).json({msg: "Invalid username or password."})
    return res.status(401).json({ msg: "Invalid username and password." });
});

router.get("/verify", auth, async (req, res) => {
    const { id } = (req as any).user;
    const user = await prisma.user.findUnique({
        where: { id },
    });

    res.json(user);
});

export default router;

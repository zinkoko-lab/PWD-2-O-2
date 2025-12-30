import { Router } from "express";
import { prisma } from "../libs/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { auth } from "../middlewares/auth";

const router = Router();

// user create route
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

    try {
        const user = await prisma.user.create({
            data: {
                name,
                username,
                bio,
                password: await bcrypt.hash(password, 10),
            },
        });
        return res.json(user);
    } catch (err) {
        return res
            .status(400)
            .json({ msg: "That username is already registered." });
    }
});

// user login
router.post("/login", async (req, res) => {
    // client -> username & password
    const { username, password } = req.body ?? {};

    // if (!username || !password) -> error(username and password are required.)
    if (!username || !password) {
        return res
            .status(400)
            .json({ msg: "username and password are required." });
    }

    // username & password -> api find user data from db
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

    // 2. if User was not found -> return 401 and error msg.
    if (!user) {
        return res.status(401).json({ msg: "Invalid username or password." });
    }

    // 2. if User was found
    // check password -> not ok -> return error(Invalid username or password.)
    const isValid = await bcrypt.compare(password, (user as any).password);
    if (!isValid) {
        return res.status(401).json({ msg: "Invalid username or password." });
    }

    // check password -> ok -> return user data & token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
    return res.json({
        user: {
            id: user.id,
            name: user.name,
            username: user.username,
            bio: user.bio,
        },
        token: token,
    });
});

// user verify
router.get("/verify", auth, async (req, res) => {
    const { id } = (req as any).user;
    const user = await prisma.user.findUnique({
        where: { id: id },
    });
    return res.json(user);
});

export default router;

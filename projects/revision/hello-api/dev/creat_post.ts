import { prisma } from "../libs/prisma";

async function creatPost() {
    const post_1 = await prisma.post.create({
        data: {
            title: "A new post",
            content: "Some content",
            userId: 2,
        },
    });

    const post_2 = await prisma.post.create({
        data: {
            title: "Another post",
            content: "Another content",
            userId: 2,
        },
    });

    console.log(post_1);
    console.log(post_2);
}

creatPost();

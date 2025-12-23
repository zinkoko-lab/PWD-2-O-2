import { prisma } from "../libs/prisma";

prisma.user
    .create({
        data: {
            name: "Alice",
            email: "alice@gmail.com",
        },
    })
    .then((user) => console.log(user));

async function create() {
    const user = await prisma.user.create({
        data: {
            name: "Bob",
            email: "bob@gmail.com",
            posts: {
                create: [
                    { title: "A New Post", content: "some contents" },
                    { title: "An Another Post", content: "another contents" },
                ],
            },
        },
    });
    console.log(user);
}

create();

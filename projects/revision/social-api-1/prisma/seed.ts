import { prisma } from "../libs/prisma";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

async function seed() {
    console.log("Seeding database...");
    // Seeding process...

    // 1. Create 2 users
    await prisma.user.create({
        data: {
            name: "Alice",
            username: "alice",
            bio: faker.person.bio(),
            password: await bcrypt.hash("password1", 10),
        },
    });
    await prisma.user.create({
        data: {
            name: "Bob",
            username: "bob",
            bio: faker.person.bio(),
            password: await bcrypt.hash("password2", 10),
        },
    });

    // 2. Create 20 posts
    for (let i = 0; i < 20; i++) {
        await prisma.post.create({
            data: {
                content: faker.lorem.paragraph(),
                userId: faker.number.int({ min: 1, max: 2 }),
            },
        });
    }

    // 3. Create 40 comments
    for (let i = 0; i < 40; i++) {
        await prisma.comment.create({
            data: {
                content: faker.lorem.sentence(),
                postId: faker.number.int({ min: 1, max: 20 }),
                userId: faker.number.int({ min: 1, max: 2 }),
            },
        });
    }

    console.log("Database seeded successfully🚀");
}

seed()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

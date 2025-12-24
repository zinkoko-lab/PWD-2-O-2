import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import jwt from "jsonwebtoken";

async function main() {
    // const password = "apple";
    // console.log(`Password: ${password}`);
    // const hash = await bcrypt.hash(password, 10);
    // console.log(`HashValue: ${hash}`);
    // console.log(faker.person.fullName());

    const content = "some content";
    const token = jwt.sign(content, "my-secret");
    console.log(token);
    console.log(jwt.verify(token, "my-secret"));
}

main();

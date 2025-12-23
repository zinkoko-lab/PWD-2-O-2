let num = 123;

interface UserType {
    name: string;
    age: number;
    bio?: string;
}

const alice: UserType = {
    name: "Alice",
    age: 21,
};

type StudentType = {
    name: string;
    age: number;
    grade: "A" | "B" | "C";
};

const bob: StudentType = {
    name: "Bob",
    age: 22,
    grade: "A",
};

let eve: UserType & { major: string } = {
    name: "Eve",
    age: 23,
    major: "STEM",
};

function wrap<T>(value: T) {
    return [value];
}

// wrap<number>(123);
// wrap<string>("abc");
// wrap<{ name: string }>({ name: "Mary" });

wrap(456);
wrap("abc");
wrap({ name: "Tom" });

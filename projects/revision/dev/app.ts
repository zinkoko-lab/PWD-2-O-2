let num: number = 123;

function add(a: number, b: number) {
    return a + b;
}

interface UserType {
    name: string;
    age: number;
    bio?: string;
}

let alice: UserType = {
    name: "Alice",
    age: 22,
};

type StudentType = {
    name: string;
    age: number;
    grade: "A" | "B" | "C";
};

let bob: StudentType = {
    name: "Bob",
    age: 22,
    grade: "A",
};

let eve: StudentType & { major: string } = {
    name: "Eve",
    age: 22,
    grade: "B",
    major: "STEM",
};

function wrap<T>(value: T) {
    return [value];
}

wrap<number>(123);
wrap<string>("abc");
wrap<{ name: string }>({ name: "Mary" });

wrap(123);
wrap("abc");
wrap({ name: "Tom" });

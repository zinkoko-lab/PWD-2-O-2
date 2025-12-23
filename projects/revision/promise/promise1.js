function a() {
    return "Function A...";
}

function bDelay() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Function B...");
        }, 2000);
    });
}

function b() {
    return bDelay();
}

function c() {
    return "Function C...";
}

console.log(a());
// console.log(b());
// console.log(c());

b()
    .then((value) => {
        console.log(value);
        console.log(c());
    })
    .catch(() => console.log("Error!"));

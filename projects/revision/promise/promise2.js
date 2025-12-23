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

function c() {
    return "Function C...";
}

async function b() {
    const result = await bDelay();
    return result;
}

console.log(a());
b().then((value) => {
    console.log(value);
    console.log(c());
});

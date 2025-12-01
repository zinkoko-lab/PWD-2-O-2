function a() {
    return "Function A...";
}

function b() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Waited 2 seconds and Excuted Function B.");
        }, 2000);
    });
}

function c() {
    return "Function C...";
}

console.log(a());

b().then((value) => {
    console.log(value);
    console.log(c());
});

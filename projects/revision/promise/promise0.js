function a() {
    console.log("Function A...");
}

function b() {
    setTimeout(() => {
        console.log("Function B...");
    }, 2000);
}

function c() {
    console.log("Function C...");
}

a();
b();
c();

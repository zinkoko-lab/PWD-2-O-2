document.addEventListener("DOMContentLoaded", (e) => {
    // 処理
    console.log("Some processes...");
    add1000_later();
    console.log("Another processes...");
});

function add1000() {
    let result = 0;
    for (let i = 1; i <= 1000; i++) {
        result += i;
    }
    return result;
}

async function add1000_later() {
    let result = await add1000();
    console.log(result);
}

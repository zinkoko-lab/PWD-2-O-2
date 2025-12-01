function add1000() {
    let result = 0;

    for (let i = 1; i <= 1000; i++) {
        result += i;
    }

    return result;
}

// function add1000later() {
//     return new Promise((done) => {
//         done(add1000());
//     });
// }

function add1000later() {
    return new Promise((resolve, reject) => {
        // 時間がかかる処理を想定
        let result = add1000();
        if (result) {
            resolve(result);
        } else {
            reject();
        }
    });
}

window.addEventListener("DOMContentLoaded", (e) => {
    console.log("some process...");
    // console.log(add1000());
    add1000later()
        .then((result) => console.log(result))
        .catch(() => console.log("Error"));
    console.log("another process...");
});

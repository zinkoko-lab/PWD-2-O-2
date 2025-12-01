function start() {
    return "Start...";
}

function wait(ms) {
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve("Waited 2 seconds and Done!");
        }, ms)
    );
}

function end() {
    return "End!";
}

async function main() {
    console.log(start());
    console.log(await wait(2000));
    console.log(end());
}

main();

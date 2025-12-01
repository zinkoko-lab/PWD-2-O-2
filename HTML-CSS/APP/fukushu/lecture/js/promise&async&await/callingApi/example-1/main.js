document.addEventListener("DOMContentLoaded", (e) => {
    // APIを叩く関数の呼び出し
    callApi();
});

// APIを叩く処理をし、結果を返してくれる関数を定義
async function callApi() {
    let res = await fetch("https://jsonplaceholder.typicode.com/users");
    let users = await res.json();
    console.log(users);
}

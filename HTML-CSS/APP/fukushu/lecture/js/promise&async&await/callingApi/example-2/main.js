document.addEventListener("DOMContentLoaded", (e) => {
    const lists = document.querySelector("#lists");
    const btn = document.querySelector("#btn");

    async function listUsers() {
        // APIを叩いてデータを取り出す
        let res = await fetch("https://jsonplaceholder.typicode.com/users");
        let users = await res.json();

        // DOM操作
        users.forEach((user) => {
            let list = document.createElement("li");
            list.textContent = user.name;
            lists.appendChild(list);
        });
    }

    btn.addEventListener("click", listUsers);
});

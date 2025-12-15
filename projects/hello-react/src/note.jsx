const api = "http://localhost:8800/tasks";

fetch(api).then((res) => {
    res.json().then((tasks) => {
        setData(tasks);
    });
});

fetch(api)
    .then((res) => res.json())
    .then((tasks) => setData(tasks));

(async () => {
    const res = await fetch(api);
    const tasks = await res.json();
    setData(tasks);
})();

fetch(api).then(async (res) => {
    const tasks = await res.json();
    setData(tasks);
});

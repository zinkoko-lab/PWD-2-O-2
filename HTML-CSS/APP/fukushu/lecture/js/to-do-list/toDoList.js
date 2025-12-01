const form = document.querySelector("form");
const todo = document.getElementById("todo");
const doneList = document.getElementById("doneList");
let badge = document.querySelector(".badge");

let data = getData();
data.map((task) => creatTask(task.text, task.done));
updateBadge();

function updateBadge() {
    badge.textContent = todo.children.length;
}

function addListHeading() {
    let countTodo = todo.children.length;
    let countDone = doneList.children.length;
    if (countTodo === 0 && countDone === 0) {
        document.querySelector(".tasks-to-do").textContent = "";
        document.querySelector(".tasks-done").textContent = "";
        return;
    }
    if (countTodo === 0) {
        document.querySelector(".tasks-to-do").textContent = "No tasks to do!";
    } else {
        document.querySelector(".tasks-to-do").textContent = "Tasks to do:";
    }
    if (countDone === 0) {
        document.querySelector(".tasks-done").textContent =
            "No tasks done yet!";
    } else {
        document.querySelector(".tasks-done").textContent = "Tasks done:";
    }
}

function creatTask(text, done = false) {
    const li = document.createElement("li");
    li.textContent = text;
    li.classList.add("list-group-item");
    const checkBtn = document.createElement("a");
    checkBtn.setAttribute("href", "#");
    checkBtn.classList.add(
        "fa-regular",
        "fa-square-check",
        "float-start",
        "me-2"
    );
    if (!done) {
        todo.appendChild(li);
        li.appendChild(checkBtn);
    } else {
        doneList.appendChild(li);
        checkBtn.classList.replace("fa-regular", "fa-solid");
        li.appendChild(checkBtn);
    }
    updateBadge();
    addListHeading();

    const deleteBtn = document.createElement("a");
    deleteBtn.setAttribute("href", "#");
    deleteBtn.classList.add(
        "fa-regular",
        "fa-trash-can",
        "text-danger",
        "float-end"
    );
    li.appendChild(deleteBtn);

    checkBtn.onclick = () => {
        checkData(text);
        todo.removeChild(li);
        doneList.appendChild(li);
        checkBtn.classList.replace("fa-regular", "fa-solid");
        updateBadge();
        addListHeading();
    };

    deleteBtn.onclick = () => {
        if (li.parentNode == todo) {
            todo.removeChild(li);
        } else {
            doneList.removeChild(li);
        }
        removeData(text);
        updateBadge();
        addListHeading();
    };
}

function getData() {
    return JSON.parse(localStorage.getItem("data")) || [];
}

function saveData(text) {
    let data = getData();
    data.push({ text: text, done: false });
    localStorage.setItem("data", JSON.stringify(data));
}

function checkData(text) {
    let data = getData();
    let result = data.map((item) => {
        if (item.text == text) {
            item.done = true;
        }
        return item;
    });
    localStorage.setItem("data", JSON.stringify(result));
}

function removeData(text) {
    let data = getData();
    let result = data.filter((item) => item.text != text);
    localStorage.setItem("data", JSON.stringify(result));
}

form.onsubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById("new-task");
    const text = input.value;
    if (text === "") return false;
    creatTask(text);
    saveData(text);
    form.reset();
};

//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);


//Functions

function addTodo(e) {
    //Prevent form from submitting
    e.preventDefault();
    console.log("Hello");
    // var todo = true;
    test();

}

function deleteCheck(e) {
    const item = e.target;
    //Delete Todo
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", e => {

            todo.remove();
        });

    }
    //Check Mark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        console.log(todo);

    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    console.log(todos);

    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = "none";

                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }

        }
    });
}

function saveLocalTodos(todo) {
    localStorageCheck();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    localStorageCheck();

    todos.forEach(function(todo) {
        test(todo);

    })
}


function removeLocalTodos(todo) {
    localStorageCheck();
    const todoIndex = todo.childNodes[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));

}

function localStorageCheck() {
    if (localStorage.getItem('todos') === null) {
        return todos = [];
    } else {
        return todos = JSON.parse(localStorage.getItem('todos'));
    }
}

function test(todo) {
    //Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement("li");
    if (todo == null) {

        newTodo.innerText = todoInput.value;
        saveLocalTodos(todoInput.value);
    } else {
        newTodo.innerText = todo;

    }
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";

    //Check Mark Button
    const completButton = document.createElement("button");
    completButton.innerHTML = `<i class="fas fa-check"></i>`;
    completButton.classList.add("complete-btn");
    todoDiv.appendChild(completButton);
    //Check Trash Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Append TO List
    todoList.appendChild(todoDiv);
    //clear todo input value 

}
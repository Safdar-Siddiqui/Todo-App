const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let editTodo = null;

// Function to add todo
const addTodo = () => {
  const inputText = inputBox.value.trim();
  if (inputText.length <= 0) {
    alert("Please enter something to add TODO");
    return false;
  }

  if (addBtn.value === "Edit") {
    editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
    editTodo.target.previousElementSibling.innerHTML = inputText;
    addBtn.value = "Add";
    inputBox.value = "";
  } else {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "edBtn");
    editBtn.innerHTML = "Edit";
    li.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn", "delBtn");
    deleteBtn.innerHTML = "Remove";
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
    inputBox.value = "";

    saveLocalTodos(inputText);
  }
}

// Function to update todos
const updateTodo = (event) => {
  if (event.target.innerHTML == "Remove") {
    todoList.removeChild(event.target.parentElement);
    deletLocalTodos(event.target.parentElement);
  } else if (event.target.innerHTML == "Edit") {
    addBtn.value = "Edit";
    inputBox.value = event.target.previousElementSibling.innerHTML;
    inputBox.focus();
    editTodo = event;
  }
}

// Function to Save Todos to Local Storage
const saveLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to get Todos from Local Storage
const getLocalTodos = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach((todo) => {
      const li = document.createElement("li");
      const p = document.createElement("p");
      p.innerHTML = todo;
      li.appendChild(p);

      const editBtn = document.createElement("button");
      editBtn.classList.add("btn", "edBtn");
      editBtn.innerHTML = "Edit";
      li.appendChild(editBtn);

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("btn", "delBtn");
      deleteBtn.innerHTML = "Remove";
      li.appendChild(deleteBtn);

      todoList.appendChild(li);
    });
  }
}

// Function to Delete Todos from Local Storage
const deletLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  let todoText = todo.children[0].innerHTML;
  let todoIndex = todos.indexOf(todoText);
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

const editLocalTodos = (todo) => {
  let todos = JSON.parse(localStorage.getItem("todos"));
  let todoIndex = todos.indexOf(todo);
  // console.log(todoIndex);
  todos[todoIndex] = inputBox.value;
  localStorage.setItem("todos", JSON.stringify(todos));
  console.log(todoIndex);
  console.log(todos);
}

document.addEventListener("DOMContentLoaded", getLocalTodos);
todoList.addEventListener("click", updateTodo);
addBtn.addEventListener("click", addTodo);

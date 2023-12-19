let todoinput = document.querySelector(".input");
let addButton = document.querySelector(".btn-primary");
let showTodo = document.querySelector(".todos-container");
let todo = "";
let localData = JSON.parse(localStorage.getItem("todos"));
let todoList = localData || [];

//Below function is to create an unique id
function uuid() {
  const dateNumber = Date.now().toString(36);
  const randomness = Math.random().toString(36).substring(2);
  return dateNumber + randomness;
}
//add button event listener
addButton.addEventListener("click", (e) => {
  e.preventDefault();
  todo = todoinput.value;
  if (todo.length > 0) {
    todoList.push({
      todo: todo,
      id: uuid(),
      isCompleted: false,
    });
    renderTodoList(todoList);
    localStorage.setItem("todos", JSON.stringify(todoList));
    todoinput.value = "";
  }
});
//rendering todoList to the todo-container to show the todos to the user
function renderTodoList(todoList) {
  showTodo.innerHTML = todoList.map(
    ({ todo, id, isCompleted }) =>
      `<div class="todo relative"> 
        <input id="item-${id}" data-key=${id} class="t-checkbox t-pointer" 
        type="checkbox" ${isCompleted ? "checked" : ""}> 

        <label data-key=${id} class="todo-text t-pointer ${
        isCompleted ? "checked-todo" : ""
      }"for="item-${id}"> ${todo}</label> 
        <button class="absolute right-0 button cursor">
        <span data-todokey=${id}  class="del-btn material-icons-outlined">delete</span>
            </button> </div>`
  );
}
renderTodoList(todoList); // loading the UI while refreshing the page

//event listener for the todos in the container
showTodo.addEventListener("click", function (e) {
  e.preventDefault();
  let key = e.target.dataset.key;
  let delKey = e.target.dataset.todokey;
  todoList = todoList.map((todo) =>
    todo.id === key ? { ...todo, isCompleted: !todo.isCompleted } : todo
  );
  todoList = todoList.filter((todo) => todo.id !== delKey);
  localStorage.setItem("todos", JSON.stringify(todoList));
  renderTodoList(todoList);
});

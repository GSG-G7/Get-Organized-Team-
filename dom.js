// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application
(function() {
  // This is the dom node where we will keep our todo
  let container = document.getElementById("todo-container");
  let addTodoForm = document.getElementById("add-todo");
  let state = [
    { id: -3, description: "first todo" },
    { id: -2, description: "second todo" },
    { id: -1, description: "third todo" }
  ]; // this is our initial todoList
  let len = state.length;

  //////////////////////////header and date section/////////////////////////////
  let thebody = document.getElementsByTagName("body")[0];
  let headerPart = document.createElement("header");
  headerPart.setAttribute("class", "header");
  let datePart = document.createElement("span");
  let today = new Date();
  option = { weekday: "long", month: "short", day: "numeric" };
  datePart.innerHTML = today.toLocaleDateString("en", option);

  datePart.setAttribute("class", "date");
  let numTasks = document.createElement("span");
  numTasks.textContent = len + " task";
  numTasks.setAttribute("class", "numTasks");
  headerPart.appendChild(datePart);
  headerPart.appendChild(numTasks);
  thebody.insertBefore(headerPart, container);

  let taskElement = document.getElementsByClassName("numTasks")[0];

  // add sort button
  let sortTasksButton = document.createElement("button");
  sortTasksButton.classList.add = "sort-button";
  sortTasksButton.textContent = "Sort Tasks";
  headerPart.appendChild(sortTasksButton);
  sortTasksButton.addEventListener("click", function(event) {
    let sortState = todoFunctions.sortTodos(state);
    update(sortState);
    taskElement.textContent = sortState.length;
  });

  // This function takes a todo, it returns the DOM node representing that todo
  let createTodoNode = function(todo) {
    let todoNode = document.createElement("li");
    // you will need to use addEventListener

    // add span holding description
    let todoElement = document.createElement("span");
    todoElement.textContent = todo.description;
    todoElement.setAttribute("id", todo.id);
    todoNode.appendChild(todoElement);

    // this adds the delete button
    let deleteButtonNode = document.createElement("button");
    let symbol = document.createElement("i");
    symbol.className = "far fa-trash-alt";
    deleteButtonNode.appendChild(symbol);
    deleteButtonNode.addEventListener("click", function(event) {
      let newState = todoFunctions.deleteTodo(state, todo.id);
      update(newState);
      taskElement.textContent = newState.length;
    });
    todoNode.appendChild(deleteButtonNode);

    // add markTodo button

    // add classes for css
    let markedTodoButton = document.createElement("button");
    let symbol = document.createElement("i");
    symbol.className = "far fa-check-circle";
    markedTodoButton.appendChild(symbol);
    markedTodoButton.addEventListener("click", function(event) {
      let newState = todoFunctions.markTodo(state, todo.id);
      update(newState);
      taskElement.textContent = newState.length;
    });
    todoNode.appendChild(markedTodoButton);

    return todoNode;
  };
  // bind create todo form
  if (addTodoForm) {
    addTodoForm.addEventListener("submit", function(event) {
      // https://developer.mozilla.org/en-US/docs/Web/Events/submit
      event.preventDefault();
      let todoContext = document.getElementsByName("description")[0].value;
      // validation for user -- can not enter spcial char
      if (todoContext !== "") {
        let newItem = todoFunctions.addTodo(state, todoContext);
        taskElement.textContent = newItem.length;
        document.getElementsByName("description")[0].value = "";
        update(newItem);
      }
    });
  }

  // you should not need to change this function
  let update = function(newState) {
    state = newState;
    renderState(state);
  };

  // you do not need to change this function
  let renderState = function(state) {
    let todoListNode = document.createElement("ul");

    state.forEach(function(todo) {
      todoListNode.appendChild(createTodoNode(todo));
    });

    // you may want to add a class for css
    container.replaceChild(todoListNode, container.firstChild);
  };

  if (container) renderState(state);
})();

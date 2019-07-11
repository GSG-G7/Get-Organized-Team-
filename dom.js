// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application

(function() {
  // This is the dom node where we will keep our todo
  var completed = document.querySelector("#completed");
  console.log(completed);
  var container = document.getElementById("todo-container");
  var addTodoForm = document.getElementById("add-todo");
  let inputField = document.getElementsByName("description")[0];

  var state = [
    { id: -3, description: "first todo" },
    { id: -2, description: "second todo" },
    { id: -1, description: "third todo" }
  ]; // this is our initial todoList

  let len = state.length;
  const localstorage = localStorage.getItem("TODO");
  if (localstorage) {
    len = JSON.parse(localstorage).length;
  }
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
  numTasks.textContent = state.length + " task";
  numTasks.textContent = len + " task";
  numTasks.setAttribute("class", "numTasks");
  
  headerPart.appendChild(datePart);
  headerPart.appendChild(numTasks);
  thebody.insertBefore(headerPart, container);
  const taskElement = document.getElementsByClassName("numTasks")[0];
  

  //////////////////////////////

  // add sort button
  var sortTasksButton = document.createElement("button");
  sortTasksButton.classList.add = "sort-button";
  var symbol = document.createElement("i");
  symbol.className = "fas fa-sort";
  sortTasksButton.appendChild(symbol);
  numTasks.appendChild(sortTasksButton);
  sortTasksButton.addEventListener("click", function(event) {
    let sortState = todoFunctions.sortTodos(state);
    update(sortState);

    taskElement.textContent = sortState.length + " task";

    localStorage.setItem("TODO", JSON.stringify(state));
  });

  // This function takes a todo, it returns the DOM node representing that todo
  var createTodoNode = function(todo) {
    var todoNode = document.createElement("li");
    // you will need to use addEventListener

    // add span holding description
    let todoElement = document.createElement("span");
    todoElement.textContent = todo.description;
    todoElement.setAttribute("id", todo.id);
    todoNode.appendChild(todoElement);

    // this adds the delete button
    var deleteButtonNode = document.createElement("button");
    var symbol = document.createElement("i");
    symbol.className = "far fa-trash-alt";
    // add classes for css
    symbol.classList.add("delete");
    deleteButtonNode.appendChild(symbol);
    deleteButtonNode.addEventListener("click", function(event) {
      var newState = todoFunctions.deleteTodo(state, todo.id);
      update(newState);
      taskElement.textContent = newState.length + " task";

      localStorage.setItem("TODO", JSON.stringify(state));
    });
    todoNode.appendChild(deleteButtonNode);

    // add markTodo button
    var markedTodoButton = document.createElement("button");
    var symbol = document.createElement("i");
    symbol.className = "fas fa-check";
    symbol.classList.add("marked");
    markedTodoButton.appendChild(symbol);
    todoNode.appendChild(markedTodoButton);
    // Check if it's done or no and if it is give it a class
    if (todo.done) {
      todoNode.classList.toggle("checked");
      symbol.classList.add("high-lighted");
    }
    // add classes for css
    markedTodoButton.addEventListener("click", function(event) {
      var newState = todoFunctions.markTodo(state, todo.id);
      update(newState);
      taskElement.textContent = newState.length + " task";

      localStorage.setItem("TODO", JSON.stringify(state));
    });

    return todoNode;
  };

  if (addTodoForm) {
    addTodoForm.addEventListener("submit", function(event) {
      // https://developer.mozilla.org/en-US/docs/Web/Events/submit
      event.preventDefault();

      let todoContext = inputField.value;
      // validation for user -- can not enter spcial char
      if (todoContext != "") {
        let newItem = todoFunctions.addTodo(state, todoContext);
        inputField.value = "";
        update(newItem);
        taskElement.textContent = newItem.length + " task";

        localStorage.setItem("TODO", JSON.stringify(state));
      }

      // what does event.preventDefault do?
      // what is inside event.target?

      // var description = "?"; // event.target ....
      // hint: todoFunctions.addTodo
      // var newState = []; // ?? change this!
      // update(newState);
    });
  }
  // get items form localStorage:-
  let storeData = localStorage.getItem("TODO");
  // check if data isn't empty
  if (storeData) {
    state = JSON.parse(storeData);
    let maxNumber = state.reduce(
      (max, current) => (max = max.id < current.id ? max.id : current.id),
      0
    );
    while (maxNumber > 0) {
      todoFunctions.generateId();
      maxNumber--;
    }

    // loadList(listArray); // load the list to the user interface
  }
  // you should not need to change this function
  var update = function(newState) {
    state = newState;
    renderState(state);
  };
  // set items to localstorge:- "this code must be added where the listArray is updated"
  localStorage.setItem("TODO", JSON.stringify(state));

  // you do not need to change this function
  const renderState = function(state) {
    let todoListNode = document.createElement("ul");

    state.forEach(function(todo) {
      todoListNode.appendChild(createTodoNode(todo));
    });

    // you may want to add a class for css
    container.replaceChild(todoListNode, container.firstChild);
  };

  if (container) renderState(state);
})();

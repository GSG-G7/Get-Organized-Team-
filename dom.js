// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application
(function() {
  // This is the dom node where we will keep our todo
  var container = document.getElementById("todo-container");
  var addTodoForm = document.getElementById("add-todo");

  var state = [
    { id: -3, description: "first todo" },
    { id: -2, description: "second todo" },
    { id: -1, description: "third todo" }
  ]; // this is our initial todoList

  //////////// add sort function  ///////////

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
    deleteButtonNode.appendChild(symbol);
    deleteButtonNode.addEventListener("click", function(event) {
      var newState = todoFunctions.deleteTodo(state, todo.id);
      update(newState);
    });
    todoNode.appendChild(deleteButtonNode);

    // add markTodo button
    var markedTodoButton = document.createElement("button");
    var symbol = document.createElement("i");
    symbol.className = "far fa-check-circle";
    markedTodoButton.appendChild(symbol);
    markedTodoButton.addEventListener("click", function(event) {
      var newState = todoFunctions.markTodo(state, todo.id);
      update(newState);
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
      let newItem = todoFunctions.addTodo(state, todoContext);
      if (newItem === false) alert("Enter a correct content");
      document.getElementsByName("description")[0].value = "";
      update(newItem);

      // what does event.preventDefault do?
      // what is inside event.target?

      // var description = "?"; // event.target ....

      // hint: todoFunctions.addTodo
      // var newState = []; // ?? change this!
      // update(newState);
    });
  }

  // you should not need to change this function
  var update = function(newState) {
    state = newState;
    renderState(state);
  };

  // you do not need to change this function
  var renderState = function(state) {
    var todoListNode = document.createElement("ul");

    state.forEach(function(todo) {
      todoListNode.appendChild(createTodoNode(todo));
    });

    // you may want to add a class for css
    container.replaceChild(todoListNode, container.firstChild);
  };

  if (container) renderState(state);
})();

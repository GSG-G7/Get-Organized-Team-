// Part 1. Fill in any missing parts of the todoFunction object!
// you can access these on todo.todoFunctions
// For part one we expect you to use tdd

var todoFunctions = {
  // todoFunctions.generateId() will give you a unique id
  // You do not need to understand the implementation of this function.
  generateId: (function() {
    var idCounter = 0;

    function incrementCounter() {
      return (idCounter += 1);
    }

    return incrementCounter;
  })(),

  //cloneArrayOfObjects will create a copy of the todos array
  //changes to the new array don't affect the original
  cloneArrayOfObjects: function(todos) {
    return todos.map(function(todo) {
      return JSON.parse(JSON.stringify(todo));
    });
  },

  //addTodo Function

  addTodo: function(todos, newTodo) {
    // should leave the input argument todos unchanged (you can use cloneArrayOfObjects)
    // returns a new array, it should contain todos with the newTodo added to the end.
    // add an id to the newTodo. You can use the generateId function to create an id.
    // hint: array.concat
    let newArray = todoFunctions.cloneArrayOfObjects(todos);
    if (newTodo === "" || !isNaN(newTodo)) return false; // if newTodo is empty or a number
    let item = {
      id: todoFunctions.generateId(),
      description: newTodo,
      done: false
    };
    newArray.push(item);
    return newArray;
  },

  //deleteTodo Function

  deleteTodo: function(todos, idToDelete) {
    // should leave the input argument todos unchanged (you can use cloneArrayOfObjects)
    let newArray = todoFunctions.cloneArrayOfObjects(todos);
    // return a new array, this should not contain any todo with an id of idToDelete
    newArray.filter((element, index, array) => {
      if (element.id === idToDelete) array.splice(index, 1);
    });
    // hint: array.filter
    return newArray;
  },

  //markTodo Function

  markTodo: function(todos, idToMark) {
    // should leave the input argument todos unchanged (you can use cloneArrayOfObjects)
    let newArray = todoFunctions.cloneArrayOfObjects(todos);
    // in the new todo array, all elements will remain unchanged except the one with id: idToMark
    newArray.map(element => {
      if (element.id === idToMark) {
        if (!element.done) {
          element.done = true;
        } else {
          element.done = false;
        }
      }
    });
    // this element will have its done value toggled

    return newArray;
    // hint: array.map
  },

  //sortTodos Function

  sortTodos: function(todos, sortFunction) {
    let newArr = todoFunctions.cloneArrayOfObjects(todos);
    let doneTasks = newArr.filter(element => element.done); // done: true
    let unDoneTasks = newArr.filter(element => !element.done); //done: false

    function sortItems(a, b) {
      return a.description > b.description ? 1 : -1;
    }

    unDoneTasks.sort(sortItems);
    doneTasks.sort(sortItems);
    return unDoneTasks.concat(doneTasks);
  }
};

// Why is this if statement necessary?
// The answer has something to do with needing to run code both in the browser and in Node.js
// See this article for more details:
// http://www.matteoagosti.com/blog/2013/02/24/writing-javascript-modules-for-both-browser-and-node/
if (typeof module !== "undefined") {
  module.exports = todoFunctions;
}

var test = require("tape");
var logic = require("./logic");

// testing addTodo function

let sample = [];
test("Test addTodo function", function(todo) {
  let actual = logic.addTodo(sample, "eat apple");
  let expected = [
    { id: 1, description: "eat apple", done: false }
  ];
  todo.deepEqual(actual, expected, "new todo is added to todos array");
  todo.end();
});

// a test to make sure that the input isn't empty

test("Test addTodo function", function(todo) {
  let actual = logic.addTodo(sample, "");
  let expected = [ { id: 2, description: '', done: false } ];
  todo.deepEqual(actual, expected, "add empty description");
  todo.end();
});

// a test to make sure that the input isn't a number

test("Test addTodo function", function(todo) {
  let actual = logic.addTodo(sample, 1)[0].done;
  let expected = false;
  todo.deepEqual(actual, expected, "add numbers in the description value");
  todo.end();
});

// testing delete function

test("Test Delete Function",function(t){

  var obj = [
    { id: 0, description: "Rana", done: true},
    { id: 1, description: "yousef", done: true}
  ];
  var excpected=[
    { id: 1, description: "yousef", done: true}
  ];
  var actual = logic.deleteTodo(obj, 0);
  t.deepEqual(actual, excpected, "when passing array, Element should be deleted");
  t.end(); 
})

test("Test Delete Function", function(t) {
  var obj = [
    { id: 0, description: "Rana", done: true },
    { id: 1, description: "yousef", done: true }
  ];
  var excpected = [
    { id: 1, description: "yousef", done: true }
  ];
  var actual = logic.deleteTodo(obj, 0);
  t.deepEqual(actual, excpected, "when passing array, Element should be deleted");
  t.end();
});

// testing marking function

test("Test Marked Function", function(t) {
  var obj = [
    { id: 0, description: "Rana", done: false },
    { id: 1, description: "yousef", done: false }
  ];
  var actual = logic.markTodo(obj, 0);
  var excpected = [
    { id: 0, description: "Rana", done: true },
    { id: 1, description: "yousef", done: false }
  ];
  t.deepEqual(actual, excpected, "Should make the item with id done true");
  t.end();
});

// testing sort function

test('Testing Sort Function', function(t){
  var unSorted = [
    { id: 3, description: 'do my homework', done: false},
    { id: 1, description: 'ate apple', done: false},
    { id: 2, description: 'call', done: false}
  ];
  var expected = [
    { id: 1, description: 'ate apple', done: false},
    { id: 2, description: 'call', done: false},
    { id: 3, description: 'do my homework', done: false}
  ];
  actual = logic.sortTodos(unSorted);
  t.deepEqual(actual, expected, 'to sort the tasks');
  t.end();
});

// testing sorting done and not done tasks

test('Testing Sort Function', function(t){
  var unSorted = [
    { id: 3, description: 'do my homework', done: false},
    { id: 1, description: 'ate apple', done: true},
    { id: 2, description: 'call', done: false}
  ];
  var expected = [
    { id: 2, description: 'call', done: false},
    { id: 3, description: 'do my homework', done: false},
    { id: 1, description: 'ate apple', done: true}
  ];
  const actual = logic.sortTodos(unSorted);
  t.deepEqual(actual, expected, 'to sort done and not done tasks');
  t.end();
});

// testing sorting tasks with the same alphabetical order

test('Testing Sort Function', function(t){
  var unSorted = [
    { id: 1, description: 'do my homework', done: false},
    { id: 2, description: 'do my homework', done: false}
  ];
  var expected = [
    { id: 2, description: 'do my homework', done: false},
    { id: 1, description: 'do my homework', done: false}
  ];
  const actual = logic.sortTodos(unSorted);
  t.deepEqual(actual, expected, 'if tasks have the same alphabetical order');
  t.end();
});
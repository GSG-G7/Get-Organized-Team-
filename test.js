var test = require("tape");
var logic = require("./logic");


let sample = [];
test('Test addTodo function', function (todo) {
  let actual = logic.addTodo(sample, 'eat apple');
  let expected = [{ id: 1, description: 'eat apple', done: false }]
  todo.deepEqual(actual, expected, 'new todo is added to todos array');
  todo.end();
});

test('Test addTodo function', function (todo) {
  let actual = logic.addTodo(sample, '');
  let expected = false;
  todo.deepEqual(actual, expected, 'add empty description');
  todo.end();
});

test('Test addTodo function', function (todo) {
  let actual = logic.addTodo(sample, '');
  let expected = false;
  todo.deepEqual(actual, expected, 'add numbers in the description value');
  todo.end();
});

test('Testing Sort Function', function(t){
  var unSorted = [{id:3, description: 'drink water', done: false},{id:1, description: 'ate apple', done: false},{id:2, description: 'call', done: false}];
  var expected = [{id:1, description: 'ate apple', done: false},{id:2, description: 'call', done: false},{id:3, description: 'drink water', done: false}];
  actual = logic.sortTodos(unSorted);
  t.deepEqual(actual, expected, 'to sort the tasks');
  t.end();
});

test('Testing Sort Function', function(t){
  var unSorted = [{id:3, description: 'drink water', done: false},{id:1, description: 'ate apple', done: true},{id:2, description: 'call', done: false}];
  var expected = [{id:2, description: 'call', done: false},{id:3, description: 'drink water', done: false},{id:1, description: 'ate apple', done: true}];
  const actual = logic.sortTodos(unSorted);
  t.deepEqual(actual, expected, 'to sort the tasks');
  t.end();
});

test("Test Delete Function",function(t){

  var obj=[{id:0 ,description:"Rana",done:true},{id:1,description:"yousef",done:true}];
  var excpected=[{id:1 ,description:"yousef",done:true}];
  var actual = logic.deleteTodo(obj,0);
  t.deepEqual(actual,excpected,"when passing array ,Element should deleted");
  t.end(); 
})


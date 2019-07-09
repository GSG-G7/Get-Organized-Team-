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

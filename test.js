var test = require("tape");
var logic = require("./logic");

test("Example test", function(t) {
  t.pass();
  t.end();
});

test("Test Delete Function", function(t) {
  var obj = [
    { id: 0, description: "Rana", done: true },
    { id: 1, description: "yousef", done: true }
  ];
  var excpected = [{ id: 1, description: "yousef", done: true }];
  var actual = logic.deleteTodo(obj, 0);
  t.deepEqual(actual, excpected, "when passing array ,Element should deleted");
  t.end();
});

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

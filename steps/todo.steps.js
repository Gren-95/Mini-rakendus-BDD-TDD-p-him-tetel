import { Before, Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { TodoList } from '../src/todo.js';

// Globaalsed muutujad, mis on jagatud kõigi step definition'ide vahel
export let todoList;
export let lastResult;

// Lähtesta iga stsenaariumi alguses
Before(function () {
  todoList = new TodoList();
  lastResult = undefined;
});

Given('tühi nimekiri', function () {
  todoList = new TodoList();
});

Given('nimekiri sisaldab ülesannet {string}', function (title) {
  if (!todoList) {
    todoList = new TodoList();
  }
  todoList.addTodo(title);
});

Given('nimekiri sisaldab ülesannet {string} staatusega {string}', function (title, status) {
  if (!todoList) {
    todoList = new TodoList();
  }
  const todo = todoList.addTodo(title);
  if (status === 'done') {
    todoList.markDone(title);
  }
});

When('lisan ülesande {string}', function (title) {
  lastResult = todoList.addTodo(title);
});

When('märgin {string} tehtuks', function (title) {
  lastResult = todoList.markDone(title);
});

When('loen alles olevad ülesanded', function () {
  lastResult = todoList.getOpenTodos();
});

Then('loendis on {int} üksus', function (count) {
  // Kui viimati loeti avatud ülesandeid, kontrolli nende arvu
  if (Array.isArray(lastResult)) {
    // lastResult on avatud ülesannete massiiv
    assert.strictEqual(lastResult.length, count, `Oodati ${count} avatud ülesannet, aga leiti ${lastResult.length}`);
  } else {
    // lastResult pole massiiv, kontrolli koguarvu
    assert.strictEqual(todoList.getCount(), count);
  }
});

Then('loendis on {int} üksust', function (count) {
  // Kui viimati loeti avatud ülesandeid, kontrolli nende arvu
  if (Array.isArray(lastResult)) {
    assert.strictEqual(lastResult.length, count);
  } else {
    assert.strictEqual(todoList.getCount(), count);
  }
});

Then('üksus {int} pealkiri on {string}', function (id, expectedTitle) {
  // Kui viimati loeti avatud ülesandeid, kasuta neid
  let todo;
  if (Array.isArray(lastResult)) {
    todo = lastResult[id - 1]; // ID on 1-põhine indeks
  } else {
    todo = todoList.findById(id);
  }
  assert(todo !== undefined, `Ülesannet ID-ga ${id} ei leitud`);
  assert.strictEqual(todo.title, expectedTitle);
});

Then('üksus {int} staatus on {string}', function (id, expectedStatus) {
  const todo = todoList.findById(id);
  assert(todo !== undefined, `Ülesannet ID-ga ${id} ei leitud`);
  assert.strictEqual(todo.status, expectedStatus);
});

Then('{string} staatus on {string}', function (title, expectedStatus) {
  const todo = todoList.findByTitle(title);
  assert(todo !== undefined, `Ülesannet pealkirjaga "${title}" ei leitud`);
  assert.strictEqual(todo.status, expectedStatus);
});


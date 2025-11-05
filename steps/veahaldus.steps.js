import { When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { todoList } from './todo.steps.js';

// "tühi nimekiri" step on juba defineeritud todo.steps.js failis
let lastError;

When('proovin lisada ülesande tühja pealkirjaga', function () {
  try {
    todoList.addTodo('');
  } catch (error) {
    lastError = error;
  }
});

When('proovin lisada ülesande {string}', function (title) {
  try {
    todoList.addTodo(title);
  } catch (error) {
    lastError = error;
  }
});

When('proovin märkida {string} tehtuks', function (title) {
  lastError = undefined; // Lähtesta veaolek
  const result = todoList.markDone(title);
  if (result === null) {
    lastError = new Error('Ülesannet ei leitud');
  }
});

Then('tuleb veateade {string}', function (expectedMessage) {
  assert(lastError !== undefined, 'Oodati veat, aga veat ei tulnud');
  assert.strictEqual(lastError.message, expectedMessage);
});

Then('ülesannet ei leitud', function () {
  assert(lastError !== undefined, 'Oodati veat, aga veat ei tulnud');
});

Then('nimekiri on endiselt tühi', function () {
  assert.strictEqual(todoList.getCount(), 0);
});


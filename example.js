/**
 * Näide TodoList kasutamisest
 */

import { TodoList } from './src/todo.js';

console.log('=== Todo nimekiri näide ===\n');

const todoList = new TodoList();

// Lisa ülesandeid
console.log('1. Lisa ülesandeid:');
const todo1 = todoList.addTodo('Osta piim');
console.log(`   Lisatud: ${todo1.title} (ID: ${todo1.id}, Staatus: ${todo1.status})`);

const todo2 = todoList.addTodo('Maksa arve');
console.log(`   Lisatud: ${todo2.title} (ID: ${todo2.id}, Staatus: ${todo2.status})`);

const todo3 = todoList.addTodo('Küpseta kook');
console.log(`   Lisatud: ${todo3.title} (ID: ${todo3.id}, Staatus: ${todo3.status})`);

console.log(`\n   Kokku ülesandeid: ${todoList.getCount()}`);

// Märgi üks tehtuks
console.log('\n2. Märgi ülesanne tehtuks:');
const updated = todoList.markDone('Maksa arve');
if (updated) {
  console.log(`   ${updated.title} on nüüd ${updated.status}`);
}

// Loetle kõik ülesanded
console.log('\n3. Kõik ülesanded:');
const allTodos = todoList.getAllTodos();
allTodos.forEach(todo => {
  console.log(`   - ${todo.title} (${todo.status})`);
});

// Loetle ainult avatud ülesanded
console.log('\n4. Avatud ülesanded:');
const openTodos = todoList.getOpenTodos();
openTodos.forEach(todo => {
  console.log(`   - ${todo.title}`);
});

console.log(`\n   Avatud ülesandeid: ${openTodos.length}`);

console.log('\n=== Näide lõpp ===');


import { describe, it, expect, beforeEach } from 'vitest';
import { TodoList } from '../src/todo.js';

describe('TodoList', () => {
  let todoList;

  beforeEach(() => {
    todoList = new TodoList();
  });

  describe('addTodo', () => {
    it('peab lisama uue ülesande', () => {
      const todo = todoList.addTodo('Osta piim');
      
      expect(todo).toBeDefined();
      expect(todo.id).toBe(1);
      expect(todo.title).toBe('Osta piim');
      expect(todo.status).toBe('open');
      expect(todoList.getCount()).toBe(1);
    });

    it('peab tagastama õige struktuuriga ülesande', () => {
      const todo = todoList.addTodo('Test ülesanne');
      
      expect(todo).toHaveProperty('id');
      expect(todo).toHaveProperty('title');
      expect(todo).toHaveProperty('status');
    });

    it('peab suurendama ülesannete arvu', () => {
      expect(todoList.getCount()).toBe(0);
      todoList.addTodo('Ülesanne 1');
      expect(todoList.getCount()).toBe(1);
      todoList.addTodo('Ülesanne 2');
      expect(todoList.getCount()).toBe(2);
    });

    it('peab andma iga ülesandele unikaalse ID', () => {
      const todo1 = todoList.addTodo('Ülesanne 1');
      const todo2 = todoList.addTodo('Ülesanne 2');
      
      expect(todo1.id).toBe(1);
      expect(todo2.id).toBe(2);
    });

    it('peab kärpima tühikuid pealkirjast', () => {
      const todo = todoList.addTodo('  Osta piim  ');
      expect(todo.title).toBe('Osta piim');
    });

    it('peab viskama vea tühja pealkirjaga', () => {
      expect(() => todoList.addTodo('')).toThrow('Ülesande pealkiri ei saa olla tühi');
      expect(() => todoList.addTodo('   ')).toThrow('Ülesande pealkiri ei saa olla tühi');
    });
  });

  describe('markDone', () => {
    it('peab märkima ülesande tehtuks', () => {
      todoList.addTodo('Maksa arve');
      const result = todoList.markDone('Maksa arve');
      
      expect(result).toBeDefined();
      expect(result.status).toBe('done');
    });

    it('peab tagastama null kui ülesannet ei leitud', () => {
      const result = todoList.markDone('Olematu ülesanne');
      expect(result).toBeNull();
    });

    it('peab uuendama õige ülesande staatust', () => {
      todoList.addTodo('Ülesanne 1');
      todoList.addTodo('Ülesanne 2');
      
      todoList.markDone('Ülesanne 1');
      
      const todo1 = todoList.findByTitle('Ülesanne 1');
      const todo2 = todoList.findByTitle('Ülesanne 2');
      
      expect(todo1.status).toBe('done');
      expect(todo2.status).toBe('open');
    });
  });

  describe('findByTitle', () => {
    it('peab leidma ülesande pealkirja järgi', () => {
      todoList.addTodo('Osta piim');
      const todo = todoList.findByTitle('Osta piim');
      
      expect(todo).toBeDefined();
      expect(todo.title).toBe('Osta piim');
    });

    it('peab tagastama undefined kui ülesannet ei leitud', () => {
      const todo = todoList.findByTitle('Olematu ülesanne');
      expect(todo).toBeUndefined();
    });
  });

  describe('findById', () => {
    it('peab leidma ülesande ID järgi', () => {
      const added = todoList.addTodo('Test ülesanne');
      const found = todoList.findById(added.id);
      
      expect(found).toBeDefined();
      expect(found.id).toBe(added.id);
      expect(found.title).toBe('Test ülesanne');
    });

    it('peab tagastama undefined kui ID-d ei leitud', () => {
      const todo = todoList.findById(999);
      expect(todo).toBeUndefined();
    });
  });

  describe('getAllTodos', () => {
    it('peab tagastama kõik ülesanded', () => {
      todoList.addTodo('Ülesanne 1');
      todoList.addTodo('Ülesanne 2');
      
      const all = todoList.getAllTodos();
      
      expect(all).toHaveLength(2);
      expect(all[0].title).toBe('Ülesanne 1');
      expect(all[1].title).toBe('Ülesanne 2');
    });

    it('peab tagastama tühja massiivi kui ülesandeid pole', () => {
      const all = todoList.getAllTodos();
      expect(all).toHaveLength(0);
    });

    it('peab tagastama koopia, mitte originaali', () => {
      todoList.addTodo('Test');
      const all = todoList.getAllTodos();
      all.push({ id: 999, title: 'Hack', status: 'open' });
      
      expect(todoList.getCount()).toBe(1);
    });
  });

  describe('getOpenTodos', () => {
    it('peab tagastama ainult avatud ülesanded', () => {
      todoList.addTodo('Avatud 1');
      todoList.addTodo('Tehtud 1');
      todoList.addTodo('Avatud 2');
      
      todoList.markDone('Tehtud 1');
      
      const open = todoList.getOpenTodos();
      
      expect(open).toHaveLength(2);
      expect(open[0].title).toBe('Avatud 1');
      expect(open[1].title).toBe('Avatud 2');
      expect(open.every(todo => todo.status === 'open')).toBe(true);
    });

    it('peab tagastama tühja massiivi kui avatud ülesandeid pole', () => {
      todoList.addTodo('Ülesanne');
      todoList.markDone('Ülesanne');
      
      const open = todoList.getOpenTodos();
      expect(open).toHaveLength(0);
    });
  });

  describe('clear', () => {
    it('peab tühjendama nimekirja', () => {
      todoList.addTodo('Ülesanne 1');
      todoList.addTodo('Ülesanne 2');
      
      todoList.clear();
      
      expect(todoList.getCount()).toBe(0);
      expect(todoList.getAllTodos()).toHaveLength(0);
    });
  });

  describe('getCount', () => {
    it('peab tagastama õige ülesannete arvu', () => {
      expect(todoList.getCount()).toBe(0);
      todoList.addTodo('Ülesanne 1');
      expect(todoList.getCount()).toBe(1);
      todoList.addTodo('Ülesanne 2');
      expect(todoList.getCount()).toBe(2);
    });
  });
});


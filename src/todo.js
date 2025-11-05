/**
 * Todo nimekiri rakendus
 */

export class TodoList {
  constructor() {
    this.todos = [];
  }

  /**
   * Lisa uus ülesanne
   * @param {string} title - Ülesande pealkiri
   * @returns {Object} Lisatud ülesanne
   */
  addTodo(title) {
    if (!title || title.trim() === '') {
      throw new Error('Ülesande pealkiri ei saa olla tühi');
    }

    const todo = {
      id: this.todos.length + 1,
      title: title.trim(),
      status: 'open',
    };

    this.todos.push(todo);
    return todo;
  }

  /**
   * Märgi ülesanne tehtuks
   * @param {string} title - Ülesande pealkiri
   * @returns {Object|null} Uuendatud ülesanne või null kui ei leitud
   */
  markDone(title) {
    const todo = this.findByTitle(title);
    if (todo) {
      todo.status = 'done';
      return todo;
    }
    return null;
  }

  /**
   * Leia ülesanne pealkirja järgi
   * @param {string} title - Ülesande pealkiri
   * @returns {Object|undefined} Ülesanne või undefined
   */
  findByTitle(title) {
    return this.todos.find(todo => todo.title === title);
  }

  /**
   * Leia ülesanne ID järgi
   * @param {number} id - Ülesande ID
   * @returns {Object|undefined} Ülesanne või undefined
   */
  findById(id) {
    return this.todos.find(todo => todo.id === id);
  }

  /**
   * Loetle kõik ülesanded
   * @returns {Array} Kõik ülesanded
   */
  getAllTodos() {
    return [...this.todos];
  }

  /**
   * Loetle ainult avatud (open) ülesanded
   * @returns {Array} Avatud ülesanded
   */
  getOpenTodos() {
    return this.todos.filter(todo => todo.status === 'open');
  }

  /**
   * Tühjenda nimekiri
   */
  clear() {
    this.todos = [];
  }

  /**
   * Tagasta ülesannete arv
   * @returns {number} Ülesannete arv
   */
  getCount() {
    return this.todos.length;
  }
}


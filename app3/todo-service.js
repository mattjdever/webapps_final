class TodoSrvc {

  constructor ($rootScope) {
    this.hasLocalStorage = $rootScope.haslocalStorageSupport
    const todoList = this.hasLocalStorage ? JSON.parse(localStorage.getItem('todoList')) : []
    this.list = Array.isArray(todoList) ? todoList : []
    // this.list = [
    //   { id: 1, description: 'CodeSchool: Javascript Road Trip', dueDate: '2017-01-12', isComplete: false },
    //   { id: 2, description: 'CodeSchool: ES2015: The Shape of JavaScript to Come', dueDate: '2017-01-19', isComplete: false },
    //   { id: 3, description: 'CodeSchool: Blasting off with Bootstrap', dueDate: '2017-01-26', isComplete: true },
    //   { id: 4, description: 'CodeSchool: Shaping up with Angular', dueDate: '2017-02-02', isComplete: false },
    //   { id: 5, description: 'CodeSchool: Staying Sharp with Angular.js', dueDate: '2017-02-09', isComplete: true },
    //   { id: 6, description: 'CodeSchool: JavaScript Best Practices', dueDate: '2017-02-16', isComplete: true },
    //   { id: 7, description: 'CodeSchool: Want to build an AngularJS app?', dueDate: '2017-02-23', isComplete: false },
    // ]
    // this.list = []
  }

  getEmptyTodo () {
    return {
      id: null,
      description: '',
      dueDate: '',
      isComplete: false
    }
  }

  getNewId () {
    return cuid()
  }

  add (newTodo) {
    newTodo.id = this.getNewId()
    this.list.push(newTodo)
    this.syncLocalStorage()
  }

  remove (todoId) {
    this.list = this.list.filter(item => (item.id !== todoId))
    this.syncLocalStorage()
  }

  clearAll () {
    this.list = []
    this.syncLocalStorage()
  }

  toggleComplete (todo) {
    todo.isComplete = !todo.isComplete
    this.syncLocalStorage()
  }

  updateTodo (todo) {
    this.syncLocalStorage()
  }

  syncLocalStorage () {
    if (this.hasLocalStorage) {
      localStorage.setItem('todoList', JSON.stringify(this.list))
    }
  }

  sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

angular
  .module('midterm')
  .service('todoSrvc', TodoSrvc)

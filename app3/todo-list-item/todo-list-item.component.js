function TodoListItemCtrl (todoSrvc) {
  this.todos = todoSrvc
  this.isEditing = false

  this.toggleEditing = () => { this.isEditing = !this.isEditing }

  this.updateTodo = () => {
    todoSrvc.updateTodo(this.todo)
    this.toggleEditing()
  }
}

angular
  .module('midterm')
  .component('todoListItem', {
    templateUrl: 'todo-list-item/todo-list-item.template.html',
    controller: ['todoSrvc', TodoListItemCtrl],
    bindings: {
      todo: '='
    }
  })

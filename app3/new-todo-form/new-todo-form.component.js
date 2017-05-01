function NewTodoFromCtrl (todoSrvc, setFocus) {
  this.isSaving = false
  this.newTodo = todoSrvc.getEmptyTodo()

  this.addTodo = () => {
    this.isSaving = true
    // await todoSrvc.sleep(2000)
    todoSrvc.add(this.newTodo)
    this.isSaving = false
    this.newTodo = todoSrvc.getEmptyTodo()
    setFocus('description')
  }

  this.isValid = () => (this.newTodo.description !== '' && this.newTodo.dueDate !== '')
}

angular
  .module('midterm')
  .component('newTodoForm', {
    templateUrl: 'new-todo-form/new-todo-form.template.html',
    controller: ['todoSrvc', 'setFocus', NewTodoFromCtrl]
  })

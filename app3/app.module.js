angular
  .module('midterm', ['ngAnimate', 'newTodoForm', 'todoListItem', '720kb.datepicker'])

  // We can define a constant service to hold unchanging data that can be injected into other
  // components, controllers or services in our application.
  .constant('metaData', {
    courseNumber: 'MTM6430',
    courseSection: '300',
    title: 'Midterm: Todo list',
    description: 'A simple todo list example with localStorage for client-side data persistance.',
    author: 'Robert McKenney',
    version: '1.0.0'
  })

  .run(($rootScope, metaData) => {
    // We'll inject our constant 'metaData' into the rootScope so that is accessible
    // in our index.html
    $rootScope.metaData = metaData

    // We will test the support for localStorage once at startup and then cache the
    // result for later use by our service component.
    try {
      localStorage.setItem('testKey', 'this is the value to be saved')
      localStorage.removeItem('testKey')
      $rootScope.haslocalStorageSupport = true
    } catch (error) {
      $rootScope.haslocalStorageSupport = false
    }
  })

  .factory('setFocus', function ($timeout, $window) {
    return function (id) {
      // timeout makes sure that it is invoked after any other event has been triggered.
      // e.g. click events that need to run before the focus or
      // inputs elements that are in a disabled state but are enabled when those events
      // are triggered.
      $timeout(function () {
        const element = $window.document.getElementById(id)
        if (element) element.focus()
      })
    }
  })

  .controller('TodoListCtrl', function TodoListCtrl ($scope, todoSrvc) {
    $scope.todos = todoSrvc
  })

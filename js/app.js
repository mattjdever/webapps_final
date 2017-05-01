/* Matthew's Final Assignment for Web Applications - Winter 2017
*
Requirements:
- the app will list all todo items
X- completed items should be grouped at the bottom of the list and styled in a way that indicates their state
- a user should see the description and due date for each item
- each todo will have the following properties:
- description
- due date
- completed flag
- user can create, delete & edit items
X- Use Bootstrap for the UI
- Local Storage is to be used to persist items from session to session ( including edits )
* ToDO: Look into CUID
*************/
angular

.module('mattTodo', ['ui.router', 'firebase', 'angularModalService'] )
//app.$scope.appName = 'Matthew\'s ToDo-ly Awesome List';
//app.constant('appData',{
//    name:  'Matthew\'s ToDo-ly Awesome List'
//    });
//app.value()
.constant('firebaseConfig', {
  // Initialize Firebase
    apiKey: "AIzaSyCJiP64HbAp2T8oP3CFGljkZ4KV05jfmr4",
    authDomain: "mtm6430-final-e9b42.firebaseapp.com",
    databaseURL: "https://mtm6430-final-e9b42.firebaseio.com",
    projectId: "mtm6430-final-e9b42",
    storageBucket: "mtm6430-final-e9b42.appspot.com",
    messagingSenderId: "780922194242"
  })
.constant('metaData', {
    title: 'Matthew\'s ToDo-ly Awesome List',
    description: 'A simple todo list example with firebase.',
    author: 'Matthew Dever',
    version: '1.4.1'
  })
.run(
  function($rootScope, metaData, firebaseConfig) {
     $rootScope.metaData = metaData
     firebase.initializeApp(firebaseConfig)
   }

)

.service('dbRefRoot', DbRefRoot)
.config(
   function($stateProvider, $urlRouterProvider){
       $urlRouterProvider.otherwise('/tasks');
     var states = [
       {
           name: 'tasks',
           url: '/tasks',
           component: 'tasks'
       }
     ]
     // Loop over the state definitions and register them
      states.forEach(function(state) {
        $stateProvider.state(state);
      });
   }
)
.directive('dateFormat', function() {
      return {
        require: 'ngModel',
        link: function(scope, element, attr, ngModelCtrl) {
          //Angular 1.3 insert a formater that force to set model to date object, otherwise throw exception.
          //Reset default angular formatters/parsers
          ngModelCtrl.$formatters.length = 0;
          ngModelCtrl.$parsers.length = 0;
        }
      };
})
// .controller('ModalController', function($scope, close) {
//
//   // when you need to close the modal, call close
//   close("Success!");
// });

function DbRefRoot() {
  return firebase.database().ref("tasks")
}

$().button('toggle')

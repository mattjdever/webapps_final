angular.module('mattTodo').component('tasksList',  {
    templateUrl: 'templates/tasks-list.template.html',
    controller:  function TaskListController(
      dbRefRoot,$scope,$http, $firebaseArray, ModalService){
        //setup default sort orders
        $scope.sortType     = 'title' //set default sort type
        $scope.sortReverse  = false //set the default orders

        console.log("Loading tasks from Firebase...");
        //here is the code to grab the data from Firebase

        $scope.tasks = $firebaseArray(dbRefRoot);
        $scope.editedTodo = null;
        $scope.commentedTodo = null;

        //Here is code to read and write from localstorage

        $scope.saved = localStorage.getItem('tasks');


        //count remaining tasks
        $scope.remaining = function() {
            var count = 0;
            angular.forEach($scope.tasks, function(task){
                count+= task.isCompleted ? 0 : 1;
            });
            return count;
        };
        //add item to Firebase
        //$scope.newTask = '';
        $scope.addTodo = function(){
            console.log("Adding new task to Firebase: "
             + "Date: " + $scope.todoDate
             + "Priority: " + $scope.todoPriority
            );
            // var newTask = $scope.newTask.trim()
            // if(!newTask.length){
            //   console.log("This is empty.. why?");
            //
            //   return;
            // }
            $scope.tasks.$add({
              id: cuid(),
              title: $scope.todoTitle,
              description: $scope.todoDescription,
              dueDate:  $scope.todoDate,
              category: $scope.todoCategory,
              priority: $scope.todoPriority,
              isCompleted: false
            })
            $scope.todoTitle = ''; //clear the input after adding
            $scope.todoDate = ''; //clear the input after adding
            $scope.todoDescription = ''; //clear the input after adding
            $scope.todoCategory = ''; //clear the input after adding
            $scope.todoPriority = ''; //clear the input after adding

        }

        // Delete Completed Tasks
        $scope.archive = function() {
          console.log("Removing all completed tasks")
          $scope.tasks.forEach(function (task) {
            if (task.isCompleted) {
              $scope.deleteTask(task);
            }
          })
        }


        //Delete task from firebase
        $scope.deleteTask = function(selectedTask) {
          console.log("Deleting task from firebase: " + selectedTask.title + " ID: " + selectedTask.id);
          $scope.tasks.$remove(selectedTask);
        }


        $scope.convertToDate = function (stringDate){
            var dateOut = new Date(stringDate);
            dateOut.setDate(dateOut.getDate() + 1);
            return dateOut;
        };


        //This is a whole section I was going to do to modally read and add comments,
        //but this was just more complex than I was able to muster
        //commentTask
        $scope.commentTask = function(task){
            console.log("Popping up Comment Modal...")
            $scope.commentedTodo = task;
            $scope.commented = angular.extend({}, $scope.commentedTodo);
            console.log("commented:" + $scope.commented);

            // ModalService.showModal({
            //     templateUrl: "templates/modal-comments.template.html",
            //     controller: "ModalController",
            //     inputs: { title:"A Task Comment Popup"}
            //   }).then(function(modal) {
            //
            //     //it's a bootstrap element, use 'modal' to show it
            //     modal.element.modal();
            //     modal.close.then(function(result) {
            //       console.log("Name: " + result.name + ", age: " + result.age)
            //     })
            //   }).catch(function(error) {
            //     // error contains a detailed error message.
            //     console.log(error);
            //   })
        }
        $scope.saveComment = function(task){
            console.log("saving comment:" + task);
            //console.log('Updated Checked Status: '  );
            $scope.commentedTodo = null;
		         var title = task.title.trim();
		         if (title) {
		             $scope.tasks.$save(task);
                  $scope.selected = {};
               }
            console.log("Clearing Selected... Selected:" + $scope.selected);
        }

        $scope.clearComment = function(row){
            console.log("clearing task row:" + row);
            row.$rollbackViewValue()
            $scope.commented = {};
            console.log("selected:" + $scope.commented);
        }



        //Edit task
        $scope.editTask = function(task){
            console.log("edit task:" + task);
            $scope.editedTodo = task;
            $scope.selected = angular.extend({}, $scope.editedTodo);
            console.log("selected:" + $scope.selected);
        };
        $scope.saveTask = function(task){
            console.log("saving task:" + task);
            console.log('Updated Checked Status: '  );
            $scope.editedTodo = null;
		         var title = task.title.trim();
		         if (title) {
		             $scope.tasks.$save(task);
                  $scope.selected = {};
               }
    console.log("Clearing Selected... Selected:" + $scope.selected);
        };


        $scope.clearTask = function(row){
            console.log("clearing task row:" + row);
            row.$rollbackViewValue()
            $scope.selected = {};
            console.log("selected:" + $scope.selected);
        };

        $scope.selected = {};
        $scope.getTemplate = function (task) {
            if (task.id === $scope.selected.id){
                return 'templates/tasks-list-editrow.template.html';
            }
            else return 'templates/tasks-list-displayrow.template.html';
        };


    } //end of Task Controller
});

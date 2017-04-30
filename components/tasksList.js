angular.module('mattTodo').component('tasksList', {
    templateUrl: 'templates/tasks-list.template.html',
    controller: function TaskListController($scope,$http){
        console.log("Loading tasks...");
        //Here is code to read and write from localstorage

        $scope.saved = localStorage.getItem('tasks');
        $scope.tasks = (localStorage.getItem('tasks')!==null) ? JSON.parse($scope.saved) : [
          {
            "id":0,
            "title":"Build this amazing Todo List",
            "description":"This is a hugely midterm project, so you better get this right",
            "dueDate":"2017-03-10T05:00:00.000Z",
            "category":"default",
            "priority": "3",
            "isCompleted":false

          },
          {
            "id":1,
            "title":"Let us Edit the marvy Todos",
            "description":"We need to be able to edit these things",
            "dueDate":"2017-03-09T05:00:00.000Z",
            "category":"testing",
            "priority": "3",
            "isCompleted":false
          }];

        localStorage.setItem('tasks', JSON.stringify($scope.tasks));

        //count remaining tasks
        $scope.remaining = function() {
            var count = 0;
            angular.forEach($scope.tasks, function(task){
                count+= task.isCompleted ? 0 : 1;
            });
            return count;
        };

        //add Item to LocalStorage
        $scope.addTodo = function() {
           console.log("adding...");
            $scope.tasks.push({
                id: cuid(),
                title: $scope.todoTitle,
                description: $scope.todoDescription,
                dueDate:  $scope.todoDate,
                category: $scope.todoCategory,
                isCompleted: false
            });
            $scope.todoTitle = ''; //clear the input after adding
            $scope.todoDate = ''; //clear the input after adding
            $scope.todoDescription = ''; //clear the input after adding
            $scope.todoCategory = ''; //clear the input after adding

            localStorage.setItem('tasks', JSON.stringify($scope.tasks));
	    };

        // Delete Completed Tasks
        $scope.archive = function() {
		var oldTasks = $scope.tasks;
		$scope.tasks = [];
		angular.forEach(oldTasks, function(task){
			if (!task.isCompleted)
				$scope.tasks.push(task);
		});
		localStorage.setItem('tasks', JSON.stringify($scope.tasks));
	   };

        //Delete Sekected Task
        $scope.deleteTask = function(selectedTask) {
            console.log("Deleting task: " + selectedTask.title + " ID: " + selectedTask.id);
		var oldTasks = $scope.tasks;
		$scope.tasks = [];
             console.log("Tasks Before filter:" + $scope.tasks);
		angular.forEach(oldTasks, function(task){
			if (!(task.id === selectedTask.id)){
                console.log("Adding TaskID: " + task.id);
				$scope.tasks.push(task);
                console.log("Tasks: " + $scope.tasks);
            }
		});
            console.log("Tasks After filter:" +$scope.tasks);
		localStorage.setItem('tasks', JSON.stringify($scope.tasks));
	   };

        $scope.convertToDate = function (stringDate){
            var dateOut = new Date(stringDate);
            dateOut.setDate(dateOut.getDate() + 1);
            return dateOut;
        };

        //Update isCompleted Checkbox to localStorage
        $scope.updateChecked = function(){
            console.log('Updated Checked Status: '  );
            var oldTasks = $scope.tasks;
            $scope.tasks = [];
            angular.forEach(oldTasks, function(task){
            //write updated info to localstorage
                $scope.tasks.push(task);
            });
            localStorage.setItem('tasks', JSON.stringify($scope.tasks));
	    };
        //Edit task
        $scope.editTask = function(task){
            console.log("edit task:" + task);
            $scope.oldTask = task;
            $scope.selected = angular.copy(task);
            console.log("selected:" + $scope.selected);
        };

        $scope.saveTask = function(task){
            console.log("saving task:" + task);
            console.log('Updated Checked Status: '  );
            var oldTasks = $scope.tasks;
            $scope.tasks = [];
            angular.forEach(oldTasks, function(task){
            //write updated info to localstorage
                $scope.tasks.push(task);
            });
            localStorage.setItem('tasks', JSON.stringify($scope.tasks));
            $scope.selected = {};
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
//        console.log ("Task0: " & $scope.tasks);
        //This is the old code that reads from json file
//        $http.get('data/todos.json').success(function(data, status, headers, config) {
//          $scope.tasks = data;
//            $scope.totalTasks = data.length;
//        }).
//        error(function(data, status, headers, config) {
//          // log error
//            console.log("error");
//        });
    }
});

var app = angular.module('taskApp', [])
app.controller('MainController', function($scope){
    $scope.name = 'Mateus'
    $scope.tasks = []
    $scope.newTask = ''
    $scope.addNewTask = function() {
        if ($scope.newTask.trim() === '') return;
        $scope.tasks.push({
            name: $scope.newTask,
            done: false
        })
        $scope.newTask = ''
    }
    $scope.removeTask = function(index) {
        $scope.tasks.splice(index, 1)
    }
})
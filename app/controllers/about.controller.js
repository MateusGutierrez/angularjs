angular.module('taskApp')
    .controller('AboutController', function($scope, TaskService) {
        $scope.taskCount = TaskService.getStats().total;
    });

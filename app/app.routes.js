angular.module('taskApp')
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                template: '<task-list></task-list>'
            })
            .when('/about', {
                templateUrl: 'app/views/about.html',
                controller: 'AboutController'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

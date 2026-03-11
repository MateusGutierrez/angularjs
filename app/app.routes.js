angular.module('taskApp')
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                template: '<task-list></task-list>'
            })
            .when('/characters', {
                template: '<character-list></character-list>'
            })
            .when('/characters/:id', {
                template: '<character-detail></character-detail>'
            })
            .when('/about', {
                templateUrl: 'app/views/about.html',
                controller: 'AboutController'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

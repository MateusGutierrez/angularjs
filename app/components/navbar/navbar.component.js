angular.module('taskApp')
    .component('appNavbar', {
        templateUrl: 'app/components/navbar/navbar.html',
        controller: function($location) {
            var ctrl = this;

            ctrl.isActive = function(path) {
                return $location.path() === path;
            };
        }
    });

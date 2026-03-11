angular.module('taskApp')
    .component('characterDetail', {
        templateUrl: 'app/components/characterDetail/characterDetail.html',
        controller: function(RickAndMortyService, Store, $routeParams) {
            var ctrl = this;
            var state = Store.getState();

            ctrl.$onInit = function() {
                ctrl.loading = true;
                ctrl.character = null;
                ctrl.error = null;

                RickAndMortyService.getCharacterById($routeParams.id)
                    .then(function(data) {
                        ctrl.character = data;
                        ctrl.loading = state.loading;
                        ctrl.error = state.error;
                    });
            };
        }
    });

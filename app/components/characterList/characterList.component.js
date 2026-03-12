angular.module('taskApp')
    .component('characterList', {
        templateUrl: 'app/components/characterList/characterList.html',
        controller: function(RickAndMortyService, Store, $scope) {
            var ctrl = this;
            var state = Store.getState();

            ctrl.$onInit = function() {
                ctrl.characters = state.characters;
                ctrl.pagination = state.pagination;
                ctrl.filters = angular.copy(state.characterFilters);
                ctrl.loading = state.loading;
                ctrl.error = state.error;

                // Carregar personagens se a lista estiver vazia
                if (ctrl.characters.length === 0) {
                    ctrl.loadCharacters();
                }
            };

            // Inscrever no Store para receber atualizações de estado
            var unsubscribe = Store.subscribe(function(newState) {
                ctrl.characters = newState.characters;
                ctrl.pagination = newState.pagination;
                ctrl.loading = newState.loading;
                ctrl.error = newState.error;
                // Forçar digest cycle se necessário
                if (!$scope.$$phase) {
                    $scope.$digest();
                }
            });

            ctrl.loadCharacters = function() {
                RickAndMortyService.getCharacters(
                    ctrl.pagination.currentPage,
                    ctrl.filters
                );
            };

            ctrl.search = function() {
                ctrl.loadCharacters();
            };

            ctrl.clearFilters = function() {
                ctrl.filters = { name: '', status: '' };
                ctrl.search();
            };

            ctrl.goToPage = function(page) {
                if (page < 1 || page > ctrl.pagination.totalPages) return;
                Store.merge({ pagination: { currentPage: page, totalPages: ctrl.pagination.totalPages } });
                ctrl.loadCharacters();
            };

            ctrl.$onDestroy = function() {
                unsubscribe();
            };
        }
    });

/**
 * Diretivas customizadas
 *
 * Diretivas estendem o HTML com comportamentos próprios.
 */
angular.module('taskApp')
    // Diretiva de loading global - escuta o interceptor
    .directive('loadingBar', function($rootScope) {
        return {
            restrict: 'E', // Só como elemento: <loading-bar></loading-bar>
            template: '<div class="loading-bar" ng-show="isLoading"></div>',
            link: function(scope) {
                scope.isLoading = false;

                $rootScope.$on('loading:start', function() {
                    scope.isLoading = true;
                });

                $rootScope.$on('loading:stop', function() {
                    scope.isLoading = false;
                });
            }
        };
    })

    // Diretiva de atributo - fallback para imagens quebradas
    .directive('imgFallback', function() {
        return {
            restrict: 'A', // Só como atributo: <img img-fallback>
            link: function(scope, element) {
                element.on('error', function() {
                    element.attr('src', 'https://via.placeholder.com/300x300?text=Not+Found');
                });
            }
        };
    });

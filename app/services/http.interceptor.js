/**
 * HTTP Interceptor
 *
 * Intercepta TODAS as requisições HTTP da aplicação.
 * Útil para: loading global, tratamento de erros, auth headers, logging.
 */
angular.module('taskApp')
    .factory('httpInterceptor', function($q, $rootScope) {
        var pendingRequests = 0;

        return {
            request: function(config) {
                pendingRequests++;
                $rootScope.$broadcast('loading:start');
                return config;
            },
            response: function(response) {
                pendingRequests--;
                if (pendingRequests === 0) {
                    $rootScope.$broadcast('loading:stop');
                }
                return response;
            },
            responseError: function(rejection) {
                pendingRequests--;
                if (pendingRequests === 0) {
                    $rootScope.$broadcast('loading:stop');
                }
                return $q.reject(rejection);
            }
        };
    })
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
    });

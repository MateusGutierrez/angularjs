/**
 * Store Service - Gerenciamento de estado centralizado
 *
 * Padrão simples de store: um único local para o estado da aplicação.
 * Qualquer service/component pode ler e modificar o estado.
 * Listeners são notificados quando o estado muda.
 */
angular.module('taskApp')
    .factory('Store', function() {
        var state = {
            loading: false,
            characters: [],
            characterDetail: null,
            characterFilters: {
                name: '',
                status: ''
            },
            pagination: {
                currentPage: 1,
                totalPages: 1
            },
            error: null
        };

        var listeners = [];

        return {
            getState: function() {
                return state;
            },
            set: function(key, value) {
                state[key] = value;
                this.notify();
            },
            merge: function(partial) {
                angular.merge(state, partial);
                this.notify();
            },
            subscribe: function(callback) {
                listeners.push(callback);
                // Retorna função para cancelar inscrição
                return function() {
                    var index = listeners.indexOf(callback);
                    if (index > -1) {
                        listeners.splice(index, 1);
                    }
                };
            },
            notify: function() {
                listeners.forEach(function(cb) {
                    cb(state);
                });
            }
        };
    });

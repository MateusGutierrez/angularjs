/**
 * Rick and Morty API Service
 *
 * Responsável por toda comunicação com a API externa.
 * Usa $http (wrapper do Angular para XMLHttpRequest/fetch).
 */
angular.module('taskApp')
    .factory('RickAndMortyService', function($http, Store) {
        var BASE_URL = 'https://rickandmortyapi.com/api';

        return {
            getCharacters: function(page, filters) {
                var params = { page: page || 1 };

                if (filters && filters.name) {
                    params.name = filters.name;
                }
                if (filters && filters.status) {
                    params.status = filters.status;
                }

                Store.set('loading', true);
                Store.set('error', null);

                return $http.get(BASE_URL + '/character', { params: params })
                    .then(function(response) {
                        Store.set('characters', response.data.results);
                        Store.merge({
                            pagination: {
                                currentPage: page || 1,
                                totalPages: response.data.info.pages
                            }
                        });
                        return response.data;
                    })
                    .catch(function(error) {
                        Store.set('characters', []);
                        if (error.status === 404) {
                            Store.set('error', 'Nenhum personagem encontrado.');
                        } else {
                            Store.set('error', 'Erro ao carregar personagens. Tente novamente.');
                        }
                        return { results: [], info: { pages: 0 } };
                    })
                    .finally(function() {
                        Store.set('loading', false);
                    });
            },

            getCharacterById: function(id) {
                Store.set('loading', true);
                Store.set('error', null);

                return $http.get(BASE_URL + '/character/' + id)
                    .then(function(response) {
                        Store.set('characterDetail', response.data);
                        return response.data;
                    })
                    .catch(function() {
                        Store.set('error', 'Personagem não encontrado.');
                        return null;
                    })
                    .finally(function() {
                        Store.set('loading', false);
                    });
            }
        };
    });

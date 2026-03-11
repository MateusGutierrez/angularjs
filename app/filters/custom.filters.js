/**
 * Filtros customizados
 *
 * Filtros transformam dados na view sem modificar o original.
 * Uso no template: {{ valor | nomeFiltro }}
 */
angular.module('taskApp')
    // Traduz status do personagem
    .filter('translateStatus', function() {
        var translations = {
            'Alive': 'Vivo',
            'Dead': 'Morto',
            'unknown': 'Desconhecido'
        };
        return function(status) {
            return translations[status] || status;
        };
    })

    // Trunca texto longo
    .filter('truncate', function() {
        return function(text, length) {
            if (!text) return '';
            length = length || 30;
            if (text.length <= length) return text;
            return text.substring(0, length) + '...';
        };
    })

    // Capitaliza primeira letra
    .filter('capitalize', function() {
        return function(text) {
            if (!text) return '';
            return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        };
    });

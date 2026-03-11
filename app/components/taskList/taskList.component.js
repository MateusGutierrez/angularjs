angular.module('taskApp')
    .component('taskList', {
        templateUrl: 'app/components/taskList/taskList.html',
        controller: function(TaskService, $scope) {
            var ctrl = this;

            ctrl.newTask = '';
            ctrl.filter = {};
            ctrl.search = '';

            // Lifecycle hook - chamado quando o componente inicia
            ctrl.$onInit = function() {
                ctrl.tasks = TaskService.getAll();
                ctrl.stats = TaskService.getStats();
            };

            ctrl.addTask = function() {
                TaskService.add(ctrl.newTask);
                ctrl.newTask = '';
                ctrl.stats = TaskService.getStats();
            };

            ctrl.removeTask = function(index) {
                TaskService.remove(index);
                ctrl.stats = TaskService.getStats();
            };

            ctrl.toggleTask = function(task) {
                TaskService.toggle(task);
                ctrl.stats = TaskService.getStats();
            };

            // Proteção: confirmar antes de sair da rota
            var deregister = $scope.$on('$routeChangeStart', function(event) {
                var pending = TaskService.getStats().pending;
                if (pending > 0) {
                    var confirm = window.confirm(
                        'Você tem ' + pending + ' tarefa(s) pendente(s). Deseja sair?'
                    );
                    if (!confirm) {
                        event.preventDefault();
                    }
                }
            });

            // Limpar o listener quando o componente for destruído
            ctrl.$onDestroy = function() {
                deregister();
            };
        }
    });

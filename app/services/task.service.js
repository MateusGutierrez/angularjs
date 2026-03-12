angular.module('taskApp').factory('TaskService', function(){
    var tasks = []
    return {
        getAll: function () {
            return tasks
        },
        add: function(name) {
            if (!name || !name.trim()) return;
            tasks.push({ name: name.trim(), done: false, editing: false });
        },
        remove: function(index){
            tasks.splice(index,1)
        },
        toggle: function(task) {
            task.done = !task.done
        },
        getStats: function() {
            return {
                total: tasks.length,
                done: tasks.filter(function(t) { return t.done; }).length,
                pending: tasks.filter(function(t) { return !t.done; }).length
            }
        },
        edit: function(task) {
            task.backup = angular.copy(task);
            task.editing = true
        },
        save: function(task) {
            task.editing = false
            delete task.backup
        },
        restore: function(task) {
            angular.extend(task, task.backup)
            task.editing = false
            delete task.backup
        }
    }
})
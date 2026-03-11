angular.module('taskApp').factory('TaskService', function(){
    var tasks = []
    return {
        getAll: function () {
            return tasks
        },
        add: function(name) {
            tasks.push({
                name: name,
                done: false,
                editing: false
            })
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
        }
    }
})
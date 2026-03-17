angular.module('taskApp').factory('TaskService', function(){
    var STORAGE_KEY = 'tasks';
    var tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    function persist(){
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
    return {
        getAll: function () {
            return tasks
        },
        add: function(name) {
            if (!name || !name.trim()) return;
            tasks.push({ name: name.trim(), done: false, editing: false, createdAt: new Date() });
            persist()
        },
        remove: function(index){
            tasks.splice(index,1)
            persist()
        },
        toggle: function(task) {
            task.done = !task.done
            persist()
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
            persist()
        },
        save: function(task) {
            task.editing = false
            delete task.backup
            persist()
        },
        restore: function(task) {
            angular.extend(task, task.backup)
            task.editing = false
            delete task.backup
            persist()
        },
        clearDoneTasks: function () {
            tasks = tasks.filter((t) => t.done !== true)
            persist()
        }
    }
})
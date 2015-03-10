var app = angular.module('todo', []);

app.config(function($interpolateProvider){
    // make sure Angular and Django templating
    // don't step on each other's toes.
    $interpolateProvider.startSymbol('{[');
    $interpolateProvider.endSymbol(']}');
});

// TodoService manages all todos.
app.service("TodoService", function($http) {
    var TODO_API = "/api/todo/";
    var service = {todos: []};

    // refresh todo list
    service.refresh = function() {
        return $http({
            url: TODO_API,
            method: "GET"
        }).then(function(response){
            service.todos.splice(0,service.todos.length);
            Array.prototype.splice.apply(service.todos, [0,0].concat(response.data));
            console.log(service.todos);
            return service.todos;
        });
    };

    // Create a new TO-DO, returning a
    // promise that resolves when creation completes
    service.create = function(text) {
        return $http({
            url: TODO_API,
            method: "POST",
            data: {text: text}
        }).then(function(response){
            service.todos.push(response.data)
        });
    };

    // Mark todos as complete/incomplete
    service.mark = function(todo, done) {
        return $http({
            url: TODO_API+todo.id+"/",
            method: "PATCH",
            data: {done: done}
        }).then(function(){
            todo.done = done;
        });
    };

    // Delete a TO-DO, returning a promise that
    // resolves when deletion is confirmed by server
    service.remove = function(todo) {
        return $http({
            url: TODO_API+todo.id+"/",
            method: "DELETE"
        }).then(function() {
            service.todos.splice(
                service.todos.indexOf(todo),1);
        });
    };

    return service;
});

app.controller("TodoPage", function($scope, TodoService){
    // Initial state
    $scope.show_complete = true;
    // Pass through service endpoints for access by view
    $scope.todos = TodoService.todos;
    $scope.create = TodoService.create;
    $scope.mark = TodoService.mark;
    $scope.remove = TodoService.remove;
    // a filter helper to show only certain todos
    $scope.showComplete = function(todo) {
        return $scope.show_complete || !todo.done;
    };
    //populate the initial list
    TodoService.refresh();
});
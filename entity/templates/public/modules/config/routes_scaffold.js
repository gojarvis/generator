//Setting up route
angular.module('mean.<%= name %>s').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/<%= name %>s', {
            templateUrl: 'modules/<%= name %>s/views/list.html'
        }).
        when('/<%= name %>s/create', {
            templateUrl: 'modules/<%= name %>s/views/create.html'
        }).
        when('/<%= name %>s/:<%= name %>Id/edit', {
            templateUrl: 'modules/<%= name %>s/views/edit.html'
        }).
        when('/<%= name %>s/:<%= name %>Id', {
            templateUrl: 'modules/<%= name %>s/views/view.html'
        });
    }
]);
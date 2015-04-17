'use strict';
/* global app:true */
/* exported app */

var app = angular.module('london', [
    'ui.router',
    'ui.bootstrap'
]);

app.run(['dataService', function (sData) {
        sData.loadData();
}]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    /*  Originally I had planned the application to have many more states, like hover, click.
     That's why the setup here is so generous. In the course of implementing
     I found out that all the other states are not needed because AngularJS handles theese things
     implicitly.
     */

    $stateProvider
        .state('home', {
            url:        '/',
            views: {
               'main': {
                   templateUrl: 'app/views/main/_mainView.html',
                   controller:  'MainController as cMain'
               }
            }
        })
    ;

    $urlRouterProvider
        .otherwise('/')
    ;
}]);

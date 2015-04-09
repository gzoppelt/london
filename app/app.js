'use strict';
/* global app:true */
/* exported app */

var app = angular.module('london', [
    'ui.router'
]);

app.run(['dataService', function (sData) {
        sData.loadData();
}]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url:            '/',
            views: {
                'header': {
                    templateUrl: 'app/header/headerTemplate.html',
                    controller:  'HeaderController as cHeader'
                },
                'navi': {
                    templateUrl: 'app/navi/naviTemplate.html',
                    controller:  'NaviController as cNavi'
                },
                'map': {
                    templateUrl: 'app/map/mapTemplate.html',
                    controller:  'MapController as cMap'
                }
            }
        })

        .state('hover', {
            url:            '/hover/:item',
            views: {
                'headerHover': {
                    templateUrl: 'app/header/headerTemplate.html',
                    controller:  'app/header/HeaderHoverController.js as cHeaderHover'
                },
                'naviHover': {
                    templateUrl: 'app/navi/naviTemplate.html',
                    controller:  'app/navi/NaviHoverController.js as cNaviHover'
                },
                'mapHover': {
                    templateUrl: 'app/map/mapTemplate.html',
                    controller:  'app/map/MapHoverController.js as cMapHover'
                }
            }
            //
        })

        .state('click', {
            url:            '/click/:item',
            templateUrl:    'app/slide/slideTemplate.html',
            controller:     'SlideController.js as cSlide'

        })
    ;
    $urlRouterProvider
        .otherwise('/')
    ;
}]);

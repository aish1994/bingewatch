'use strict';

angular.module('bwApp', ['bwApp.auth', 'bwApp.admin', 'bwApp.constants', 'ngCookies', 'ngResource',
    'ngSanitize', 'ngRoute','ui', 'ui.filters', 'btford.socket-io', 'validation.match'
  ])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
  });

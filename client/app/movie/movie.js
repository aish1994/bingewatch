'use strict';

angular.module('bwApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/movie', {
        template: '<movie></movie>'
      });
  });

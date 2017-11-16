'use strict';

angular.module('bwApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/rating', {
        template: '<rating></rating>',
         authenticate: true,
      });
  });

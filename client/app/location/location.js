'use strict';

angular.module('bwApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/location', {
        template: '<location></location>'
      });
  });

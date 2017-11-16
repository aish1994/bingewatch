'use strict';

angular.module('bwApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/seating', {
        template: '<seating></seating>'
      });
  });

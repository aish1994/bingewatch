'use strict';

angular.module('bwApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/dateshowtime', {
        template: '<dateshowtime></dateshowtime>'
      });
  });

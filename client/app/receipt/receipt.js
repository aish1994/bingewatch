'use strict';

angular.module('bwApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/receipt', {
        template: '<receipt></receipt>'
      });
  });

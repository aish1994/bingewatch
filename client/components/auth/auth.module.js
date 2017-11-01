'use strict';

angular.module('bwApp.auth', ['bwApp.constants', 'bwApp.util', 'ngCookies', 'ngRoute'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });

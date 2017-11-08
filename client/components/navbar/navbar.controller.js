'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'link': '/'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor($location, Auth,$http,$scope,socket) {
    this.$location = $location;
    this.$http=$http;
    this.socket=socket;
    this.Theatres ;
    this.selectedcityname;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;

  }

  isActive(route) {
    return route === this.$location.path();
  }

}

angular.module('bwApp')
  .controller('NavbarController', NavbarController);

'use strict';


$(document).ready(function(){
    $("#selectmy").on('change', function(){
    	    alert("hiii");
    console.log("jiiii");
        var $this = $(this),
            $value = $this.val();
        
        alert($value);
    });
    
});

angular.module('bwApp')
  .config(function($routeProvider) {
    $routeProvider.when('/', {
      template: '<main></main>'
    });
  });

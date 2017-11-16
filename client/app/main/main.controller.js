'use strict';

(function() {

    class MainController {

        constructor($http, Auth,$scope, socket, $filter,$location) {
            this.$http = $http;
            this.$location=$location;
            this.socket = socket;
            this.$filter = $filter;
            this.awesomeThings = [];
            this.CityName=[];
            this.what=[];
            this.selectedcityname;
            this.moviedetails;
            this.movieProperties=[];
            this.isLoggedIn = Auth.isLoggedIn;
            this.getCurrentUser = Auth.getCurrentUser;
            $scope.$on('$destroy', function() {
                socket.unsyncUpdates('thing');
            });


            $(document).ready(function(){
    $("#myBtn").click(function(){
        $("#exampleModal").modal("hide");
        $(".modal-backdrop").remove();
    });
});

        }

        StoreData() {
      if (typeof(Storage) !== undefined) {
        sessionStorage.setItem("MovieName", this.MName);
      }
    }


        sessionStore() {
            console.log(this.selectedCity.city);
      if (typeof(Storage) !== undefined) {
        sessionStorage.setItem("CityName", this.selectedCity.city);
        sessionStorage.setItem("className", this.selectedclass);
        sessionStorage.setItem("noofSeats", this.selectedseats);
      }
    }
    selectedMovie(moviename){
if (typeof(Storage) !== undefined) {
        sessionStorage.setItem("selectmymovie",moviename);
    }
  }


      
        $onInit() {
           this.$http.get('/api/moviemappingendpoints').then(response => {
                this.mappingdetails = response.data;
                this.socket.syncUpdates('moviemappingendpoint', this.mappingdetails);
        this.$http.get('/api/movieendpoints').then(response => {
          this.moviedetails = response.data;
          this.socket.syncUpdates('movieendpoint', this.moviedetails);
        });
               });
           console.log(this.mappingdetails);
           console.log(this.moviedetails);
        }


        addThing() {
            if (this.newThing) {
                this.$http.post('/api/things', {
                    name: this.newThing
                });
                this.newThing = '';
            }
        }

        deleteThing(thing) {
            this.$http.delete('/api/things/' + thing._id);
        }


        giveRating(moviename){
            alert("hi");
             if(this.isLoggedIn()){
              this.$location.path('/rating');

         }else {
            alert("please login before giving a rating");
            this.$location.path('/login');

         }
        }


        FindCity() {
            this.CityName=[];
            if (typeof(Storage) !== undefined) {
        this.MovieName = sessionStorage.getItem('selectmymovie');
    }
            this.$http.get('/api/moviemappingendpoints').then(response => {
                this.mappingdetails = response.data;
                this.socket.syncUpdates('moviemappingendpoint', this.mappingdetails);
});
            for(let m in this.mappingdetails){
                if(this.mappingdetails[m].moviename==this.MovieName){
                    this.CityName.push(this.mappingdetails[m]);
                    console.log(this.mappingdetails[m]);
                }
            }
            // this.$http.get('/api/locationendpoints').then(response => {
            //     this.CityName = response.data;
            //     this.socket.syncUpdates('locationendpoint', this.CityName);
            // });
            // console.log(this.CityName);
        }
         FindTheatre() {
            this.$http.get('/api/locationendpoints').then(response => {
                this.TName = response.data;
                this.socket.syncUpdates('locationendpoint', this.TName);
            });
        }


        chooseCity(cityname) {
            this.selectedcityname = cityname;

    }
}

    angular.module('bwApp')
        .component('main', {
            templateUrl: 'app/main/main.html',
            controller: MainController,
            controllerAs: 'mainCtrl'
        });
})();
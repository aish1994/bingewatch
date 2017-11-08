'use strict';

 (function() {

     class LocationComponent {
         constructor($http, $scope, socket) {
             this.message = 'Hello';
             this.$http = $http;
             this.socket = socket;
             this.Theatres;
             this.NewTheatre;
             $scope.$on('$destroy', function() {
                 socket.unsyncUpdates('locationendpoint');
             });
         }

         $onInit() {
             this.$http.get('/api/locationendpoints').then(response => {
                 this.Theatres = response.data;
                 this.socket.syncUpdates('locationendpoint', this.Theatres);
             });
             console.log(this.Theatres);

         }

         savetheatre() {
             this.$http.post('/api/locationendpoints', {
                 theatre_name: this.theatre_name,
                 theatre_city: this.theatre_city,
                 address: this.address,
             });
             console.log("saved data");
            this.theatre_name="";
            this.theatre_city="";
            this.address="";
         }
 
        deltheatre(TheatreCollection) {
        this.$http.delete('/api/locationendpoints/' + TheatreCollection._id);
            }


        searchtheatre(TheatreCollection) {
        this.$http.get('/api/locationendpoints/'+ TheatreCollection._id).then(response => {
            
            this.NewTheatre = {   
                _id:response.data._id,        
                theatre_name:response.data.theatre_name,
                theatre_city:response.data.theatre_city,
                address:response.data.address
            }
        });

    }

        updatetheatre() {
            console.log(this.NewTheatre);
        this.$http.put('/api/locationendpoints/' + this.NewTheatre._id, this.NewTheatre).then(response => {
            console.log('Data Updated');
        });
    }



     }

     angular.module('bwApp')
         .component('location', {
             templateUrl: 'app/location/location.html',
             controller: LocationComponent,
             controllerAs: 'locationCtrl'
         });

 })();
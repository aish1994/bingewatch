'use strict';

(function() {

    class MainController {

        constructor($http, $scope, socket) {
            this.$http = $http;
            this.socket = socket;
            this.awesomeThings = [];
            this.CityName;
            this.selectedcityname;

            $scope.$on('$destroy', function() {
                socket.unsyncUpdates('thing');
            });

        }

        clicked() {
            alert("hey im clicked");
        }

        $onInit() {
            this.$http.get('/api/things')
                .then(response => {
                    this.awesomeThings = response.data;
                    this.socket.syncUpdates('thing', this.awesomeThings);
                });
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


        FindCity() {

            this.$http.get('/api/locationendpoints').then(response => {
                this.CityName = response.data;
                this.socket.syncUpdates('locationendpoint', this.CityName);
            });
            console.log(this.CityName);
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
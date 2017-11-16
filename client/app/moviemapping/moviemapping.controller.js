'use strict';

(function() {

    class MoviemappingComponent {
        constructor($http, $scope, socket, $filter) {
            this.$http = $http;
            this.$filter = $filter;
            this.socket = socket;
            this.movie;
            this.TName;
            this.theatreList = [];
            this.dateList = [];
            this.timeList = []
            this.flag = 0;
            this.date = "";

        }
        theatreListAdd() { 
            console.log(this.selectTheatre);
            if (this.theatreList == "") {
                this.flag = 1;
            }

            if (this.selectTheatre.theatre_name == undefined || this.selectTheatre.theatre_city == undefined) {
                this.flag = 2;
            } else {
                for (let a in this.theatreList) {
                    if (this.theatreList[a].theatreName == this.selectTheatre.theatre_name) {
                        this.flag = 0;
                        break;
                    } else {
                        this.flag = 1;
                    }
                } 
            }
            if (this.flag == 1) {
                this.theatreList.push({
                    theatreName: this.selectTheatre.theatre_name
                });


            } else if (this.flag == 0) {
                alert("You have already selected this Theatre");
            } else {
                alert(" Please select a theatre to proceed");
            }
        }
        cityChange() {
            this.theatreList = [];
        }

        theatreListRemove(theatredelete) {
            var index = this.theatreList.indexOf(theatredelete);
            this.theatreList.splice(index, 1);
        }

        dateListRemove(datedelete) {
            var index = this.dateList.indexOf(datedelete);
            this.dateList.splice(index, 1);
        }

        timeListRemove(timedelete) {
            var index = this.timeList.indexOf(timedelete);
            this.timeList.splice(index, 1);
        }




        FindMovie() {
            this.$http.get('/api/movieendpoints').then(response => {
                this.movie = response.data;
                this.socket.syncUpdates('movieendpoint', this.movie);
            });

        }


        FindCity() {
            this.$http.get('/api/locationendpoints').then(response => {
                this.CityName = response.data;
                this.socket.syncUpdates('locationendpoint', this.CityName);
            });
          console.log(this.CityName);
          
        }


        FindTheatre() {
            this.$http.get('/api/locationendpoints').then(response => {
                this.TName = response.data;
                this.socket.syncUpdates('locationendpoint', this.TName);
            });
        }

        addSelectedTheatre(check) {
            alert(check);
            console.log(check);

        }


        DateListAdd() {

            this.date = this.$filter('date')(this.showDate, "dd/MM/yyyy");
 if (this.dateList == "") {
                this.flag = 1;
            }
            else{
             for(let t in this.dateList) {
                    if(this.dateList[t]=== this.date) {
                        this.flag = 0;
                        break;
                    } else {
                        this.flag = 1;
                    }
                }
            }
             console.log(this.flag);
            if (this.flag == 1) {
                console.log(this.date);
                this.dateList.push(this.date);
                 console.log(this.dateList);


            } else if (this.flag == 0) {
                alert("You have already selected this Date, choose another date");
            } 

        }

        timeListAdd() {
            this.time = this.$filter('date')(this.showTimings, "h:mm a");

            if (this.timeList == "") {
                this.flag = 1;
            }
            else{
             for(let w in this.timeList) {
                    if(this.timeList[w]=== this.time) {
                        this.flag = 0;
                        break;
                    } else {
                        this.flag = 1;
                    }
                }
            }
            if(this.flag == 1) {
               this.timeList.push(this.time);



            } else if (this.flag == 0) {
                alert("You have already selected this Time, choose another show timing");
            } 
            
        }



        submitMovieMappingDetails() {

            for (let i in this.theatreList) {
                this.$http.post('/api/moviemappingendpoints', {
                    moviename: this.selectMovie.movietitle,
                    city: this.selectCity.theatre_city,
                    theatrename: this.theatreList[i].theatreName,
                    moviedates: this.dateList,
                    movietiming: this.timeList
                });
            }
            console.log("saved movie collect data" + this.theatreList + this.dateList + this.timeList);

            this.selectMovie= "";
            this.selectCity= "";
            this.theatreList = "";
            this.dateList = [];
            this.timeList = [];
            this.selectTheatre= "";
            this.showDate= "";
            this.showTimings = "";
        }

    }



    angular.module('bwApp')
        .component('moviemapping', {
            templateUrl: 'app/moviemapping/moviemapping.html',
            controller: MoviemappingComponent,
            controllerAs: 'moviemappingCtrl'
        });

})();
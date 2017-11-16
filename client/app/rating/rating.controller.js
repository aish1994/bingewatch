 'use strict';

(function(){

class RatingComponent {
   constructor($http,Auth, $scope, socket, $filter,$location) {
            this.$http = $http;
            this.socket = socket;
            this.$filter = $filter;
            this.awesomeThings = [];
            this.CityName;
            this.what=[];
            this.selectedcityname;
            this.moviedetails;
            this.count=0;
            this.sumRating=0;
            this.movieforRating;
            this.avgRating=0;
            this.movieProperties=[];
             this.getCurrentUser = Auth.getCurrentUser;
            $scope.$on('$destroy', function() {
                socket.unsyncUpdates('ratingendpoint');
            });
           this.avgRating=function(moviename){
          console.log(moviename);
          }
        }

     $onInit() {
           this.$http.get('/api/moviemappingendpoints').then(response => {
                this.mappingdetails = response.data;
                this.socket.syncUpdates('moviemappingendpoint', this.mappingdetails);
        this.$http.get('/api/movieendpoints').then(response => {
          this.moviedetails = response.data;
          this.socket.syncUpdates('movieendpoint', this.moviedetails);
           this.$http.get('/api/ratingendpoints').then(response => {
                this.ratingdetails = response.data;
                this.socket.syncUpdates('ratingendpoint', this.ratingdetails);
            });
        });
               });


          //  for(let x in this.ratingdetails){
        		// if(this.ratingdetails[x].ratedMovie==this.movieforRating){
        		// 	this.count++;
        		// 	this.avgRating=this.avgRating+this.ratingdetails[x].ratingGiven;
        		// }
        		// }
        		// this.avgRating=this.avgRating/this.count;
     

          //  console.log(this.ratingdetails);
          //  console.log(this.moviedetails);
        }

        saveRating(){
          console.log(this.movieforRating)
        	 this.$http.post('/api/ratingendpoints', {
		userName:this.getCurrentUser().name,
		ratedMovie:this.movieforRating,
		ratingGiven:this.rating,
		comments:this.userComment       
        });
        	
       console.log(this.moviedetails);

       for(let m in this.ratingdetails){

        if(this.ratingdetails[m].ratedMovie==this.movieforRating){
          this.count++;
          this.sumRating=this.sumRating+this.ratingdetails[m].ratingGiven;
        }

       }this.avgRating=this.sumRating/this.count;


for(let x in this.moviedetails){
   if(this.moviedetails[x].movietitle==this.movieforRating){
    this.moviedetails[x].avgRating=this.avgRating;
    console.log(this.moviedetails[x]);
this.$http.put('/api/movieendpoints/' +this.moviedetails[x]._id, this.moviedetails[x]).then(response => {
            console.log('Data Updated');
        });
    
}
        }
         this.rating="";
          this.userComment="";
       console.log(" rating data saved");
      }





        selectedMovie(movie){
         this.movieforRating=movie;
         //     if(this.isLoggedIn()){
         //      this.$location.path('/rating');

         // }else {
         //    alert("please login before giving a rating");
         //    this.$location.path('/login');

         // }

        }

     
    //     selectedMovie(movie){
    //       this.movieforRating=movie;
    // for(let x in this.ratingdetails){
    //   console.log(this.ratingdetails[x].ratedMovie);
    //         // if(this.ratingdetails[x].ratedMovie==this.movieforRating){
    //         //   this.count++;
    //         //   this.avgRating=this.avgRating+this.ratingdetails[x].ratingGiven;
    //         // }
    //         // }
    //       }
    //         // this.avgRating=this.avgRating/this.count;
     

    //        console.log(this.ratingdetails);
    //     	}
        	
}

angular.module('bwApp')
  .component('rating', {
    templateUrl: 'app/rating/rating.html',
    controller: RatingComponent,
    controllerAs: 'ratingCtrl',
    authenticate: true
  });

})();

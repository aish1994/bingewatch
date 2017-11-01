'use strict';

(function(){

class MovieComponent {
  constructor($http,$scope,socket) {
    this.$http=$http;
    this.socket=socket;
    this.moviedet;
    this.moviecast;
    this.moviedetails;
    this.cast='';

    $scope.$on('$destroy', function() {
        socket.unsyncUpdates('thing');
      });
  }


     $onInit() {
this.$http.get('/api/movieendpoints').then(response => {
          this.moviedetails = response.data;
          this.socket.syncUpdates('movieendpoint', this.moviedetails);
        });
console.log(this.moviedetails);

}

	FindMovie(){
  	 this.$http.get("https://api.themoviedb.org/3/search/movie?api_key=6202d9feb69d17dcb9a81f0429d76eb2&language=en-US&query="+this.moviename+"&page=1&include_adult=false&year="+this.year)
     .then(response => {
      var movie_id=response.data.results[0].id;
      this.$http.get("https://api.themoviedb.org/3/movie/"+movie_id+"?api_key=6202d9feb69d17dcb9a81f0429d76eb2&language=en-US")
     .then(response => {
      this.moviedet=response.data;
     console.log(response.data);
      this.$http.get("https://api.themoviedb.org/3/movie/"+movie_id+"/credits?api_key=6202d9feb69d17dcb9a81f0429d76eb2")
     .then(castresponse => {
      this.moviecast=castresponse.data;
        for(let m in this.moviecast.crew)
    { 
      if(this.moviecast.crew[m].job=="Director"){
          this.directorname=this.moviecast.crew[m].name;
        }
    }

      console.log(castresponse.data);
  		});
   });
   });
this.moviename="";
this.year="";
}
  AddMovie(){
  
    for(let m in this.moviecast.crew)
    { 
      if(this.moviecast.crew[m].job=="Director"){
          this.directorname=this.moviecast.crew[m].name;
        }
    }

    for(let m in this.moviecast.cast){
      this.cast+=this.moviecast.cast[m].name+",";

    }
    this.$http.post('/api/movieendpoints',{
      poster:this.moviedet.poster_path,
      movietitle:this.moviedet.title,
      moviegenre:this.moviedet.genres,
      starcast:this.cast,
      director:this.directorname,
      language:this.moviedet.spoken_languages,
      duration:this.moviedet.runtime,
    }); 


    }
        

}


angular.module('bwApp')
  .component('movie', {
    templateUrl: 'app/movie/movie.html',
    controller: MovieComponent,
    controllerAs: 'movieCtrl'
  });

})();

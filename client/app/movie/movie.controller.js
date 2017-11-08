'use strict';

(function(){

class MovieComponent {
  constructor($http,$scope,socket) {
    this.$http=$http;
    this.socket=socket;
    this.moviedet;
    this.moviecast;
    this.moviedetails;
    this.TheatreCollection="";
    this.flag=0;

    $scope.$on('$destroy', function() {
        socket.unsyncUpdates('movieendpoint');
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

delmovie(deletemovie){
  this.$http.delete('/api/movieendpoints/' + deletemovie._id);

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


      var movieTitle=_.pluck(this.moviedetails,'movietitle');
      console.log('names from db '+movieTitle);
for(let a in movieTitle){
  console.log(movieTitle[a]);
  if(movieTitle[a]==this.moviedet.title){
    this.flag=0;
    break;
  }
  else {
    this.flag=1;
  }
}
console.log("flag value"+this.flag);
if(this.flag==1){

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
      else{
        alert("hey this movie is already there in your db");
      }



    }
        

}


angular.module('bwApp')
  .component('movie', {
    templateUrl: 'app/movie/movie.html',
    controller: MovieComponent,
    controllerAs: 'movieCtrl'
  });

})();

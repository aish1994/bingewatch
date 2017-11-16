'use strict';

(function(){

class DateshowtimeComponent {
  constructor($http, $scope, socket) {
    this.message = 'Hello';
     this.$http = $http;
     this.socket = socket;
     this.datesofweek=[];
     this.mappingdetails;
     this.finaltheatrelist=[];
      var d = new Date();
    for(var i=0;i<2;i++){
   
    var dd=d.getDate()+i;
    //  var dd=d.setDate(d.dd+i);
    var mm=d.getMonth()+1;
    var yy=d.getFullYear();
    var finaldate=dd+"/"+mm+"/"+yy;
	this.datesofweek.push(finaldate);
    }
    console.log(this.datesofweek);
  $scope.$on('$destroy', function() {
        socket.unsyncUpdates('dateshowtimeendpoint');
      });

  }


  changingdate(){
    var d = new Date();
     var todayd=d.getDate()+i;
    var todaym=d.getMonth()+1;
    var todayy=d.getFullYear();
    var todaysdate=todayd+"/"+todaym+"/"+todayy;
      // var todaysdate=this.datesofweek[0];
      this.datesofweek=[];
       this.$http.get('/api/moviemappingendpoints').then(response => {
      this.mappingdetails = response.data;
      this.socket.syncUpdates('moviemappingendpoint', this.mappingdetails);
});
console.log(this.cityName);
for(let m in this.mappingdetails)
    { 
      if(this.mappingdetails[m].city==this.cityName && this.mappingdetails[m].moviename==this.MovieName){
        for(let s in this.mappingdetails[m].moviedates){
      if(this.mappingdetails[m].moviedates[s]>todaysdate){
        this.datesofweek.push(this.mappingdetails[m].moviedates[s]);
      }
      }
    }
    }
        // for(let x in this.selected.moviedates){
}

    $onInit(){
      if (typeof(Storage) !== undefined) {
        //this.MovieName = sessionStorage.getItem('MovieName');
        this.MovieName = sessionStorage.getItem('selectmymovie');
        this.cityName = sessionStorage.getItem('CityName');
      }
   this.$http.get('/api/moviemappingendpoints').then(response => {
      this.mappingdetails = response.data;
      this.socket.syncUpdates('moviemappingendpoint', this.mappingdetails);
});

      
}
showtime(){
  alert("hi aishwarya");
}

gettheatres(dateselected,movieselected,cityselected){

  console.log(this.cityName);
  this.finaltheatrelist=[];
	this.$http.get('/api/moviemappingendpoints').then(response => {
      this.mappingdetails = response.data;
      this.socket.syncUpdates('moviemappingendpoint', this.mappingdetails);
});
 for(let m in this.mappingdetails)
    { 
      if(this.mappingdetails[m].city==cityselected && this.mappingdetails[m].moviename==movieselected){
        this.selected=this.mappingdetails[m];
       
        for(let x in this.selected.moviedates){
           console.log("checking"+this.selected.moviedates[x]+"with"+dateselected);
          if(this.selected.moviedates[x]==dateselected){
            this.finaltheatrelist.push(this.selected);
         }
         }
        }
       
    }
     if(this.finaltheatrelist==""){
          alert("nothing to display for this date");
        }
    console.log(this.finaltheatrelist);
 if (typeof(Storage) !== undefined) {
        sessionStorage.setItem("showdate", dateselected);
      }
}

savetime(timming,theatreName){
  if (typeof(Storage) !== undefined) {
        sessionStorage.setItem("showtimming",timming);
        sessionStorage.setItem("TName",theatreName);
      }
}
}

angular.module('bwApp')
  .component('dateshowtime', {
    templateUrl: 'app/dateshowtime/dateshowtime.html',
    controller: DateshowtimeComponent,
    controllerAs: 'dateshowtimeCtrl'
  });

})();

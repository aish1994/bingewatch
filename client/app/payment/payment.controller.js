'use strict';

(function(){

class PaymentComponent {
 constructor($http, $scope, socket, $filter) {
            this.$http = $http;
            this.$filter = $filter;
            this.socket = socket;
    this.ph_numbr = /^\+?\d{10}$/;
    this.eml_add = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    $scope.$on('$destroy', function() {
                 socket.unsyncUpdates('paymentendpoint');
             });
  }

  $onInit(){
      if (typeof(Storage) !== undefined) {
        this.MovieName = sessionStorage.getItem('selectmymovie');
        this.cityName = sessionStorage.getItem('CityName');
        this.noofseats=sessionStorage.getItem('noofSeats');
        this.clsname=sessionStorage.getItem('className');
        this.seatslist=JSON.parse(sessionStorage.getItem('SeatsList'));
        this.paymentfee=sessionStorage.getItem('payment');
        this.internetfee=sessionStorage.getItem('internetfee');
        this.total=sessionStorage.getItem('grandtot');
        this.stime=sessionStorage.getItem('showtimming');
        this.sdate=sessionStorage.getItem('showdate');
        this.theatrename=sessionStorage.getItem('TName');
        this.cityName = sessionStorage.getItem('CityName');
      }
      console.log(this.total);
      console.log(this.seatslist);
    }

    storeFinalData(){
      for(let j in this.seatslist){
        this.seatslist[j].booked=true;
      }
      
      this.$http.post('/api/paymentendpoints', {
  bookedCityName:this.cityName,
 bookedTheatreName:this.theatrename,
 bookedMovieName:this.MovieName,
 bookedSeats:this.noofseats,
 bookedClass:this.clsname,
 bookedDate:this.sdate,
 bookedTime:this.stime,
 bookedSeatNumbers:this.seatslist
});

console.log(this.seatslist)
    }
  

}



angular.module('bwApp')
  .component('payment', {
    templateUrl: 'app/payment/payment.html',
    controller: PaymentComponent,
    controllerAs: 'paymentCtrl'
  });

})();

'use strict';

(function(){

class ReceiptComponent {
  constructor($http, $scope, socket, $filter) {
            this.$http = $http;
            this.$filter = $filter;
            this.socket = socket;

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
      }
      console.log(this.total);
      console.log(this.seatslist);
    }
}

angular.module('bwApp')
  .component('receipt', {
    templateUrl: 'app/receipt/receipt.html',
    controller: ReceiptComponent,
    controllerAs: 'receiptCtrl'
  });

})();

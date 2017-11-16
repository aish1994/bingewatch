'use strict';

(function() {

        class SeatingComponent {
            constructor($http,Auth,$location, $scope, socket, $filter) {
                this.$location=$location;
                this.$http = $http;
                this.$filter = $filter;
                this.socket = socket;
                this.flag=0;
                this.quantities = [{
                    id: 1,
                    val: 1
                }, {
                    id: 2,
                    val: 2
                }, {
                    id: 3,
                    val: 3
                }, {
                    id: 4,
                    val: 4
                }, ];
                this.seatQualities = ['Gold', 'Premium'];
                // this.seatQuality = 'Premium';
                // this.selectedCount = this.quantities[1];
                this.seatingGrid = [];
                this.availCount = 0;
                this.selectedSeatList = [];
                this.saveSeats = [];
                this.amountToPay = [];
                this.seatingGrid1 = [];
                this.internetCharge = 0;
                this.ticketCharge = 0;
                this.grandTotal = 0;
                $(document).ready(function() {
                    if ($('#classselect :selected').text() == 'Premium') {

                        $(".gold").addClass("dislink");
                    } else if ($('#classselect :selected').text() == 'Gold') {

                        $(".premium").addClass("dislink");
                    }


                    $('#classselect').on('change', function(e) {
                        console.log(this.selectedSeatList);
                        var optionSelected = $("option:selected", this);
                        console.log(optionSelected.text());
                        if (optionSelected.text() == 'Premium') {
                            // $(".gold").addClass("blocked");  
                            $(".gold").addClass("dislink");
                            $(".premium").removeClass("dislink");
                        } else if (optionSelected.text() == 'Gold') {
                            // $(".premium").addClass("block");
                            $(".premium").addClass("dislink");
                            $(".gold").removeClass("dislink");
                        }


                    });
                    // $("#pre").addClass("blocked");     
                });
                $scope.$on('$destroy', function() {
                 socket.unsyncUpdates('seatingendpoint');
             });
         }
            $onInit(){
                if (typeof(Storage) !== undefined) {
                    this.MovieName = sessionStorage.getItem('selectmymovie');
                    this.cityName = sessionStorage.getItem('CityName');
                    this.stime = sessionStorage.getItem('showtimming');
                    this.sdate = sessionStorage.getItem('showdate');
                    this.theatrename = sessionStorage.getItem('TName');
                    this.seatQuality = sessionStorage.getItem('className');
                }

                this.$http.get('/api/paymentendpoints').then(response => {
                    this.paymentdetails = response.data;
                    this.socket.syncUpdates('paymentendpoint',this.paymentdetails);
                });
        
                for (let m in this.paymentdetails) {
                    if (this.paymentdetails[m].bookedCityName == this.cityName && this.paymentdetails[m].bookedTheatreName == this.theatrename && this.paymentdetails[m].bookedMovieName == this.MovieName && this.paymentdetails[m].bookedDate == this.sdate && this.paymentdetails[m].bookedTime == this.stime) {
                        console.log(this.paymentdetails[m].bookedSeatNumbers);
                        for (let x in this.paymentdetails[m].bookedSeatNumbers) {
                            console.log(this.paymentdetails[m].bookedSeatNumbers[x]);
                            this.saveSeats.push(this.paymentdetails[m].bookedSeatNumbers[x]);
                        }
                    }
                }
                console.log(this.saveSeats);
                // this.seatingGrid = this.drawSeats(65, 3, 15);

                //  this.seatingGrid1 = this.drawSeats(68, 3, 15);

            }
            // setAvailCount(selectedCount) {

            // }

            drawSeats(startLetter, rows, cols,gridnum) {
                this.$http.get('/api/paymentendpoints').then(response => {
                    this.paymentdetails = response.data;
                    this.socket.syncUpdates('paymentendpoint',this.paymentdetails);
                });
        
                for (let m in this.paymentdetails) {
                    if (this.paymentdetails[m].bookedCityName == this.cityName && this.paymentdetails[m].bookedTheatreName == this.theatrename && this.paymentdetails[m].bookedMovieName == this.MovieName && this.paymentdetails[m].bookedDate == this.sdate && this.paymentdetails[m].bookedTime == this.stime) {
                        console.log(this.paymentdetails[m].bookedSeatNumbers);
                        for (let x in this.paymentdetails[m].bookedSeatNumbers) {
                            console.log(this.paymentdetails[m].bookedSeatNumbers[x]);
                            this.saveSeats.push(this.paymentdetails[m].bookedSeatNumbers[x]);
                        }
                    }
                }
                console.log(this.saveSeats);
                var rowArray = [],
                    columnArray = [];
                for (var i = 0, k = startLetter; i < rows; i++, k++) {
                    for (var j = 1; j <= cols; j++) {
                        label:
                        for (let m in this.saveSeats) {
                             var a = String.fromCharCode(k);
                             //console.log(a);
                            if (this.saveSeats[m].val == j && this.saveSeats[m].letter == a){
                                //alert("hi");
                                    columnArray.push({
                                        val: j,
                                        letter: String.fromCharCode(k),
                                        check: true,
                                        booked: true,
                                    });
                                    this.flag=1;
                                    break label;

                                }
                                 
                            } if(this.flag==0){
                                    columnArray.push({
                                        val: j,
                                        letter: String.fromCharCode(k),
                                        check: false,
                                        booked: false,
                                    });
                                }
                                this.flag=0;
                                
                            }
                            //console.log(this.flag);
                            //console.log(this.seatingGrid);
                            rowArray.push(columnArray);
                            columnArray = [];
                        }
                        if(gridnum==1){
                            console.log("one");
                       this.seatingGrid.push(rowArray);
                       console.log(this.seatingGrid);
                   }else if(gridnum==2){
                     console.log("two");
                    this.seatingGrid1.push(rowArray);
                    console.log(this.seatingGrid1);
                   }
                    }
                
        
            


                    selectSeats(row, col, count) {
                        if (!col.booked && !this.isDisabled) {
                            console.log(col.check);
                            if (col.check) {
                                console.log("daskhjd");
                                col.check = false;
                                this.availCount--;
                                this.selectedSeatListRemove(col);

                            } else if (this.availCount < this.selectedCount.val) {
                                this.internetCharge = 0;
                                this.ticketCharge = 0;
                                this.grandTotal = 0;
                                col.check = true;
                                this.availCount++;
                                this.selectedSeatList.push(col);
                                for (let m in this.selectedSeatList) {
                                    this.ticketCharge += 200;
                                    this.internetCharge += 50;
                                    this.grandTotal = this.ticketCharge + this.internetCharge;
                                }
                                console.log(this.selectedSeatList);

                            } else if (this.availCount === this.selectedCount.val) {
                                alert("You can't select more seats");
                            }
                        }
                    }
                    selectedSeatListRemove(col) {
                        var index = this.selectedSeatList.indexOf(col);
                        this.selectedSeatList.splice(index, 1);

                        this.ticketCharge -= 200;
                        this.internetCharge -= 50;
                        this.grandTotal = this.ticketCharge + this.internetCharge;

                    }

                    showQuality(seat) {
                  
                        for (let m in this.selectedSeatList) {
                            this.selectedSeatList[m].check = false;
                        }
                        this.selectedSeatList = [];
                        // this.selectedSeatList.splice(0,this.selectedSeatList.length);
                        this.availCount = 0;
                        // console.log(this.selectedCount.val);



                    }

                    storeSeat() {
                        if(this.selectedSeatList==""){
                            alert("please select your seats before you proceed");
                            this.$location.path('/seating');
                        }else{
                            this.$location.path('/payment');
                        }
                        if (typeof(Storage) !== undefined) {
                            sessionStorage.setItem("className", this.seatQuality);
                            sessionStorage.setItem("noofSeats", this.selectedCount.val);
                            sessionStorage.setItem("SeatsList", JSON.stringify(this.selectedSeatList));
                            sessionStorage.setItem("payment", this.ticketCharge);
                            sessionStorage.setItem("internetfee", this.internetCharge);
                            sessionStorage.setItem("grandtot", this.grandTotal);

                        }

                    }



                }

                angular.module('bwApp')
                    .component('seating', {
                        templateUrl: 'app/seating/seating.html',
                        controller: SeatingComponent,
                        controllerAs: 'seatingCtrl'
                    });

            })();
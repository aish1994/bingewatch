'use strict';

import mongoose from 'mongoose';
 
var PaymentendpointSchema = new mongoose.Schema({
 bookedCityName:String,
 bookedTheatreName:String,
 bookedMovieName:String,
 bookedSeats:Number,
 bookedClass:String,
 bookedDate:String,
 bookedTime:String,
 bookedSeatNumbers:Array,
});

export default mongoose.model('Paymentendpoint', PaymentendpointSchema);

'use strict';

import mongoose from 'mongoose';

var MovieendpointSchema = new mongoose.Schema({
 poster:String,
 movietitle:String,
 moviegenre:Array,
 starcast:String,
 director:String,
 language:Array,
 duration:Number,
 avgRating:Number
});

export default mongoose.model('movie', MovieendpointSchema);

'use strict';

import mongoose from 'mongoose';

var RatingendpointSchema = new mongoose.Schema({
userName:String,
ratedMovie:String,
ratingGiven:Number,
comments:String,
});

export default mongoose.model('Rating', RatingendpointSchema);

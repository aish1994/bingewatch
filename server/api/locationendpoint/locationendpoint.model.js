'use strict';

import mongoose from 'mongoose';

var LocationendpointSchema = new mongoose.Schema({
 	theatre_name:String,
	theatre_city:String,
	address:String
});

export default mongoose.model('theatre', LocationendpointSchema);

'use strict';

import mongoose from 'mongoose';

var MoviemappingendpointSchema = new mongoose.Schema({
  moviename: String,
  city: String,
  theatrename: String,
  moviedates:Array,
  movietiming:Array
});

export default mongoose.model('Moviemapping', MoviemappingendpointSchema);

'use strict';

import mongoose from 'mongoose';

var DateshowtimeendpointSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Dateshowtimeendpoint', DateshowtimeendpointSchema);

'use strict';

import mongoose from 'mongoose';

var ReceiptendpointSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Receiptendpoint', ReceiptendpointSchema);

const mongoose = require('mongoose');

const TWSECodeSchema = new mongoose.Schema({
  data: Array,
}, { versionKey: false });

const TWSECode = mongoose.model('TWSECode', TWSECodeSchema);

module.exports = TWSECode;

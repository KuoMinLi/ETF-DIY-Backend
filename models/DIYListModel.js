const mongoose = require('mongoose');
const DIYListSchema = new mongoose.Schema({
  userid : { 
    type: mongoose.Schema.ObjectId, 
    ref: 'users' 
  },
  name: String,
}, { versionKey: false }
);

const DIYList = mongoose.model('DIYList', DIYListSchema);

module.exports = DIYList ;
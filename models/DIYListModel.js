const mongoose = require('mongoose');
const DIYListSchema = new mongoose.Schema({
  userid : { 
    type: mongoose.Schema.ObjectId, 
    ref: 'users' 
  },
  name: String,
  content: [
    { 
      name:{
        type: String,
        required: [true, '請輸入正確資料']
      },
      code: {
        type: String,
        required: [true, '請輸入正確資料']
      },
      percentage: {
        type: Number,
        required: [true, '請輸入正確資料']
      },
    }
  ]
}, { versionKey: false }
);

const DIYList = mongoose.model('DIYList', DIYListSchema);

module.exports = DIYList ;
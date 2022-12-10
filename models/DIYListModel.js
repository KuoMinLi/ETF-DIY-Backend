const mongoose = require('mongoose');

const DIYListSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
    required: [true, '請輸入自組ETF的名字'],
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  content: [
    {
      name: {
        type: String,
        required: [true, '請輸入正確股票名稱'],
      },
      code: {
        type: String,
        required: [true, '請輸入正確股票代號'],
      },
      percentage: {
        type: Number,
        required: [true, '請輸入正確權重'],
      },
    },
  ],
}, { versionKey: false });

const DIYList = mongoose.model('DIYList', DIYListSchema);

module.exports = DIYList;

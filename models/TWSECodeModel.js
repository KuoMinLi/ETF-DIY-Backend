const mongoose = require('mongoose');

const TWSECodeSchema = new mongoose.Schema({
  contnet: [
    {
      industry: {
        type: String,
        required: [true, '請輸入正確產業名稱'],
      },
      name: {
        type: String,
        required: [true, '請輸入正確股票名稱'],
      },
      code: {
        type: String,
        required: [true, '請輸入正確股票代號'],
      },
    },
  ],
}, { versionKey: false });

const TWSECode = mongoose.model('TWSECode', TWSECodeSchema);

module.exports = TWSECode;

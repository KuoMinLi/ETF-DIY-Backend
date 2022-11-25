const mongoose = require('mongoose');

const ETFListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '請輸入ETF名稱'],
  },
  code: {
    type: String,
    required: [true, '請輸入ETF代號'],
  },
  category: {
    type: String,
    enum: ['指數型', '高股息', '低波動', '主題型', '其他'],
    required: [true, '請輸入ETF類別'],
  },
  custodyFee: {
    type: Number,
    required: [true, '請輸入ETF保管費'],
  },
  managementFee: {
    type: Number,
    required: [true, '請輸入ETF管理費'],
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

const ETFList = mongoose.model('ETFList', ETFListSchema);

module.exports = ETFList;

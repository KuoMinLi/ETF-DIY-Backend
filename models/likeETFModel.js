const mongoose = require('mongoose');

const LikeETFSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.ObjectId,
    ref: 'users',
  },
  ETFid: {
    type: mongoose.Schema.ObjectId,
    ref: 'ETFList',
  },
}, { versionKey: false });

const likeETF = mongoose.model('likeETF', LikeETFSchema);

module.exports = likeETF;

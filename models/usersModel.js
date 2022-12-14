const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '請輸入您的名字'],
  },
  email: {
    type: String,
    required: [true, '請輸入您的 Email'],
    unique: true,
    lowercase: true,
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  sex: {
    type: String,
    enum: ['male', 'female'],
  },
  password: {
    type: String,
    required: [true, '請輸入密碼'],
    minlength: 8,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, { versionKey: false });
// User
const User = mongoose.model('user', userSchema);

module.exports = User;

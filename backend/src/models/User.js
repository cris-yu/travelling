const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  openId: {
    type: String,
    required: true,
    unique: true
  },
  nickName: String,
  avatarUrl: String,
  phone: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

userSchema.index({ openId: 1 });

module.exports = mongoose.model('User', userSchema);

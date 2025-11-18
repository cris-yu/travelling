const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNo: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  openId: {
    type: String,
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  productTitle: {
    type: String,
    required: true
  },
  travelDate: {
    type: Date,
    required: true
  },
  travelers: [{
    name: {
      type: String,
      required: true
    },
    idCard: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    age: Number,
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String
    }
  }],
  contactName: {
    type: String,
    required: true
  },
  contactPhone: {
    type: String,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid', 'refunded'],
    default: 'unpaid'
  },
  meetingTime: String,
  meetingPoint: String,
  guideName: String,
  guidePhone: String,
  latitude: Number,
  longitude: Number,
  notes: String
}, {
  timestamps: true
});

// 索引
orderSchema.index({ orderNo: 1 });
orderSchema.index({ openId: 1, status: 1 });
orderSchema.index({ productId: 1 });
orderSchema.index({ travelDate: 1 });

module.exports = mongoose.model('Order', orderSchema);

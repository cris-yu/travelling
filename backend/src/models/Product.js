const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '请输入产品标题'],
    trim: true,
    maxlength: [100, '标题不能超过100个字符']
  },
  description: {
    type: String,
    required: [true, '请输入产品描述'],
    maxlength: [500, '描述不能超过500个字符']
  },
  location: {
    type: String,
    required: [true, '请输入目的地'],
    enum: ['北京', '天津', '河北承德', '河北秦皇岛']
  },
  price: {
    type: Number,
    required: [true, '请输入价格'],
    min: [0, '价格不能为负数']
  },
  ageRange: {
    type: String,
    default: '50-70岁'
  },
  intensity: {
    type: String,
    required: true,
    enum: ['轻松', '适中', '较强']
  },
  intensityColor: {
    type: String,
    default: '#52c41a'
  },
  imageUrl: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: [true, '请输入行程天数']
  },
  groupSize: {
    type: String,
    default: '20-30人'
  },
  tags: [{
    type: String
  }],
  highlights: [{
    type: String
  }],
  medicalSupport: {
    hasDoctor: {
      type: Boolean,
      default: true
    },
    emergencyMeasures: String,
    nearbyHospitals: [String]
  },
  transportation: {
    type: {
      type: String,
      default: '豪华旅游大巴'
    },
    seatArrangement: String,
    features: [String]
  },
  itinerary: [{
    time: String,
    location: String,
    activity: String
  }],
  meetingPoint: {
    address: {
      type: String,
      required: true
    },
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'soldout'],
    default: 'active'
  },
  availableSeats: {
    type: Number,
    default: 30
  }
}, {
  timestamps: true
});

// 索引
productSchema.index({ location: 1, status: 1 });
productSchema.index({ intensity: 1 });
productSchema.index({ price: 1 });

module.exports = mongoose.model('Product', productSchema);

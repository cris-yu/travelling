// pages/detail/detail.js
const { mockProducts } = require('../../utils/data.js');
const util = require('../../utils/util.js');

Page({
  data: {
    product: null,
    intensityColor: '',
    intensityDesc: ''
  },

  onLoad(options) {
    const id = parseInt(options.id);
    const product = mockProducts.find(p => p.id === id);
    
    if (product) {
      this.setData({
        product,
        intensityColor: util.getIntensityColor(product.intensity),
        intensityDesc: util.getIntensityDesc(product.intensity)
      });
    } else {
      wx.showToast({
        title: '产品不存在',
        icon: 'none'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }
  },

  goToBooking() {
    wx.navigateTo({
      url: `/pages/booking/booking?id=${this.data.product.id}`
    });
  },

  onShareAppMessage() {
    return {
      title: this.data.product.title,
      path: `/pages/detail/detail?id=${this.data.product.id}`
    };
  }
})

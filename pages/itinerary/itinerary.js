// pages/itinerary/itinerary.js
const { mockProducts } = require('../../utils/data.js');
const util = require('../../utils/util.js');

Page({
  data: {
    order: null,
    product: null
  },

  onLoad(options) {
    const app = getApp();
    const order = app.globalData.orders.find(o => o.id === options.orderId);
    const product = mockProducts.find(p => p.id === order.productId);
    
    this.setData({ order, product });
  },

  callGuide() {
    util.makePhoneCall(this.data.order.guidePhone);
  },

  openNavigation() {
    const { latitude, longitude, meetingPoint } = this.data.order;
    util.openMap(latitude, longitude, meetingPoint, '集合地点');
  },

  callEmergency(e) {
    const phone = e.currentTarget.dataset.phone;
    util.makePhoneCall(phone);
  },

  onShareAppMessage() {
    return {
      title: `${this.data.order.productTitle} - 行程详情`,
      path: `/pages/itinerary/itinerary?orderId=${this.data.order.id}`
    };
  }
})

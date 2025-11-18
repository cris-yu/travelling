// pages/orders/orders.js
const util = require('../../utils/util.js');

Page({
  data: {
    orders: []
  },

  onLoad() {
    const app = getApp();
    this.setData({
      orders: app.globalData.orders
    });
  },

  onShow() {
    // 每次显示时刷新数据
    const app = getApp();
    this.setData({
      orders: app.globalData.orders
    });
  },

  callGuide(e) {
    const phone = e.currentTarget.dataset.phone;
    util.makePhoneCall(phone);
  },

  callEmergency(e) {
    const phone = e.currentTarget.dataset.phone;
    wx.showModal({
      title: '紧急联系',
      content: `确认拨打紧急联系人 ${phone} ？`,
      confirmText: '拨打',
      success: (res) => {
        if (res.confirm) {
          util.makePhoneCall(phone);
        }
      }
    });
  },

  openNavigation(e) {
    const { latitude, longitude, address } = e.currentTarget.dataset;
    util.openMap(latitude, longitude, address);
  },

  shareItinerary(e) {
    const index = e.currentTarget.dataset.index;
    const order = this.data.orders[index];
    util.shareItinerary(order);
  },

  viewItinerary(e) {
    const orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/itinerary/itinerary?orderId=${orderId}`
    });
  },

  goToHome() {
    wx.reLaunch({
      url: '/pages/index/index'
    });
  },

  onShareAppMessage() {
    return {
      title: '我的行程',
      path: '/pages/orders/orders'
    };
  }
})

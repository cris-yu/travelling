// pages/booking/booking.js
const { mockProducts } = require('../../utils/data.js');
const util = require('../../utils/util.js');

Page({
  data: {
    product: null,
    travelDate: '',
    travelers: [{ name: '', idCard: '', phone: '', relation: '' }],
    contactName: '',
    contactPhone: ''
  },

  onLoad(options) {
    const id = parseInt(options.id);
    const product = mockProducts.find(p => p.id === id);
    this.setData({ product });
  },

  onDateChange(e) {
    this.setData({
      travelDate: e.detail.value
    });
  },

  onTravelerChange(e) {
    const { field, index } = e.currentTarget.dataset;
    const value = e.detail.value;
    const travelers = this.data.travelers;
    travelers[index][field] = value;
    this.setData({ travelers });
  },

  addTraveler() {
    const travelers = this.data.travelers;
    travelers.push({ name: '', idCard: '', phone: '', relation: '' });
    this.setData({ travelers });
  },

  removeTraveler(e) {
    if (this.data.travelers.length === 1) {
      util.showError('至少需要一位出行人');
      return;
    }
    const index = e.currentTarget.dataset.index;
    const travelers = this.data.travelers;
    travelers.splice(index, 1);
    this.setData({ travelers });
  },

  onContactNameInput(e) {
    this.setData({ contactName: e.detail.value });
  },

  onContactPhoneInput(e) {
    this.setData({ contactPhone: e.detail.value });
  },

  submitOrder() {
    const { product, travelDate, travelers, contactName, contactPhone } = this.data;

    // 验证
    if (!travelDate) {
      util.showError('请选择出行日期');
      return;
    }

    for (let i = 0; i < travelers.length; i++) {
      const t = travelers[i];
      if (!t.name || !t.idCard || !t.phone) {
        util.showError(`请完整填写第${i + 1}位出行人信息`);
        return;
      }
      if (!util.validateIdCard(t.idCard)) {
        util.showError(`第${i + 1}位出行人身份证号格式不正确`);
        return;
      }
      if (!util.validatePhone(t.phone)) {
        util.showError(`第${i + 1}位出行人手机号格式不正确`);
        return;
      }

      const ageCheck = util.checkAgeRange(t.idCard);
      if (!ageCheck.valid) {
        wx.showModal({
          title: '年龄提示',
          content: `第${i + 1}位出行人：${ageCheck.message}，是否继续预订？`,
          success: (res) => {
            if (!res.confirm) return;
          }
        });
      }
    }

    if (!contactName || !contactPhone) {
      util.showError('请填写联系人信息');
      return;
    }

    if (!util.validatePhone(contactPhone)) {
      util.showError('联系电话格式不正确');
      return;
    }

    // 生成订单
    const app = getApp();
    const order = {
      id: util.generateOrderNo(),
      productId: product.id,
      productTitle: product.title,
      status: 'confirmed',
      bookingDate: new Date().toISOString().split('T')[0],
      travelDate,
      travelers,
      totalPrice: product.price * travelers.length,
      meetingTime: product.itinerary[0].time,
      meetingPoint: product.meetingPoint.address,
      guidePhone: '138-0000-1234',
      guideName: '李导游',
      latitude: product.meetingPoint.latitude,
      longitude: product.meetingPoint.longitude
    };

    app.globalData.orders.unshift(order);
    
    util.showSuccess('预订成功！');
    setTimeout(() => {
      wx.switchTab({
        url: '/pages/orders/orders'
      });
    }, 1500);
  }
})

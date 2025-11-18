// app.js
App({
  globalData: {
    userInfo: null,
    orders: [
      {
        id: 'ORDER001',
        productId: 1,
        productTitle: '北京故宫一日游',
        status: 'confirmed',
        bookingDate: '2024-11-15',
        travelDate: '2024-11-25',
        travelers: [
          { name: '张大明', idCard: '110***********1234', phone: '138****5678', relation: '父亲' }
        ],
        totalPrice: 299,
        meetingTime: '08:00',
        meetingPoint: '北京市东城区王府井大街100号',
        guidePhone: '138-0000-1234',
        guideName: '李导游',
        latitude: 39.9163,
        longitude: 116.4079
      }
    ]
  },

  onLaunch() {
    // 小程序启动时执行
    console.log('夕阳红旅游小程序启动');
  }
})

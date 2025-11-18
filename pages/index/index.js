// pages/index/index.js
const { mockProducts } = require('../../utils/data.js');
const util = require('../../utils/util.js');

Page({
  data: {
    searchText: '',
    selectedLocation: '全部',
    selectedIntensity: '全部',
    locations: ['全部', '北京', '天津', '河北承德', '河北秦皇岛'],
    intensityLevels: ['全部', '轻松', '适中'],
    allProducts: [],
    filteredProducts: []
  },

  onLoad() {
    // 加载产品数据并添加颜色属性
    const products = mockProducts.map(p => ({
      ...p,
      intensityColor: util.getIntensityColor(p.intensity)
    }));
    
    this.setData({
      allProducts: products,
      filteredProducts: products
    });
  },

  // 搜索输入
  onSearchInput(e) {
    this.setData({
      searchText: e.detail.value
    }, () => {
      this.filterProducts();
    });
  },

  // 选择目的地
  selectLocation(e) {
    const location = e.currentTarget.dataset.location;
    this.setData({
      selectedLocation: location
    }, () => {
      this.filterProducts();
    });
  },

  // 选择体力强度
  selectIntensity(e) {
    const intensity = e.currentTarget.dataset.intensity;
    this.setData({
      selectedIntensity: intensity
    }, () => {
      this.filterProducts();
    });
  },

  // 筛选产品
  filterProducts() {
    const { allProducts, searchText, selectedLocation, selectedIntensity } = this.data;
    
    const filtered = allProducts.filter(product => {
      const matchLocation = selectedLocation === '全部' || product.location === selectedLocation;
      const matchIntensity = selectedIntensity === '全部' || product.intensity === selectedIntensity;
      const matchSearch = !searchText || 
        product.title.includes(searchText) || 
        product.description.includes(searchText);
      
      return matchLocation && matchIntensity && matchSearch;
    });

    this.setData({
      filteredProducts: filtered
    });
  },

  // 跳转到详情页
  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    });
  },

  showUserMenu() {
    const app = getApp();
    const userInfo = app.globalData.userInfo;
    
    const itemList = userInfo 
      ? [`当前用户：${userInfo.name || userInfo.phone}`, '退出登录']
      : ['去登录'];

    wx.showActionSheet({
      itemList,
      success: (res) => {
        if (userInfo && res.tapIndex === 1) {
          // 退出登录
          wx.showModal({
            title: '确认退出',
            content: '确定要退出登录吗？',
            success: (modalRes) => {
              if (modalRes.confirm) {
                app.logout();
              }
            }
          });
        } else if (!userInfo && res.tapIndex === 0) {
          // 去登录
          wx.reLaunch({
            url: '/pages/login/login'
          });
        }
      }
    });
  },

  // 分享配置
  onShareAppMessage() {
    return {
      title: '夕阳红旅游 - 中老年专属跟团游',
      path: '/pages/index/index'
    };
  }
})

// 工具函数 - 微信小程序版本

// 格式化价格
const formatPrice = (price) => {
  return `¥${price.toFixed(0)}`;
};

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}年${month}月${day}日`;
};

// 获取体力强度颜色
const getIntensityColor = (intensity) => {
  const colors = {
    '轻松': '#52c41a',
    '适中': '#faad14',
    '较强': '#ff4d4f'
  };
  return colors[intensity] || '#1677ff';
};

// 获取体力强度描述
const getIntensityDesc = (intensity) => {
  const desc = {
    '轻松': '适合所有老年人，行走距离短，休息时间充足',
    '适中': '需要一定体力，行程安排合理，有充足休息',
    '较强': '需要较好体力，建议身体健康无慢性病者参加'
  };
  return desc[intensity] || '';
};

// 拨打电话 - 微信小程序API
const makePhoneCall = (phoneNumber) => {
  wx.makePhoneCall({
    phoneNumber: phoneNumber,
    fail: (err) => {
      wx.showToast({
        title: '拨打失败',
        icon: 'none'
      });
    }
  });
};

// 打开地图导航 - 微信小程序API
const openMap = (latitude, longitude, address, name = '集合地点') => {
  wx.openLocation({
    latitude: latitude,
    longitude: longitude,
    name: name,
    address: address,
    scale: 15,
    fail: (err) => {
      wx.showToast({
        title: '打开地图失败',
        icon: 'none'
      });
    }
  });
};

// 分享行程 - 小程序分享
const shareItinerary = (order) => {
  const shareText = `【行程信息】
产品：${order.productTitle}
出行日期：${formatDate(order.travelDate)}
集合时间：${order.meetingTime}
集合地点：${order.meetingPoint}
导游电话：${order.guidePhone}`;

  wx.setClipboardData({
    data: shareText,
    success: () => {
      wx.showToast({
        title: '行程信息已复制',
        icon: 'success'
      });
    }
  });
};

// 验证身份证号
const validateIdCard = (idCard) => {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(idCard);
};

// 验证手机号
const validatePhone = (phone) => {
  const reg = /^1[3-9]\d{9}$/;
  return reg.test(phone);
};

// 计算年龄
const calculateAge = (idCard) => {
  if (!idCard || idCard.length < 14) return null;
  
  let birthYear, birthMonth, birthDay;
  
  if (idCard.length === 15) {
    birthYear = '19' + idCard.substring(6, 8);
    birthMonth = idCard.substring(8, 10);
    birthDay = idCard.substring(10, 12);
  } else {
    birthYear = idCard.substring(6, 10);
    birthMonth = idCard.substring(10, 12);
    birthDay = idCard.substring(12, 14);
  }
  
  const birthday = new Date(birthYear, birthMonth - 1, birthDay);
  const today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  const monthDiff = today.getMonth() - birthday.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
    age--;
  }
  
  return age;
};

// 检查年龄是否在范围内
const checkAgeRange = (idCard, minAge = 50, maxAge = 70) => {
  const age = calculateAge(idCard);
  if (!age) return { valid: false, message: '无法识别年龄' };
  
  if (age < minAge || age > maxAge) {
    return { 
      valid: false, 
      message: `当前年龄${age}岁，本产品适合${minAge}-${maxAge}岁用户` 
    };
  }
  
  return { valid: true, age };
};

// 生成订单号
const generateOrderNo = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `ORDER${timestamp}${random}`;
};

// 获取订单状态文本
const getOrderStatusText = (status) => {
  const statusMap = {
    'pending': '待支付',
    'confirmed': '已确认',
    'completed': '已完成',
    'cancelled': '已取消'
  };
  return statusMap[status] || '未知状态';
};

// 获取订单状态颜色
const getOrderStatusColor = (status) => {
  const colorMap = {
    'pending': '#faad14',
    'confirmed': '#52c41a',
    'completed': '#1677ff',
    'cancelled': '#999'
  };
  return colorMap[status] || '#999';
};

// 显示加载提示
const showLoading = (title = '加载中...') => {
  wx.showLoading({
    title: title,
    mask: true
  });
};

// 隐藏加载提示
const hideLoading = () => {
  wx.hideLoading();
};

// 显示成功提示
const showSuccess = (title) => {
  wx.showToast({
    title: title,
    icon: 'success',
    duration: 2000
  });
};

// 显示错误提示
const showError = (title) => {
  wx.showToast({
    title: title,
    icon: 'none',
    duration: 2000
  });
};

module.exports = {
  formatPrice,
  formatDate,
  getIntensityColor,
  getIntensityDesc,
  makePhoneCall,
  openMap,
  shareItinerary,
  validateIdCard,
  validatePhone,
  calculateAge,
  checkAgeRange,
  generateOrderNo,
  getOrderStatusText,
  getOrderStatusColor,
  showLoading,
  hideLoading,
  showSuccess,
  showError
};

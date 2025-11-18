// 工具函数

// 格式化价格
export const formatPrice = (price) => {
  return `¥${price.toFixed(0)}`;
};

// 格式化日期
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}年${month}月${day}日`;
};

// 格式化时间
export const formatTime = (timeString) => {
  return timeString;
};

// 获取体力强度颜色
export const getIntensityColor = (intensity) => {
  const colors = {
    '轻松': '#52c41a',
    '适中': '#faad14',
    '较强': '#ff4d4f'
  };
  return colors[intensity] || '#1677ff';
};

// 获取体力强度描述
export const getIntensityDesc = (intensity) => {
  const desc = {
    '轻松': '适合所有老年人，行走距离短，休息时间充足',
    '适中': '需要一定体力，行程安排合理，有充足休息',
    '较强': '需要较好体力，建议身体健康无慢性病者参加'
  };
  return desc[intensity] || '';
};

// 拨打电话
export const makePhoneCall = (phoneNumber) => {
  window.location.href = `tel:${phoneNumber}`;
};

// 打开地图导航
export const openMap = (latitude, longitude, address) => {
  // 尝试打开不同的地图应用
  const mapUrls = [
    `https://uri.amap.com/marker?position=${longitude},${latitude}&name=${encodeURIComponent(address)}`, // 高德地图
    `https://apis.map.qq.com/uri/v1/marker?marker=coord:${latitude},${longitude};title:${encodeURIComponent(address)}`, // 腾讯地图
    `http://api.map.baidu.com/marker?location=${latitude},${longitude}&title=${encodeURIComponent(address)}&output=html` // 百度地图
  ];
  
  window.location.href = mapUrls[0]; // 默认使用高德地图
};

// 分享行程
export const shareItinerary = (order) => {
  const shareText = `
【行程信息】
产品：${order.productTitle}
出行日期：${formatDate(order.travelDate)}
集合时间：${order.meetingTime}
集合地点：${order.meetingPoint}
导游电话：${order.guidePhone}
  `.trim();

  if (navigator.share) {
    navigator.share({
      title: '行程分享',
      text: shareText
    }).catch(err => console.log('分享失败', err));
  } else {
    // 降级方案：复制到剪贴板
    navigator.clipboard.writeText(shareText).then(() => {
      alert('行程信息已复制到剪贴板');
    });
  }
};

// 验证身份证号（简单验证）
export const validateIdCard = (idCard) => {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(idCard);
};

// 验证手机号
export const validatePhone = (phone) => {
  const reg = /^1[3-9]\d{9}$/;
  return reg.test(phone);
};

// 计算年龄
export const calculateAge = (idCard) => {
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
export const checkAgeRange = (idCard, minAge = 50, maxAge = 70) => {
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
export const generateOrderNo = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `ORDER${timestamp}${random}`;
};

// 获取订单状态文本
export const getOrderStatusText = (status) => {
  const statusMap = {
    'pending': '待支付',
    'confirmed': '已确认',
    'completed': '已完成',
    'cancelled': '已取消'
  };
  return statusMap[status] || '未知状态';
};

// 获取订单状态颜色
export const getOrderStatusColor = (status) => {
  const colorMap = {
    'pending': '#faad14',
    'confirmed': '#52c41a',
    'completed': '#1677ff',
    'cancelled': '#999'
  };
  return colorMap[status] || '#999';
};

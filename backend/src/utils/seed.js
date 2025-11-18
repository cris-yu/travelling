require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const seedProducts = [
  {
    title: '北京故宫一日游',
    location: '北京',
    price: 299,
    ageRange: '50-70岁',
    intensity: '轻松',
    intensityColor: '#52c41a',
    imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI0ZGNkI2QiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjM2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuWMl+S6rOaVhOWurTwvdGV4dD48L3N2Zz4=',
    description: '探访中华文化瑰宝，感受皇家气派',
    duration: '1天',
    groupSize: '20-30人',
    tags: ['文化古迹', '无购物', '含午餐'],
    highlights: [
      '专业导游全程讲解',
      '避开高峰期游览',
      '无强制购物',
      '含营养午餐'
    ],
    medicalSupport: {
      hasDoctor: true,
      emergencyMeasures: '随队配备专业医护人员，携带急救药品',
      nearbyHospitals: ['协和医院', '北京医院']
    },
    transportation: {
      type: '豪华大巴',
      seatArrangement: '2+1座椅，宽敞舒适',
      features: ['空调', 'WiFi', '饮用水']
    },
    itinerary: [
      { time: '08:00', location: '集合地点', activity: '指定地点集合，发放物资' },
      { time: '09:00', location: '故宫午门', activity: '开始参观故宫博物院' },
      { time: '12:00', location: '特色餐厅', activity: '享用营养午餐' },
      { time: '14:00', location: '天安门广场', activity: '游览天安门广场' },
      { time: '16:00', location: '返程', activity: '乘车返回' }
    ],
    meetingPoint: {
      address: '北京市东城区王府井大街100号',
      latitude: 39.9163,
      longitude: 116.4079
    },
    status: 'active',
    availableSeats: 30
  },
  {
    title: '天津古文化街一日游',
    location: '天津',
    price: 199,
    ageRange: '50-70岁',
    intensity: '轻松',
    intensityColor: '#52c41a',
    imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzRFQ0RDNCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjMyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuWkqea0peWPpOaWh+WMluihoTwvdGV4dD48L3N2Zz4=',
    description: '品味津门文化，体验民俗风情',
    duration: '1天',
    groupSize: '20-30人',
    tags: ['民俗文化', '特色美食', '含午餐'],
    highlights: [
      '游览古文化街',
      '品尝天津特色小吃',
      '参观意式风情区',
      '轻松休闲行程'
    ],
    medicalSupport: {
      hasDoctor: true,
      emergencyMeasures: '配备医护人员及常用药品',
      nearbyHospitals: ['天津市第一中心医院', '天津医科大学总医院']
    },
    transportation: {
      type: '舒适旅游大巴',
      seatArrangement: '宽敞座椅，腿部空间充足',
      features: ['空调', '饮用水', '卫生间']
    },
    itinerary: [
      { time: '07:30', location: '集合地点', activity: '指定地点集合出发' },
      { time: '09:30', location: '古文化街', activity: '游览古文化街，自由活动' },
      { time: '12:00', location: '特色餐厅', activity: '品尝天津特色美食' },
      { time: '14:00', location: '意式风情区', activity: '游览意式风情区' },
      { time: '16:30', location: '返程', activity: '返回集合地点' }
    ],
    meetingPoint: {
      address: '天津市南开区南门外大街',
      latitude: 39.1189,
      longitude: 117.1763
    },
    status: 'active',
    availableSeats: 30
  },
  {
    title: '承德避暑山庄两日游',
    location: '河北承德',
    price: 599,
    ageRange: '50-70岁',
    intensity: '适中',
    intensityColor: '#faad14',
    imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzk1RTFEMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjMyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuaJv+W+t+mBv+aaguWxseW6hDwvdGV4dD48L3N2Zz4=',
    description: '皇家园林避暑胜地，山水之间放松身心',
    duration: '2天1夜',
    groupSize: '20-30人',
    tags: ['皇家园林', '含住宿', '含三餐'],
    highlights: [
      '游览世界文化遗产',
      '入住舒适酒店',
      '行程节奏适中',
      '专业导游陪同'
    ],
    medicalSupport: {
      hasDoctor: true,
      emergencyMeasures: '随队医护人员，24小时应急保障',
      nearbyHospitals: ['承德市中心医院', '承德医学院附属医院']
    },
    transportation: {
      type: '豪华旅游大巴',
      seatArrangement: '2+1豪华座椅，可调节靠背',
      features: ['空调', 'WiFi', '饮用水', '卫生间', 'USB充电']
    },
    itinerary: [
      { time: '07:00', location: '集合地点', activity: '集合出发前往承德' },
      { time: '11:30', location: '承德市区', activity: '抵达后用午餐' },
      { time: '13:00', location: '避暑山庄', activity: '游览避暑山庄' },
      { time: '17:30', location: '酒店', activity: '入住酒店休息' },
      { time: '次日08:00', location: '外八庙', activity: '参观外八庙景区' },
      { time: '次日15:00', location: '返程', activity: '返回温馨的家' }
    ],
    meetingPoint: {
      address: '北京市朝阳区三里屯路',
      latitude: 39.9388,
      longitude: 116.4472
    },
    status: 'active',
    availableSeats: 30
  },
  {
    title: '秦皇岛北戴河休闲三日游',
    location: '河北秦皇岛',
    price: 899,
    ageRange: '50-70岁',
    intensity: '轻松',
    intensityColor: '#52c41a',
    imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI0YzODE4MSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjM2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuWMl+aItOayszwvdGV4dD48L3N2Zz4=',
    description: '海滨度假胜地，享受慢节奏海边生活',
    duration: '3天2夜',
    groupSize: '20-30人',
    tags: ['海滨度假', '含住宿', '全程含餐'],
    highlights: [
      '海边漫步观日出',
      '入住海景酒店',
      '海鲜美食体验',
      '节奏舒缓轻松'
    ],
    medicalSupport: {
      hasDoctor: true,
      emergencyMeasures: '专业医护团队随行，配备齐全医疗设备',
      nearbyHospitals: ['秦皇岛市第一医院', '北戴河医院']
    },
    transportation: {
      type: '五星级旅游大巴',
      seatArrangement: '豪华商务座椅，超大空间',
      features: ['按摩座椅', '空调', 'WiFi', '影音娱乐', '卫生间']
    },
    itinerary: [
      { time: '第一天07:00', location: '集合地点', activity: '集合出发' },
      { time: '第一天12:00', location: '北戴河', activity: '抵达北戴河，入住酒店' },
      { time: '第一天14:00', location: '海滨浴场', activity: '海边自由活动' },
      { time: '第二天08:00', location: '鸽子窝公园', activity: '观日出，游览公园' },
      { time: '第二天15:00', location: '海鲜市场', activity: '选购海鲜，品尝美食' },
      { time: '第三天09:00', location: '老虎石公园', activity: '最后游览' },
      { time: '第三天14:00', location: '返程', activity: '返回温馨的家' }
    ],
    meetingPoint: {
      address: '北京市海淀区中关村大街',
      latitude: 39.9828,
      longitude: 116.3143
    },
    status: 'active',
    availableSeats: 30
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB连接成功');

    // 清空现有数据
    await Product.deleteMany({});
    console.log('已清空产品数据');

    // 插入种子数据
    await Product.insertMany(seedProducts);
    console.log('产品数据导入成功');

    console.log('数据库初始化完成！');
    process.exit(0);
  } catch (error) {
    console.error('初始化失败:', error);
    process.exit(1);
  }
};

seedDB();

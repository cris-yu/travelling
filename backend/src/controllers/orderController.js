const Order = require('../models/Order');
const Product = require('../models/Product');

// 生成订单号
const generateOrderNo = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `LYX${year}${month}${day}${random}`;
};

// 创建订单
exports.createOrder = async (req, res) => {
  try {
    const { productId, travelDate, travelers, contactName, contactPhone, openId } = req.body;
    
    // 验证产品存在且可用
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: '产品不存在'
      });
    }
    
    if (product.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: '产品暂时不可预订'
      });
    }
    
    // 检查库存
    if (product.availableSeats < travelers.length) {
      return res.status(400).json({
        success: false,
        message: '可用座位不足'
      });
    }
    
    // 计算总价
    const totalPrice = product.price * travelers.length;
    
    // 创建订单
    const order = await Order.create({
      orderNo: generateOrderNo(),
      openId,
      productId,
      productTitle: product.title,
      travelDate,
      travelers,
      contactName,
      contactPhone,
      totalPrice,
      status: 'confirmed',
      meetingTime: product.itinerary[0]?.time || '待定',
      meetingPoint: product.meetingPoint.address,
      guideName: '王导游',
      guidePhone: '13800138000',
      latitude: product.meetingPoint.latitude,
      longitude: product.meetingPoint.longitude
    });
    
    // 更新产品可用座位
    product.availableSeats -= travelers.length;
    await product.save();
    
    res.status(201).json({
      success: true,
      data: order,
      message: '订单创建成功'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: '订单创建失败',
      error: error.message
    });
  }
};

// 获取用户订单列表
exports.getUserOrders = async (req, res) => {
  try {
    const { openId } = req.query;
    
    if (!openId) {
      return res.status(400).json({
        success: false,
        message: '缺少openId参数'
      });
    }
    
    const orders = await Order.find({ openId })
      .populate('productId')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '获取订单失败',
      error: error.message
    });
  }
};

// 获取订单详情
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('productId');
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: '订单不存在'
      });
    }
    
    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '获取订单详情失败',
      error: error.message
    });
  }
};

// 取消订单
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: '订单不存在'
      });
    }
    
    if (order.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: '订单已取消'
      });
    }
    
    if (order.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: '已完成的订单无法取消'
      });
    }
    
    order.status = 'cancelled';
    await order.save();
    
    // 恢复产品库存
    const product = await Product.findById(order.productId);
    if (product) {
      product.availableSeats += order.travelers.length;
      await product.save();
    }
    
    res.json({
      success: true,
      data: order,
      message: '订单已取消'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '取消订单失败',
      error: error.message
    });
  }
};

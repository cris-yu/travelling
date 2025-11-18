const Product = require('../models/Product');

// 获取所有产品
exports.getAllProducts = async (req, res) => {
  try {
    const { location, intensity, search, page = 1, limit = 10 } = req.query;
    
    const query = { status: 'active' };
    
    if (location && location !== '全部') {
      query.location = location;
    }
    
    if (intensity && intensity !== '全部') {
      query.intensity = intensity;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const products = await Product.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const count = await Product.countDocuments(query);
    
    res.json({
      success: true,
      data: products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '服务器错误',
      error: error.message
    });
  }
};

// 获取单个产品详情
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: '产品不存在'
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '服务器错误',
      error: error.message
    });
  }
};

// 创建产品（管理员）
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    
    res.status(201).json({
      success: true,
      data: product,
      message: '产品创建成功'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: '创建失败',
      error: error.message
    });
  }
};

// 更新产品（管理员）
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: '产品不存在'
      });
    }
    
    res.json({
      success: true,
      data: product,
      message: '产品更新成功'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: '更新失败',
      error: error.message
    });
  }
};

// 删除产品（管理员）
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: '产品不存在'
      });
    }
    
    res.json({
      success: true,
      message: '产品删除成功'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '删除失败',
      error: error.message
    });
  }
};

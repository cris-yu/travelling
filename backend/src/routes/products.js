const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// 公开路由
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// 管理员路由（后续可添加认证中间件）
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;

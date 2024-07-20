const express = require('express');
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authenticate, createProduct);
router.get('/', authenticate, getProducts);
router.get('/:id', authenticate, getProduct);
router.put('/:id', authenticate, updateProduct);
router.delete('/:id', authenticate, deleteProduct);

module.exports = router;

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { validateProduct } = require('../middlewares/validation');

// CRUD-Routen
router.post('/products', validateProduct, productController.addProduct);
router.put('/products/:id', validateProduct, productController.editProduct);
router.delete('/products/:id', productController.deleteProduct);
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);


module.exports = router;

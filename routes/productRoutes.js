const express = require('express');
const productController = require('../controllers/productController');
const { validate } = require('../validators/userValidator');
const { isAdmin, isUserLogged } = require('../middleware/authMiddleware');
const { createProduct } = require('../middleware/productSchema');
const router = express.Router();
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getSingleProducts);
router.post(
  '/',
  isUserLogged,
  validate(createProduct),
  productController.createProduct,
);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.post('/:id/reviews', productController.postReview);
module.exports = router;

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
  isAdmin,
  validate(createProduct),
  productController.createProduct,
);
router.put('/:id', isUserLogged, isAdmin, productController.updateProduct);
router.delete('/:id', isUserLogged, isAdmin, productController.deleteProduct);
router.post('/:id/reviews', isUserLogged, productController.postReview);
module.exports = router;

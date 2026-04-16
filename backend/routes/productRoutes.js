const express = require('express');
const upload = require('../config/cloudinary');
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
  upload.single('mainImage'),
  validate(createProduct),
  productController.createProduct,
);
router.put(
  '/:id',
  isUserLogged,
  isAdmin,
  upload.single('mainImage'),
  productController.updateProduct,
);
router.delete('/:id', isUserLogged, isAdmin, productController.deleteProduct);
router.post('/:id/reviews', isUserLogged, productController.postReview);
module.exports = router;

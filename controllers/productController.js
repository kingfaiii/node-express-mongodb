const httpError = require('../models/httpError');
const {
  createProductService,
  getAllProductService,
  getSingleProductService,
  updateProductService,
  deleteProductService,
} = require('../services/productServices');
const { sendResponse } = require('../utils/responseHelper');

const getAllProducts = async (req, res, next) => {
  try {
    const fetchProducts = await getAllProductService();
    return sendResponse(
      res,
      200,
      true,
      'Successfully Fetch Products Data',
      fetchProducts,
    );
  } catch (error) {
    next(new httpError(error.message || 'Failed to Fetch Products', 500));
  }
};
const getSingleProducts = async (req, res, next) => {
  try {
    const id = req.params.id;
    const singleProduct = await getSingleProductService(id);
    return sendResponse(
      res,
      200,
      true,
      'Successfully Fetch Single Product Data',
      singleProduct,
    );
  } catch (error) {
    next(new httpError(error.message || 'Failed to Fetch Single Product', 500));
  }
};
const createProduct = async (req, res, next) => {
  try {
    const payload = req.body;
    const createdProduct = await createProductService(payload);
    return sendResponse(res, 201, true, 'Product Created', {
      dataProduct: createdProduct,
    });
  } catch (error) {
    next(new httpError(error.message || 'Failed to Create Product', 500));
  }
};
const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const productData = req.body;
    const updateProductData = await updateProductService(
      productData,
      productId,
    );

    return sendResponse(res, 200, true, 'Product Update', updateProductData);
  } catch (error) {
    next(new httpError(error.message || 'Failed to Update Product', 500));
  }
};
const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const deleteProductData = await deleteProductService(productId);
    return sendResponse(
      res,
      200,
      true,
      'Successfully Deleted Product',
      deleteProductData,
    );
  } catch (error) {
    next(new httpError(error.message || 'Failed to Delete Product', 500));
  }
};
const postReview = (req, res) => {
  res.status(200).json({ message: req.params.url });
};

module.exports = {
  getAllProducts,
  getSingleProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  postReview,
};

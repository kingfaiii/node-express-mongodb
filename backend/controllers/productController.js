const httpError = require('../models/httpError');
const {
  createProductService,
  getAllProductService,
  getSingleProductService,
  updateProductService,
  deleteProductService,
  postReviewProduct,
} = require('../services/productServices');
const { sendResponse } = require('../utils/responseHelper');
const convertToSlug = require('../utils/convertToSlug');

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
    const { productName, slug, price, ...rest } = req.body;
    if (!productName) {
      return sendResponse(res, 400, false, 'Product name is required');
    }
    const payload = {
      ...rest,
      productName,
      slug: slug && slug.trim() !== '' ? slug : convertToSlug(productName),
      price: Number(req.body.price),
      mainImage: req.file ? req.file.path : null,
    };
    const createdProduct = await createProductService(payload);
    return sendResponse(res, 201, true, 'Product Created', {
      dataProduct: createdProduct,
    });
  } catch (error) {
    return next(error);
  }
};
const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const normalize = (key, value) => {
      if (value === 'true') return true;
      if (value === 'false') return false;
      if (key === 'price' || key === 'inventoryStock') return Number(value);
      return value;
    };

    const rawBody = Object.entries(req.body).reduce((acc, [key, value]) => {
      acc[key] = normalize(key, value);
      return acc;
    }, {});

    const { productName, slug, price, ...rest } = rawBody;
    const productData = {
      ...rest,
      productName,
      slug: slug && slug.trim() !== '' ? slug : convertToSlug(productName),
      price: Number(price),
      ...(req.file && { mainImage: req.file.path }),
    };
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
const postReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const payload = { rating, comment };
    const productId = req.params.id;
    const userDataId = req.user.id;
    const resultReview = await postReviewProduct(
      userDataId,
      productId,
      payload,
    );
    return sendResponse(
      res,
      200,
      true,
      'Successfully Post Review',
      resultReview,
    );
  } catch (error) {
    next(new httpError(error.message || 'Failed to post Review', 500));
  }
};

module.exports = {
  getAllProducts,
  getSingleProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  postReview,
};

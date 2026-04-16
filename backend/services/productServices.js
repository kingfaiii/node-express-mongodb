const { connectDB } = require('../config/db');
const httpError = require('../models/httpError');
const {
  dbFindOne,
  dbInsertOne,
  dbFind,
  dbUpdateOne,
  dbDeleteOne,
} = require('../utils/dbMethods');
const { ObjectId } = require('mongodb');

const deleteProductService = async (productId) => {
  const db = await connectDB();
  const product = await dbFindOne(db, 'products', {
    _id: new ObjectId(productId),
  });
  if (!product) throw new httpError('Product Not Found', 404);

  if (product.isFeatured || product.isActive) {
    throw new httpError(
      'Product is currently Active or Featured. Please set to Draft before deleting.',
      400,
    );
  }
  return await dbDeleteOne(db, 'products', { _id: new ObjectId(productId) });
};

const updateProductService = async (productData, productId) => {
  const db = await connectDB();
  const product = await dbFindOne(db, 'products', {
    _id: new ObjectId(productId),
  });
  if (!product) {
    throw new httpError('Product Not Found', 404);
  }

  const {
    _id,
    reviews,
    rating,
    numReviews,
    createdAt,
    dateModified,
    ...safetoUpdate
  } = productData;

  await dbUpdateOne(db, 'products', safetoUpdate, product._id);
  return { ...product, ...safetoUpdate };
};

const createProductService = async (productData) => {
  const db = await connectDB();
  const insertData = {
    ...productData,
  };
  return await dbInsertOne(db, 'products', insertData);
};

const getAllProductService = async () => {
  const db = await connectDB();
  return await dbFind(
    db,
    'products',
    { isActive: true },
    {
      projection: { productDescription: 0, imageGallery: 0 },
      sort: { createdAt: -1 },
      limit: 3,
    },
  );
};

const getSingleProductService = async (productId) => {
  const db = await connectDB();

  const product = await dbFindOne(db, 'products', {
    _id: new ObjectId(productId),
  });
  if (!product) {
    throw new httpError('Product Not Found', 404);
  }
  return product;
};

const postReviewProduct = async (userId, productId, reviewData) => {
  const db = await connectDB();
  const id = new ObjectId(productId);

  // Check Product if Existing
  const product = await dbFindOne(db, 'products', { _id: id });
  if (!product) throw new httpError('Product Not Found', 404);

  // Check User Already posted a review on the product
  const user = await dbFindOne(db, 'users', { _id: new ObjectId(userId) });
  const userReview = product.reviews.find((r) => r.userEmail === user.email);
  if (userReview) throw new httpError('User already Review', 403);

  // Gather all data of user Input data in One array
  const userData = {
    userEmail: user.email,
    name: `${user.firstName} ${user.lastName}`,
    ...reviewData,
    dateCreated: new Date(),
  };

  const fetchProductReviews = [...product.reviews, userData];
  const numReview = fetchProductReviews.length;
  const rating =
    fetchProductReviews.reduce((sum, r) => sum + r.rating, 0) / numReview;

  const result = await dbUpdateOne(
    db,
    'products',
    { reviews: fetchProductReviews, rating: rating, numReviews: numReview },
    id,
  );
  return result;
};

module.exports = {
  createProductService,
  getAllProductService,
  getSingleProductService,
  updateProductService,
  deleteProductService,
  postReviewProduct,
};

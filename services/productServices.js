const { connectDB } = require('../config/db');
const httpError = require('../models/httpError');
const {
  dbFindOne,
  dbInsertOne,
  dbFind,
  dbUpdateOne,
  dbDeleteOne,
} = require('../utils/dbMethods');
const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongodb');

const deleteProductService = async (productId) => {
  const db = await connectDB();
  const product = await dbFindOne(db, 'products', {
    _id: new ObjectId(productId),
  });
  if (!product) {
    throw new httpError('Product Not Found', 404);
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
  const { _id, reviews, rating, numReviews, ...safetoUpdate } = productData;
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
      projection: { productDescription: 0, sku: 0, imageGallery: 0 },
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

module.exports = {
  createProductService,
  getAllProductService,
  getSingleProductService,
  updateProductService,
  deleteProductService,
};

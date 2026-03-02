const { connectDB } = require('../config/db');
const { generateToken } = require('../utils/generateToken');
const httpError = require('../models/httpError');
const {
  dbFindOne,
  dbInsertOne,
  dbFind,
  dbUpdateOne,
} = require('../utils/dbMethods');
const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongodb');

const createProducts = async (productData) => {};

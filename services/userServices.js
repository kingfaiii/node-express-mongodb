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

const registerUserService = async (userData) => {
  const db = await connectDB();

  const isExistingUser = await dbFindOne(db, 'users', {
    email: userData.email,
  });
  if (isExistingUser) {
    const error = new httpError('User Already Existing', 400);
    throw error;
  }
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  const secureUser = {
    ...userData,
    password: hashedPassword,
    isActive: true,
    isAdmin: true,
  };
  return await dbInsertOne(db, 'users', secureUser);
};

const loginUserService = async (userData) => {
  const db = await connectDB();
  const emailFormat = userData.email.toLowerCase();
  const isExistingUser = await dbFindOne(db, 'users', {
    email: emailFormat,
  });

  if (!isExistingUser) {
    const error = new httpError('Invalid Email or Password', 401);
    throw error;
  }
  const isMatch = await bcrypt.compare(
    userData.password,
    isExistingUser.password,
  );
  if (!isMatch) {
    const error = new httpError('Invalid Email or Password', 401);
    throw error;
  }
  const token = generateToken(isExistingUser._id, isExistingUser.isAdmin);

  return {
    token,
    userProfile: {
      firstName: isExistingUser.firstName,
      lastName: isExistingUser.lastName,
      isAdmin: isExistingUser.isAdmin,
    },
  };
};

const viewSingleUserService = async (id) => {
  const db = await connectDB();
  const data = await dbFindOne(db, 'users', { _id: new ObjectId(id) });
  if (!data) {
    const error = new httpError('User Not Found!', 404);
    throw error;
  }
  return {
    userData: {
      firstName: data.firstName,
      lastName: data.lastName,
      birthDay: data.birthDay,
      email: data.email,
      isAdmin: data.isAdmin,
    },
  };
};

const updateSingleUserService = async (id, userData) => {
  const db = await connectDB();
  const data = await dbFindOne(db, 'users', { _id: new ObjectId(id) });

  if (!data) {
    const error = new httpError('User Not Found', 404);
    throw error;
  }
  const { isAdmin, _id, password, ...safeToUpdate } = userData;
  await dbUpdateOne(db, 'users', safeToUpdate, data._id);

  return { ...data, ...safeToUpdate, password: undefined };
};
const viewAllUserService = async () => {
  const db = await connectDB();
  return await dbFind(
    db,
    'users',
    {},
    {
      projection: { password: 0, salt: 0 },
      limit: 3,
    },
  );
};
module.exports = {
  registerUserService,
  viewAllUserService,
  loginUserService,
  viewSingleUserService,
  updateSingleUserService,
};

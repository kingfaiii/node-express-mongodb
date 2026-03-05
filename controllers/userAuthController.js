const {
  registerUserService,
  viewAllUserService,
  loginUserService,
  viewSingleUserService,
  updateSingleUserService,
} = require('../services/userServices');
const { sendResponse } = require('../utils/responseHelper');

const authenticateUser = async (req, res, next) => {
  const { email, password } = req.body;

  const payload = { email, password };

  try {
    const authData = await loginUserService(payload);
    console.log(authData);
    return sendResponse(res, 200, true, 'Successfully Logged In', authData);
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  const { firstName, lastName, email, birthDay, password } = req.body;
  const payLoad = {
    firstName,
    lastName,
    email,
    birthDay,
    password,
  };

  try {
    const newUserId = await registerUserService(payLoad);
    return sendResponse(res, 201, true, 'Succesfully Registered', {
      userId: newUserId,
    });
  } catch (error) {
    next(error);
  }
};

const viewUserProfile = async (req, res, next) => {
  const id = req.user.id;
  try {
    const userData = await viewSingleUserService(id);
    return sendResponse(
      res,
      200,
      true,
      'Successfully Get Users Data',
      userData,
    );
  } catch (error) {
    next(error);
  }
};

const updateUserProfile = async (req, res, next) => {
  const { firstName, lastName, birthDay, password, email } = req.body;
  const payLoad = { firstName, lastName, birthDay, password, email };
  const id = req.user.id;
  try {
    const userData = await updateSingleUserService(id, payLoad);
    return sendResponse(
      res,
      201,
      true,
      'Successfully Updated Your Information',
      userData,
    );
  } catch (error) {
    next(error);
  }
};

const viewAllUsers = async (req, res, next) => {
  try {
    const users = await viewAllUserService();
    return sendResponse(
      res,
      200,
      true,
      'Successfully Get All Users Data',
      users,
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authenticateUser,
  registerUser,
  viewAllUsers,
  viewUserProfile,
  updateUserProfile,
};

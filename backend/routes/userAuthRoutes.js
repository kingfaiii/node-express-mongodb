const express = require('express');
const userAuthController = require('../controllers/userAuthController');
const {
  registerUserSchema,
  loginUserSchema,
  updateUserSchema,
} = require('../middleware/userSchema');
const { isUserLogged, isAdmin } = require('../middleware/authMiddleware');
const { validate } = require('../validators/userValidator');
const router = express.Router();

router.post(
  '/login',
  validate(loginUserSchema),
  userAuthController.authenticateUser,
);
router.post(
  '/register',
  validate(registerUserSchema),
  userAuthController.registerUser,
);
router.get('/profile', isUserLogged, userAuthController.viewUserProfile);
router.put(
  '/profile',
  isUserLogged,
  validate(updateUserSchema),
  userAuthController.updateUserProfile,
);
router.get('/', isUserLogged, isAdmin, userAuthController.viewAllUsers);
module.exports = router;

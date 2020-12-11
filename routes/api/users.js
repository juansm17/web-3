const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const {
  getUserByHandle,
  createUser,
  getAllUsers,
  deleteUserById,
} = require('./services/users');


// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  [
    check('name', 'name is required')
      .not()
      .isEmpty(),
    check('handle', 'handle is required')
      .not()
      .isEmpty(),
    check('password', 'Please enter a password with 6 or more characters')
      .isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    const { name, handle, password } = req.body;

    try {
      const user = await getUserByHandle(handle);

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      //encrypts password
      const salt = await bcrypt.genSalt(10);
      const encryptedPW = await bcrypt.hash(password, salt);

      const { id } = await createUser(name, handle, encryptedPW);

      return res
        .status(201)
        .json({ msg: `New user created with id ${id}` });
    } catch (error) {
      return res
        .status(500)
        .json({
          errors: [{
            msg: 'Something went wrong on the server. Please try again later',
            error: error.message
          }]
        });
    }
  }
);


// @route    GET api/users
// @desc     Get all users
// @access   Public
router.get(
  '/',
  async (req, res) => {
    try {
      const users = await getAllUsers();

      if (!users) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Could not find any users' }] });
      }

      return res
        .status(200)
        .json(users)
    } catch (error) {
      return res
        .status(500)
        .json({
          errors: [{
            msg: 'Something went wrong on the server. Please try again later',
            error: error.message
          }]
        });
    }
  }
);


// @route    DELETE api/users/:id
// @desc     Delete user by id
// @access   Private
router.delete(
  '/:id',
  async (req, res) => {
    const { id } = req.params;
    try {
      const deletedUser = await deleteUserById(id);

      if (!deletedUser) {
        return res
          .status(404)
          .json({ errors: [{ msg: `Could not find user with id ${id}` }] });
      }

      return res
        .status(200)
        .json({ msg: `Deleted user with id ${id} and handle ${deletedUser.handle}` })
    } catch (error) {
      return res
        .status(500)
        .json({
          errors: [{
            msg: 'Something went wrong on the server. Please try again later',
            error: error.message
          }]
        });
    }
  }
);

module.exports = router;
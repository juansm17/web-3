const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const {check, validationResult } = require('express-validator');
const { getUserByHandle } = require('./services/users');
const auth = require('../../middleware/auth');


// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get(
  '/', 
  auth, 
  async (req, res) => {
    try {
      const { handle } = req.user;
      const user = await getUserByHandle(handle);

      return res
        .status(200)
        .json({
          id: user.id,
          name: user.name,
          handle: user.handle
        });
    } catch (error) {
      return res
        .status(500)
        .json({ errors: [{ 
          msg: 'Something went wrong on the server. Please try again later' ,
          error: error.message
        }] });
    }
  }
);


// @route    POST api/auth
// @desc     Validate user and create token
// @access   Public
router.post(
  '/',
  [
    check('handle', 'Handle must be provided')
      .not()
      .isEmpty(),
    check('password', 'Password must be provided')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    try {
      const { handle, password } = req.body;
      const user = await getUserByHandle(handle);

      if(!user) {
        return res
          .status(401)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch) {
        return res
          .status(401)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const secret = process.env.SECRET;
      const payload = {
        user: {
          id: user.id,
          handle: user.handle,
          name: user.name
        }
      };
      
      sign(
        payload, 
        secret,
        { expiresIn: 360000 },
        (error, token) => {
          if (error) throw err;
          return res
            .status(200)
            .json({ token });
        }
      );
    } catch (error) {
      return res
        .status(500)
        .json({ errors: [{ 
          msg: 'Something went wrong on the server. Please try again later' ,
          error: error.message
        }] });
    }
  }
);


module.exports = router;
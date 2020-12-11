const express = require('express');
const router = express.Router();
const {check, validationResult } = require('express-validator');
const { 
  getAllTweets,
  getTweetById,
  postTweet,
} = require('./services/tweets');
const auth = require('../../middleware/auth');


// @route    GET api/tweets
// @desc     Get all tweets
// @access   Public
router.get(
  '/',
  async(req, res) => {
    try {
      const tweets = await getAllTweets();

      if(!tweets) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Could not find any tweets' }] });
      }

      return res
        .status(200)
        .json(tweets)
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


// @route    GET api/tweets/:id
// @desc     Get tweet by id
// @access   Public
router.get(
  '/:id',
  async(req, res) => {
    try {
      const { id } = req.params;
      const tweet = await getTweetById(id);

      if(!tweet) {
        return res
          .status(404)
          .json({ errors: [{ msg: `Could not find tweet with id ${id}` }] });
      }

      return res
        .status(200)
        .json(tweet)
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


// @route    POST api/tweets
// @desc     Create new tweet
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('message', 'Tweet must be at least 1 character')
        .not()
        .isEmpty()
    ]
  ],
  async(req, res) => {
    try {
      const { id } = req.user;
      const { message } = req.body;
      const tweet = await postTweet(message, id);

      if(!tweet) {
        return res
          .status(404)
          .json({ errors: [{ msg: `Not able to post new tweet.` }] });
      }

      return res
        .status(200)
        .json(tweet)
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
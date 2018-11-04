const express = require('express');
const router = express.Router();

const userFriendController = require('../controllers/userFriendsController.js');

router.get('/', userFriendController.userFriends);

module.exports = router;
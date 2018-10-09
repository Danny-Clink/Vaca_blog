var express = require('express');
var router = express.Router();

let userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', userController.user);
router.post('/', userController.user);

module.exports = router;
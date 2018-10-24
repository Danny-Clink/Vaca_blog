var express = require('express');
var router = express.Router();

let userConfigController = require('../controllers/userConfigController');


router.get('/', userConfigController.userConfig);
router.post('/', userConfigController.userUpdateImage);

module.exports = router;
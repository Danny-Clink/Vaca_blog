let express = require('express');
let router = express.Router();

const userConfigController = require('../controllers/userConfigController');


router.get('/', userConfigController.userConfig);
router.post('/', userConfigController.userUpdateImage);

module.exports = router;
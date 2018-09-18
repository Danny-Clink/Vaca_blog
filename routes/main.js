var express = require('express');
var router = express.Router();

const mainController = require('../controllers/mainController');

router.get('/',mainController.main);
router.post('/',mainController.main);

module.exports = router;

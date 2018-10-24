let express = require('express');
let router = express.Router();

const chatController = require('../controllers/chatController');

router.get('/', chatController.chat);
router.post('/', chatController.chat);

module.exports = router;
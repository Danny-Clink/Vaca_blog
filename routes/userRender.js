const express = require('express');
const router = express.Router();

const userRenderController = require('../controllers/userRenderController');

router.get('/', userRenderController.userRender);

module.exports = router;
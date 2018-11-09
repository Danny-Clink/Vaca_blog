const express = require('express');
const router = express.Router();

const userPhotoController = require('../controllers/userPhotoController');

router.get('/', userPhotoController.userPhoto);
router.post('/', userPhotoController.uploadPhoto);

module.exports = router;
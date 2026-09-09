const express = require('express');
const router = express.Router();
const { getAllContent, getContentKey } = require('../controllers/contentController');

router.get('/', getAllContent);
router.get('/:key', getContentKey);

module.exports = router;

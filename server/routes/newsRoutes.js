const express = require('express');
const router = express.Router();
const { getPublicNews, getNewsPost } = require('../controllers/newsController');

router.get('/', getPublicNews);
router.get('/:id', getNewsPost);

module.exports = router;

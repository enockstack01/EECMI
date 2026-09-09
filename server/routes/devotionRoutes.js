const express = require('express');
const router = express.Router();
const { getPublicDevotions, getDevotion, recordDownload } = require('../controllers/devotionController');

router.get('/', getPublicDevotions);
router.get('/:id', getDevotion);
router.post('/:id/download', recordDownload);

module.exports = router;

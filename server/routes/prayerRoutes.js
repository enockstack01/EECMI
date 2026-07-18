const express = require('express');
const router = express.Router();
const { submitPrayer, getPublicPrayers, prayForRequest } = require('../controllers/prayerController');

router.post('/', submitPrayer);
router.get('/public', getPublicPrayers);
router.patch('/:id/pray', prayForRequest);

module.exports = router;

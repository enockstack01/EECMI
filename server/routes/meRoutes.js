const express = require('express');
const router = express.Router();
const { requireSignedIn } = require('../middleware/clerkAuth');
const c = require('../controllers/meController');

router.use(requireSignedIn);

router.get('/', c.getMe);
router.patch('/', c.updateMe);
router.get('/activity', c.getActivity);
router.get('/devotions', c.getSavedDevotions);
router.post('/devotions/:id/save', c.toggleSavedDevotion);
router.delete('/devotions/:id/save', c.toggleSavedDevotion);

module.exports = router;

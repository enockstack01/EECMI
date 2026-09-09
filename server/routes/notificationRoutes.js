const express = require('express');
const router = express.Router();
const { requireSignedIn } = require('../middleware/clerkAuth');
const { list, unreadCount, markRead } = require('../controllers/notificationController');

router.use(requireSignedIn);

router.get('/', list);
router.get('/unread-count', unreadCount);
router.post('/read', markRead);

module.exports = router;

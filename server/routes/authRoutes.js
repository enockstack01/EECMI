const router = require('express').Router();
const { requireSignedIn } = require('../middleware/clerkAuth');
const { syncRole, getMe } = require('../controllers/authController');

router.post('/sync-role', requireSignedIn, syncRole);
router.get('/me', requireSignedIn, getMe);

module.exports = router;

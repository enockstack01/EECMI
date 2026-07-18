const router = require('express').Router();
const { protect } = require('../middleware/auth');
const c = require('../controllers/adminController');

router.use(protect);

// Dashboard
router.get('/stats', c.getDashboard);

// Contacts
router.get('/contacts',         c.getContacts);
router.patch('/contacts/:id',   c.updateContact);
router.delete('/contacts/:id',  c.deleteContact);

// Prayers
router.get('/prayers',          c.getPrayers);
router.patch('/prayers/:id',    c.updatePrayer);
router.delete('/prayers/:id',   c.deletePrayer);

// Volunteers
router.get('/volunteers',       c.getVolunteers);
router.patch('/volunteers/:id', c.updateVolunteer);
router.delete('/volunteers/:id',c.deleteVolunteer);

// Subscribers
router.get('/subscribers',           c.getSubscribers);
router.patch('/subscribers/:id/toggle', c.toggleSubscriber);
router.delete('/subscribers/:id',    c.deleteSubscriber);

// News
router.get('/news',         c.getNews);
router.post('/news',        c.createNews);
router.put('/news/:id',     c.updateNews);
router.delete('/news/:id',  c.deleteNews);

// Resources
router.get('/resources',         c.getResources);
router.post('/resources',        c.createResource);
router.put('/resources/:id',     c.updateResource);
router.delete('/resources/:id',  c.deleteResource);

// Partners
router.get('/partners',          c.getPartners);
router.patch('/partners/:id',    c.updatePartner);
router.delete('/partners/:id',   c.deletePartner);

// Admin users (super_admin only)
router.get('/admins',            c.getAdmins);
router.post('/admins',           c.createAdmin);
router.patch('/admins/:id/toggle', c.toggleAdmin);

module.exports = router;

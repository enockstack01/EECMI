const router = require('express').Router();
const { requireRole } = require('../middleware/clerkAuth');
const c = require('../controllers/adminController');

router.use(requireRole('admin', 'editor', 'super_admin'));

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

// Team management (super_admin only)
const requireSuperAdmin = requireRole('super_admin');
router.get('/team',                    requireSuperAdmin, c.getTeam);
router.patch('/team/:userId/role',     requireSuperAdmin, c.updateTeamRole);
router.patch('/team/:userId/ban',      requireSuperAdmin, c.toggleTeamBan);

module.exports = router;

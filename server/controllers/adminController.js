const { Op } = require('sequelize');
const Contact   = require('../models/Contact');
const Prayer    = require('../models/Prayer');
const Volunteer = require('../models/Volunteer');
const Newsletter= require('../models/Newsletter');
const NewsPost  = require('../models/NewsPost');
const Resource  = require('../models/Resource');
const Partner   = require('../models/Partner');
const { clerkClient } = require('../middleware/clerkAuth');

const ROLES = ['super_admin', 'admin', 'editor', 'user'];

const primaryEmail = (user) =>
  user.emailAddresses?.find((e) => e.id === user.primaryEmailAddressId)?.emailAddress
  || user.emailAddresses?.[0]?.emailAddress
  || '';

const toTeamRow = (user) => ({
  id: user.id,
  name: [user.firstName, user.lastName].filter(Boolean).join(' ') || user.username || primaryEmail(user),
  email: primaryEmail(user),
  imageUrl: user.imageUrl,
  role: user.publicMetadata?.role || 'user',
  banned: !!user.banned,
  lastSignInAt: user.lastSignInAt,
  createdAt: user.createdAt,
});

// ── helpers ──────────────────────────────────────────────────
const paginate = (query) => {
  const page  = Math.max(1, parseInt(query.page)  || 1);
  const limit = Math.min(100, parseInt(query.limit) || 20);
  return { limit, offset: (page - 1) * limit, page };
};

const searchWhere = (query, fields) => {
  if (!query.search) return {};
  const like = { [Op.iLike]: `%${query.search}%` };
  return { [Op.or]: fields.map(f => ({ [f]: like })) };
};

// ── DASHBOARD ────────────────────────────────────────────────
exports.getDashboard = async (req, res) => {
  try {
    const [contacts, prayers, volunteers, subscribers, newPosts, resources, partners, newContacts, recentPrayers, recentVolunteers, recentPartners] =
      await Promise.all([
        Contact.count(),
        Prayer.count(),
        Volunteer.count(),
        Newsletter.count({ where: { isActive: true } }),
        NewsPost.count({ where: { status: 'published' } }),
        Resource.count({ where: { status: 'published' } }),
        Partner.count(),
        Contact.findAll({ order: [['createdAt', 'DESC']], limit: 5, attributes: ['id','name','email','subject','status','createdAt'] }),
        Prayer.findAll({ order: [['createdAt', 'DESC']], limit: 5, attributes: ['id','name','request','status','isAnonymous','createdAt'] }),
        Volunteer.findAll({ order: [['createdAt', 'DESC']], limit: 5, attributes: ['id','name','email','areas','status','createdAt'] }),
        Partner.findAll({ order: [['createdAt', 'DESC']], limit: 5, attributes: ['id','name','email','organization','partnerType','status','createdAt'] }),
      ]);

    let team = null;
    if (req.role === 'super_admin') {
      const { data: users, totalCount } = await clerkClient.users.getUserList({ limit: 200 });
      const byRole = users.reduce((acc, u) => {
        const role = u.publicMetadata?.role || 'user';
        acc[role] = (acc[role] || 0) + 1;
        return acc;
      }, {});
      team = { total: totalCount, byRole };
    }

    res.json({
      success: true,
      stats: { contacts, prayers, volunteers, subscribers, newPosts, resources, partners },
      recent: { contacts: newContacts, prayers: recentPrayers, volunteers: recentVolunteers, partners: recentPartners },
      team,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load dashboard.' });
  }
};

// ── CONTACTS ─────────────────────────────────────────────────
exports.getContacts = async (req, res) => {
  try {
    const { limit, offset, page } = paginate(req.query);
    const where = {
      ...searchWhere(req.query, ['name', 'email', 'subject']),
      ...(req.query.status ? { status: req.query.status } : {}),
    };
    const { rows, count } = await Contact.findAndCountAll({ where, order: [['createdAt', 'DESC']], limit, offset });
    res.json({ success: true, data: rows, total: count, page, pages: Math.ceil(count / limit) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch contacts.' });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const item = await Contact.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found.' });
    await item.update({ status: req.body.status });
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Update failed.' });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const item = await Contact.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found.' });
    await item.destroy();
    res.json({ success: true, message: 'Deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Delete failed.' });
  }
};

// ── PRAYERS ──────────────────────────────────────────────────
exports.getPrayers = async (req, res) => {
  try {
    const { limit, offset, page } = paginate(req.query);
    const where = {
      ...searchWhere(req.query, ['name', 'request']),
      ...(req.query.status ? { status: req.query.status } : {}),
    };
    const { rows, count } = await Prayer.findAndCountAll({ where, order: [['createdAt', 'DESC']], limit, offset });
    res.json({ success: true, data: rows, total: count, page, pages: Math.ceil(count / limit) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch prayers.' });
  }
};

exports.updatePrayer = async (req, res) => {
  try {
    const item = await Prayer.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found.' });
    await item.update({ status: req.body.status });
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Update failed.' });
  }
};

exports.deletePrayer = async (req, res) => {
  try {
    const item = await Prayer.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found.' });
    await item.destroy();
    res.json({ success: true, message: 'Deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Delete failed.' });
  }
};

// ── VOLUNTEERS ───────────────────────────────────────────────
exports.getVolunteers = async (req, res) => {
  try {
    const { limit, offset, page } = paginate(req.query);
    const where = {
      ...searchWhere(req.query, ['name', 'email', 'location']),
      ...(req.query.status ? { status: req.query.status } : {}),
    };
    const { rows, count } = await Volunteer.findAndCountAll({ where, order: [['createdAt', 'DESC']], limit, offset });
    res.json({ success: true, data: rows, total: count, page, pages: Math.ceil(count / limit) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch volunteers.' });
  }
};

exports.updateVolunteer = async (req, res) => {
  try {
    const item = await Volunteer.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found.' });
    await item.update({ status: req.body.status });
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Update failed.' });
  }
};

exports.deleteVolunteer = async (req, res) => {
  try {
    const item = await Volunteer.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found.' });
    await item.destroy();
    res.json({ success: true, message: 'Deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Delete failed.' });
  }
};

// ── SUBSCRIBERS ──────────────────────────────────────────────
exports.getSubscribers = async (req, res) => {
  try {
    const { limit, offset, page } = paginate(req.query);
    const where = {
      ...searchWhere(req.query, ['email', 'name']),
      ...(req.query.active !== undefined ? { isActive: req.query.active === 'true' } : {}),
    };
    const { rows, count } = await Newsletter.findAndCountAll({ where, order: [['createdAt', 'DESC']], limit, offset });
    res.json({ success: true, data: rows, total: count, page, pages: Math.ceil(count / limit) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch subscribers.' });
  }
};

exports.toggleSubscriber = async (req, res) => {
  try {
    const item = await Newsletter.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found.' });
    await item.update({ isActive: !item.isActive });
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Update failed.' });
  }
};

exports.deleteSubscriber = async (req, res) => {
  try {
    const item = await Newsletter.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found.' });
    await item.destroy();
    res.json({ success: true, message: 'Deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Delete failed.' });
  }
};

// ── NEWS POSTS ───────────────────────────────────────────────
exports.getNews = async (req, res) => {
  try {
    const { limit, offset, page } = paginate(req.query);
    const where = {
      ...searchWhere(req.query, ['title', 'category', 'author']),
      ...(req.query.status ? { status: req.query.status } : {}),
    };
    const { rows, count } = await NewsPost.findAndCountAll({ where, order: [['createdAt', 'DESC']], limit, offset });
    res.json({ success: true, data: rows, total: count, page, pages: Math.ceil(count / limit) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch news.' });
  }
};

exports.createNews = async (req, res) => {
  try {
    const { title, category, excerpt, content, author, status, featured, imageUrl, readTime } = req.body;
    if (!title) return res.status(400).json({ success: false, message: 'Title is required.' });
    const post = await NewsPost.create({
      title, category, excerpt, content, author, status, featured, imageUrl, readTime,
      publishedAt: status === 'published' ? new Date() : null,
    });
    res.status(201).json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create post.' });
  }
};

exports.updateNews = async (req, res) => {
  try {
    const item = await NewsPost.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found.' });
    const wasNotPublished = item.status !== 'published';
    await item.update({
      ...req.body,
      publishedAt: req.body.status === 'published' && wasNotPublished ? new Date() : item.publishedAt,
    });
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Update failed.' });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const item = await NewsPost.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found.' });
    await item.destroy();
    res.json({ success: true, message: 'Deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Delete failed.' });
  }
};

// ── RESOURCES ────────────────────────────────────────────────
exports.getResources = async (req, res) => {
  try {
    const { limit, offset, page } = paginate(req.query);
    const where = {
      ...searchWhere(req.query, ['title', 'type', 'description']),
      ...(req.query.status ? { status: req.query.status } : {}),
    };
    const { rows, count } = await Resource.findAndCountAll({ where, order: [['createdAt', 'DESC']], limit, offset });
    res.json({ success: true, data: rows, total: count, page, pages: Math.ceil(count / limit) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch resources.' });
  }
};

exports.createResource = async (req, res) => {
  try {
    const { title, type, description, fileUrl, externalUrl, status, year } = req.body;
    if (!title) return res.status(400).json({ success: false, message: 'Title is required.' });
    const item = await Resource.create({ title, type, description, fileUrl, externalUrl, status, year });
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create resource.' });
  }
};

exports.updateResource = async (req, res) => {
  try {
    const item = await Resource.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found.' });
    await item.update(req.body);
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Update failed.' });
  }
};

exports.deleteResource = async (req, res) => {
  try {
    const item = await Resource.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found.' });
    await item.destroy();
    res.json({ success: true, message: 'Deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Delete failed.' });
  }
};

// ── TEAM (Clerk-backed, super_admin only) ─────────────────────
exports.getTeam = async (req, res) => {
  try {
    const { data: users } = await clerkClient.users.getUserList({ limit: 200, orderBy: '-created_at' });
    res.json({ success: true, data: users.map(toTeamRow) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch team.' });
  }
};

exports.updateTeamRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!ROLES.includes(role)) return res.status(400).json({ success: false, message: 'Invalid role.' });
    if (req.params.userId === req.clerkUserId && role !== 'super_admin')
      return res.status(400).json({ success: false, message: 'Cannot demote yourself.' });
    const user = await clerkClient.users.updateUserMetadata(req.params.userId, { publicMetadata: { role } });
    res.json({ success: true, data: toTeamRow(user) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update role.' });
  }
};

exports.toggleTeamBan = async (req, res) => {
  try {
    if (req.params.userId === req.clerkUserId)
      return res.status(400).json({ success: false, message: 'Cannot ban yourself.' });
    const user = await clerkClient.users.getUser(req.params.userId);
    const updated = user.banned
      ? await clerkClient.users.unbanUser(req.params.userId)
      : await clerkClient.users.banUser(req.params.userId);
    res.json({ success: true, data: toTeamRow(updated) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update ban status.' });
  }
};

// ── PARTNERS ─────────────────────────────────────────────────
exports.getPartners = async (req, res) => {
  try {
    const { limit, offset, page } = paginate(req.query);
    const where = {
      ...searchWhere(req.query, ['name', 'email', 'organization']),
      ...(req.query.status ? { status: req.query.status } : {}),
    };
    const { rows, count } = await Partner.findAndCountAll({ where, order: [['createdAt', 'DESC']], limit, offset });
    res.json({ success: true, data: rows, total: count, page, pages: Math.ceil(count / limit) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch partners.' });
  }
};

exports.updatePartner = async (req, res) => {
  try {
    const item = await Partner.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found.' });
    await item.update({ status: req.body.status });
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Update failed.' });
  }
};

exports.deletePartner = async (req, res) => {
  try {
    const item = await Partner.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found.' });
    await item.destroy();
    res.json({ success: true, message: 'Deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Delete failed.' });
  }
};

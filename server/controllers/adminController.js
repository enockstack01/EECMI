const { Op } = require('sequelize');
const Contact   = require('../models/Contact');
const Prayer    = require('../models/Prayer');
const Volunteer = require('../models/Volunteer');
const Newsletter= require('../models/Newsletter');
const NewsPost  = require('../models/NewsPost');
const Resource  = require('../models/Resource');
const Admin     = require('../models/Admin');
const Partner   = require('../models/Partner');

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

    res.json({
      success: true,
      stats: { contacts, prayers, volunteers, subscribers, newPosts, resources, partners },
      recent: { contacts: newContacts, prayers: recentPrayers, volunteers: recentVolunteers, partners: recentPartners },
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

// ── ADMIN USERS ──────────────────────────────────────────────
exports.getAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll({ attributes: { exclude: ['password'] }, order: [['createdAt', 'DESC']] });
    res.json({ success: true, data: admins });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch admins.' });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
    const exists = await Admin.findOne({ where: { email: email.toLowerCase() } });
    if (exists) return res.status(409).json({ success: false, message: 'Email already in use.' });
    const admin = await Admin.create({ name, email: email.toLowerCase(), password, role });
    res.status(201).json({ success: true, data: { id: admin.id, name: admin.name, email: admin.email, role: admin.role } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create admin.' });
  }
};

exports.toggleAdmin = async (req, res) => {
  try {
    const item = await Admin.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found.' });
    if (item.id === req.admin.id) return res.status(400).json({ success: false, message: 'Cannot deactivate yourself.' });
    await item.update({ isActive: !item.isActive });
    res.json({ success: true, data: { id: item.id, isActive: item.isActive } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Update failed.' });
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

const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const JWT_SECRET  = process.env.JWT_SECRET   || 'eecmi_jwt_secret_dev_2024';
const JWT_EXPIRES = process.env.JWT_EXPIRES_IN || '7d';

const signToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Email and password are required.' });

    const admin = await Admin.findOne({ where: { email: email.toLowerCase().trim() } });
    if (!admin || !(await admin.comparePassword(password)))
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });

    if (!admin.isActive)
      return res.status(403).json({ success: false, message: 'Account is disabled. Contact your administrator.' });

    await admin.update({ lastLogin: new Date() });

    res.json({
      success: true,
      token: signToken(admin.id),
      admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error during login.' });
  }
};

exports.getMe = async (req, res) => {
  res.json({ success: true, admin: req.admin });
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword)
      return res.status(400).json({ success: false, message: 'Both passwords are required.' });
    if (newPassword.length < 8)
      return res.status(400).json({ success: false, message: 'New password must be at least 8 characters.' });

    const admin = await Admin.findByPk(req.admin.id);
    if (!(await admin.comparePassword(currentPassword)))
      return res.status(401).json({ success: false, message: 'Current password is incorrect.' });

    await admin.update({ password: newPassword });
    res.json({ success: true, message: 'Password updated successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

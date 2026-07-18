const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const sequelize = require('./config/db');

// Import models so Sequelize registers them before sync
require('./models/Contact');
require('./models/Prayer');
require('./models/Volunteer');
require('./models/Newsletter');
require('./models/Admin');
require('./models/NewsPost');
require('./models/Resource');
require('./models/Partner');
require('./models/User');

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP. Please try again in 15 minutes.',
});

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/api', limiter);

app.use('/api/contact',    require('./routes/contactRoutes'));
app.use('/api/prayer',     require('./routes/prayerRoutes'));
app.use('/api/volunteer',  require('./routes/volunteerRoutes'));
app.use('/api/newsletter', require('./routes/newsletterRoutes'));
app.use('/api/partner',    require('./routes/partnerRoutes'));
app.use('/api/users',      require('./routes/userAuthRoutes'));
app.use('/api/auth',       require('./routes/authRoutes'));
app.use('/api/admin',      require('./routes/adminRoutes'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'EECMI API is running', db: 'PostgreSQL', timestamp: new Date().toISOString() });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error.' });
});

const PORT = process.env.PORT || 5000;

const seedDefaultAdmin = async () => {
  const Admin = require('./models/Admin');
  const bcrypt = require('bcryptjs');
  const count = await Admin.count();
  if (count === 0) {
    const password = process.env.ADMIN_PASSWORD || 'Admin@EECMI2024';
    await Admin.create({
      name: 'Super Admin',
      email: 'admin@eecmi.org',
      password,
      role: 'super_admin',
    });
    console.log('Default admin created: admin@eecmi.org');
  }
};

const seedDemoUser = async () => {
  const User = require('./models/User');
  const count = await User.count();
  if (count === 0) {
    await User.create({ name: 'Demo User', email: 'demo@eecmi.org', password: 'Demo@123' });
    console.log('Demo user created: demo@eecmi.org / Demo@123');
  }
};

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected successfully.');

    await sequelize.sync({ alter: process.env.NODE_ENV !== 'production' });
    console.log('Database tables synced.');

    await seedDefaultAdmin();
    await seedDemoUser();

    app.listen(PORT, () =>
      console.log(`EECMI Server running on port ${PORT} in ${process.env.NODE_ENV} mode`)
    );
  } catch (error) {
    console.error('Unable to connect to PostgreSQL:', error.message);
    process.exit(1);
  }
};

start();

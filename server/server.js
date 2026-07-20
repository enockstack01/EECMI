const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const sequelize = require('./config/db');
const { clerkMiddleware } = require('./middleware/clerkAuth');

// Import models so Sequelize registers them before sync
require('./models/Contact');
require('./models/Prayer');
require('./models/Volunteer');
require('./models/Newsletter');
require('./models/NewsPost');
require('./models/Resource');
require('./models/Partner');

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
app.use(clerkMiddleware());
app.use('/api', limiter);

app.use('/api/contact',    require('./routes/contactRoutes'));
app.use('/api/prayer',     require('./routes/prayerRoutes'));
app.use('/api/volunteer',  require('./routes/volunteerRoutes'));
app.use('/api/newsletter', require('./routes/newsletterRoutes'));
app.use('/api/partner',    require('./routes/partnerRoutes'));
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

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected successfully.');

    await sequelize.sync({ alter: process.env.NODE_ENV !== 'production' });
    console.log('Database tables synced.');

    if (!process.env.CLERK_SECRET_KEY) {
      console.warn('CLERK_SECRET_KEY is not set — authentication will fail. Check your .env file.');
    }

    app.listen(PORT, () =>
      console.log(`EECMI Server running on port ${PORT} in ${process.env.NODE_ENV} mode`)
    );
  } catch (error) {
    console.error('Unable to connect to PostgreSQL:', error.message);
    process.exit(1);
  }
};

start();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const { connectDB } = require('./config/db');
const { clerkMiddleware } = require('./middleware/clerkAuth');
const { seedSiteContent } = require('./config/seedContent');

// Import models so Mongoose registers their schemas
require('./models/Contact');
require('./models/Prayer');
require('./models/Volunteer');
require('./models/Newsletter');
require('./models/NewsPost');
require('./models/Resource');
require('./models/Partner');
require('./models/DevotionMaterial');
require('./models/Notification');
require('./models/UserProfile');
require('./models/SiteContent');

const app = express();

// Render sits behind a reverse proxy — without this, Express can't see each
// visitor's real IP (every request looks like it comes from Render's proxy),
// which made the rate limiter below treat the entire site's traffic as a
// single client and throttle everyone together.
app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP. Please try again in 15 minutes.',
});

// Clerk's React SDK loads its runtime JS from Clerk's CDN and talks to the
// Frontend API directly from the browser, so Helmet's default CSP (script-src
// 'self' etc.) silently blocks it — Clerk components just render nothing.
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'script-src': ["'self'", 'https://*.clerk.accounts.dev', 'https://*.clerk.com', 'https://challenges.cloudflare.com'],
        'connect-src': ["'self'", 'https://*.clerk.accounts.dev', 'https://*.clerk.com', 'https://api.clerk.com', 'https://res.cloudinary.com'],
        'img-src': ["'self'", 'data:', 'blob:', 'https://img.clerk.com', 'https://res.cloudinary.com'],
        // Cloudinary serves uploaded devotion audio/video.
        'media-src': ["'self'", 'blob:', 'https://res.cloudinary.com'],
        // https://www.google.com is for the embedded Google Maps iframe on the Contact page;
        // res.cloudinary.com renders uploaded devotion PDFs in an <iframe>.
        'frame-src': ["'self'", 'https://*.clerk.accounts.dev', 'https://*.clerk.com', 'https://challenges.cloudflare.com', 'https://www.google.com', 'https://res.cloudinary.com'],
        'worker-src': ["'self'", 'blob:'],
      },
    },
  })
);
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
// Scoped to /api so a Clerk misconfiguration can't take down the public site.
app.use('/api', clerkMiddleware());
app.use('/api', limiter);

app.use('/api/contact',    require('./routes/contactRoutes'));
app.use('/api/prayer',     require('./routes/prayerRoutes'));
app.use('/api/volunteer',  require('./routes/volunteerRoutes'));
app.use('/api/newsletter', require('./routes/newsletterRoutes'));
app.use('/api/partner',    require('./routes/partnerRoutes'));
app.use('/api/resources',  require('./routes/resourceRoutes'));
app.use('/api/devotions',  require('./routes/devotionRoutes'));
app.use('/api/news',       require('./routes/newsRoutes'));
app.use('/api/content',    require('./routes/contentRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/me',         require('./routes/meRoutes'));
app.use('/api/auth',       require('./routes/authRoutes'));
app.use('/api/admin',      require('./routes/adminRoutes'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'EECMI API is running', db: 'MongoDB', timestamp: new Date().toISOString() });
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
    await connectDB();
    console.log('MongoDB connected successfully.');

    await seedSiteContent();

    if (!process.env.CLERK_SECRET_KEY) {
      console.warn('CLERK_SECRET_KEY is not set — authentication will fail. Check your .env file.');
    }
    if (!process.env.CLOUDINARY_URL && !process.env.CLOUDINARY_CLOUD_NAME) {
      console.warn('CLOUDINARY_URL is not set — devotion file uploads are disabled (admin can still paste external URLs).');
    }

    app.listen(PORT, () =>
      console.log(`EECMI Server running on port ${PORT} in ${process.env.NODE_ENV} mode`)
    );
  } catch (error) {
    console.error('Unable to connect to MongoDB:', error.message);
    process.exit(1);
  }
};

start();

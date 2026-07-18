const { createProxyMiddleware } = require('http-proxy-middleware');

/**
 * Dev proxy — forwards /api requests to the Express server.
 * REACT_APP_API_URL is set to http://api:5000 when running inside Docker,
 * and falls back to http://localhost:5000 for local development.
 */
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.REACT_APP_API_URL || 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};

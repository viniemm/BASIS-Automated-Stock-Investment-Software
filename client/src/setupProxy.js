const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('./env.json')[process.env.REACT_APP_ENVIRONMENT || 'development'];

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: config.PROXY,
      changeOrigin: true,
    })
  );
};
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://api.football-data.org',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};

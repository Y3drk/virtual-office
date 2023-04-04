const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware(['/users', '/generateTag'],{
            target: 'http://backend:8080',
            changeOrigin: true,
        })
    );

    app.use(
        createProxyMiddleware('/socket', {
            target: 'http://backend:8080',
            ws: true,
            changeOrigin: true,
        })
    );
};
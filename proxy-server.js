const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());

// Simple proxy middleware
app.use('/proxy', createProxyMiddleware({
    target: 'https://docs.google.com',
    changeOrigin: true,
    pathRewrite: {
        '^/proxy': '', // remove /proxy prefix
    },
    onProxyReq: (proxyReq, req, res) => {
        console.log('Proxying:', req.originalUrl);
    }
}));

app.listen(3000, () => {
    console.log('Proxy server running on http://localhost:3000');
});
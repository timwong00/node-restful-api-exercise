const express = require('express');
const app = express();

const productRoutes = require('./api/routes/products');

// 'use' sets up a middleware
// /products will forward to products.js
app.use('/products', productRoutes);

module.exports = app;
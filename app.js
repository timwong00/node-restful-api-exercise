const express = require('express');
const app = express();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// 'use' sets up a middleware
// Routes which should handle requests
// /products will forward to products.js
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

module.exports = app;
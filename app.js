const express = require('express');
const app = express();
const morgan = require("morgan");

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// 'use' sets up a middleware
app.use(morgan('dev'));

// Routes which should handle requests
// /products will forward to products.js
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error); // forwards the request i.e. error request
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
})

module.exports = app;
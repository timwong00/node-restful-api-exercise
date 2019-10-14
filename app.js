const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

mongoose.connect(
  "mongodb+srv://" +
    process.env.MONGO_ATLAS_USER +
    ":" +
    process.env.MONGO_ATLAS_PW +
    "@cluster0-elsdj.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
mongoose.Promise = global.Promise;

// 'use' sets up a middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// append headers
// prevent CORS errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // * = access to any origin or restrict to a 'http://'
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  ); // * or Origin, X-Requested-With, Content-Type, Accept, Authorization
  if (req.method === "OPTIONS") {
    // check if incoming req.method (method property which gives access to HTTP method
    // BROWSER will always send a options request first when post or put request is sent
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({}); // sends back response adding the headers request will continue
  }
  next(); // other routes can take over
});

// Routes which should handle requests
// /products will forward to products.js
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error); // forwards the request i.e. error request
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;

'use strict';

require('dotenv').config();
// connect to Mongo
const mongoose = require('mongoose');
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const { MONGODB_URI, PORT} = process.env;
mongoose.connect(MONGODB_URI, mongooseOptions, () => {
  console.log('Connected to MondoDB.');
});

// start express server
const server = require('./src/app');
server.start(PORT);
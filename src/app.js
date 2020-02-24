'use strict';

// Third-part resources
// create server
const express = require('express');
// Middleware that logs requests with time stamp
const morgan = require('morgan');
var cors = require('cors');

// App-level middleware
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// requires products and categories models
const Categories = require('./models/categories');
const categories = new Categories();
const Products = require('./models/products');
const products = new Products();

// Determines model params
function getModel (req, res, next) {
  const model = req.params.model;
  switch (model) {
  case 'categories':
    req.model = categories;
    next();
    break;
  case 'products':
    req.model = products;
    next();
    break;
  default:
    throw new Error('Invalid Model.');
  }
}

// Requires hanlder functions
const { postRecord, getAllRecords, updateRecord, destroyRecord } = require('./lib/routeHandlers');
// Routes
// Allows for variable routes based on the model param
app.param('model', getModel);
app.get('/api/v1/:model', getAllRecords);
app.post('/api/v1/:model', postRecord);
app.put('/api/v1/:model/:id', updateRecord);
app.delete('/api/v1/:model/:id', destroyRecord);



app.get('/this_will_error', (req, res) => {
  throw new Error('Internal Server error');
});

// Catch-alls
const notFoundHandler = require('./middlewares/404');
app.use(notFoundHandler);
const internalServerErrorHandler = require('./middlewares/internalServerErrorHandler');
app.use(internalServerErrorHandler);

let isRunning = false;
// exports the servers
module.exports = {
  server: app,
  start: function (port) {
    if (!isRunning) {
      app.listen(port, () => {
        isRunning = true;
        console.log(`Server listening on port ${port}`);
      });
    } else {
      console.error('Server is alread running!');
    }
  },
};
'use strict';

// Third-part resources
// create server
const express = require('express');
const morgan = require('morgan');
var cors = require('cors');

// App-level middleware
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

const Categories = require('./models/categories');
const categories = new Categories;
const Products = require('./models/products');
const products = new Products;

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

const { postRecord, getAllRecords, updateRecord, destroyRecord } = require('./lib/routeHandlers');
// Routes
app.param('model', getModel);
app.get('/:model', getAllRecords);
app.post('/:model', postRecord);
app.put('/:model/:id', updateRecord);
app.delete('/:model/:id', destroyRecord);



app.get('/this_will_error', (req, res) => {
  throw new Error('Internal Server error');
});

// Catch-alls
const notFoundHandler = require('./middlewares/404');
app.use(notFoundHandler);
const internalServerErrorHandler = require('./middlewares/internalServerErrorHandler');
app.use(internalServerErrorHandler);

let isRunning = false;

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
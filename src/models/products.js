'use strict';
const Model = require('./mongo-model');
const schema = require('./products-schema');

// Allows Products to have access to CRUD
class Products extends Model {
  constructor () {
    super(schema);
  }
}

module.exports = Products;
'use strict';
const Model = require('./mongo-model');
const schema = require('./products-schema');

class Products extends Model {
  constructor () {
    super(schema);
  }
}

module.exports = Products;
'use strict';
const Model = require('./mongo-model');
const schema = require('./users-schema');

class Products extends Model {
  constructor () {
    super(schema);
  }
}

module.exports = Products;
'use strict';
const Products = require('../../../src/models/products');
require('@code-fellows/supergoose');

const products = new Products();

describe('Products model.', () => {
  it('Can create() a new product.', () => {
    const testObject = {
      id: 1,
      name: 'banana',
      display_name: 'banana',
      description: 'yellow and stuff',
    };
    return products.create(testObject)
      .then(record => {
        Object.keys(testObject).forEach(key => {
          expect(record[key]).toEqual(testObject[key]);
        });
      })
      .catch(err => console.error('ERROR:', err));
  });
});
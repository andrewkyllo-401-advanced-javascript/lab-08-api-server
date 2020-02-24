'use strict';
const Categories = require('../../../src/models/categories');
require('@code-fellows/supergoose');

const categories = new Categories();

describe('Categories model.', () => {
  it('Can create() a new category.', () => {
    const testObject = {
      id: 1,
      categoryId: 2,
      name: 'Fruits',
      display_name: 'fruities',
      description: 'Lots of sugar',
    };
    return categories.create(testObject)
      .then(record => {
        Object.keys(testObject).forEach(key => {
          expect(record[key]).toEqual(testObject[key]);
        });
      })
      .catch(err => console.error('ERROR:', err));
  });
  it('Can read() all categories.', () => {
    return categories.read()
      .then(records => {
        expect(records.length).toBeGreaterThan(0);
      })
      .catch(err => console.error('ERROR:', err));
  });
  it('Can read() a category by id.', () => {
    return categories.read('1')
      .then(record => {
        expect(record[0].id).toEqual(1);
      })
      .catch(err => console.error('ERROR:', err));
  });
  it('Can delete() by id.', () => {
    return categories.delete(1)
      .then(record => {
        console.log(record);
      })
      .catch(err => console.error('ERROR:', err));
  });
});


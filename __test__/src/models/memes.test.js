'use strict';
const Memes = require('../../../src/models/memes');
require('@code-fellows/supergoose');

const  memes = new Memes();

describe('Memes model.', () => {
  it('can create() a new meme.', () => {
    const testObject = {
      template: 'Galaxy Brain',
      textBoxes: ['one', 'two', 'three', 'four'],
      imageUrl: 'htasdfasdfasdf',
    };
    return memes.create(testObject)
      .then(record => {
        Object.keys(testObject).forEach(key => {
          if (testObject[key] instanceof Array) {
            Object.keys(testObject[key]).forEach(subkey => {
              expect(record[key][subkey]).toEqual(testObject[key][subkey]);
            });
          } else {
            expect(record[key]).toEqual(testObject[key]);
          }
        });
      })
      .catch(err => console.error('ERROR:', err));
  });
});
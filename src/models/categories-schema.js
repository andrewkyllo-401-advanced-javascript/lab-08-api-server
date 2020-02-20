'use strict';
const mongoose = require('mongoose');

const categoriesSchema = mongoose.Schema({
  id: { type: Number },
  categoryId: { type: Number },
  name: { type: String },
  display_name: { type: String },
  description: { type: String },
});

module.exports = mongoose.model('categories', categoriesSchema);
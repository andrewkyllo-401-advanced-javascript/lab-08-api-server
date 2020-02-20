'use strict';

const express = require('express');
const Categories = require('../models/categories');
const categories = new Categories();

const router = express.Router();

// Routes
router.get('/categories', getAllCategories);
router.get('/categories/:id', getOneCategory);
router.post('/categories', postCategory);
router.post('/categories/:id', postCategory);
router.put('/categories/:id', editCategory);
router.delete('/categories/:id', destroyCategory);

function getAllCategories (req, res, next) {
  categories.read()
    .then(result => {
      const output = {
        count: result.length,
        data: result,
      };
      res.status(200).json(output);
    })
    .catch(next);
}

function getOneCategory (req, res, next) {
  categories.read(req.params.id)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(next);
}

function postCategory (req, res, next) {
  categories.create(req.body)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(next);
}

function editCategory (req, res, next) {
  categories.update(req.params.id, req.body)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(next);
}

function destroyCategory (req, res, next) {
  categories.delete(req.params.id)
    .then(result => {
      res.status(202).json(result);
    })
    .catch(next);
}


module.exports = {
  router: router,
};
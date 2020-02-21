'use strict';

const express = require('express');
const Products = require('../models/products');
const products = new Products();

const router = express.Router();

// Routes
router.get('/products', getAllProducts);
router.get('/products/:id', getOneCategory);
router.post('/products', postCategory);
router.post('/products/:id', postCategory);
router.put('/products/:id', editCategory);
router.delete('/products/:id', destroyCategory);

function getAllProducts (req, res, next) {
  products.read()
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
  products.read(req.params.id)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(next);
}

function postCategory (req, res, next) {
  products.create(req.body)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(next);
}

function editCategory (req, res, next) {
  products.update(req.params.id, req.body)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(next);
}

function destroyCategory (req, res, next) {
  products.delete(req.params.id)
    .then(result => {
      res.status(202).json(result);
    })
    .catch(next);
}


module.exports = {
  router: router,
};
'use strict';

// function that handles post request
function postRecord (req, res, next) {
  req.model.create(req.body)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(next);
}
// function that handles get request
function getAllRecords (req, res, next) {
  req.model.read()
    .then(result => {
      const output = {
        count: result.length,
        data: result,
      };
      res.status(200).json(output);
    })
    .catch(next);
}

// function that handles update request
function updateRecord (req, res, next) {
  req.model.update(req.params.id, req.body)
    .then(result => {
      res.status(200).json(result);
    }) 
    .catch(next);
}
// function that handles deletion request
function destroyRecord (req, res, next) {
  req.model.delete(req.params.id)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(next);
}

module.exports = {
  postRecord,
  getAllRecords,
  updateRecord,
  destroyRecord,
};
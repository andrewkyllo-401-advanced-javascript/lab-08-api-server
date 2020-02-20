'use strict';

// Third-part resources
// create server
const express = require('express');
const morgan = require('morgan');
// App-level middleware
const app = express();
app.use(morgan('dev'));
app.use(express.json());

// Routes
const memesRouter = require('./api/memesRouter');
app.use(memesRouter);

app.get('/this_will_error', (req, res) => {
  throw new Error('Internal Server error');
});

// Catch-alls
const notFoundHandler = require('./middlewares/404');
app.use(notFoundHandler);
const internalServerErrorHandler = require('./middlewares/internalServerErrorHandler');
app.use(internalServerErrorHandler);

let isRunning = false;

module.exports = {
  server: app,
  start: function (port) {
    if (!isRunning) {
      app.listen(port, () => {
        isRunning = true;
        console.log(`Server listening on port ${port}`);
      });
    } else {
      console.error('Server is alread running!');
    }
  },
};
const express = require('express');

const app = express();

const src = /** @type {import('yaetae').Router} */ (app)
  //
  .use('/', require('./src'));

app.listen(5000, () => console.log('Server listening on port 5000'));

/** @typedef {import('yaetae').API<typeof src>} API */

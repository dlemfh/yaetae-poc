const express = require('express');

/** @type {import('yaetae').Router} */
const router = express.Router();

module.exports = router
  //
  .use('/users', require('./users'));

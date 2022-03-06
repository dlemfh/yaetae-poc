const express = require('express');

/** @type {import('yaetae').Router} */
const router = express.Router();

/**
 * @type {express.RequestHandler<
 *   unknown,
 *   {
 *     foo: string;
 *   }
 * >}
 */
const someRandomEndpoint = (req, res) => {
  res.json({ foo: 'a' });
};

module.exports = router
  .use('/admin', require('./admin'))
  .use('/articles', require('./articles'));

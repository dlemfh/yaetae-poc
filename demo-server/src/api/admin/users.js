const express = require('express');

/** @type {import('yaetae').Router} */
const router = express.Router();

/**
 * @type {express.RequestHandler<
 *   unknown,
 *   import('../../models/User').User[]
 * >}
 */
const getUsers = (req, res) => {
  const users = [
    {
      id: 1,
      name: 'User 1',
    },
    {
      id: 2,
      name: 'User 2',
    },
  ];
  res.json(users);
};

/**
 * @type {express.RequestHandler<
 *   { id: string },
 *   import('../../models/Article').Article[]
 * >}
 */
const getArticlesOfUser = (req, res) => {
  const { id } = req.params;
  const articles = [
    {
      title: 'Article 1',
      content: 'Content 1',
      author: Number(id),
      comments: [],
    },
  ];
  res.json(articles);
};

/** @type {express.RequestHandler} */
const postEndpointWithLongPath = (req, res) => {
  res.send('ok');
};

module.exports = router
  .get('/', getUsers)
  .get('/:id/articles', getArticlesOfUser)
  .post('/very/very/long/path', postEndpointWithLongPath);

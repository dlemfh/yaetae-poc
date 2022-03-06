const express = require('express');

/** @type {import('yaetae').Router} */
const router = express.Router();

/**
 * @type {express.RequestHandler<
 *   unknown,
 *   import('../models/Article').Article[]
 * >}
 */
const getArticles = (req, res) => {
  const articles = [
    {
      title: 'Article 1',
      content: 'Content 1',
      author: 1,
      comments: [],
    },
    {
      title: 'Article 2',
      content: 'Content 2',
      author: 2,
      comments: [],
    },
  ];
  res.json(articles);
};

/**
 * @type {express.RequestHandler<
 *   unknown,
 *   import('../models/Article').Article
 * >}
 */
const putArticle = (req, res) => {
  const { title, content, author } = req.body;

  if (typeof title !== 'string') {
    throw new Error();
  }
  if (typeof content !== 'string') {
    throw new Error();
  }
  if (typeof author !== 'number') {
    throw new Error();
  }

  const article = {
    title,
    content,
    author,
    comments: [],
  };
  res.json(article);
};

module.exports = router
  //
  .get('/', getArticles)
  .put('/', putArticle);

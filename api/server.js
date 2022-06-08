// implement your server here
// require your posts router and connect it here

const express = require('express');

const server = express();

server.use(express.json());

const postsRouter = require('./posts/posts-router');

const Posts = require('./posts/posts-model');

server.use('./api/posts', postsRouter);

server.get('/api/posts', (req, res) => {
    Posts.find()
      .then(dogs => {
        res.status(200).json(dogs);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving the dogs' });
      });
  });

module.exports = server;
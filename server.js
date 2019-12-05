const express = require('express');
const helmet = require('helmet');
const server = express();

const userRoute = require('./users/userRouter.js');


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  next()
}

module.exports = server;

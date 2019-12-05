const express = require('express');
const helmet = require('helmet');
const server = express();

const userRoute = require('./users/userRouter.js');

server.use(helmet());
server.use(logger);

server.use('/api/users', userRoute);


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`Logged  ${req.url}  ${req.method} -- ${new Date()}`)

  next()
}

module.exports = server;

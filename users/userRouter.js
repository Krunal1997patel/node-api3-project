const express = require('express');

const router = express.Router();

const databass = require('./userDb.js');
const postDatabass = require('../posts/postDb.js')

router.use(express.json());

router.post('/', validateUser, (req, res) => {
  // do your magic!
  const body = req.body;

  databass.insert(body)
  .then(newData => {
    res.status(201).json(newData)
  })
  .catch(err => {
    console.log(err, 'from POST a new user')
    res.status(500).json({
      error: 'could not add the new user'
    })
  })

});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  // const body = req.body;

  postDatabass.insert({ text: req.body.text, user_id: req.paramsrs.id})
  .then(newPost => {
    res.status(201).json(newPost)
  })
  .catch(err => {
    console.log(err, 'from POST a new user post')
    res.status(500).json({
      error: 'could not add the new user post'
    })
  })
});

router.get('/', (req, res) => {
  // do your magic!
  databass.get()
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => {
    console.log(err, 'from GET user')
    res.status(500).json({
      error: 'the users could not be retrieved'
    })
  })
});

router.get('/:id', validateUserId,  (req, res) => {
  // do your magic!
  databass.getById(req.params.id)
  .then(userId => {
    res.status(200).json(userId)
  })
  .catch(err => {
    console.log(err, 'from GET user id')
    res.status(500).json({
      error: 'the users could not be retrieved'
    })
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id

  databass.getUserPosts(id)
  .then(userPost => {
    res.status(200).json(userPost)
  })
  .catch(err => {
    console.log(err, 'from GET users post')
    res.status(500).json({
      error: 'the users posts could not be retrieved'
    })
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;

  databass.remove(id)
  .then(removeUser => {
    res.status(200).json(`The ${id} user has been removed`)
  })
  .catch(err => {
    console.log(err, 'from DELETE users')
    res.status(500).json({
      error: `Failed to remove user`
    })
  })

});

router.put('/:id', validateUserId, validatePost, (req, res) => {
  // do your magic!
  const id = req.params.id;
  const body = req.body;

  databass.update(id, body)
  .then(updateUser => {
    res.status(200).json(updateUser)
  })
  .catch(err => {
    console.log(err, 'from PUT to change user name')
    res.status(500).json({
      error: 'could not update the user'
    })
  })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const id = req.params.id;

  databass.getById(id)
  .then(user => {
    if(!user){
      res.status(400).json({
        message: `invalid user id` 
      })
    }else{
      req.user = user;
      next()
    }
  })
  .catch(err => {
    console.log( err, 'validateUserId')
    res.status(500).json({
      error: 'could not validate the id'
    })
  })
}

function validateUser(req, res, next) {
  // do your magic!
  const data = req.body

  if(!data && !data.name){
    res.status(400).json({ 
      message: "there is no data bro..."
     })
  }else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  const data = req.body;

  if(!data && !data.text){
    res.status(400).json({
      message: 'missing required text field'
    })
  }else{
    next();
  }
}

module.exports = router;

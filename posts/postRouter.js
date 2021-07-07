const express = require('express');

const router = express.Router();

const postDB = require('./postDb.js');

router.use(express.json());

router.get('/', (req, res) => {
  // do your magic!
  postDB.get()
  .then(post => {
    res.status(200).json(post)
  })
  .catch(err => {
    console.log(err, 'from GET in post')
    res.status(500).json({
      error: 'the users could not be retrieved'
    })
  })
});

router.get('/:id', (req, res) => {
  // do your magic!
  const id = req.params.id

  postDB.getById(id)
  .then(postID => {
    res.status(200).json(postID)
  })
  .catch(err => {
    console.log(err, 'from GET from post id')
    res.status(500).json({
      error: 'the posts could not be retrieved'
    })
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  const id = req.params.id;

  postDB.remove(id)
  .then(removePost => {
    res.status(200).json(`The Post number ${id} has been remove`)
  })
  .catch(err => {
    console.log(err, 'from DELETE in posts')
    res.status(500).json({
      error: 'This posts can not be deleted'
    })
  })
});

router.put('/:id', (req, res) => {
  // do your magic!
  const id = req.params.id;
  const body = req.body;

  postDB.update(id, body)
  .then(updatePost => {
    res.status(200).json(updatePost)
  })
  .catch(err => {
    console.log(err, 'from PUT in posts')
    res.status(500).json({
      error: 'This data can not be updated'
    })
  })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;

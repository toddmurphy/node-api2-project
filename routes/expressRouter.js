const express = require('express');
const db = require('../data/db');

const router = express.Router();
router.use(express.json());

// router.get('/', (req, res) => {
//   res.status(200);
//   res.send('hello from the GET /api/posts');
// });

//GET ALL POSTS
router.get('/', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200);
      res.json(posts);
    })
    .catch(error => {
      res.status(500);
      res.json({ error: 'The posts information could not be retrieved.', error });
    });
});

//GET ALL POSTS:id
router.get('/:id', (req, res) => {
  // do something with an id
  const id = req.params.id;

  db.findById(id)
    .then(post => {
      if (id) {
        res.status(200);
        res.json(post);
      } else {
        res.status(404);
        res.json({ message: 'The post with the specified ID does not exist.', error });
      }
    })
    .catch(error => {
      res.status(500);
      res.json({ error: 'The post information could not be retrieved.', error });
    });
});

//DELETE A POST
router.delete('/:id', (req, res) => {
  //Use ID to find a specific post to delete
  const deleteID = req.params.id;

  db.remove(deleteID)
    .then(deletedPost => {
      if (!deleteID) {
        res.status(404);
        res.json({ message: 'The post with the specified ID does not exist.' });
      } else {
        res.status(200);
        res.json({ deletedPost });
      }
    })
    .catch(error => {
      res.status(500);
      res.json({ error: 'The post could not be removed', error });
    });
});

module.exports = router;

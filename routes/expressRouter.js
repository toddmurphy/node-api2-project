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

module.exports = router;

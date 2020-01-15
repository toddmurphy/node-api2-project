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

//POST
router.post('/', (req, res) => {
  const newPost = req.body;

  db.insert(newPost)
    .then(blog => {
      if (newPost.title || newPost.contents) {
        res.status(201);
        res.json(blog);
      } else {
        res.status(400);
        res.json({ errorMessage: 'Please provide title and contents for the post.', error });
      }
    })
    .catch(error => {
      res.status(500);
      res.json({ error: 'There was an error while saving the post to the database', error });
    });
});

//GET COMMENTS by ID --> not sure why it's not working -->getting and error
router.get('/:id/comments', (req, res) => {
  const postId = req.params.id;
  db.findPostComments(postId)
    .then(comments => {
      if (postId) {
        res.status(200);
        res.json(comments);
      } else {
        res.status(404);
        res.json({ message: 'The post with the specific ID does not exist', error });
      }
    })
    .catch(error => {
      console.log(err);
      res.status(500);
      res.json({ error: 'The comments information could not be retrieved', error });
    });
});

//POST COMMENTS by ID

//PUT --> Edit
router.put('/:id', (req, res) => {
  const editID = req.params.id;
  const editPost = req.body;

  db.update(editID, editPost)
    .then(updatedPost => {
      if (!editID) {
        res.status(404);
        res.json({ message: 'The post with the specified ID does not exist.', error });
      } else if (!editPost.title || !editPost.contents) {
        res.status(400);
        res.json({ errorMessage: 'Please provide title and contents for the post.', error });
      } else {
        res.status(200);
        res.json({ updatedPost });
      }
    })
    .catch(error => {
      res.status(500);
      res.json({ error: 'The post information could not be modified.', error });
    });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const PostsControllers = require('../controllers/postsControllers');

/* GET */
router.get('/', (req, res) => {
  PostsControllers.getPosts(req, res);
});

/* Post */
router.post("/", (req, res) => {
  PostsControllers.insertPost(req, res);
});

module.exports = router;
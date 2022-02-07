var express = require('express');
var router = express.Router();
const {authenticateToken} = require('../middleware/auth')
const {verification} = require("../middleware/verification")
const userController = require('../controllers').user;
const authController = require('../controllers').auth;
const postController = require('../controllers').post;
const commentController = require('../controllers').comment;
const likeController = require('../controllers').like;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send("The Blog API !!!!!!!!!!!");
});

/*Auth router */
router.post('/api/auth/login' , authController.login  )

/* User Router */
router.get('/api/user',  userController.list);
router.get('/api/user/:uuid', userController.getById);
router.post('/api/user', userController.add);
router.put('/api/user/:uuid', userController.update);
router.delete('/api/user/:uuid', userController.deleteUser);

/* Post Router */
router.get('/api/post', authenticateToken, postController.list);
// router.get('/api/post/:uuid', postController.getById);
router.get('/api/post/:slug', postController.getBySlug);
router.post('/api/post', authenticateToken, verification,  postController.add);
router.put('/api/post/:uuid', authenticateToken, verification, postController.update);
router.delete('/api/post/:uuid', postController.deletePost);

/* Comment Router */
router.get('/api/comment',  commentController.list);
router.get('/api/comment/:uuid', commentController.getById);
router.post('/api/comment', commentController.add);
router.put('/api/comment/:uuid', commentController.update);
router.delete('/api/comment/:uuid', commentController.deleteComment);

/* Like Router */
router.get('/api/like', authenticateToken,  likeController.list);
router.post('/api/like', authenticateToken, likeController.toggleLike);
router.delete('/api/like/:uuid', likeController.deleteLike);

module.exports = router;

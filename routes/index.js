var express = require('express');
var router = express.Router();
const {authenticateToken} = require('../middleware/auth')
const userController = require('../controllers').user;
const authController = require('../controllers').auth
/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send("The Blog API !!!!!!!!!!!");
});
/*Auth router */
router.post('/api/auth/login' , authController.login  )

/* User Router */
router.get('/api/user',  userController.list);
router.get('/api/user/:id', userController.getById);
router.post('/api/user', userController.add);
router.put('/api/user/:id', userController.update);
router.delete('/api/user/:id', userController.deleteUser);

module.exports = router;

var express = require('express');
var router = express.Router();

const userController = require('../controllers').user;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send("The Blog API !!!!!!!!!!!");
});

/* User Router */
router.get('/api/user', userController.list);
router.get('/api/user/:id', userController.getById);
router.post('/api/user', userController.add);
router.put('/api/user/:id', userController.update);
router.delete('/api/user/:id', userController.deleteUser);

module.exports = router;

const express = require('express');
const userController = require('../controllers/user.controller');
const taskController = require('../controllers/task.controller');

var router = express.Router();

router.post('/register', userController.signup);

router.post('/login', userController.login);

router.get('/isLoggedin', userController.isLoggedIn);

router.post('/create', taskController.create);

router.get('/tasks', taskController.tasks);

module.exports = router;